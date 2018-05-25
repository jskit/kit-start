// import device from './device'
const noop = () => {};
const error = (url) => {
  console.log(`load script error ${url}`)
};
const doc = document;
const domHead = doc.querySelector('head');
const domBody = doc.querySelector('body') || domHead;
// const s = doc.getElementsByTagName('script')[0];

export function loadJs(scriptUrl, obj = {}) {
  const script = document.createElement('script');
  if (typeof obj === 'boolean') {
    // 默认是同步加载，同步模式又称阻塞模式
    // 同步加载流程是瀑布模型，异步加载流程是并发模型。
    obj = {
      async: true, // 异步加载
      defer: true, // 延迟加载
    }
  }
  script.async = obj.async;
  script.defer = obj.defer;
  script.src = scriptUrl;

  script.onload = () => {
    (obj.onload || noop)()
  }
  script.onerror = () => {
    (obj.onerror || error)(scriptUrl)
  }
  // script.crossOrigin = 'anonymous';
  // s.parentNode.insertBefore(s1, s);
  if (obj.first) {
    domHead.appendChild(script);
  } else {
    domBody.appendChild(script);
  }
}

export function loadCss(cssUrl) {
  const style = document.createElement('style');
  style.rel = 'stylesheet';
  style.src = cssUrl;
  domHead.appendChild(style);
}
