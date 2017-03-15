import { prefix } from './constants';

export const CREATE = `${prefix}::CREATE`;
export function createOrder(data) {
  return {
    type: CREATE,
    payload: data
  };
}
