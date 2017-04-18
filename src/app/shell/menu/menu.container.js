import { connect } from 'react-redux';
import * as actions from './state/actions';
import * as selectors from './state/selectors';
import { selectors as authStoreSelectors } from '../../common-data/auth';
import Menu from './menu';

export default connect(mapStateToProps, mapDispatchToProps)(Menu);

function mapStateToProps(state) {
  return {
    isOpen: selectors.isOpen(state),
    isAuthenticated: authStoreSelectors.isAuthenticated(state)
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onStateChange(isOpen) {
      dispatch(actions.onStateChange(isOpen));
    },
    onMenuItemClick() {
      dispatch(actions.hide());
    }
  };
}
