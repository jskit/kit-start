
// 倒计时组件

class CountDown {
  constructor(opts = {}) {
    // super();

    // this.node = opts.node;
    this.data = opts.data;
    this.index = opts.index;
    this.times = opts.times || 0;
    this.callback = opts.callback;
    opts.set.call(this);
  }

  start() {
    const that = this;
    if (this.timeintId) return;

    this.timeintId = setInterval(() => {
      that.callback.call(that);
    }, this.times || 1000);

    if (this.mill && (typeof this.mill.callback === 'function')) {
      this.timeintIdMil = setInterval(() => {
        that.mill.callback.call(that);
      }, this.mill.times || 1000);
    }
    this.callback();
  }

  stop() {
    clearInterval(this.timeintId);
    if (this.mill && this.timeintIdMil) {
      clearInterval(this.timeintIdMil);
    }
  }

  clear(cb) {
    this.stop();

    cb && cb.call(this);
  }
}

export default CountDown;
