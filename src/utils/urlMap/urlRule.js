/**
 * url映射规则rule
 * @param {any} rules [h5ToHsq, h5ToIqg, mini, other]
 */

const h5MsfToSchemaMsf = {
  index: {
    target: 'index',
    isTab: true,
    params: {},
  },
  shop: {
    target: 'shop',
    isTab: true,
    params: {},
  },
  message: {
    target: 'message',
    isTab: true,
    params: {},
  },
  profile: {
    target: 'profile',
    isTab: true,
    params: {},
  },
  webview: {
    target: 'webview',
    isTab: false,
    params: {},
  },
  search: {
    target: 'search',
    isTab: false,
    params: {},
  },
  city: {
    target: 'city',
    isTab: false,
    params: {},
  },
  publish: {
    target: 'publish',
    isTab: false,
    params: {},
  },
  login: {
    target: 'login',
    isTab: false,
    params: {},
  },
  setting: {
    target: 'setting',
    isTab: false,
    params: {},
  },
};

// 逆向转换映射规则
function reverseRules(rule) {
  const targetRules = {};
  const { hasOwnProperty } = Object.prototype;
  for (const key in rule) {
    if (hasOwnProperty.call(rule, key)) {
      const item = rule[key];
      targetRules[item.target] = {
        target: key,
        params: {},
      };
      for (const key2 in item.params) {
        if (hasOwnProperty.call(item.params, key2)) {
          const param = item.params[key2];
          targetRules[item.target].params[param] = key2;
        }
      }
    }
  }
  return targetRules;
}

const schemaMsfToH5Msf = reverseRules(h5MsfToSchemaMsf);

const urlRules = {
  h5MsfToSchemaMsf,
  schemaMsfToH5Msf,
};

export default urlRules;
