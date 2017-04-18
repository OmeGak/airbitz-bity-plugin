import { connect } from 'react-redux';
import Widget from '../../success-signup-widget';
import { selectors } from '../state';

export default connect(mapStateToProps)(Widget);

function mapStateToProps(state) {
  return {
    registrationData: selectors.getSuccessfulRegistrationData(state)
  };
}
