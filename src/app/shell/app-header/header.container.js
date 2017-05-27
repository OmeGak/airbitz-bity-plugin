import { connect } from 'react-redux';
import Header from './invertible-header';

export default connect(mapStateToProps, mapDispatchToProps)(Header);

function mapStateToProps() {
  return {};
}

function mapDispatchToProps() {
  return {};
}
