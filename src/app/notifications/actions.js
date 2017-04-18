import { prefix } from './constants';

export const UNHANDLED_ERROR = `${prefix}::UNHANDLED_ERROR`;
export function unhandledError(err) {
  return {
    type: UNHANDLED_ERROR,
    payload: err
  };
}

export const NOTIFY = `${prefix}::NOTIFY`;
export function notify({ title = '', msg = '' }) {
  return {
    type: NOTIFY,
    payload: { title, msg }
  };
}
