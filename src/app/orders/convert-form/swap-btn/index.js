import React, { PropTypes } from 'react';
import './styles.less';

const propTypes = {
  onClick: PropTypes.func.isRequired
};

export default function SwapBtn({ onClick }) {
  return (
    <div className="swap-btn" onClick={onClick} />
  );
}

SwapBtn.propTypes = propTypes;
