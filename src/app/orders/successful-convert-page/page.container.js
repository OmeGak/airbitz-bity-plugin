import { connect } from 'react-redux';
import Widget from './page';
import { selectors } from '../../common-data/exchange-order';
import { selectors as paymentMethodsStoreSelectors } from '../../common-data/payment-methods';

export default connect(mapStateToProps, mapDispatchToProps)(Widget);

function mapStateToProps(state) {
  return {
    data: selectors.getData(state),
    exchangeDirection: selectors.getExchangeDirection(state),
    paymentMethods: paymentMethodsStoreSelectors.getData(state)
  };
}

function mapDispatchToProps() {
  return {};
}
