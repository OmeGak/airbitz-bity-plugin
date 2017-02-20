import { connect } from 'react-redux';
import LoginPage from './login-page';
import { selectors as authStoreSelectors } from '../../common-data/auth';

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);

function mapStateToProps(state) {
  return {
    isAuthenticated: authStoreSelectors.isAuthenticated(state)
  };
}

function mapDispatchToProps() {
  return {};
}
