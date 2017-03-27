import { connect } from 'react-redux';
import Widget from './signup-widget';

import { actions, selectors } from '../state';

export default connect(mapStateToProps, mapDispatchToProps)(Widget);

function mapStateToProps(state) {
  return {
    isSignupSucceed: selectors.isSignupSucceed(state)
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
