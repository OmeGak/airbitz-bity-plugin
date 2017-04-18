import React, { Component, PropTypes } from 'react';
import { withRouter } from 'react-router';
import Page from '../../../lib/page';
import { Card, CardHeader, CardBody } from '../../../lib/card';
import PageLoader from '../../../lib/page-loader';
import Spinner from '../../../lib/spinner';

import styles from './styles.less';

const propTypes = {
  router: PropTypes.object.isRequired,
  phoneNumber: PropTypes.string,
  isPreparationStarted: PropTypes.bool.isRequired,
  isPreparationFailed: PropTypes.bool.isRequired,
  verificationInProgress: PropTypes.bool.isRequired,
  resendingInProgress: PropTypes.bool.isRequired,
  onMounted: PropTypes.func.isRequired,
  onUnmounted: PropTypes.func.isRequired,
  onSubmitCode: PropTypes.func.isRequired,
  onResendCode: PropTypes.func.isRequired
};

const defaultProps = {
  phoneNumber: ''
};

class VerifyPhonePage extends Component {
  static propTypes = propTypes;
  static defaultProps = defaultProps;

  constructor(props) {
    super(props);

    this.state = {
      code: '',
      codeIsValid: false
    };

    this.onCodeInputChange = this.onCodeInputChange.bind(this);
    this.onSubmitBtn = this.onSubmitBtn.bind(this);
    this.onResendBtn = this.onResendBtn.bind(this);
  }

  componentDidMount() {
    this.props.onMounted(this.props.router);
  }

  componentWillUnmount() {
    this.props.onUnmounted();
  }

  onCodeInputChange(event) {
    const code = event.target.value;
    this.updateCode(code);
  }

  onSubmitBtn() {
    this.props.onSubmitCode(this.state.code, this.props.router);
  }

  onResendBtn() {
    this.props.onResendCode(this.props.router);
  }

  updateCode(code) {
    const codeIsValid = code.length > 0;
    this.setState({
      code,
      codeIsValid
    });
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

    const { phoneNumber, verificationInProgress, resendingInProgress } = this.props;
    const { code, codeIsValid } = this.state;

    const disableSubmitBtn = !codeIsValid || verificationInProgress || resendingInProgress;
    const disableResendBtn = verificationInProgress || resendingInProgress;

    const submitBtnContent = createBtnContent('Submit', 'Submitting...', verificationInProgress);
    const resendBtnContent = createBtnContent('Resend', 'Sending...', resendingInProgress);

    return (
      <Page>
        <Card>
          <CardHeader className={styles.cardHeader}>
            <div>Enter your SMS code</div>
            <div className={styles.phoneNumber}>
              <span>Verification SMS have been sent to {phoneNumber}</span>
            </div>
          </CardHeader>
          <CardBody className={styles.errorCardBody}>
            <div>
              <input className="form-control" type="text" placeholder="xxxxxx"
                value={code} onChange={this.onCodeInputChange} />
            </div>
            <div>
              <span>Should you need to change your phone number, please contact us
              at <a href="mailto:support@bity.com">support@bity.com</a></span>
            </div>
            <div className={styles.buttons}>
              <button type="button" className={`btn btn-primary ${styles.verifyBtn}`}
                onClick={this.onSubmitBtn} disabled={disableSubmitBtn}>
                {submitBtnContent}
              </button>

              <button type="button" className={`btn btn-success ${styles.resendBtn}`}
                onClick={this.onResendBtn} disabled={disableResendBtn}>
                {resendBtnContent}
              </button>
            </div>
          </CardBody>
        </Card>
      </Page>
    );
  }
}

export default withRouter(VerifyPhonePage);

function createBtnContent(defaultLabel, progressLabel, inProgress) { // eslint-disable-line react/prop-types
  if (inProgress) {
    return (
      <span className={styles.loading}>
        <Spinner type="inline" />
        <span>{progressLabel}</span>
      </span>
    );
  }
  return (
    <span>{defaultLabel}</span>
  );
}
