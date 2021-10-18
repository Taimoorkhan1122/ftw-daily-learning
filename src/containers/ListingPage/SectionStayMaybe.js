import React from 'react';
import { FormattedMessage } from 'react-intl';

import css from './ListingPage.module.css';
import ruleCss from './SectionRulesMaybe.module.css';

const SectionStayMaybe = props => {
  const { options, publicData } = props;
  let selectedOption = publicData && publicData.nightStay ? publicData.nightStay : null;

  // if no public data then return null
  if (publicData === undefined || selectedOption === undefined) return null;
  selectedOption === null && (selectedOption = false);
  
  const optionConfig = options.find(o => o.key === selectedOption);
  const optionLabel = optionConfig ? optionConfig.label : null;

  return (
    <div className={css.sectionFeatures}>
      <h2 className={css.featuresTitle}>
        <FormattedMessage id="ListingPage.nightStay" />
      </h2>
      <p className={ruleCss.rules}>{optionLabel}</p>
    </div>
  );
};

export default SectionStayMaybe;
