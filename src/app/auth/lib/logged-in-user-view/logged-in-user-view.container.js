import { connect } from 'react-redux';
import LoggedInUserView from './logged-in-user-view';

import { actions as authStoreActions } from '../../../common-data/auth';

export default connect(mapStateToProps, mapDispatchToProps)(LoggedInUserView);

function mapStateToProps() {
  return {};
}

function mapDispatchToProps(dispatch) {
  return {
    logout() {
      dispatch(authStoreActions.logout());
    }
  };
}
