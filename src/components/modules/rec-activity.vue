<template>
  <section
  class="vue-rec-activity"
  v-if="$props.data.list.length"
  >
    <div
      class="item flex-hor"
      v-for="(item, index) in $props.data.list"
      :key="item.id"
      :data-index="index"
      :data-id="item.pin_activities_id"
      :data-link="item.jump_url"
      @click="$goLink($event)"
      >
      <div class="media">
        <img class="image" v-lazy="item.sku_pic" preload="1" />
        <img class="icon" v-if="item.sub_image" v-lazy="item.sub_image" />
      </div>
      <div class="info flex-ver">
        <div class="intro">
          <h4 class="title max-line-2">{{ item.couple_title }}</h4>
          <div class="text">
            <span class="sub-tag" v-if="item.sub_title">
              <vue-divider :line=1 :lineWidth=10 gap="6 4">{{ item.sub_title }}</vue-divider>
            </span>
          </div>
        </div>
        <div class="other">
          <del class="del-price">市场价：{{ item.market_price | formatDel }}</del>
          <p class="flex-hor flex-justify-between flex-align-end">
            <vue-price :data="item.couple_price"></vue-price>
            <span class="rec-btn">马上抢</span>
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
// banner
// import VueTypes from 'vue-types'
// import { Swipe, SwipeItem } from 'mint-ui'
import vuetpl from './vuetpl'
import divider from '../divider'
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

  mounted() {
    // console.log(this.data)
  },

}
</script>

<style lang="stylus" scope>
@import '../../style/var';

.del-price {
  color: $rgb153
}

.vue-rec-activity {
  overflow: hidden
  font-size: 12px

  .item {
    padding: 16px;
    border-top: 1px solid $rgb226;
    margin-top: -1px;
    background: #fff
  }

  .flex-ver {
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
      size: 30px
    }
  }

  .info {
    padding: 0;
    width: 100%
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

    .vue-divider {
      display: inline-flex;
      width: 100%
    }
  }

  .rec-btn {
    float: right
    border-radius: 50px
    width: 62px
    height: 26px
    line-height: 26px
    text-align: center
    color: #fff

    background: linear-gradient(to right, rgb(246, 146, 131), $rgb234);
    box-shadow: 2px 2px 0 rgba(234, 89, 76, 0.48)

    &.disabled {
      background: $rgb153
      box-shadow: 2px 2px 0 rgba(153, 153, 153, 0.48)
    }
  }
}
</style>
