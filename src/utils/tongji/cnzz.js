// CNZZ

/* eslint no-underscore-dangle: 0 */
const _czc = window._czc || [];

const baidu = {
  // 示例：trackPageView('/virtual/login']);
  pv(page, referer) {
    _czc.push(['_trackPageView', page, referer]);
  },

  // 示例：trackCustomVar(index, name, value, opt_scope)
  cv(index, name, value, opt_scope) {
    _czc.push(['_setCustomVar', index, name, value, opt_scope]);
  },

  /* eslint camelcase: 0 */
  // 示例：trackEvent(category, action, opt_label, opt_value)
  event(category, action, opt_label, opt_value) {
    _czc.push(['_trackEvent', category, action, opt_label, opt_value]);
  },

  // 自定义统计
  custom() {},
};

export default baidu;
