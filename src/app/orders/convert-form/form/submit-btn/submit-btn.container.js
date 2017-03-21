import { connect } from 'react-redux';
import Widget from './submit-btn';
import * as errorsSelectors from '../../form.state/errors/selectors';
import * as formActions from '../../form.state/form/actions';
import { selectors as exchangeOrderSelectors } from '../../../../common-data/exchange-order';

export default connect(mapStateToProps, mapDispatchToProps)(Widget);

function mapStateToProps(state) {
  return {
    inProgress: exchangeOrderSelectors.isStarted(state),
    formIsValid: errorsSelectors.formIsValid(state)
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onClick(router) {
      dispatch(formActions.submit(router));
    }
  };
}
