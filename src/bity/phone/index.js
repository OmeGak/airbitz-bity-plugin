import { fetchFactory } from './phone';

export default function phoneFactory(ajax) {
  return {
    fetch: fetchFactory(ajax)
  };
}
