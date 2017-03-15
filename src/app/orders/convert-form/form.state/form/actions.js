import { prefix } from '../constants';

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

export const SETUP_INITIAL_STATE_DATA = `${prefix}::SETUP_INITIAL_STATE_DATA`;
export function setupInitialStateData(data) {
  return {
    type: SETUP_INITIAL_STATE_DATA,
    payload: data
  };
}

export const SUBMIT = `${prefix}::SUBMIT`;
export function submit() {
  return {
    type: SUBMIT
  };
}

export const SUBMIT_STARTED = `${prefix}::SUBMIT_STARTED`;
export function submitStarted() {
  return {
    type: SUBMIT_STARTED
  };
}

export const SUBMIT_FINISHED = `${prefix}::SUBMIT_FINISHED`;
export function submitFinished() {
  return {
    type: SUBMIT_FINISHED
  };
}
