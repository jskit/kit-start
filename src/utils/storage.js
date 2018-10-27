// import LRU from 'lru-cache'
// import { copy } from 'kit-qs'

/**
 * usage
 *
 * import { storage, session } from '@/utils/storage';
 *
 * storage.set('user', user, 86400*10);
 * storage.get('user');
 * storage.remove('user');
 */

// const options = {
//   max: 500,
//   maxAge: 1000 * 60 * 60,
//   length(n, key) {
//     return n * 2 + key.length
//   },
//   dispose(key, n) {
//     n.close()
//   },
// }

// const cache = LRU(options)
// const otherCache = LRU(50)

export const { localStorage, sessionStorage } = window;
let i = 1;
let storageData = {};
const store = {
  local: localStorage,
  session: sessionStorage,
};

// for (const key in localStorage) {
//   // 获取所有key
//   if ({}.hasOwnProperty.call(localStorage, key)) {
//     console.log(key)
//   }
// }

// 数据缓存，还可以结合LRU
//

// {
//   timeout: "2018/04/10 18:08:06",
//   savedate: "2018/04/10 17:38:06",
//   value: {},
// }

/**
 * 缓存机制
 *
 * 支持自定义缓存时间、是否按整天计算
 *
 * @export
 * @class Storage
 */
export class Storage {
  constructor(prekey = 'store', type = 'local') {
    const storeKey = `${prekey}-${i++}`;
    if (type !== 'local') {
      type = 'session';
    }
    this.storeKey = storeKey;
    this.storeType = type;
    const data = store[type].getItem(storeKey) || null;
    storageData[storeKey] = JSON.parse(data) || {};
  }
  set(key, value, time = 600, cycle) {
    // time 单位秒，默认600为10分钟，传0 代表永久性缓存
    // cycle 单位秒，指定隔天N点时间过后即过期，如每日凌晨2点过去，设定 cycle=7200
    if (!key) return;
    if (!Number.isInteger(Number(time))) {
      console.error(`'time' must be Integer Number`);
      return;
    }
    if (typeof cycle !== 'undefined' && !Number.isInteger(Number(cycle))) {
      console.error(`'cycle' must be Integer Number`);
      return;
    }
    try {
      const data = {
        value,
      };
      if (typeof cycle !== 'undefined') {
        data.cycle = cycle;
      }
      if (!Number.isInteger(Number(time))) {
        console.error(`'time' must be Integer Number`);
        return;
      }
      if (time) {
        data.timeout = Date.now() - 1 + time * 1000;
      }
      const { storeKey, storeType } = this;
      const curData = storageData[storeKey];
      Object.assign(curData, {
        [`${key}`]: data,
      });
      store[storeType].setItem(`${storeKey}`, JSON.stringify(curData));
    } catch (e) {
      // localStorage写满时,全清掉
      if (e.name === 'QuotaExceededError') {
        // 删除离过期时间最近的缓存
        // 暂时全部删除
        this.clear(true);
      }
    }
  }
  get(key) {
    if (!key) return;
    const { storeKey } = this;
    const temp = storageData[storeKey][key];
    if (!temp) return;
    // 缓存不存在
    if (!temp.value) return null;
    const now = Date.now();
    if (temp.timeout && temp.timeout < now) {
      // 缓存过期
      this.remove(key);
      return '';
    }
    if (temp.timeout && Number.isInteger(Number(temp.cycle))) {
      const cycleEndTimes =
        new Date(temp.timeout).setHours(0, 0, 0, 0) + temp.cycle * 1000;
      if (temp.timeout < cycleEndTimes) {
        // 缓存周期点过期
        this.remove(key);
        return '';
      }
    }
    return temp.value;
  }
  remove(key) {
    if (!key) return;
    const { storeKey, storeType } = this;
    const curData = storageData[storeKey];
    delete storageData[storeKey][key];
    store[storeType].setItem(`${storeKey}`, JSON.stringify(curData));
  }
  clear(bool) {
    const { storeKey, storeType } = this;
    if (bool !== true) {
      storageData[storeKey] = {};
      store[storeType].removeItem(`${storeKey}`);
    } else {
      storageData = {};
      store[storeType].clear();
    }
  }
}

export const storage = new Storage();
export const session = new Storage('session', 'session');
