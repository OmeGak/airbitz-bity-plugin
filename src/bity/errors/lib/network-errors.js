import { createError, createUnknownError } from './utils';

export const ERROR_NETWORK = 'NETWORK';

export function parse({ status }) {
  const isNetworkError = status === -1; // TODO avoid hardcoded value

  switch (true) {
    case isNetworkError:
      return createError(ERROR_NETWORK);
    default:
      return createUnknownError();
  }
}
