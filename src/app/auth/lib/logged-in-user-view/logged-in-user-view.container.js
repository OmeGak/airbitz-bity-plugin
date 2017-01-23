import { connect } from 'react-redux';
import LoggedInUserView from './logged-in-user-view';

import * as actions from '../../data/actions';

export default connect(mapStateToProps, mapDispatchToProps)(LoggedInUserView);

function mapStateToProps() {
  return {};
}

function mapDispatchToProps(dispatch) {
  return {
    logout() {
      dispatch(actions.logout());
    }
  };
}
