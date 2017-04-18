import { errors } from '../../lib/bity/errors';

export default function convertBityErrorToNotificationCfg({ code }) {
  switch (code) {
    case errors.ERROR_NETWORK:
      return 'Network error. Can\'t connect to server';
    case errors.ERROR_INVALID_CREDENTIALS:
      return 'Login failed. Invalid credentials';
    default:
      return '';
  }
}
