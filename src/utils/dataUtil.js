import env from '@/config/env'
import { mapTo } from './map'

const priceType = env.channel === 'huabei' ? '花呗价' : ''

// 处理拼团列表数据
export function dealPinList(list) {
  return mapTo(list, (item) => {
    const isShowDelivery = (!item.canDelivery && item.onLine && item.inStock)
    const isShowLootAll = isShowDelivery || (item.canDelivery && !item.canBought)
    return {
      id: item.pinActivitiesId,
      title: item.coupleTitle,
      image: item.skuPic,
      price: item.couplePrice,
      marketPrice: item.marketPrice,
      isShowLootAll,
      isShowDelivery,
      tags: item.tags && item.tags[0],
      inStock: item.inStock,
      onLine: item.onLine,
      soldout: !(item.onLine && item.inStock),
      endTime: item.endTime,
      showCountDownLimit: item.showCountDownLimit,
    }
  })
}

// 处理支付宝积分列表数据
export function dealPointList(list) {
  return mapTo(list, (item) => {
    // const isShowDelivery = (!item.canDelivery && item.onLine && item.inStock)
    // const isShowLootAll = isShowDelivery || (item.canDelivery && !item.canBought)
    return {
      id: item.pSkuId,
      title: item.name,
      image: item.thumbnail,
      priceType,
      price: item.price,
      point: item.point,
      // nowPrice: {
      //   price: item.price,
      //   point: item.point,
      // },
      marketPrice: item.marketPrice,
      // isShowLootAll,
      // isShowDelivery,
      tags: item.tags && item.tags[0],
      inStock: item.inStock,
      // onLine: item.onLine,
      // soldout: !(item.onLine && item.inStock),
      endTime: item.endTime,
      showCountDownLimit: item.showCountDownLimit,
    }
  })
}
