import { connect } from 'react-redux';
import Widget from './exchange-party';
import * as exchangePartiesActions from '../../form.state/exchange-parties/actions';
import * as exchangePartiesSelectors from '../../form.state/exchange-parties/selectors';
import * as errorsSelectors from '../../form.state/errors/selectors';

export default connect(mapStateToProps, mapDispatchToProps)(Widget);

function mapStateToProps(state) {
  return {
    amount: exchangePartiesSelectors.getInputAmount(state),
    selectedCurrencyCode: exchangePartiesSelectors.getInputSelectedCurrencyCode(state),
    currencyList: exchangePartiesSelectors.getInputCurrencyList(state),
    inputErrors: errorsSelectors.getInputErrors(state)
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onAmountChange(v) {
      dispatch(exchangePartiesActions.inputAmountChanged(v));
    },
    onCurrencyChange(currencyCode) {
      dispatch(exchangePartiesActions.inputCurrencyCodeChanged(currencyCode));
    }
  };
}
