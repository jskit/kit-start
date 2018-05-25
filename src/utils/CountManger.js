
// 倒计时管理器
import CountDown from './CountDown';

const noop = () => {};

class CountManger {
  constructor(opts = {}) {
    this.counts = [];
    this.add(opts);
  }

  add(opts = {}) {
    const {
      // nodeList,
      dataList = [],
      times = 1000,
      set = noop,
      callback = noop,
    } = opts;

    const [...list] = dataList;

    list.forEach((item, i) => {
      if (!item.isSetCountDown) {
        const count = new CountDown({
          times,
          data: item,
          // node: nodeList[i],
          callback,
          set,
          index: i,
        });
        this.counts.push(count);
      }
    });

    return this;
  }

  clear(cb = noop) {
    this.counts.forEach(count => count.clear(cb));
    return this;
  }
}

export default CountManger;
