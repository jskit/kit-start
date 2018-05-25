<script>
import VueTypes from 'vue-types'
import device from '@/utils/device'
import { getCommonParams } from '@/config/api'

const priceType = (device.alipay && getCommonParams('channel') === 'huabei') ? '花呗价：' : ''

export default {
  name: 'vue-price',

  props: {
    price: [String, Number],
    size: Number,
    point: [String, Number],
    bold: Boolean,
    type: String,
    rmb: VueTypes.string.def('¥'),
  },

  computed: {
    priceArr() {
      return Number(this.$props.price * 0.01).toFixed(2).split('.')
    },
  },

  render(h) {
    const {
      priceArr,
      size,
      bold,
      rmb = '¥',
      point,
      type = priceType,
    } = this

    const styles = {}
    if (size) {
      styles.fontSize = `${size / 100}rem`
    }
    // 整数可加粗
    const priceClass = {
      item: true,
      'item-price-num1': true,
      bold: !!bold,
    }

    // const vnodeType = ()
    // <div class="item item-market-price" v-if="marketPrice > 0">{ marketPrice | format }</div>
    return (
      <span class="now-price">
        { type ? <span class="item item-type">{ type }</span> : null }
        <dfn class="item item-price">
          { rmb === '¥' ? <span class="item item-price-rmb">{ rmb }</span> : null }
          <span class={ priceClass } style={ styles }>{ priceArr[0] }</span>
          <i class="item-price-num2">.{ priceArr[1] }</i>
          { rmb === '元' ? <span class="item item-price-font">{ rmb }</span> : null }
        </dfn>
        { point ? <dfn class="item item-point item-point-font">{ point }</dfn> : null }
      </span>
    )
  },
}
</script>

<style lang="stylus" scope>
@import '../style/var';

// .del-price {
//   color: $rgb153
// }

.now-price {
  // 使用这两个设置好像没什么问题，之前调试可能是受外部item的样式影响
  // display: inline-flex;
  // align-items: baseline;
  font-size: 12px;
  line-height: 1;
  color: $color-price;

  .item {
    display: inline-block;
  }

  .item-type {

  }
  // .item-price {
  // }

  .item-price-rmb {
    // position: relative;
    transform: translateY(-2%);
  }
  // .item-price-font {

  // }

  // .item-price-num1,
  // .item-price-num2 {
  // }

  .item-price-num1 {
    margin-left: 2px;
    font-size: 27px;
    font-style: normal;

    &.bold {
      font-weight: bold;
    }
  }
  .item-price-num2 {
    font-size: 12px;
  }

  .item-price + .item-point-font::before {
    content: '+';
  }

  .item-point-font::after {
    content: '积分';

  }
}
</style>
