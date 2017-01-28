import { connect } from 'react-redux';
import { getData } from '../account-info/state';
import AccountInfoView from './account-info-view';

export default connect(mapStateToProps)(AccountInfoView);

function mapStateToProps(state) {
  return {
    data: getData(state)
  };
}
