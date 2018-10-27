// pwiki统计 https://developer.piwik.org/guides/tracking-javascript-guide
// https://tower.im/projects/9dc0e68edc64436aa73e8f0fa0a8ffad/docs/738f14ee9afa45df8d01846e3f3e0010/

/* eslint no-underscore-dangle: 0 */
const _paq = window._paq || [];

const piwik = {
  init(opts = {}) {
    console.log('初始化', opts);
  },
  // 示例：trackPageView('/virtual/login']);
  pv(page) {
    _paq.push(['setCustomUrl', page]);
    _paq.push(['trackPageView', page]);
  },

  // 示例：setCustomVariable(index, name, value, scope = "visit")
  cv(index, name, value, opt_scope) {
    _paq.push(['setCustomVariable', index, name, value, opt_scope]);
  },

  /* eslint camelcase: 0 */
  // 示例：trackEvent(category, action, opt_label, opt_value)
  event(category, action, opt_label, opt_value) {
    _paq.push(['trackEvent', category, action, opt_label, opt_value]);
  },

  // search(key, type, num) {
  //   _paq.push(['trackSiteSearch'], key, type, num);
  // },

  // 自定义统计
  custom(opts = {}) {
    // 向piwik同步数据
    const {
      pageUrl = '',
      channel = '',
      spm = channel,
      userId,
      // cpsName,
      // openid,
      // otherInfo,
      ref,
    } = opts;
    // 用户ID
    userId && _paq.push(['setUserId', userId]);
    // 渠道号
    channel && _paq.push(['setCustomVariable', 1, 'channel', channel, 'page']);
    // 营销id
    // cpsName && _paq.push(['setCustomVariable', 2, 'cpsName', cpsName, 'page']);
    // 统计字段，之后用来成单所以统计相关，成熟后会把channel、cpsName等逐步替换掉
    spm && _paq.push(['setCustomVariable', 3, 'spm', spm, 'page']);
    // 为访问添加spm
    spm && _paq.push(['setCustomVariable', 1, 'spm', spm, 'visit']);
    // 微信openid
    // openid && _paq.push(['setCustomVariable', 2, 'openid', openid, 'visit']);
    // 其他数据
    // _paq.push(['setCustomVariable', 3, 'otherInfo', JSON.stringify(otherInfo), 'visit']);

    // 当前url的上个url，因为默认的referrer只能取hash以外的值
    ref && _paq.push(['setReferrerUrl', decodeURIComponent(ref || '')]);

    pageUrl &&
      _paq.push([
        'trackPageView',
        pageUrl,
        {
          dimension1: channel,
        },
      ]);
  },
};

export default piwik;
