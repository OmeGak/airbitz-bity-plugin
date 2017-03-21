import React, { PropTypes } from 'react';
import classNames from 'classnames';
import Spinner from '../../../../lib/spinner';

import styles from './styles.less';

const propTypes = {
  inProgress: PropTypes.bool,
  formIsValid: PropTypes.bool,
  className: PropTypes.string,
  onClick: PropTypes.func.isRequired
};

const defaultProps = {
  formIsValid: false,
  inProgress: false,
  className: '',
  disabled: false
};

export default function SubmitBtn(props, context) {
  const { inProgress, formIsValid, onClick } = props;
  const content = createContent(inProgress);

  const { className: extraClassName } = props;
  const btnClassName = classNames('btn btn-primary btn-block', styles.btn, extraClassName);

  const disabled = !formIsValid || inProgress;

  return (
    <button className={btnClassName} onClick={handleClick} disabled={disabled}>
      {content}
    </button>
  );

  function handleClick() {
    onClick(context.router);
  }
}

SubmitBtn.propTypes = propTypes;
SubmitBtn.defaultProps = defaultProps;

// TODO it is not a best place for this
SubmitBtn.contextTypes = {
  router: PropTypes.object
};

function createContent(inProgress) { // eslint-disable-line react/prop-types
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
