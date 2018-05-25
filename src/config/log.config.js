

// 统计配置



/*

var cLogConfig = {
  // 配置需要带上页面参数的page，以及需要带的参数
  // 已改为所有页面均仅保留channel参数
  needCountPage: [
    {
      'zt_template': ['topic_code']
    },
    {
      'zt_template': ['topic_code'],
      'detail': ['sid'],
      'couple_detail': ['pinactivitiesid'],
      'lottery_detail': ['pinactivitiesid'],
      'couple_share': ['pineventid'],
      'ali_detail': ['pSkuId'],
      'ali_zt': ['topic_code'],
      'ali_huabei_detail': ['active_code'],
    }
  ],
  logList: {
    // 首页相关埋点
    'portal': {
      'spm': '10', // 入口页面会带上的spm流量跟踪标记
      'selectcity': '101', // 选择城市
      'fgdtg': '102', // 非固定推广位
      'gdtg': '103', // 固定推广位
      'banner': '104', // banner
      'biaoqian': '105', // 标签
      'addcart': '106', // 加入购物车
      'loadmore': '107', // 加载更多
      'goSearch': '108', // 搜索
      'goods': '109', // 点击商品
      'downtip': '1010', // 下载提示栏
      'downtipclose': '1011', // 关闭下载提示栏
      'followclick': '1012', // 关注二维码
      'followqrclose': '1013' // 关闭关注二维码
    },
    'other_downtip': { // 首页 - 立即下载
    },
    'other_downtip_close': { // 首页 - 立即下载
    },
    'other_follow_click': { // 其他页面 - 关注
    },

    // 详情页
    'detail': {
      'spm': '11', // 入口页面会带上的spm流量跟踪标记
      'banner': '111', // 轮播图
      'standard': '112', // 商品规格
      'coupon': '113', // 领券
      'address': '113', // 配送地址
      'promise': '114', // 服务保障
      'shop': '115', // 店铺
      'wechat': '116', // 微信推荐
      'comment': '117', // 评价信息
      'service': '118', // 客服
      'favorite': '119', // 收藏
      'goCart': '1110', // 进入购物车
      'addCart': '1111', // 加入购物车
      'gohome': '1112', // 返回首页
      'barhome': '1113', //底部返回首页
      'skuSwitch': '1114', // 添加商品弹窗 - 切换sku
      'skuAdd': '1115', // 添加商品弹窗 - 添加数量
      'skuReduce': '1116', // 添加商品弹窗 - 减少数量
      'skuInputNum': '1117', // 添加商品弹窗 - 输入数量
      'skuBuy': '1118', // 添加商品弹窗 - 立即购买
      'skuClose': '1119', // 添加商品弹窗 - 关闭弹窗
      'skuAddCart': '1120', // 添加商品弹窗 - 关闭弹窗
    },

    // 列表页
    'list': {
      'spm': '12', // 入口页面会带上的spm流量跟踪标记
      'addcart': '121', // 添加购物车
      'goods': '122', // 点击列表商品
      'goHome': '123', // 返回首页
      'loadmore': '124' // 加载更多
    },

    // 支付页
    'order_pay': {
      'spm': '13', // 入口页面会带上的spm流量跟踪标记
      'back': '131', // 返回
      'contact': '132', // 联系客服
      'continue': '133', // 继续支付
      'cancel': '134', // 放弃付款
      'pay': '135'
    },

    // 确认订单
    'order_commit': {
      'spm': '14', // 入口页面会带上的spm流量跟踪标记
      'back': '141', // 返回
      'submit': '142', // 提交
      'address': '143', // 选择地址
      'noticeRemove': '144', // 提醒栏 - 删除无法购买
      'noticeAddress': '145', // 提醒栏 - 更换地址
      'invoice': '146', // 开具发票
      'invoicePer': '147', // 个人发票
      'invoiceCom': '148', // 公司发票
      'goMerchant': '149', // 进入店铺
      'godetail': '1410', // 进入详情
      'merchantCoupon': '1411', // 店铺优惠券
      'platformCoupon': '1412', // 平台优惠券
      'submitorder_gonggao': '1413',//公告管理
    },

    // 订单列表
    'order_list': {
      'spm': '15', // 入口页面会带上的spm流量跟踪标记
      'gohome': '151', // 返回首页
      'goSearch': '152', // 去搜索
      'goMerchant': '153', // 去商铺页
      'goDetail': '154', // 去详情页
      'delivery': '155', // 查看物流
      'cancel': '156', // 取消订单
      'refund': '157', // 退款
      'refundDetail': '158', // 退款详情
      'pay': '159', // 去支付
      'comfirm': '1510', // 确定收货
      'orderDetail': '1511', // 订单详情
      'comment': '1512', // 评论
      'sue': '1513', // 申述
      'serviceRefund': '1514', // 售后申请退款
      'serviceRefundDetail': '1515', // 售后退款详情
      'serviceContact': '1516', // 售后联系客服
      'serviceOfficial': '1517', // 售后联系好食期客服
      'serviceMerchant': '1518', // 售后联系店铺
    },
    // 订单详情
    'order_detail': {
      'spm': '16', // 入口页面会带上的spm流量跟踪标记
      'gohome': '161', // 返回首页
      'contact': '162', // 联系客服
      'contactOfficial': '163', // 联系好食期客服
      'contactMerchant': '164', // 联系卖家
      'cancel': '165', // 取消订单
      'pay': '166', // 继续支付
      'delivery': '167', // 查看物流
      'confirm': '168', // 确定收货
      'comment': '169' // 评价
    },

    // tob详情页
    'tob_detail': {
      'spm': '17', // 入口页面会带上的spm流量跟踪标记
      'goHome': '171', // 返回首页
      'hasSelected': '172', // 已选
      'address': '173', // 选择地址
      'promise': '174', // 服务保障
      'merchant': '175', // 商户
      'skuClose': '176', // sku选择 - 关闭
      'skuSwitch': '177', // sku选择 - sku切换
      'skuReduce': '178', // sku选择 - 减少数量
      'skuAdd': '179', // sku选择 - 添加数量
      'skuAddCart': '1710', // sku选择 - 加入购物车
      'service': '1711', //  客服
      'favorite': '1712', // 收藏
      'goCart': '1713', //进入购物车
      'addCart': '1714' // 添加到购物车
    },

    // 搜索
    'search': {
      'spm': '18', // 入口页面会带上的spm流量跟踪标记
      'hotwords': '181', // 热词
      'goSearch': '182', // 进行搜索
      'history': '183', // 搜索历史
      'clearHistory': '184' // 清除搜索历史
    },

    // 分类
    'category': {
      'spm': '19', // 入口页面会带上的spm流量跟踪标记
      'goSearch': '191',
      'type': '192',
      'type2': '193'
    },

    // 店铺
    'merchant': {
      'spm': '20', // 入口页面会带上的spm流量跟踪标记
      'getCoupon': '201', // 领券
      'favorite': '202', // 收藏店铺
      'unFavorite': '203', // 取消收藏
      'goods': '204', // 点击商品
      'addCart': '205', // 添加购物车
      'goHome': '206', // 返回首页
      'loadMore': '207' // 加载更多
    },

    // 购物车
    'shopping_cart': {
      'spm': '21', // 入口页面会带上的spm流量跟踪标记
      'submit': '211', // 去结算
      'edit': '212', // 编辑
      'edit_checkgoods': '213', // 编辑 - 选中商品
      'edit_checkmerchant': '214', // 编辑 - 选中商户
      'delete': '215', // 删除
      'checkgoods': '216', // 选中商品
      'checkmerchant': '217', // 选中商户
      'godetail': '218', //  进入详情
      'gomerchant': '219', // 进入商户
      'changenum': '2110', // 修改商品价格
      'sku_add': '2111', // 添加sku
      'sku_reduce': '2112', // 减少sku
      'clearInvaild': '2113' // 清除失效商品
    },

    // 城市列表
    'citylist_geo_fail': { // 城市选择 - 定位 - 失败
      o: 'citylist',
      t: 'geo_fail'
    },
    'citylist_geo_success': { // 城市选择 - 定位 - 成功
      o: 'citylist',
      t: 'geo_success'
    },
    'citylist_city': { // 城市选择 - 列表点击
    },
    'citylist_show': { // 城市选择 - 展现
    },

    // 每日top10
    'todaytop10_goods': { // 每日top10 - 商品列表
    },
    'todaytop10_show': { // 每日top10 - 展现
    },

    // 每日top10
    'zttop10_top10': { // t10列表 - 专题
    },
    'zttop10_show': { // t10列表 - 展现
    },

    // 个人中心
    'profile': {
      'spm': '22', // 入口页面会带上的spm流量跟踪标记
      'info': '221', // 个人信息
      'allorder': '222', // 全部订单
      'needpay': '223', // 待支付订单
      'ondelivery': '224', // 待收货订单
      'needcomment': '225', // 待评价订单
      'service': '226', // 售后
      'coupons': '227', // 优惠券
      'pintuan': '228', // 拼团
      'lottery': '229', // 抽奖团
      'favorite': '2210', // 我的收藏
      'kefu': '2211', // 客服
    },

    // 我的收藏
    'favorite_list': {
      'spm': '23', // 入口页面会带上的spm流量跟踪标记
      'goods': '231', // 商品点击
      'goMerchant': '232', // 店铺点击
      'cancel_goods': '233', // 取消收藏商品
      'cancel_merchant': '234', // 取消收藏店铺
      'edit': '235', // 编辑
    },

    // 拼团列表
    'couple_list': {
      'spm': '24', // 入口页面会带上的spm流量跟踪标记
      'goSearch': '241',
      'cube': '242',
      'goods': '243',
      'loadmore': '244'
    },

    // 拼团搜索页
    'couple_search': {
      'spm': '25', // 入口页面会带上的spm流量跟踪标记
      'input': '251',
      'goSearch': '252',
      'history': '253',
      'clearHistory': '254'
    },

    // 拼团搜索结果页
    'couple_search_list': {
      'spm': '26', // 入口页面会带上的spm流量跟踪标记
      'gohome': '261', // 返回首页
      'goods': '262', // 商品点击
      'sort': '263', // 排序
      'reset': '264', // 重置筛选
      'fillter': '265' // 筛选
    },

    // 拼团详情
    'couple_detail': {
      'spm': '27', // 入口页面会带上的spm流量跟踪标记
      'singlebuy': '271', // 单人购
      'couplebuy': '272', // 多人购
      'banner': '273', // 轮播图
      'standard': '274', // 规格
      'address': '275', // 地址
      'promise': '276', // 服务保障
      'service': '277', // 客服
      'gohome': '278', // 返回首页
      'rules': '279', // 拼团规则
      'join': '2710', // 去参团
      'comment': '2711', // 评论
      'skuSwitch': '2712', // 添加商品弹窗 - 切换sku
      'skuAdd': '2713', // 添加商品弹窗 - 添加数量
      'skuReduce': '2714', // 添加商品弹窗 - 减少数量
      'skuInputNum': '2715', // 添加商品弹窗 - 输入数量
      'skuAddCart': '2716', // 添加商品弹窗 - 加入购物车
      'skuClose': '2717', // 添加商品弹窗 - 关闭弹窗
      'skuBuy': '2718', // 添加商品弹窗 - 立即购买
    },

    // 拼团分享
    'couple_share': {
      'spm': '28', // 入口页面会带上的spm流量跟踪标记
      'goHome': '281', // 返回首页
      'rules': '282', // 拼团规则
      'recommend': '283', // 推荐拼团
      'hotcouple': '284', // 热门拼团
      'more': '285', // 更多拼团
      'join': '286', // 参团
      'join2': '287', // 点击头像参团
      'moreUser': '288', // 更多用户
      'create': '289', // 发起拼团
      'intro': '2810', // 价格说明
      'basicInfo': '2811',
      'promise': '2812',
      'downtip': '2813',
      'downtipclose': '2814',
      'followclick': '2815', // 关注二维码
      'followqrclose': '2816' // 关闭关注二维码
    },

    // 抽奖团列表
    'lottery_list': {
      'spm': '29', // 入口页面会带上的spm流量跟踪标记
      'goods': '291'
    },

    // 抽奖团详情
    'lottery_detail': {
      'spm': '30', // 入口页面会带上的spm流量跟踪标记
      'singlebuy': '301', // 单人购
      'couplebuy': '302', // 多人购
      'banner': '303', // 轮播图
      'address': '304', // 地址
      'promise': '305', // 服务保障
      'service': '306', // 客服
      'home': '307', // 返回首页
      'rules': '308', // 拼团规则
      'join': '309', // 去参团
      'comment': '3010', // 评论
      'notice': '3011', // 提醒
      'noticeCancel': '3012', // 取消提醒
      'more': '3013', // 更多抽奖团
      'result': '3014', // 抽奖结果
      'skuSwitch': '3015', // 添加商品弹窗 - 切换sku
      'skuAdd': '3016', // 添加商品弹窗 - 添加数量
      'skuReduce': '3017', // 添加商品弹窗 - 减少数量
      'skuInputNum': '3018', // 添加商品弹窗 - 输入数量
      'skuClose': '3019', // 添加商品弹窗 - 关闭弹窗
      'skuBuy': '3020', // 添加商品弹窗 - 立即购买
    },

    // 抽奖团中奖详情
    'lottery_result': {
      'spm': '31', // 入口页面会带上的spm流量跟踪标记
      'more': '311', // 更多抽奖团
      'loadmore': '312' // 加载更多
    },

    // 抽奖团中奖页
    'lottery_winner': {
      'spm': '32', // 入口页面会带上的spm流量跟踪标记
      'more': '321', // 更多抽奖团
      'more2': '322', // 更多抽奖团2
      'moreUser': '323', // 更多用户
      'buy': '324', // 下方按钮
    },

    // 专题模板页
    'zt_template': {
      'spm': '33', // 入口页面会带上的spm流量跟踪标记
      'topicContent': '331', // 专题模板内容点击
      'order': '332', // 查看我的订单
      'goods': '333', // 点击普通商品
      'goCouple': '334', // 点击拼团商品
      'goTob': '335', // 点击tob商品
      'addCart': '336' // 加入购物车
    },

    // 支付宝首页
    'ali_portal': {
      'spm': '35', // 入口页面会带上的spm流量跟踪标记
      'banner': '351', // banner
      'service': '352', // 服务保障
      'goods': '353', // 点击商品
      'loadmore': '354', // 加载更多
    },
    'alitoolbar_home': { // 支付宝首页 - 底部bar首页
    },
    'alitoolbar_profile': { // 支付宝首页 - 底部bar个人中心
    },
    // 支付宝详情页
    'ali_detail': {
      'spm': '36', // 入口页面会带上的spm流量跟踪标记
      'goHome': '361', // 返回首页
      'banner': '362', // 轮播图
      'hasSelected': '363', // 已选商品
      'gopay': '364', // 去支付
      'share': '366', // 分享
      'promise': '366', // 服务保障
      'service': '367', // 在线客服
      'comment': '368', // 评价
      'recommend': '369', // 推荐
      'more': '3610', // 更多推荐
      'standard': '3611', // 商品规格
      'skuClose': '3612', // sku选择 - 关闭
      'skuSwitch': '3613', // 切换 sku
      'activity': '3614' // 切换 sku
    },
    // 支付宝确认订单
    'ali_order_commit': {
      'spm': '37', // 入口页面会带上的spm流量跟踪标记
      'back': '371', // 返回
      'submit': '372', // 提交
      'address': '373', // 选择地址
      'noticeRemove': '374', // 提醒栏 - 删除无法购买
      'noticeAddress': '375', // 提醒栏 - 更换地址
      'invoice': '376', // 开具发票
      'invoicePer': '377', // 个人发票
      'invoiceCom': '378', // 公司发票
      'goMerchant': '379', // 进入店铺
      'godetail': '3710', // 进入详情
      'ali_submitorder_gonggao': '3711', //支付宝公告管理统计
    },
    // 支付宝详个人中心
    'ali_profile': {
      'spm': '38', // 入口页面会带上的spm流量跟踪标记
      'info': '381', // 个人信息
      'allorder': '382', // 全部订单
      'needpay': '383', // 待付款
      'ondelivery': '384', // 待收货
      'needcomment': '385', // 待评论
      'customerService': '386', // 售后
      'service': '387', // 联系客服
      'ondelivery': '388', //
      'address': '389',
    },
    // 支付宝订单中心
    'ali_order_list': {
      'spm': '39', // 入口页面会带上的spm流量跟踪标记
      'cancel': '391', // 取消订单
      'refund': '392', // 申请退款
      'refunddetail': '393', // 退款详情
      'pay': '394', // 继续付款
      'confirm': '395', // 确认收货
      'delivery': '396', // 查看物流
      'comment': '397', // 评价
      'serviceRefund': '398', // 售后 - 申请退款
      'serviceRefundDetail': '399' // 售后 - 退款详情
    },
    // 支付宝订单详情
    'ali_order_detail': {
      'spm': '40', // 入口页面会带上的spm流量跟踪标记
      'home': '401', // 返回首页
      'contact': '402', // 联系客服
      'contactOfficial': '403', // 联系好食期客服
      'contactMerchant': '404', // 联系卖家
      'cancel': '405', // 取消订单
      'pay': '406', // 继续支付
      'delivery': '407', // 查看物流
      'confirm': '408', // 确定收货
      'comment': '409' // 评价
    },
    // 支付宝订单成功页
    'ali_order_result': {
      'spm': '42', // 入口页面会带上的spm流量跟踪标记
      'recommend': '421',
      'more': '422',
      'godetail': '423',
      'goon': '424',
      'follow': '425',
    },

    // 批发页
    'wholesale': {
      'spm': '41',
      'goAuth': '411',
      'goAuthBottom': '412',
      'navigation': '413',
      'process': '414',
      'goDetail': '415'
    },

    // 领券页
    'zt_coupon': {
      'spm': '42',
      'goReward': '421',
      'goReward2': '422',
      'goReward3': '423',
      'goUse': '424',
      'goDownload': '425',
      'goDetail': '425'
    },

    // 查看物流
    'order_delivery': {
      'spm': '43',
      'recommend': '431',
      'mode': '432',
    },

    // 页面的toolbar
    'toolbar_home': { // 点击首页
    },
    'toolbar_couple': { // 点击拼团
    },
    'toolbar_tob': { // 点击tob
    },
    'toolbar_shopcart': { // 点击购物车
    },
    'toolbar_profile': { // 点击个人中心
    },
    'toolbar_category': { // 点击分类
    },

    // 积分不足弹窗 - 赚积分/取消
    'lesspoint_alert_show': {},
    'lesspoint_alert_go_aliant': {},
    'lesspoint_alert_cancel': {},

    // 加载资源消耗时间
    'source_load_time': {
      o: 'source_load_time'
    },

    // 关注微信公众
    'qr_follow_show': {
    },

    // 购物车悬浮框
    'shopcart_flot_icon': {},

    // 新人大礼包
    'newusergift': {
      o: 'down'
    },
    'newusergiftshow': {},
    'zl_list': {
      'spm': '51',
      'remind': '511',
      'unremind': '512',
      'gotask': '513',
      'godetail': '514',
    },
    'zl_detail': {
      'spm': '52',
      'remind': '521',
      'unremind': '522',
      'share': '523',
      'buy': '524',
    },
    'zl_task_list': {
      'spm': '53',
      'share': '531',
      'vieworder': '532',
      'buy': '533',
    },
  },
}

*/
