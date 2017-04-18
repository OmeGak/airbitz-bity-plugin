import React, { Component, PropTypes } from 'react';
import Page from '../../lib/page';
import PageLoader from '../../lib/page-loader';
import AccountInfoView from './account-info-view.container';

const propTypes = {
  onMounted: PropTypes.func.isRequired,
  onUnmounted: PropTypes.func.isRequired,
  isReady: PropTypes.bool.isRequired
};

export default class AccountInfoPage extends Component {
  static propTypes = propTypes;

  componentDidMount() {
    this.props.onMounted();
  }

  componentWillUnmount() {
    this.props.onUnmounted();
  }

  render() {
    const children = this.props.isReady ?
      <AccountInfoView /> :
      <PageLoader />;

    return (
      <Page>
        {children}
      </Page>
    );
  }
}
