export function isNotEmptyString(v) {
  return typeof v === 'string' && v.length > 0;
}

export function isValidEmail(v) {
  return isNotEmptyString(v) && /@/.test(v);
}
