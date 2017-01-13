import React, { PropTypes } from 'react';
import Nav from './nav';
import './styles.less';

const propTypes = {
  children: PropTypes.node
};

const defaultProps = {
  children: null
};

export default function Shell({ children }) {
  return (
    <div>
      <Nav />
      {children}
    </div>
  );
}

Shell.propTypes = propTypes;
Shell.defaultProps = defaultProps;
