
import cookie from '@/store/cookie'
import env from '@/config/env'
import device from '@/utils/device'
import baidu from './baidu'
import piwik from './piwik'
import cnzz from './cnzz'

const tongji = {
  init() {
    document.body.addEventListener('click', (e) => {

    }, true);
  },
  pv(page) {
    if (!page) return
    page = page === '/' ? 'index' : page
    // 如想微信授权时，避免统计重复，可以 onShow时即跳转离开，这样就不会产生重复统计
    if (!env.isEnv('prod')) {
      console.log('[log pv]:', page)
      return
    }
    baidu.pv(page)
    piwik.pv(page)
    cnzz.pv(page)
    const logged = cookie.getToken() ? 'logged_yes' : 'logged_no'

    baidu.cv(1, 'page', page, 3);
    baidu.cv(2, 'logged', logged, 2);
    baidu.cv(3, 'host', device.host.name, 3);
    baidu.cv(4, 'platform', device.system, 3);
  },
  cv(...args) {
    if (!env.isEnv('prod')) {
      console.log('[log cv]:', ...args)
      return
    }
    baidu.cv(...args)
    piwik.cv(...args)
    cnzz.cv(...args)
  },
  event(...args) {
    if (!env.isEnv('prod')) {
      console.log('[log event]:', ...args)
      return
    }
    baidu.cv(...args)
    piwik.cv(...args)
    cnzz.cv(...args)
  },
  custom(opts = {}) {
    if (!env.isEnv('prod')) {
      console.log('[log custom:]', opts)
      return
    }
    piwik.custom(opts)
    // piwik.custom({
    //   channel: '',
    //   spm: '',
    //   userId: '',
    //   // cpsName,
    //   // openid,
    //   // otherInfo,
    //   ref: '',
    // })
  },

  // js 错误信息: error, sUrl, sLine, sChar
  jsError(...args) {
    //
  },
}

export default tongji
