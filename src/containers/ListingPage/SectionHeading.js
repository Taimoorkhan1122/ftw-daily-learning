import React, { useState, useEffect } from 'react';
import { FormattedMessage } from '../../util/reactIntl';
import { InlineTextButton } from '../../components';
import { LINE_ITEM_NIGHT, LINE_ITEM_DAY } from '../../util/types';
import config from '../../config';

import css from './ListingPage.module.css';
import { useHistory } from 'react-router';

const SectionHeading = props => {
  const {
    priceTitle,
    formattedPrice,
    richTitle,
    category,
    hostLink,
    showContactUser,
    onContactUser,
    wishList,
    handleWishList,
    handleRemoveWishList,
    isOwnListing,
    isAuthenticated,
    listingId,
  } = props;

  const [showWishList, setShowWishList] = useState(false);
  useEffect(() => {
    const isAddedToWishList = wishList?.includes(JSON.stringify(listingId)) || true;
    setShowWishList(isAddedToWishList);
  }, []);

  const handleAddToWishList = () => {
    handleWishList();
    setShowWishList(false);
  };
  const handleRemoveToWishList = () => {
    handleRemoveWishList();
    setShowWishList(true);
  };

  const unitType = config.bookingUnitType;
  const isNightly = unitType === LINE_ITEM_NIGHT;
  const isDaily = unitType === LINE_ITEM_DAY;
  const history = useHistory();
  // console.log(history);

  const unitTranslationKey = isNightly
    ? 'ListingPage.perNight'
    : isDaily
    ? 'ListingPage.perDay'
    : 'ListingPage.perUnit';

  return (
    <div className={css.sectionHeading}>
      <div className={css.desktopPriceContainer}>
        <div className={css.desktopPriceValue} title={priceTitle}>
          {formattedPrice}
        </div>
        <div className={css.desktopPerUnit}>
          <FormattedMessage id={unitTranslationKey} />
        </div>
      </div>
      <div className={css.heading}>
        <h1 className={css.title}>{richTitle}</h1>
        <div className={css.author}>
          {category}
          <FormattedMessage id="ListingPage.hostedBy" values={{ name: hostLink }} />
          {showContactUser ? (
            <span className={css.contactWrapper}>
              <span className={css.separator}>•</span>
              <InlineTextButton
                rootClassName={css.contactLink}
                onClick={onContactUser}
                enforcePagePreloadFor="SignupPage"
              >
                <FormattedMessage id="ListingPage.contactUser" />
              </InlineTextButton>
            </span>
          ) : null}
        </div>
      </div>
      {!isOwnListing &&
        (showWishList ? (
          <div
            className={css.addToWishList}
            onClick={() =>
              isAuthenticated
                ? handleAddToWishList()
                : history.push('/signup', { from: history.location })
            }
          >
            <FormattedMessage id="ListingPage.wishList" />
          </div>
        ) : (
          <div className={css.addToWishList} onClick={() => handleRemoveToWishList()}>
            <FormattedMessage id="ListingPage.removeFromWishList" />
          </div>
        ))}
    </div>
  );
};

export default SectionHeading;
