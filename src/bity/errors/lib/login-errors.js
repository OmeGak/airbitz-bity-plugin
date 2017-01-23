import { createError, createUnknownError } from './utils';

export const ERROR_INVALID_CREDENTIALS = 'INVALID_CREDENTIALS';

export function parse({ status, data = {} }) {
  const { error = '', error_description: errorDescription = '' } = data; // eslint-disable-line camelcase

  const isInvalidCredentialsError = status === 401 &&
    error === 'invalid_grant' &&
    errorDescription.toLowerCase() === 'invalid credentials given.';

  switch (true) {
    case isInvalidCredentialsError:
      return createError(ERROR_INVALID_CREDENTIALS);
    default:
      return createUnknownError();
  }
}
