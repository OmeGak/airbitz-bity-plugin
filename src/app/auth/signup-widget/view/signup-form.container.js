import { connect } from 'react-redux';
import Widget from '../../signup-form';

import { actions, selectors } from '../state';

export default connect(mapStateToProps, mapDispatchToProps)(Widget);

function mapStateToProps(state) {
  return {
    isSignupStarted: selectors.isSignupStarted(state)
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onSubmit(data) {
      dispatch(actions.signup(data));
    }
  };
}
