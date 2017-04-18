import React, { Component, PropTypes } from 'react';
import SignupForm from './signup-form.container';
import SuccessSignupView from './success-signup-widget.container';

const propTypes = {
  isSignupSucceed: PropTypes.bool.isRequired,
  onMounted: PropTypes.func.isRequired,
  onUnmounted: PropTypes.func.isRequired
};

export default class SignupWidget extends Component {
  static propTypes = propTypes;

  componentDidMount() {
    this.props.onMounted();
  }

  componentWillUnmount() {
    this.props.onUnmounted();
  }

  render() {
    const { isSignupSucceed } = this.props;

    if (isSignupSucceed) {
      return (
        <SuccessSignupView />
      );
    }

    return (
      <SignupForm />
    );
  }
}
