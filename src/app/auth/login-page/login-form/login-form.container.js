import { connect } from 'react-redux';
import LoginForm from './login-form';
import * as actions from '../../data/actions';

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);

function mapStateToProps() {
  return {};
}

function mapDispatchToProps(dispatch) {
  return {
    onSubmit({ user, password }) {
      dispatch(actions.login({ user, password }));
    }
  };
}
