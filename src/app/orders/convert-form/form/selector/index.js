import React, { PropTypes } from 'react';
import classNames from 'classnames';

import styles from './styles.less';

const chevronClassName = `${styles.chevronDown} selector__chevron-down`;

const propTypes = {
  className: PropTypes.string,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]).isRequired,
  items: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number
    ]).isRequired,
    label: PropTypes.string.isRequired
  })).isRequired,
  onChange: PropTypes.func.isRequired
};

const defaultProps = {
  className: ''
};

export default function Selector(props) {
  const { className: extraClassName } = props;
  const className = classNames(styles.root, extraClassName);

  const { items, value, onChange } = props;
  if (items.length === 1) {
    return (
      <div className={className}>
        <span className={`form-control ${styles.singleOption}`}>{items[0].label}</span>
      </div>
    );
  }

  const optionNodes = items.map(obj => (
    <option key={obj.id} value={obj.id}>{obj.label}</option>
  ));

  return (
    <div className={className}>
      <select className="form-control" value={value} onChange={handleOnChange}>{optionNodes}</select>
      <div className={chevronClassName} />
    </div>
  );

  function handleOnChange(e) {
    onChange(e.target.value);
  }
}

Selector.propTypes = propTypes;
Selector.defaultProps = defaultProps;
