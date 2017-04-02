import React, { Component, PropTypes } from 'react';
import { parse, isValidNumber } from 'libphonenumber-js';
import { withRouter } from 'react-router';
import Page from '../../../lib/page';
import { Card, CardHeader, CardBody } from '../../../lib/card';
import PageLoader from '../../../lib/page-loader';
import PhoneInput from '../../../lib/phone-input';
import Spinner from '../../../lib/spinner';

import styles from './styles.less';

const propTypes = {
  isPreparationStarted: PropTypes.bool.isRequired,
  isPreparationFailed: PropTypes.bool.isRequired,
  inProgress: PropTypes.bool.isRequired,
  router: PropTypes.object.isRequired,
  onMounted: PropTypes.func.isRequired,
  onUnmounted: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired
};

class RegisterPhonePage extends Component {
  static propTypes = propTypes;

  constructor(props) {
    super(props);

    this.onPhoneNumberChange = this.onPhoneNumberChange.bind(this);
    this.onSubmitBtn = this.onSubmitBtn.bind(this);

    this.state = {
      phoneNumber: '',
      isValid: false
    };
  }

  componentDidMount() {
    this.props.onMounted();
  }

  componentWillUnmount() {
    this.props.onUnmounted();
  }

  onPhoneNumberChange(phoneNumber) {
    const parsedValue = parse(phoneNumber);
    const isValid = isValidNumber(parsedValue);
    this.setState({
      phoneNumber,
      isValid
    });
  }

  onSubmitBtn(event) {
    event.preventDefault();
    this.props.onSubmit(this.state.phoneNumber, this.props.router);
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

    const disableSubmitBtn = !this.state.isValid || this.props.inProgress;
    const btnContent = createBtnContent(this.props.inProgress);

    return (
      <Page>
        <Card>
          <CardHeader>
            <span>Phone number verification</span>
          </CardHeader>
          <CardBody>
            <div className={styles.section}>
              <span>To access all features, please enter your phone number. Your phone number helps us
              increase your account security: e.g. a verification code is sent each time you change
              your bitcoin address.</span>
            </div>

            <div className={styles.sectionPhone}>
              <PhoneInput onChange={this.onPhoneNumberChange} value={this.state.phoneNumber} />
            </div>

            <div className={styles.sectionBtn}>
              <button type="button" className={`btn btn-primary ${styles.btn}`}
                disabled={disableSubmitBtn} onClick={this.onSubmitBtn}>{btnContent}</button>
            </div>
          </CardBody>
        </Card>
      </Page>
    );
  }
}

export default withRouter(RegisterPhonePage);

function createBtnContent(inProgress) { // eslint-disable-line react/prop-types
  if (inProgress) {
    return (
      <span className={styles.loading}>
        <Spinner type="inline" />
        <span>Saving...</span>
      </span>
    );
  }
  return (
    <span>Save</span>
  );
}
