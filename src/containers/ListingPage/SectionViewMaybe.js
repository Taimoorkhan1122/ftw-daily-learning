import React from 'react';
import { FormattedMessage } from 'react-intl';

import css from './ListingPage.module.css';


const SectionViewMaybe = props => {
  const { options, publicData } = props;
  const selectedOption = publicData && publicData.view ? publicData.view : null;

  // if no public data then return null
  if (!publicData || !selectedOption) return null;

  //   find selected option
  const optionConfig = options.find(o => o.key === selectedOption);
  const optionLabel = optionConfig ? optionConfig.label : null;

  return (
    <div className={css.sectionFeatures}>
      <h2>
        <FormattedMessage id="ListingPage.viewType" values={{ view: optionLabel.toLowerCase() }} />
      </h2>
    </div>
  );
};

export default SectionViewMaybe;
