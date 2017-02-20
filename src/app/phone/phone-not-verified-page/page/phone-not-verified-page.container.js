import { connect } from 'react-redux';
import Page from './phone-not-verified-page';
import { actions, selectors } from '../state';

export default connect(mapStateToProps, mapDispatchToProps)(Page);

function mapStateToProps(state) {
  return {
    isPreparationStarted: selectors.isPreparationStarted(state),
    isPreparationFailed: selectors.isPreparationFailed(state),
    isPreparationCompleted: selectors.isPreparationCompleted(state)
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onMounted(router) {
      dispatch(actions.mounted({ router }));
    },
    onUnmounted() {
      dispatch(actions.unmounted());
    }
  };
}
