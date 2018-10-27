/**
 * event Sub
 */

function SubscribeEvent() {
  //...
  let eventNotice = {};

  return {
    // 订阅事件
    onSubscribeEvent(that = '', key, fun) {
      console.log('订阅通知:', key);
      if (!fun && typeof fun != 'function') {
        console.warn('缺少订阅参数！');
        return;
      }
      let array = eventNotice[key] && eventNotice[key].slice(0);
      if (!array) {
        array = [];
      }
      let index = -1;
      let currPageName = '';

      if (typeof that === 'string') {
        currPageName = that === '' ? 'app' : that;
      } else {
        currPageName = that.$route.name;
      }
      // 检查是否存在重复订阅
      for (let i = 0; i < array.length; i++) {
        if (array[i]['pagename'] === currPageName) {
          index = i;
          break;
        }
      }
      // 删除重复订阅
      if (index !== -1) {
        array.splice(index, 1);
      }
      array.push({ pagename: currPageName, fun: fun });
      eventNotice[key] = array;
      console.log('订阅事件列表：', eventNotice);
    },
    // 发送订阅通知
    onPublishEvent(key, ...args) {
      console.log('发送订阅通知: ', key);
      const array = eventNotice[key] && eventNotice[key].slice(0);
      if (!array) {
        console.warn('未查到订阅项！');
        return;
      }
      for (let i = 0; i < array.length; i++) {
        if (array[i]['fun']) {
          array[i]['fun'].call(this, ...args);
        }
      }
    },
    // 取消订阅
    offSubscribeEvent(key, pageName) {
      if (!pageName) {
        delete eventNotice[key];
      } else {
        let array = eventNotice[key] && eventNotice[key].slice(0);
        if (array && array.length > 1) {
          let index = -1;
          for (let i = 0; i < array.length; i++) {
            if (array[i]['pagename'] === pageName) {
              index = i;
              break;
            }
          }
          // 删除重复订阅
          if (index !== -1) {
            array.splice(index, 1);
          }
          eventNotice[key] = array;
        } else {
          delete eventNotice[key];
        }
      }
    },
  };
}

export default SubscribeEvent();
