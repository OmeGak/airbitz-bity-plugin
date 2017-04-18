import { connect } from 'react-redux';
import Widget from './page';
import { actions, selectors } from '../state';
import { selectors as paymentMethodsStoreSelectors } from '../../../common-data/payment-methods';

export default connect(mapStateToProps, mapDispatchToProps)(Widget);

function mapStateToProps(state) {
  return {
    order: selectors.getOrderDetails(state),
    orderWasCanceled: selectors.orderWasCanceled(state),
    paymentMethods: paymentMethodsStoreSelectors.getData(state),
    isPreparationStarted: selectors.isPreparationStarted(state),
    isPreparationFailed: selectors.isPreparationFailed(state),
    isPreparationCompleted: selectors.isPreparationCompleted(state)
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onMounted(orderId) {
      dispatch(actions.mounted(orderId));
    },
    onUnmounted() {
      dispatch(actions.unmounted());
    },
    onCancel(orderId) {
      dispatch(actions.cancelOrder(orderId));
    }
  };
}
