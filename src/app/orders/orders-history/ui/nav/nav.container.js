import { connect } from 'react-redux';
import Nav from './nav';
import * as selectors from '../../data/selectors';
import * as actions from '../../data/actions';

export default connect(mapStateToProps, mapDispatchToProps)(Nav);

function mapStateToProps(state) {
  return {
    showPrevBtn: selectors.hasPrevPage(state),
    showNextBtn: selectors.hasNextPage(state)
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onPrev() {
      dispatch(actions.fetchPrevPage());
    },
    onNext() {
      dispatch(actions.fetchNextPage());
    }
  };
}
