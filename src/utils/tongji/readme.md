# 统计代码

排除干扰，只有真正的生产环境，才去统计（测试环境的log日志输出即可）

- 百度统计   http://tongji.baidu.com/open/api/more?p=ref_setCustomVar
- pwiki统计 https://developer.piwik.org/guides/tracking-javascript-guide

注意：以下格式链接会被过滤，不统计

- 带 hash 值的
- 包含 window.location.origin 的
- 完整链接也不行 window.location.href

## 统计信息

```js
// log
p     打点事件发生的页面
e     打点事件发生的元素
d     打点事件附属的数据
b     统计公共数据

// 用户信息
openid: '',    // 微信标识
unid: '',      // 微信用户唯一标识
userId: '',    // 用户ID
sessionId: '', // 用户会话标识
longitude: '', // 经度
latitude: '',  // 纬度
zoneId: '',    // 当前选择城市id
timestamp: '', // 当前时间
avatar: '',    // 用户头像
birthday: '',  // 生日
created_at: '',// 账户创建日期
mobile: '',    // 电话号码
sex: '',       // 性别
username: '',  // 用户名

// 设备信息
platform: '',  // ios/android/h5
device: '',    // iPhone/iPad/huawei/xiaomi....
network: '',   // 2G/3G/4G/5G/wifi/none
width: '',     // 设备宽
height: '',    // 设备高度
sdpi: '',      // 屏幕分辨率
os: '',        // 系统版本号
udid: '',      // 设备标识
userAgent: '', // 浏览器标识
url: '',       // 页面地址

// app信息
appVersion: '',// app版本号
cpsName: '',   // 用户名
channel: '',   // 渠道
appName: ''    // 好食期/爱抢购/精选....
```

## _trackPageview 统计 pv

标准格式如下：

```js
// _hmt && _hmt.push(['_trackPageview', page]);
_hmt.push(['_trackPageview', '/virtual/login']);
```

## _trackCustomVar 统计自定义变量

统计自定义变量（限5个）,setCustomVar 的数据报表是基于session的统计

可以统计的自定义数据类型如：页面(page) 是否登录(logged) web页面宿主(host) 设备平台(platform)

```js
// 统计pv时，也统计自定义变量即可
// _hmt && _hmt.push(['_setCustomVar', index, name, value, opt_scope]);
const logged = cookie.getToken() ? 'logged_yes' : 'logged_no'

// 统计页面
tongji.trackCustomVar(1, 'page', page, 3);
// 统计是否登录(使用访次级别 2)
tongji.trackCustomVar(2, 'logged', logged, 2);
// 统计web页面宿主
tongji.trackCustomVar(3, 'host', device.host || 'PC', 3);
// 统计访问平台
tongji.trackCustomVar(4, 'platform', device.platform || 'PC', 3);
```

参数 trackCustomVar(index, name, value, opt_scope)

- index 索引的范围是从1到5
- name  每个索引对应的名字在使用一次后就会固定，以后无法更改
- value 自定义变量的值
- opt_scope [可选]自定义变量的作用范围（默认为3）
  - 1为访客级别（对该访客始终有效）
  - 2为访次级别（在当前访次内生效）
  - 3为页面级别（仅在当前页面生效）

opt_scope参数使用建议

- 在需要对不同类别的访客今后的一系列行为做区分筛选的时候建议使用访客级别，比如“否是VIP会员”等标签；
- 在需要对本访次的用户行为或状态做区分筛选的时候建议使用访次级别，比如“是否登陆”等标签；
- 在需要对本访次的访问内容或访问路径做区分筛选的建议使用页面级别，比如看了“体育频道”还是“财经频道”等标签

## _traceEvent 统计自定义事件

统计如点击，下单，支付，分享，定位，下载等

- 百度统计针对_trackevent API 目前有多样性的限制，即在部署_trackevent API时，事件类型、操作、标签三项的多样性乘积不能超过10000，否则系统会自动抛弃超标的数据。
- 事件分析报告中将展示事件点击总数在前3000名的事件

参数

- category 必选 String 要监控的目标的类型名称 不填、填"-"的事件会被抛弃
- action   必选 String 用户跟网页进行交互的动作名称 不填、填"-"的事件会被抛弃
- opt_label 可选 String 事件的一些额外信息 不填、填"-"代表此项为空
- opt_value 可选 Number 跟事件相关的数值

```js
// _hmt && _hmt.push(['_trackEvent', category, action, opt_label, opt_value]);
tongji.trackEvent('music', 'play', 'Hey Jude')
tongji.trackEvent('bargain', 'click_btn', '')
tongji.trackEvent('bargain', 'click_help', '')
```
