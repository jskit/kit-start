<template>
  <vue-tpl
  v-if="data.list.length"
  :data-type="data.type"
  :ratio="ratio"
  >
    <section class="swiper-wrapper">
      <mt-swipe :auto="4000" :show-indicators="data.list.length > 1">
        <mt-swipe-item
        v-for="(item, index) in data.list"
        :key="index"
        :data-link="item.link"
        :data-log="`{banner: {index: ${index}}}`"
        @click.native="$goLink($event)"
        >
          <img
          class="image"
          v-lazy="item.image.url"
          :preload="item.image.h/item.image.w" />
        </mt-swipe-item>
      </mt-swipe>
    </section>
  </vue-tpl>
</template>

<script>
// banner
// import VueTypes from 'vue-types'
import { Swipe, SwipeItem } from 'mint-ui'
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
  name: 'vue-swiper',

  components: {
    [vuetpl.name]: vuetpl,
    [Swipe.name]: Swipe,
    [SwipeItem.name]: SwipeItem,
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

  computed: {
    ratio() {
      const { width, height = 0 } = this.data
      return width ? height / width : 0
    },
  },

  created() {

  },

  mounted() {
    // console.log(this.data)
  },

  methods: {
  },

}
</script>

<style lang="stylus" scope>
@import '../../style/var';

.swiper-wrapper {
  .mint-swipe {
    size: 100%;
    .image {
      size: 100%;
    }
  }
}
</style>
