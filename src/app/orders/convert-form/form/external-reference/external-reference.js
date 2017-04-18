import React, { PropTypes } from 'react';
import styles from './styles.less';

const title = '(Optional) External reference sent to the recipient of the bank transfer';

const propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired
};

export default function ExternalReference(props) {
  const { value, onChange } = props;

  return (
    <div className={styles.root}>
      <div className={styles.label}>
        <span>{title}</span>
      </div>
      <div>
        <input className="form-control" placeholder="Max 129 characters" type="text"
          value={value} onChange={handleOnChange} />
      </div>
    </div>
  );

  function handleOnChange(event) {
    onChange(event.target.value);
  }
}

ExternalReference.propTypes = propTypes;
