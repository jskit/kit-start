<template>
  <div
    class="c-labels flex-around"
    v-if="isValid"
    :data-type="data.type"
    >
    <div
    v-for="(item, index) in data.list"
    :class="`item`"
    :key="index"
    >
      <img class="image" v-lazy="item.icon" :preload="1" />
      <span class="text">{{ item.text }}</span>
    </div>
  </div>
</template>

<script>
// import vuetpl from './vuetpl'

// c-tofu
// 需要做 layout 检测，不存在的layout，则此模块不渲染
// 数字代表数据个数，- 分割多列，多位数表示多行


const defaultData = {
  width: 5,
  height: 3,
  list: [
  ],
}
export default {
  name: 'c-labels',

  components: {
    // [vuetpl.name]: vuetpl,
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
      const { list } = this.data
      return list.length > 0
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

.c-labels {
  overflow: hidden;
  height: 40px;
  font-size: 12px;
  color: $color-text;
  background-color: #fff;
  border-bottom: 1px solid $color-border;

  .item {
    display: inline-flex;
    align-items: center;
  }

  .image {
    margin-right: 4px;
    size: 16px;
  }

}
</style>
