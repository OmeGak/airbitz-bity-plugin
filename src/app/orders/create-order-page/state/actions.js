import { prefix } from './constants';

export const MOUNTED = `${prefix}::MOUNTED`;
export function mounted() {
  return {
    type: MOUNTED
  };
}

export const UNMOUNTED = `${prefix}::UNMOUNTED`;
export function unmounted() {
  return {
    type: UNMOUNTED
  };
}

export const READY = `${prefix}::READY`;
export function ready() {
  return {
    type: READY
  };
}
