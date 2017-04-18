import { connect } from 'react-redux';
import Widget from './app-preloader';
import { actions, selectors } from '../state';

export default connect(mapStateToProps, mapDispatchToProps)(Widget);

function mapStateToProps(state) {
  return {
    isPreparationStarted: selectors.isPreparationStarted(state),
    isPreparationFailed: selectors.isPreparationFailed(state),
    isPreparationCompleted: selectors.isPreparationCompleted(state)
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onMounted() {
      dispatch(actions.mounted());
    }
  };
}
