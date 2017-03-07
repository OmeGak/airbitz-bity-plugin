import { connect } from 'react-redux';
import Widget from './input-amount-error';
import { selectors } from '../state';

export default connect(mapStateToProps)(Widget);

function mapStateToProps(state) {
  return {
    minAmount: selectors.getInputMinAmount(state),
    maxAmount: selectors.getInputMaxAmount(state),
    currency: selectors.getInputCurrency(state),
    error: selectors.getInputAmountError(state)
  };
}
