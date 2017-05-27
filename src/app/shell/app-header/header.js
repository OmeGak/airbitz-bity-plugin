import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import classNames from 'classnames';
import styles from './styles.less';

import Logo from './logo';

const propTypes = {
  inverted: PropTypes.bool
};

const defaultProps = {
  inverted: false
};

export default function AppHeader({ inverted }) {
  const className = classNames(styles.header, {
    [styles.inverted]: inverted
  });

  return (
    <div className={className}>
      <div className={styles.logoWrapper}>
        <Link to="/">
          <Logo className={styles.logo} inverted={inverted} />
        </Link>
      </div>
    </div>
  );
}

AppHeader.propTypes = propTypes;
AppHeader.defaultProps = defaultProps;
