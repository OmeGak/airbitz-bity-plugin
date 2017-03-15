import { connect } from 'react-redux';
import Widget from './bank-accounts';

import * as bankAccountsActions from '../../form.state/bank-accounts/actions';
import * as bankAccountsSelectors from '../../form.state/bank-accounts/selectors';
import * as exchangePartiesSelectors from '../../form.state/exchange-parties/selectors';

export default connect(mapStateToProps, mapDispatchToProps)(Widget);

function mapStateToProps(state) {
  return {
    accounts: bankAccountsSelectors.getAvailableAccounts(state),
    selectedAccountId: bankAccountsSelectors.getSelectedAccountId(state),
    currencyCode: exchangePartiesSelectors.getOutputSelectedCurrencyCode(state),
    isLoading: bankAccountsSelectors.isRefreshStarted(state)
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onAccountChange(id) {
      dispatch(bankAccountsActions.selectedAccountIdChanged(id));
    },
    onRefreshBtnClick() {
      dispatch(bankAccountsActions.refresh());
    }
  };
}
