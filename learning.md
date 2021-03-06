## change default location

Inside default-location-seraches.js we can set default location for our marketplace to be displayed
for better UX
[refrence](https://www.sharetribe.com/docs/tutorial-branding/change-default-locations/)

## update filters

filter configuration can be manipulated from `marktetplace-custom-config.js` file
[refrence](https://www.sharetribe.com/docs/tutorial-branding/customize-amenities-filter/#update-amenities-filter)

## Taking filters in use

If we want to make sdk.listing.query endpoint to understand that listings have a new public data
field, we need to add search schema for it. Otherwise, this additional data is just gibberish to the
search engine

### Set search schema with Flex CLI

When you have installed Flex CLI to your command line environment, we can set the search schema for
amenities public data key. Since one listing can have multiple amenities, the schema type is
multi-enum.

    flex-cli search set --key amenities --type multi-enum --scope public -m my-marketplace-test

## Add FAQ page

### adding new page and configuring routes

Create a new directory for static pages use containers directory.

### Routing

Route configuration are defined in a file `routeConfiguration.js`
[refrence](https://www.sharetribe.com/docs/ftw-routing/how-routing-works-in-ftw/)

## Page Schema

StaticPage component can take 2 props that help with this search engine optimization (SEO). Title is
pretty self-explanatory: it's used to overwrite the default `<title>` tag in the `<head>` section of
the generated HTML page.

The second property (schema) takes in JSON-LD type of content. Here, we state that this page is
actually of type "FAQPage" in the context of schema.org vocabulary and we also add name and
description for it.

In addition, we could actually describe all the questions and answers to search engines too. This
can be done through mainEntity key.

## Add extended data to listing entity

### Learn how to add marketplace specific data to the listing entity by using extended data.

For adding new data first we have to configure editListingFeaturesPanel In that file,
EditListingFeaturesForm gets its props and we can modify what gets saved to publicData attribute of
the listing entity. We'll add "view" key there with an empty string. whatever fields we want to be
added in Features tab will be first loaded here. from there we can set public data to newly
populated fields.

We also need to get the saved value and pass it as the initial value for EditListingFeaturesForm,
when it gets rendered.

Then add form inputs for relevant fields

## Show extended data on listing page

### Learn how to show extended data on the listing page using the public data key.

To add a view info to the ListingPage component we need to modify `ListingPage.js` and we also add a
new subcomponent to that directory: `SectionViewMaybe.js`.

## Customize pricing

1. In `EditListingPricingPanel` add your new price field to the publicData field form onSubmit
   handler
2. Next pass initial values for price and new pricing fields as currency.
3. Add Input component to the pricing form + add translation keys for the input component.
4. Next we have to update the bookingDatesForm
   - The `BookingPanel` gets listing as props, newly populated data is saved to listing's public
     data key. We can get the new pricing data and pass it as props to `BookingDatesForm`.
5. Next we will add wifi charges checkbox to the booking form.
6. Next we update the booking data, i.e. if user has booking data and selected other values and
   update the transaction line items. These line items are shown inside the `bookingInfoMaybe`
   component under the form fields.
7. Inside BookingPanel on handleChange check if new values is available to formValues field. if yes
   then set bookingData with this key.
8. Add new line item for the newly populated item on backend. When we want to add a new line item
   for new pricing item, we'll need to update the pricing logic in the lineItems.js file.

## how to use protected data in an email notification

## Query events

a query for all available events using the SDK looks like this: `integrationSdk.events.query();`

process both listing/created and listing/updated events. A query for only these types of events
looks like this:

```
integrationSdk.events.query({
  eventTypes: 'listing/created,listing/updated',
});
```
query events from specific starting time 
```
integrationSdk.events.query({
  eventTypes: 'listing/created,listing/updated',
});
```


