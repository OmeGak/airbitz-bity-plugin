import { connect } from 'react-redux';
import Header from './invertible-header';
import * as sidebarMenuActions from '../menu/state/actions';

export default connect(mapStateToProps, mapDispatchToProps)(Header);

function mapStateToProps() {
  return {};
}

function mapDispatchToProps(dispatch) {
  return {
    onMenuBtnClick() {
      dispatch(sidebarMenuActions.show());
    }
  };
}
