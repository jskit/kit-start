<template>
  <vue-tpl
  v-if="$props.data.list.length"
  :data-type="$props.data.type"
  :ratio="ratio"
  >
    <section class="vue-ads">
      <mt-swipe :auto="4000">
        <mt-swipe-item
        v-for="(item, index) in $props.data.list"
        :key="index"
        :data-link="item.link"
        @click="$goLink($event)"
        >
          <img class="image" v-lazy="item.image.url" :preload="item.image.h/item.image.w" />
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
  name: 'vue-ads',

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
    return { }
  },

  computed: {
    ratio() {
      const { width, height = 0 } = this.$props.data
      return width ? height / width : 0
    },
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
.vue-ads {
  .mint-swipe {
    size: 100%;
    .image {
      size: 100%;
    }
  }
}
</style>
