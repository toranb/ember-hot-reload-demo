import { helper } from '@ember/component/helper';

function invokeFunction(acc, curr) {
  return curr(acc);
}

function pipe(actions = []) {
  return function(...args) {
    return actions.reduce((acc, curr, idx) => {
      if (idx === 0) {
        return curr(...args);
      }

      return invokeFunction(acc, curr);
    }, undefined);
  };
}

export default helper(pipe);
