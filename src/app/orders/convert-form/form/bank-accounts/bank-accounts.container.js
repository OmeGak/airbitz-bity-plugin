import { connect } from 'react-redux';
import Widget from './bank-accounts';

import * as bankAccountsActions from '../../form.state/bank-accounts/actions';
import * as bankAccountsSelectors from '../../form.state/bank-accounts/selectors';
import * as exchangePartiesSelectors from '../../form.state/exchange-parties/selectors';
import { load as loadOp } from '../../../../common-data/bank-accounts';

export default connect(mapStateToProps, mapDispatchToProps)(Widget);

function mapStateToProps(state) {
  return {
    accounts: bankAccountsSelectors.getAvailableAccounts(state),
    selectedAccountId: bankAccountsSelectors.getSelectedAccountId(state),
    currencyCode: exchangePartiesSelectors.getOutputSelectedCurrencyCode(state),
    isLoading: loadOp.selectors.isStarted(state)
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onAccountChange(id) {
      dispatch(bankAccountsActions.selectedAccountIdChanged(id));
    },
    onRefreshBtnClick() {
      dispatch(loadOp.actions.load(true));
    }
  };
}
