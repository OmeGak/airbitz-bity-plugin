import { errors } from '../../bity/errors';

export default function convertBityErrorToNotificationCfg({ code }) {
  switch (code) {
    case errors.ERROR_NETWORK:
      return {
        title: 'Network error',
        message: 'Can\'t connect to server',
        autoDismiss: 0
      };
    case errors.ERROR_INVALID_CREDENTIALS:
      return {
        title: 'Login failed',
        message: 'Invalid credentials'
      };
    default:
      return {};
  }
}
