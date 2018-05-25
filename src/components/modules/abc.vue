<template>
  <vue-tpl
  v-if="data.list.length"
  :data-type="data.type"
  :bg="data.bg.url"
  :ratio="ratio"
  >
    <section class="vue-xxx">
      <div
      class="item"
      v-for="(item, index) in data.list"
      :key="index"
      >
        <img class="image" v-lazy="item.image.url" :preload="item.image.h/item.image.w" />
        <div class="text">{{item.label}}</div>
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
  name: 'vue-xxx',

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
    // 最外层不需要固定宽高比时，不需要此处，以及 vue-tpl
    ratio() {
      const { width, height = 0 } = this.data
      return width ? height / width : 0
    },
  },
}
</script>


<style lang="stylus" scoped>
@import '../../style/var';

.vue-xxx {

}
</style>
