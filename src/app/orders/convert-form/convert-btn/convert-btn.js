import React, { PropTypes } from 'react';
import Spinner from '../../../lib/spinner';

import styles from './styles.less';

const propTypes = {
  canConvert: PropTypes.bool.isRequired,
  inProgress: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired
};

export default function ConvertBtn(props) {
  const { onClick, canConvert, inProgress } = props;

  const disabled = !(canConvert || inProgress);

  const content = createContent(props);

  return (
    <button className="btn btn-primary btn-block" onClick={onClick} disabled={disabled}>
      {content}
    </button>
  );
}

ConvertBtn.propTypes = propTypes;

function createContent({ inProgress }) { // eslint-disable-line react/prop-types
  if (inProgress) {
    return (
      <span className={styles.loading}>
        <Spinner type="inline" />
        <span>Converting...</span>
      </span>
    );
  }
  return (
    <span>Convert</span>
  );
}
