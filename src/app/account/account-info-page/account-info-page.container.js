import { connect } from 'react-redux';
import { isReady, onMounted, onUnmounted } from './state';
import Page from './account-info-page';

export default connect(mapStateToProps, mapDispatchToProps)(Page);

function mapStateToProps(state) {
  return {
    isReady: isReady(state)
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onMounted() {
      dispatch(onMounted());
    },
    onUnmounted() {
      dispatch(onUnmounted());
    }
  };
}
