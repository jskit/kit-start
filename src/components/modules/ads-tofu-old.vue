<template>
  <vue-tpl
  v-if="$props.data.list.length"
  :data-type="$props.data.type"
  :ratio="ratio"
  >
    <section class="vue-ads-tofu">
      <div
      v-for="(item, index) in $props.data.list"
      :class="`item item${index}`"
      :key="index"
      :data-link="item.link"
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
  name: 'vue-tofu',

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
        // const isArray = Array.isArray(value.list)
        // const len = isArray && value.list.length
        // return isArray && value.preLoad
        return Array.isArray(value.list)
      },
    },
  },

  data() {
    return {}
  },

  computed: {
    ratio() {
      const { width, height = 0 } = this.$props.data
      return width ? height / width : 0
    },
  },
}
</script>


<style lang="stylus" scoped>
@import '../../style/var';

.vue-ads-tofu {
  .item {
    float left
    width 50%
    background #fff

    &.item0 {height: 100%; border-right: 1px solid $color-border; }
    &.item1,
    &.item2 {height: 50%; }
    &.item1 {height: 50%; border-bottom: 1px solid $color-border; }

    .image {
      width 100%
      // height auto
      height 100%
    }
  }
}
</style>
