import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import config from '../../config';
import DesktopLogoImage from './cottagedays-logo.png';
import MobileLogoImage from './cottagedays-logo-small.png';
import css from './Logo.module.css';

const Logo = props => {
  const { className, format, ...rest } = props;
  const classses = classNames(css.logoMobile, className);
  const isMobile = format !== 'desktop';
  const logoImage = isMobile ? MobileLogoImage : DesktopLogoImage;

  return <img className={classses} src={logoImage} alt={config.siteTitle} {...rest} />;
};

const { oneOf, string } = PropTypes;

Logo.defaultProps = {
  className: null,
  format: 'desktop',
};

Logo.propTypes = {
  className: string,
  format: oneOf(['desktop', 'mobile']),
};

export default Logo;
