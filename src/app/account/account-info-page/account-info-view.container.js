import { connect } from 'react-redux';
import { selectors } from '../../common-data/account-info';
import AccountInfoView from './account-info-view';

export default connect(mapStateToProps)(AccountInfoView);

function mapStateToProps(state) {
  return {
    data: selectors.getData(state)
  };
}
