export function isAnyQuotaExceeded(quotaData) {
  return isYearlyQuotaExceeded(quotaData) ||
    isMonthlyQuotaExceeded(quotaData) ||
    isWeeklyQuotaExceeded(quotaData) ||
    isDailyQuotaExceeded(quotaData);
}

export function isYearlyQuotaExceeded(quotaData) {
  const { isUnlimited } = quotaData;

  if (isUnlimited === true) {
    return false;
  }
  return calcRemainingYearlyQuota(quotaData) <= 0;
}

export function calcRemainingYearlyQuota({ yearlyQuotaLimit, yearlyQuotaUsed }) {
  return yearlyQuotaLimit - yearlyQuotaUsed;
}

export function isMonthlyQuotaExceeded(quotaData) {
  const { isUnlimited } = quotaData;

  if (isUnlimited === true) {
    return false;
  }
  return calcRemainingMonthlyQuota(quotaData) <= 0;
}

export function calcRemainingMonthlyQuota({ monthlyQuotaLimit, monthlyQuotaUsed }) {
  return monthlyQuotaLimit - monthlyQuotaUsed;
}

export function isWeeklyQuotaExceeded(quotaData) {
  const { isUnlimited } = quotaData;

  if (isUnlimited === true) {
    return false;
  }
  return calcRemainingWeeklyQuota(quotaData) <= 0;
}

export function calcRemainingWeeklyQuota({ weeklyQuotaLimit, weeklyQuotaUsed }) {
  return weeklyQuotaLimit - weeklyQuotaUsed;
}

export function isDailyQuotaExceeded(quotaData) {
  const { isUnlimited } = quotaData;

  if (isUnlimited === true) {
    return false;
  }
  return calcRemainingDailyQuota(quotaData) <= 0;
}

export function calcRemainingDailyQuota({ dailyQuotaLimit, dailyQuotaUsed }) {
  return dailyQuotaLimit - dailyQuotaUsed;
}
