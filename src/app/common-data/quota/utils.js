export const UNLIMITED_QUOTA = Number.POSITIVE_INFINITY;

export function hasUnlimitedQuota({ isUnlimited }) {
  return isUnlimited === true;
}

export function isAnyQuotaExceeded(quotaData) {
  return isYearlyQuotaExceeded(quotaData) ||
    isMonthlyQuotaExceeded(quotaData) ||
    isWeeklyQuotaExceeded(quotaData) ||
    isDailyQuotaExceeded(quotaData);
}

export function isYearlyQuotaExceeded(quotaData) {
  if (hasUnlimitedQuota(quotaData)) {
    return false;
  }
  return calcRemainingYearlyQuota(quotaData) <= 0;
}

export function calcRemainingYearlyQuota(quotaData) {
  if (hasUnlimitedQuota(quotaData)) {
    return UNLIMITED_QUOTA;
  }

  const { yearlyQuotaLimit, yearlyQuotaUsed } = quotaData;
  return yearlyQuotaLimit - yearlyQuotaUsed;
}

export function isMonthlyQuotaExceeded(quotaData) {
  if (hasUnlimitedQuota(quotaData)) {
    return false;
  }
  return calcRemainingMonthlyQuota(quotaData) <= 0;
}

export function calcRemainingMonthlyQuota({ monthlyQuotaLimit, monthlyQuotaUsed }) {
  return monthlyQuotaLimit - monthlyQuotaUsed;
}

export function isWeeklyQuotaExceeded(quotaData) {
  if (hasUnlimitedQuota(quotaData)) {
    return false;
  }
  return calcRemainingWeeklyQuota(quotaData) <= 0;
}

export function calcRemainingWeeklyQuota({ weeklyQuotaLimit, weeklyQuotaUsed }) {
  return weeklyQuotaLimit - weeklyQuotaUsed;
}

export function isDailyQuotaExceeded(quotaData) {
  if (hasUnlimitedQuota(quotaData)) {
    return false;
  }
  return calcRemainingDailyQuota(quotaData) <= 0;
}

export function calcRemainingDailyQuota({ dailyQuotaLimit, dailyQuotaUsed }) {
  return dailyQuotaLimit - dailyQuotaUsed;
}

export const UNLIMITED_MAX_VALUE = Number.POSITIVE_INFINITY;

export function calcMaxAllowedDailyQuota(quotaData) {
  if (hasUnlimitedQuota(quotaData)) {
    return UNLIMITED_MAX_VALUE;
  }

  const value = Math.min(
    calcRemainingDailyQuota(quotaData),
    calcRemainingWeeklyQuota(quotaData),
    calcRemainingMonthlyQuota(quotaData),
    calcRemainingYearlyQuota(quotaData)
  );

  if (value < 0) {
    return 0;
  }
  return value;
}
