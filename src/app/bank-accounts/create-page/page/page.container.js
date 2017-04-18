import { connect } from 'react-redux';
import Widget from './page';
import { actions, selectors } from '../state';
import { add as addOp } from '../../../common-data/bank-accounts';

export default connect(mapStateToProps, mapDispatchToProps)(Widget);

function mapStateToProps(state) {
  return {
    isPreparationStarted: selectors.isPreparationStarted(state),
    isPreparationFailed: selectors.isPreparationFailed(state),
    inProgress: addOp.selectors.isStarted(state)
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onMounted(router) {
      dispatch(actions.mounted(router));
    },
    onUnmounted() {
      dispatch(actions.unmounted());
    },
    onSubmit(data) {
      dispatch(actions.add(data));
    }
  };
}
