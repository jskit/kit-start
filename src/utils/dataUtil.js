
import { mapTo } from './map'

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
      tags: item.tags || [],
      inStock: item.inStock,
      onLine: item.onLine,
      endTime: item.endTime,
      showCountDownLimit: item.showCountDownLimit,
    }
  })
}
