import React, { Component, PropTypes } from 'react';
import { withRouter } from 'react-router';
import Page from '../../../lib/page';
import PageLoader from '../../../lib/page-loader';
import { Card, CardHeader, CardBody } from '../../../lib/card';
import styles from './styles.less';

const btnClassName = `btn btn-primary ${styles.btn}`;

const propTypes = {
  router: PropTypes.object.isRequired,
  onMounted: PropTypes.func.isRequired,
  onUnmounted: PropTypes.func.isRequired,
  isPreparationStarted: PropTypes.bool.isRequired,
  isPreparationFailed: PropTypes.bool.isRequired,
  isYearlyQuotaExceeded: PropTypes.bool.isRequired,
  isMonthlyQuotaExceeded: PropTypes.bool.isRequired,
  isWeeklyQuotaExceeded: PropTypes.bool.isRequired,
  isDailyQuotaExceeded: PropTypes.bool.isRequired
};

class QuotaExceededPage extends Component {
  static propTypes = propTypes;

  constructor(props) {
    super(props);

    this.onTryAgainBtn = this.onTryAgainBtn.bind(this);
  }

  componentDidMount() {
    this.props.onMounted(this.props.router);
  }

  componentWillUnmount() {
    this.props.onUnmounted();
  }

  onTryAgainBtn() {
    this.props.router.replace('/convert');
  }

  render() {
    if (this.props.isPreparationStarted) {
      return (
        <PageLoader />
      );
    }

    if (this.props.isPreparationFailed) {
      return (
        <Page>
          <Card>
            <CardHeader>Error</CardHeader>
            <CardBody className={styles.cardBody}>
              <div>Page can&lsquo;t be loaded</div>
            </CardBody>
          </Card>
        </Page>
      );
    }

    let quotaType;
    switch (true) {
      case this.props.isDailyQuotaExceeded:
        quotaType = 'daily';
        break;
      case this.props.isWeeklyQuotaExceeded:
        quotaType = 'weekly';
        break;
      case this.props.isMonthlyQuotaExceeded:
        quotaType = 'monthly';
        break;
      case this.props.isYearlyQuotaExceeded:
        quotaType = 'yearly';
        break;
      default:
        quotaType = '';
    }

    return (
      <Page>
        <Card>
          <CardHeader>Quota is exceeded</CardHeader>
          <CardBody className={styles.cardBody}>
            <div className={styles.text}>Your {quotaType} limit is exceeded.</div>
            <div className={styles.text}>Increase your limit at <a href="https://bity.com/">bity.com</a></div>
            <div className={styles.text}>and</div>
            <div>
              <button className={btnClassName} onClick={this.onTryAgainBtn} type="button">
                <span>Try exchange your money again</span>
              </button>
            </div>
          </CardBody>
        </Card>
      </Page>
    );
  }
}

export default withRouter(QuotaExceededPage);
