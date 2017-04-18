import { connect } from 'react-redux';
import Widget from './orders-history-widget';
import * as actions from '../../data/actions';
import * as selectors from '../../data/selectors';

export default connect(mapStateToProps, mapDispatchToProps)(Widget);

function mapStateToProps(state) {
  return {
    isPristine: selectors.isPristine(state),
    isFetchStarted: selectors.isFetchStarted(state),
    orders: selectors.getOrders(state)
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onMounted() {
      dispatch(actions.fetchOrders());
    },
    onUnmounted() {
      dispatch(actions.cancelFetch());
      dispatch(actions.reset());
    },
    onRefreshBtn() {
      dispatch(actions.refresh());
    }
  };
}
