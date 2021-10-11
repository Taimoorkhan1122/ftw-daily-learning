import React from 'react';
import { string } from 'prop-types';
import { FormattedMessage, injectIntl, intlShape } from '../../util/reactIntl';
import classNames from 'classnames';
import { NamedLink } from '../../components';

import css from './SectionHero.module.css';

const SectionHero = props => {
  const { rootClassName, className, intl } = props;

  const classes = classNames(rootClassName || css.root, className);
  const translation = intl.formatMessage({
    id: 'SectionHero.title',
  });
  return (
    <div className={classes}>
      <div className={css.heroContent}>
        <h1 className={css.heroMainTitle}>
          {/* <FormattedMessage id="SectionHero.title" /> */}
          {translation}
        </h1>
        <h2 className={css.heroSubTitle}>
          <FormattedMessage id="SectionHero.subTitle" />
        </h2>
        <NamedLink
          name="SearchPage"
          to={{
            search:
              'address=Finland&bounds=70.0922932%2C31.5870999%2C59.693623%2C20.456500199999937',
          }}
          className={css.heroButton}
        >
          <FormattedMessage id="SectionHero.browseButton" />
        </NamedLink>
      </div>
    </div>
  );
};

SectionHero.defaultProps = { rootClassName: null, className: null };

SectionHero.propTypes = {
  rootClassName: string,
  className: string,
  intl: intlShape.isRequired,
};

export default injectIntl(SectionHero);
