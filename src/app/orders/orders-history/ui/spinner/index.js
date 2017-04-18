import React, { PropTypes } from 'react';
import classNames from 'classnames';
import OriginalSpinner from '../../../../lib/spinner';
import styles from './styles.less';

const propTypes = {
  className: PropTypes.string
};

const defaultProps = {
  className: ''
};

export default function Spinner({ className: extraClassName }) {
  const rootClassName = classNames(styles.container, extraClassName);

  return (
    <div className={rootClassName}>
      <OriginalSpinner type="card" className={styles.spinner} />
    </div>
  );
}

Spinner.propTypes = propTypes;
Spinner.defaultProps = defaultProps;
