import Vue from 'vue';

Vue.directive('press', {
  bind: function(el, binding, vNode) {
    // 定义变量
    let pressTimer = null;
    let moveY = 0;
    let hasMoved = false;
    // 定义函数处理程序
    // 创建计时器（ 1秒后执行函数 ）
    let start = e => {
      // console.log(e);
      if (e.type === 'click' && e.button !== 0) {
        return;
      }
      let startY = 0;
      if (e.type === 'touchstart' && e.button !== 0) {
        startY = Number(e.touches[0].pageY);
      }
      hasMoved = false;
      // e.preventDefault();
      if (pressTimer === null) {
        pressTimer = setTimeout(() => {
          // 执行函数，排除滑动长按
          if (!hasMoved || Math.abs(startY - moveY) < 10) {
            handler(el);
          }
        }, 650);
      }
    };
    let move = e => {
      // console.log(e);
      hasMoved = true;
      let touch = e.touches[0];
      moveY = Number(touch.pageY);
    };
    // 停止计时器
    let cancel = e => {
      // e.preventDefault();
      // 检查是否有正在运行的计时器
      if (pressTimer !== null) {
        clearTimeout(pressTimer);
        pressTimer = null;
      }
      if (e.type === 'click' && e.button !== 0) {
        return;
      }
    };
    // 运行函数
    const handler = e => {
      // 执行传递给指令的方法
      binding.value(e);
      return;
    };
    // 添加事件监听器
    el.addEventListener('mousedown', start);
    el.addEventListener('touchstart', start);
    el.addEventListener('touchmove', move);
    // 取消计时器
    el.addEventListener('click', cancel);
    el.addEventListener('mouseout', cancel);
    el.addEventListener('touchend', cancel);
    el.addEventListener('touchcancel', cancel);
  },
});
