import { connect } from 'react-redux';
import Page from './create-order-page';
import { selectors, actions } from './state';

export default connect(mapStateToProps, mapDispatchToProps)(Page);

function mapStateToProps(state) {
  return {
    isReady: selectors.isReady(state)
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onMounted() {
      dispatch(actions.mounted());
    },
    onUnmounted() {
      dispatch(actions.unmounted());
    }
  };
}
