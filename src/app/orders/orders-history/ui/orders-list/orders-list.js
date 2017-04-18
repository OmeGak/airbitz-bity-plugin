import React, { PropTypes } from 'react';
import styles from './styles.less';
import OrderRow, { orderPropType } from './order-row';

const propTypes = {
  orders: PropTypes.arrayOf(orderPropType)
};

const defaultProps = {
  orders: []
};

export default function OrdersList({ orders }) {
  const rows = orders.map(order =>
    <OrderRow key={order.reference} order={order} />
  );

  return (
    <div className={styles.list}>
      <div className={styles.table}>
        <div className={styles.header}>
          <div className={styles.cellReference}>Reference</div>
          <div className={styles.cellType}>Type</div>
          <div className={styles.cellDate}>Date</div>
          <div className={styles.cellAmount}>Amount</div>
          <div className={styles.cellStatus}>Status</div>
        </div>
        {rows}
      </div>
    </div>
  );
}

OrdersList.propTypes = propTypes;
OrdersList.defaultProps = defaultProps;
