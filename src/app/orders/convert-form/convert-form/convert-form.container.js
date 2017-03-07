import { connect } from 'react-redux';
import { selectors, actions } from '../state';
import Form from './convert-form';

export default connect(mapStateToProps, mapDispatchToProps)(Form);

function mapStateToProps(state) {
  return {
    inputCurrency: selectors.getInputCurrency(state),
    outputCurrency: selectors.getOutputCurrency(state),
    inputAmount: selectors.getInputAmount(state),
    outputAmount: selectors.getOutputAmount(state),
    inputCurrencyList: selectors.getInputCurrencyList(state),
    outputCurrencyList: selectors.getOutputCurrencyList(state)
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onMounted() {
      dispatch(actions.mounted());
    },
    onUnmounted() {
      dispatch(actions.unmounted());
    },
    onInputAmountChange(v) {
      dispatch(actions.inputAmountChanged(v));
    },
    onOutputAmountChange(v) {
      dispatch(actions.outputAmountChanged(v));
    },
    onInputCurrencyChange(currencyId) {
      dispatch(actions.inputCurrencyChanged(currencyId));
    },
    onOutputCurrencyChange(currencyId) {
      dispatch(actions.outputCurrencyChanged(currencyId));
    },
    swapParties() {
      dispatch(actions.swapParties());
    }
  };
}
