<template>
  <vue-tpl
  v-if="data.list.length"
  :data-type="data.type"
  :ratio="ratio"
  >
    <section class="vue-title-bar">
      <div
      class="item"
      v-for="(item, index) in data.list"
      :key="index"
      >
        <img class="image" width="100%" v-lazy="item.image.url" :preload="item.image.h/item.image.w" />
      </div>
    </section>
  </vue-tpl>
</template>

<script>
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
  name: 'vue-title-bar',

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
    return { }
  },

  computed: {
    ratio() {
      const { width, height = 0 } = this.data
      return width ? height / width : 0
    },
  },
}
</script>


<style lang="stylus" scoped>
@import '../../style/var';

.vue-title-bar {
  border-bottom: 1px solid $color-border;
}
</style>
