import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';
import { Card, CardHeader, CardBody, CardFooter } from '../../../../lib/card';
import Spinner from '../spinner';
import EmptyHistoryUI from '../empty-history-ui';
import OrdersList from '../orders-list';
import Nav from '../nav';
import styles from './styles.less';

const propTypes = {
  orders: PropTypes.array,
  isFetchStarted: PropTypes.bool.isRequired,
  isPristine: PropTypes.bool.isRequired,
  onMounted: PropTypes.func.isRequired,
  onUnmounted: PropTypes.func.isRequired,
  onRefreshBtn: PropTypes.func.isRequired
};

const defaultProps = {
  orders: []
};

const spinnerClassName = classNames(styles.spinner);

export default class OrdersHistory extends Component {
  static propTypes = propTypes;
  static defaultProps = defaultProps;

  constructor(props) {
    super(props);

    this.handleClickOnRefreshBtn = this.handleClickOnRefreshBtn.bind(this);
  }

  componentDidMount() {
    this.props.onMounted();
  }

  componentDidUpdate(prevProps) {
    if (this.props.orders !== prevProps.orders) {
      window.scrollTo(0, 0);
    }
  }

  componentWillUnmount() {
    this.props.onUnmounted();
  }

  handleClickOnRefreshBtn(event) {
    event.preventDefault();
    this.props.onRefreshBtn();
  }

  render() {
    const { isPristine, isFetchStarted, orders } = this.props;

    const spinnerNode = isFetchStarted ? (<Spinner className={spinnerClassName} />) : null;

    const bodyClassName = classNames(styles.cardBody, {
      [styles.faded]: isFetchStarted
    });
    const footerClassName = isFetchStarted ? styles.faded : '';

    let bodyContent;
    if (isPristine) {
      bodyContent = null;
    } else {
      bodyContent = orders.length > 0 ?
        (<OrdersList orders={orders} />) :
        (<EmptyHistoryUI />);
    }

    return (
      <div className={styles.root}>
        {spinnerNode}

        <Card className={styles.card}>
          <CardHeader>Orders History</CardHeader>
          <CardBody className={bodyClassName}>
            <div className={styles.listHeader}>
              <div className={styles.refreshBtnContainer}>
                <span className={styles.refreshBtn} onClick={this.handleClickOnRefreshBtn}>
                  <span className={styles.refreshBtnLabel}>Refresh</span>
                  <i className="refresh-icon" />
                </span>
              </div>
            </div>
            {bodyContent}
          </CardBody>
          <CardFooter className={footerClassName}>
            <Nav />
          </CardFooter>
        </Card>
      </div>
    );
  }
}
