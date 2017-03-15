import { connect } from 'react-redux';
import Widget from './form.widget';
import * as actions from '../form.state/form/actions';
import * as selectors from '../form.state/form/selectors';

export default connect(mapStateToProps, mapDispatchToProps)(Widget);

function mapStateToProps(state) {
  return {
    showBankAccounts: selectors.showBankAccounts(state),
    showExternalReference: selectors.showExternalReference(state)
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
