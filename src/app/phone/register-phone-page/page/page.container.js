import { connect } from 'react-redux';
import Widget from './page';
import { actions, selectors } from '../state';
import { register as registerOp } from '../../../common-data/phone';

export default connect(mapStateToProps, mapDispatchToProps)(Widget);

function mapStateToProps(state) {
  return {
    isPreparationStarted: selectors.isPreparationStarted(state),
    isPreparationFailed: selectors.isPreparationFailed(state),
    inProgress: registerOp.selectors.isStarted(state)
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
    onSubmit(phoneNumber, router) {
      dispatch(actions.register(phoneNumber, router));
    }
  };
}
