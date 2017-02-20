import React, { Component, PropTypes } from 'react';
import { withRouter } from 'react-router';
import Page from '../../../lib/page';
import { Card, CardHeader, CardBody } from '../../../lib/card';
import PageLoader from '../../../lib/page-loader';
import styles from './styles.less';

const propTypes = {
  router: PropTypes.object.isRequired,
  onMounted: PropTypes.func.isRequired,
  onUnmounted: PropTypes.func.isRequired,
  isPreparationStarted: PropTypes.bool.isRequired,
  isPreparationFailed: PropTypes.bool.isRequired
};

class ConvertPage extends Component {
  static propTypes = propTypes;

  componentDidMount() {
    this.props.onMounted(this.props.router);
  }

  componentWillUnmount() {
    this.props.onUnmounted();
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
            <CardBody className={styles.errorCardBody}>
              <div>Page can&lsquo;t be loaded</div>
            </CardBody>
          </Card>
        </Page>
      );
    }

    return (
      <Page>
        <Card>
          <CardHeader>Buy / Sell</CardHeader>
          <CardBody>
            <div />
          </CardBody>
        </Card>
      </Page>
    );
  }
}

export default withRouter(ConvertPage);
