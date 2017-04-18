import { connect } from 'react-redux';
import Widget from '../../exchange-rate-widget';
import * as selectors from '../form.state/exchange-parties/selectors';

export default connect(mapStateToProps)(Widget);

function mapStateToProps(state) {
  return {
    inputCurrency: selectors.getInputSelectedCurrencyCode(state),
    outputCurrency: selectors.getOutputSelectedCurrencyCode(state)
  };
}
