import { prefix } from '../constants';

export const RATES_CHANGED = `${prefix}::RATES_CHANGED`;
export function ratesChanged(data) {
  return {
    type: RATES_CHANGED,
    payload: data
  };
}
