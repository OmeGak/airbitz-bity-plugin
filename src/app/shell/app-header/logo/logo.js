import React, { PropTypes } from 'react';
import classNames from 'classnames';
import styles from './styles.less';
import imgWhite from './assets/logo-white.png';
import imgColor from './assets/logo-color.png';

const propTypes = {
  className: PropTypes.string,
  inverted: PropTypes.bool
};

const defaultProps = {
  className: '',
  inverted: false
};

export default function Logo({ className: extraClassName, inverted }) {
  const rootClassName = classNames(styles.root, extraClassName);
  const whiteLogoImgClassName = classNames({
    [styles.hiddenImg]: inverted,
    [styles.visibleImg]: !inverted
  });
  const colorLogoImgClassName = classNames({
    [styles.hiddenImg]: !inverted,
    [styles.visibleImg]: inverted
  });

  return (
    <span className={rootClassName}>
      <img className={whiteLogoImgClassName} src={imgWhite} />
      <img className={colorLogoImgClassName} src={imgColor} />
    </span>
  );
}

Logo.propTypes = propTypes;
Logo.defaultProps = defaultProps;
