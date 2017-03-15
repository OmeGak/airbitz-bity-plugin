import { connect } from 'react-redux';
import Widget from './exchange-party';
import * as exchangePartiesActions from '../../form.state/exchange-parties/actions';
import * as exchangePartiesSelectors from '../../form.state/exchange-parties/selectors';

export default connect(mapStateToProps, mapDispatchToProps)(Widget);

function mapStateToProps(state) {
  return {
    amount: exchangePartiesSelectors.getOutputAmount(state),
    selectedCurrencyCode: exchangePartiesSelectors.getOutputSelectedCurrencyCode(state),
    currencyList: exchangePartiesSelectors.getOutputCurrencyList(state)
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onAmountChange(v) {
      dispatch(exchangePartiesActions.outputAmountChanged(v));
    },
    onCurrencyChange(currencyCode) {
      dispatch(exchangePartiesActions.outputCurrencyCodeChanged(currencyCode));
    }
  };
}
