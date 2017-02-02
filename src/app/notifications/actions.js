export const UNHANDLED_ERROR = 'UNHANDLED_ERROR';
export function unhandledError(err) {
  return {
    type: UNHANDLED_ERROR,
    payload: err
  };
}
