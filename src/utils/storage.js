// import LRU from 'lru-cache'
// import { copy } from 'kit-qs'

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

export const { localStorage } = window

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

export class Storage {
  set(key, value, time) {
    try {
      const temp = { value };
      if (time && Number.isNaN(time)) {
        temp.timeout = Date().now() - 1 + time * 1000; // 单位秒
      }
      localStorage.setItem(`d14-${key}`, JSON.stringify(temp));
    } catch (e) {
      // localstorage写满时,全清掉
      if (e.name === 'QuotaExceededError') {
        // 删除离过期时间最近的缓存
        // 暂时删除
      }
    }
  }
  get(key) {
    const temp = JSON.parse(localStorage.getItem(`d14-${key}`));
    // 缓存不存在
    if (!temp) return null;
    const now = Date.now();
    if (temp.timeout && temp.timeout < now) {
      // 缓存过期
      this.remove(key);
      return '';
    }
    return temp.value
  }
  remove(key) {
    localStorage.removeItem(`d14-${key}`)
  }
  clear(key) {
    localStorage.removeItem(`d14-${key}`)
  }
}

const storage = new Storage()

export default storage
