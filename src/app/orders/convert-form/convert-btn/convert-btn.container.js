import { connect } from 'react-redux';
import Widget from './convert-btn';
import { selectors } from '../state';

export default connect(mapStateToProps, mapDispatchToProps)(Widget);

function mapStateToProps(state) {
  return {
    canConvert: selectors.canConvert(state),
    inProgress: false // TODO
  };
}

function mapDispatchToProps() {
  return {
    onClick() {
      // TODO
      console.log('on convert btn'); // eslint-disable-line no-console
    }
  };
}
