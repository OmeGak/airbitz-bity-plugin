import { connect } from 'react-redux';
import Widget from './submit-btn';
import * as errorsSelectors from '../../form.state/errors/selectors';
import * as formSelectors from '../../form.state/form/selectors';
import * as formActions from '../../form.state/form/actions';

export default connect(mapStateToProps, mapDispatchToProps)(Widget);

function mapStateToProps(state) {
  return {
    inProgress: formSelectors.isSubmiting(state),
    formIsValid: errorsSelectors.formIsValid(state)
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onClick() {
      dispatch(formActions.submit());
    }
  };
}
