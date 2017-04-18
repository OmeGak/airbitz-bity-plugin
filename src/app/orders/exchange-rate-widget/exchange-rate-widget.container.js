import { connect } from 'react-redux';
import Widget from './exchange-rate-widget';
import { selectors as exchangeRatesStoreSelectors } from '../../common-data/exchange-rates';

export default connect(mapStateToProps)(Widget);

function mapStateToProps(state) {
  return {
    exchangeRates: exchangeRatesStoreSelectors.getData(state)
  };
}
