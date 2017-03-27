import React, { PropTypes } from 'react';
import { Errors } from 'react-redux-form';

import styles from './error-msg.less';

export default function FormFieldErrorMsg(props) {
  return (
    <Errors {...props} wrapper={Wrapper} show={{ touched: true, focus: false }} />
  );
}

// ==========================
// wrapper
// ==========================
const propTypes = {
  children: PropTypes.node
};

const defaultProps = {
  children: null
};

function Wrapper({ children }) {
  return (
    <div className={styles.root}>{children[0]}</div>
  );
}

Wrapper.propTypes = propTypes;
Wrapper.defaultProps = defaultProps;
