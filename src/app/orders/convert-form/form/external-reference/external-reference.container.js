import { connect } from 'react-redux';
import Widget from './external-reference';
import * as actions from '../../form.state/external-reference/actions';
import * as selectors from '../../form.state/external-reference/selectors';

export default connect(mapStateToProps, mapDispatchToProps)(Widget);

function mapStateToProps(state) {
  return {
    value: selectors.getExternalReference(state)
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onChange(v) {
      dispatch(actions.externalReferenceChanged(v));
    }
  };
}
