import { connect } from 'react-redux';
import LoginForm from './login-form';
import {
  selectors as authStoreSelectors,
  actions as authStoreActions
} from '../../../common-data/auth';

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);

function mapStateToProps(state) {
  return {
    isRequestStarted: authStoreSelectors.isLoginRequestStarted(state)
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onSubmit({ user, password }) {
      dispatch(authStoreActions.login({ user, password }));
    }
  };
}
