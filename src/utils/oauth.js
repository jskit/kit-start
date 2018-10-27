// 授权逻辑

import { wxappId, aliappId } from '@/config';

const { location } = window;
const getRedirectUri = () => {
  return encodeURIComponent(
    // `xxx/redirect?redirect=${window.location.origin}/authredirect`
    `${location.origin}${location.pathname}/authredirect`
  );
};

export default {
  getOauthUrl(type, scopes) {
    let url = '';
    switch (type) {
      case 'wechat': {
        this.$store.commit('SET_AUTH_TYPE', type);
        const { scope = 'snsapi_base' } = this;
        const appId = wxappId;
        url = `https://open.weixin.qq.com/connect/oauth2/authorize
          ?appid=${appId}
          &redirect_uri=${getRedirectUri()}
          &response_type=code
          &scope=${scope}
          &state=${Date.now()}
          #wechat_redirect`;
        break;
      }
      case 'alipay': {
        this.$store.commit('SET_AUTH_TYPE', type);
        const appId = aliappId;
        url = `https://openauth.alipay.com/oauth2/publicAppAuthorize.htm
          ?app_id=${appId}
          &redirect_uri=${getRedirectUri()}
          &scope=${this.scope}
          &state=${Date.now()}
          #wechat_redirect`;
        break;
      }
      case 'qq': {
        this.$store.commit('SET_AUTH_TYPE', type);
        const clientId = 'xxxxx';
        url = `https://graph.qq.com/oauth2.0/authorize
          ?response_type=code
          &client_id=${clientId}
          &redirect_uri=${getRedirectUri()}`;
        break;
      }
      default:
      // do nothing...
    }
    return url;
  },
};
