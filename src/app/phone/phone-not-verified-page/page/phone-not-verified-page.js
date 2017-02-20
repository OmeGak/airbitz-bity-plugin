import React, { Component, PropTypes } from 'react';
import { withRouter } from 'react-router';
import Page from '../../../lib/page';
import { Card, CardHeader, CardBody } from '../../../lib/card';
import PageLoader from '../../../lib/page-loader';
import styles from './styles.less';

const btnClassName = `btn btn-primary ${styles.btn}`;

const propTypes = {
  router: PropTypes.object.isRequired,
  onMounted: PropTypes.func.isRequired,
  onUnmounted: PropTypes.func.isRequired,
  isPreparationStarted: PropTypes.bool.isRequired,
  isPreparationFailed: PropTypes.bool.isRequired
};

class PhoneNotVerifiedPage extends Component {
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

    return (
      <Page>
        <Card>
          <CardHeader>Your phone number is not verified</CardHeader>
          <CardBody className={styles.cardBody}>
            <div className={styles.text}>Verify your phone number on <a href="http://bity.com/">bity.com</a></div>
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

export default withRouter(PhoneNotVerifiedPage);
