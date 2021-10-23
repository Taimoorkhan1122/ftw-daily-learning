const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });

const fs = require('fs');

const flexIntegerationSdk = require('sharetribe-flex-integration-sdk');

const integrationSdk = flexIntegerationSdk.createInstance({
  clientId: '5a7f5f7f-853b-440c-9016-dbfc47bf66d8',
  clientSecret: '58f37679bac702f23239e367f5e4efdaeb9ddc4f',

  // baseUrl: 'https://flex-integ-api.sharetribe.com',
});

const flexSdk = require('sharetribe-flex-sdk');
const sdk = flexSdk.createInstance({
  clientId: process.env.REACT_APP_SHARETRIBE_SDK_CLIENT_ID,
  clientSecret: process.env.SHARETRIBE_SDK_CLIENT_SECRET,
});
// Start polloing from current time on, when there's no stored state
const startTime = new Date();

// Polling interval (in ms) when all events have been fetched. Keeping this at 1
// minute or more is a good idea. In this example we use 10 seconds so that the
// data is printed out without too much delay.
const pollIdleWait = 10000;
// Polling interval (in ms) when a full page of events is received and there may be more
const pollWait = 250;

// File to keep state across restarts. Stores the last seen event sequence ID,
// which allows continuing polling from the correct place
const stateFile = './notify-new-listings.state';

const queryEvents = args => {
  var filter = { eventTypes: 'listing/created,listing/updated,review/updated' };
  return integrationSdk.events.query({ ...args, ...filter });
};

const updateListing = args => {
  return integrationSdk.listings.update({ ...args },{expand: true});
};

const saveLastEventSequenceId = sequenceId => {
  try {
    fs.writeFileSync(stateFile, sequenceId.toString());
  } catch (err) {
    throw err;
  }
};

const loadLastEventSequenceId = () => {
  try {
    const data = fs.readFileSync(stateFile);
    return parseInt(data, 10);
  } catch (err) {
    return null;
  }
};

const fetchPrevRatings = async id => {
  let ratings = [];
  try {
    const res = await sdk.reviews.query({
      listing_id: id,
      state: 'public',
      include: ['author', 'author.profileImage'],
      'fields.image': ['variants.square-small', 'variants.square-small2x'],
    });
    return (ratings = [...res.data.data]);
  } catch (error) {
    console.log('error in fetching revies ', error);
    return ratings;
  }
};

const analyzeEvent = event => {
  // if reviews event has occured
  if (event.attributes.resourceType == 'review') {
    const { resource, resourceId } = event.attributes;
    const {
      attributes,
      relationships: { listing },
    } = resource;

    fetchPrevRatings(listing.data.id.uuid)
      .then(res => {
        const ratings = res.length > 0 && res.map(rating => rating.attributes.rating);
        const total = ratings.reduce((prev, current) => prev + current);
        const average = total / ratings.length;

        updateListing({
          id: listing.data.id,
          metadata: {
            averageRatings: average,
          },
        })
          .then(res => {
            console.log(JSON.stringify(res.data.data.attributes));
          })
          .catch(e => console.log('Error in fetching listing ', e));
      })
      .catch(err => console.log(err));
  }
  if (event.attributes.resourceType == 'listing') {
    const { resourceId, resource: listing, previousValues, eventType } = event.attributes;
    const listingId = resourceId.uuid;
    const authorId = listing.relationships.author.data.id.uuid;
    const listingState = listing.attributes.state;
    const listingDetails = `listing ID ${listingId}, author ID: ${authorId}`;
    const { state: previousState } = previousValues.attributes || {};

    const isPublished = listingState === 'published';
    const isPendingApproval = listingState === 'pendingApproval';
    const wasDraft = previousState === 'draft';
    const wasPendingApproval = previousState === 'pendingApproval';

    switch (eventType) {
      case 'listing/created':
        if (isPendingApproval) {
          console.log(`A new listing is pending approval: ${listingDetails}`);
        } else if (isPublished) {
          console.log(`A new listing has been published: ${listingDetails}`);
        }
        break;
      case 'listing/updated':
        if (isPublished && wasPendingApproval) {
          console.log(`A listing has been approved by operator: ${listingDetails}`);
        } else if (isPublished && wasDraft) {
          console.log(`A new listing has been published: ${listingDetails}`);
        } else if (isPendingApproval && wasDraft) {
          console.log(`A new listing is pending approval: ${listingDetails}`);
        }
        break;
      // case 'user/updated':
      //   if()
    }
  }
};

const pollLoop = sequenceId => {
  var params = sequenceId ? { startAfterSequenceId: sequenceId } : { createdAtStart: startTime };
  queryEvents(params)
    .then(res => {
      const events = res.data.data;
      const lastEvent = events[events.length - 1];
      const fullPage = events.length === res.data.meta.perPage;
      const delay = fullPage ? pollWait : pollIdleWait;
      const lastSequenceId = lastEvent ? lastEvent.attributes.sequenceId : sequenceId;

      events.forEach(e => {
        analyzeEvent(e);
      });

      if (lastEvent) saveLastEventSequenceId(lastEvent.attributes.sequenceId);

      setTimeout(() => {
        pollLoop(lastSequenceId);
      }, delay);
    })
    .catch(e => console.log('error querying marketplace ', e));
};

const lastSequenceId = loadLastEventSequenceId();

console.log('Press <CTRL>+C to quit.');
if (lastSequenceId) {
  console.log(`Resuming event polling from last seen event with sequence ID ${lastSequenceId}`);
} else {
  console.log('No state found or failed to load state.');
  console.log('Starting event polling from current time.');
}

pollLoop(lastSequenceId);
