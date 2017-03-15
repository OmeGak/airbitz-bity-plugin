import { connect } from 'react-redux';
import Widget from '../swap-btn';
import * as actions from '../../form.state/exchange-parties/actions';

export default connect(mapStateToProps, mapDispatchToProps)(Widget);

function mapStateToProps() {
  return {};
}

function mapDispatchToProps(dispatch) {
  return {
    onClick() {
      dispatch(actions.swap());
    }
  };
}
