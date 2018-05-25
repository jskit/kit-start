<template>
  <vue-tpl
    class="c-tofu"
    v-if="isValid"
    :data-type="data.type"
    :ratio="ratio"
    >
    <section :class="{ [`layout-${data.layout}`]: !!data.layout }">
      <div
      v-for="(item, index) in data.list"
      :class="`item item-idx-${index} item-len-${data.list.length}`"
      :key="index"
      :data-link="item.link"
      :data-index="index"
      @click="$goLink($event)"
      >
        <img class="image"
        v-lazy="item.image.url"
        :preload="item.image.h/item.image.w" />
      </div>
    </section>
  </vue-tpl>
</template>

<script>
// 豆腐块
import vuetpl from './vuetpl'

// c-tofu
// 需要做 layout 检测，不存在的layout，则此模块不渲染
// 数字代表数据个数，- 分割多列，多位数表示多行
const layouts = [
  '1-1',  // 两列一行
  '1-11',
  '1-12', // 两列，第二列 1+2 两行
  '1-2-2',
  '2-2',
  '2-2-2',
]

const defaultData = {
  width: 5,
  height: 3,
  list: [
  ],
}
export default {
  name: 'c-tofu',

  components: {
    [vuetpl.name]: vuetpl,
  },

  props: {
    data: {
      type: Object,
      default() {
        return { ...defaultData }
      },
      validator(value = {}) {
        if (__ADMIN__) {
          return true
        }
        // const isArray = Array.isArray(value.list)
        // const len = isArray && value.list.length
        // return isArray && value.preLoad
        return Array.isArray(value.list)
      },
    },
  },

  data() {
    return { }
  },

  filters: {

  },

  computed: {
    isValid() {
      if (__ADMIN__) {
        return true
      }
      const { list, layout } = this.data
      return list.length > 0 && (layouts.indexOf(layout) > -1)
    },
    ratio() {
      const { width, height = 0 } = this.data
      return width ? height / width : 0
    },
  },
}
</script>


<style lang="stylus" scoped>
@import '../../style/var';

.c-tofu {
  overflow hidden
  padding-top 60%

  // &:nth-of-type(2n+1) {
  //   border-right 1px solid $color-border
  // }

  // 使用有边框以及下边框，为什么
  // 虽然不如左上边框实现简单，但如果存在部分数据缺失，边界完整
  .item {
    float left
    height 50%
    border-right: 1px solid $color-border
    border-bottom: 1px solid $color-border
  }

  .item:nth-of-type(1) {
    width 40%;
    height 100%;
  }

  .layout-1-1 {
    .item {
      width: 50%;
      height: 100%;
      border-bottom: none;
    }
    .item:nth-of-type(2) {
      border-right: none;
    }
  }
  .layout-1-11 {
    // n >= 0
    .item:nth-of-type(n+2) {
      width: 60%;
      border-right: none;
    }
    .item:nth-of-type(1),
    .item:nth-of-type(3) {
      border-bottom: none;
    }
  }
  .layout-1-12 {
    .item:nth-of-type(2) {
      width: 60%;
    }
    .item:nth-of-type(n+3) {
      width: 30%;
    }
    .item:nth-of-type(2),
    .item:nth-of-type(4) {
      border-right: none;
    }
    .item:nth-of-type(1),
    .item:nth-of-type(n+3) {
      border-bottom: none;
    }
  }
  .layout-1-2-2 {
    .item {
      width: 30%;
    }
    .item:nth-of-type(1) {
      width: 40%;
    }
    .item:nth-of-type(2n+3) {
      border-right: none;
    }
    .item:nth-of-type(1),
    .item:nth-of-type(n+4) {
      border-bottom: none;
    }
  }
  .layout-2-2 {
    .item {
      width: 50%;
      height: 50%;
    }
    .item:nth-of-type(2n) {
      border-right: none;
    }
    .item:nth-of-type(n+3) {
      border-bottom: none;
    }
  }
  .layout-2-2-2 {
    .item {
      width: 33.3333%;
      height: 50%;
    }
    .item:nth-of-type(3n) {
      border-right: none;
    }
    .item:nth-of-type(n+4) {
      border-bottom: none;
    }
  }

  .image {
    width 100%
    // height auto
    height 100%
  }
}
</style>
