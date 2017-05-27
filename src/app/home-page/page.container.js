import { connect } from 'react-redux';

import { actions as authStoreActions } from '../common-data/auth';

import Page from './page';

export default connect(null, mapDispatchToProps)(Page);

function mapDispatchToProps(dispatch) {
  return {
    onLogoutBtn() {
      dispatch(authStoreActions.logout());
    }
  };
}
