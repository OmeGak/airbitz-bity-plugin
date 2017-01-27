import { connect } from 'react-redux';
import LoginForm from './login-form';
import * as actions from '../../data/actions';
import * as authSelectors from '../../data/selectors';

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);

function mapStateToProps(state) {
  return {
    isRequestStarted: authSelectors.isLoginRequestStarted(state)
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onSubmit({ user, password }) {
      dispatch(actions.login({ user, password }));
    }
  };
}
