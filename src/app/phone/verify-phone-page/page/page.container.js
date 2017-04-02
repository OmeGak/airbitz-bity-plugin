import { connect } from 'react-redux';
import Widget from './page';
import { actions, selectors } from '../state';
import {
  data as phoneDataStore,
  verify as verifyPhoneOp,
  sendVerificationCode as sendVerificationCodeOp
} from '../../../common-data/phone';

export default connect(mapStateToProps, mapDispatchToProps)(Widget);

function mapStateToProps(state) {
  let phoneNumber;
  const hasPhoneNumberData = phoneDataStore.selectors.hasData(state);
  const phoneNumberData = phoneDataStore.selectors.getData(state);
  if (!hasPhoneNumberData) {
    phoneNumber = '';
  } else {
    phoneNumber = phoneNumberData.cli;
  }

  return {
    phoneNumber,
    isPreparationStarted: selectors.isPreparationStarted(state),
    isPreparationFailed: selectors.isPreparationFailed(state),
    verificationInProgress: verifyPhoneOp.selectors.isStarted(state),
    resendingInProgress: sendVerificationCodeOp.selectors.isStarted(state)
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onMounted(router) {
      dispatch(actions.mounted(router));
    },
    onUnmounted() {
      dispatch(actions.unmounted());
    },
    onSubmitCode(code, router) {
      dispatch(actions.verifyPhone(code, router));
    },
    onResendCode(router) {
      dispatch(actions.resendCode(router));
    }
  };
}
