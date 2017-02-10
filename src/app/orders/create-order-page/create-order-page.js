import React, { Component, PropTypes } from 'react';
import Page from '../../lib/page';
import PageLoader from '../../lib/page-loader';

const propTypes = {
  onMounted: PropTypes.func.isRequired,
  onUnmounted: PropTypes.func.isRequired,
  isReady: PropTypes.bool.isRequired
};

export default class CreateOrderPage extends Component {
  static propTypes = propTypes;

  componentDidMount() {
    this.props.onMounted();
  }

  componentWillUnmount() {
    this.props.onUnmounted();
  }

  render() {
    const { isReady } = this.props;

    const children = isReady ?
      <h2>create order page</h2> :
      <PageLoader />;

    return (
      <Page>
        {children}
      </Page>
    );
  }
}
