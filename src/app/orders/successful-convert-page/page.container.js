import { connect } from 'react-redux';
import Widget from './page';
import { selectors } from '../../common-data/exchange-order';

export default connect(mapStateToProps, mapDispatchToProps)(Widget);

function mapStateToProps(state) {
  return {
    data: selectors.getData(state)
  };
}

function mapDispatchToProps() {
  return {};
}
