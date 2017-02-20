import { connect } from 'react-redux';
import Page from './quota-exceeded-page';
import { actions, selectors } from '../state';
import {
  selectors as quotaStoreSelectors,
  utils as quotaStoreUtils
} from '../../../common-data/quota';

export default connect(mapStateToProps, mapDispatchToProps)(Page);

function mapStateToProps(state) {
  const hasQuotaData = quotaStoreSelectors.hasData(state);
  const quotaData = quotaStoreSelectors.getData(state);

  let isYearlyQuotaExceeded = false;
  let isMonthlyQuotaExceeded = false;
  let isWeeklyQuotaExceeded = false;
  let isDailyQuotaExceeded = false;

  if (hasQuotaData) {
    isYearlyQuotaExceeded = quotaStoreUtils.isYearlyQuotaExceeded(quotaData);
    isMonthlyQuotaExceeded = quotaStoreUtils.isMonthlyQuotaExceeded(quotaData);
    isWeeklyQuotaExceeded = quotaStoreUtils.isWeeklyQuotaExceeded(quotaData);
    isDailyQuotaExceeded = quotaStoreUtils.isDailyQuotaExceeded(quotaData);
  }

  return {
    isPreparationStarted: selectors.isPreparationStarted(state),
    isPreparationFailed: selectors.isPreparationFailed(state),
    isPreparationCompleted: selectors.isPreparationCompleted(state),
    isYearlyQuotaExceeded,
    isMonthlyQuotaExceeded,
    isWeeklyQuotaExceeded,
    isDailyQuotaExceeded
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onMounted(router) {
      dispatch(actions.mounted({ router }));
    },
    onUnmounted() {
      dispatch(actions.unmounted());
    }
  };
}
