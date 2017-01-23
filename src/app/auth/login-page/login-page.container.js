import { connect } from 'react-redux';
import LoginPage from './login-page';
import * as selectors from '../data/selectors';

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);

function mapStateToProps(state) {
  return {
    isAuthenticated: selectors.isAuthenticated(state)
  };
}

function mapDispatchToProps() {
  return {};
}
