// import { isServer } from './';

const isServer = false;
/* eslint import/no-mutable-exports: 0 */
export let supportsPassive = false;

if (!isServer) {
  try {
    const opts = {};
    Object.defineProperty(opts, 'passive', {
      /* eslint getter-return: 0 */
      get() {
        /* istanbul ignore next */
        supportsPassive = true;
      },
    });
    window.addEventListener('test-passive', null, opts);
  } catch (e) {
    // do nothing
  }
}

export function on(target, event, handler, passive = false) {
  !isServer &&
    target.addEventListener(
      event,
      handler,
      supportsPassive ? { capture: false, passive } : false
    );
}

export function off(target, event, handler) {
  !isServer && target.removeEventListener(event, handler);
}
