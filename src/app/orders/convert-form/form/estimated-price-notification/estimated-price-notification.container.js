import { connect } from 'react-redux';
import Widget from './estimated-price-notification';
import * as exchangePartiesSelectors from '../../form.state/exchange-parties/selectors';

export default connect(mapStateToProps)(Widget);

function mapStateToProps(state) {
  return {
    inputCurrencyCode: exchangePartiesSelectors.getInputSelectedCurrencyCode(state)
  };
}
