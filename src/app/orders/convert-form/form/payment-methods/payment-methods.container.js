import { connect } from 'react-redux';
import Widget from './payment-methods';
import * as selectors from '../../form.state/payment-methods/selectors';
import * as actions from '../../form.state/payment-methods/actions';

export default connect(mapStateToProps, mapDispatchToProps)(Widget);

function mapStateToProps(state) {
  return {
    paymentMethods: selectors.getAvailablePaymentMethods(state),
    selectedId: selectors.getSelectedPaymentMethodId(state)
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onChange(paymentMethodCode) {
      dispatch(actions.selectedPaymentMethodIdChanged(paymentMethodCode));
    }
  };
}
