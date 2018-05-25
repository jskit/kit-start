<template>
  <section
  class="vue-rec-activity"
  v-if="$props.data.list.length"
  >
    <div
      class="item flex"
      v-for="(item, index) in $props.data.list"
      :key="item.id"
      :data-index="index"
      :data-id="item.pin_activities_id"
      :data-disabled="!item.can_bought"
      @click="goNext($event)"
      >
      <div class="media">
        <img class="image" v-lazy="item.sku_pic" preload="1" />
        <img class="icon" v-if="item.sub_image" v-lazy="item.sub_image" />
      </div>
      <div class="info flex-v">
        <div class="intro">
          <h4 class="title max-line-2">{{ item.couple_title }}</h4>
          <div class="text">
            <span class="sub-tag" v-if="item.sub_title">
              <vue-divider :lineWidth=10 gap="6 4">
                <div class="ellipsis">{{ item.sub_title }}</div>
              </vue-divider>
            </span>
          </div>
        </div>
        <div class="other">
          <p class="del-price"><del>{{ item.market_price | formatDel }}</del></p>
          <div class="flex flex-justify-between flex-align-end">
            <vue-price :price="item.couple_price" bold></vue-price>
            <span class="rec-btn" :class="{ disabled: !item.can_bought }">
              {{ item.can_bought ? '马上抢' : '已抢光' }}
              <vue-icon mode="custom" type="arrow-right" :size="0.8" style="margin-left: -0.04rem"></vue-icon>
            </span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
// banner
// import VueTypes from 'vue-types'
// import { Swipe, SwipeItem } from 'mint-ui'
import icon from '@/ui/icon'
import divider from '@/ui/divider'
import vuetpl from './vuetpl'
import price from '../price'

const defaultData = {
  // preLoad: 0.5,
  // list: [
  //   {
  //     url: '',
  //     image: '',
  //   }
  // ],
}

export default {
  name: 'vue-rec-activity',

  components: {
    [vuetpl.name]: vuetpl,
    [divider.name]: divider,
    [price.name]: price,
    [icon.name]: icon,
  },

  props: {
    data: {
      type: Object,
      default() {
        return { ...defaultData }
      },
      validator(value = {}) {
        return Array.isArray(value.list)
      },
    },
    // preLoad: VueTypes.number.def(1),
    // list: VueTypes.array,
  },

  data() {
    return {}
  },

  filters: {

  },

  computed: {
    // ratio() {
    //   const { width, height } = this.$props.data
    //   return height / width
    // },

  },

  created() {
    // console.log(this.data)
  },

  methods: {
    // cantBug(i) {
    //   const item = this.$props[i] || {}
    //   return item.left_stock < 1 || !item.can_bought
    // },
    goNext(e) {
      const { id, disabled } = e.currentTarget.dataset
      // debugger
      if (disabled) return
      this.$forward('couple_detail', { id })
    },
  },
}
</script>

<style lang="stylus" scope>
@import '../../style/var';

.del-price {
  color: $rgb153;
}

.vue-rec-activity {
  // 增加一个z-index属性，人为干扰复合层(composited layer)的排序
  position: relative;
  z-index: 1;
  overflow: hidden;
  font-size: 12px;

  > .item {
    padding: 16px;
    border-top: 1px solid $rgb226;
    margin-top: -1px;
    background: #fff

    // &:active {
    //   background: rgb(217, 217, 217)
    // }
  }

  .flex-v {
    justify-content: space-between;
  }

  .media {
    position: relative;
    margin-right: 32px;
    size: 125px;
    flex-shrink: 0;

    .image {
      size: 100%;
    }

    .icon {
      position: absolute
      top: 0
      left: 0
      size: 35px
    }
  }

  .info {
    padding: 0;
    // width: 100%;
    flex: 1;
    overflow: hidden;
    min-height: 125px
  }

  .intro {
    min-height: 72px;
    padding-bottom: 8px;
  }
  .title {
    font-weight: 400
    line-height: 20px
    font-size: 14px
    margin-bottom: 5px
  }

  .sub-tag {
    color: $rgb234;
    border: 1px solid $rgb234;
    box-shadow: 2px 2px 0 $rgb234;
    display: inline-flex
    height: 24px
    line-height: 24px
    font-size: 12px
    vertical-align: middle;
    max-width: 100%

    .vue-divider {
      display: inline-flex;

      .vue-divider-left,
      .vue-divider-right {
        flex-shrink: 0;
        width: 10px;
      }
      .vue-divider-center {
        flex-shrink: 1;
        overflow: hidden;
      }
    }
  }

  .now-price {
    color: $rgb234;
  }

  .rec-btn {
    float: right
    border-radius: 50px
    width: 62px
    height: 26px
    line-height: 26px
    margin-right: 2px
    text-align: center
    color: #fff

    background: linear-gradient(to right, rgb(246, 146, 131), $rgb234);
    box-shadow: 1px 1px 0 rgba(234, 89, 76, 0.48)

    &.disabled {
      background: $rgb153
      box-shadow: 1px 1px 0 rgba(153, 153, 153, 0.48)
    }
  }
}
</style>
