import { connect } from 'react-redux';
import Widget from './bank-account-widget';
import { actions, selectors } from '../state';

export default connect(mapStateToProps, mapDispatchToProps)(Widget);

function mapStateToProps(state) {
  return {
    hasBankAccount: selectors.hasBankAccount(state),
    inputCurrency: selectors.getInputCurrency(state),
    outputCurrency: selectors.getOutputCurrency(state),
    isLoadingStarted: selectors.isLoadingOfBankAccountsStarted(state)
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onBtnClick() {
      dispatch(actions.reloadBankAccounts());
    }
  };
}
