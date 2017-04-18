import { connect } from 'react-redux';
import ConvertPage from './convert-page';
import { actions, selectors } from '../state';

export default connect(mapStateToProps, mapDispatchToProps)(ConvertPage);

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
