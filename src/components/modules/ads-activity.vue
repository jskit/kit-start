<template>
  <section
  class="vue-activity"
  v-if="$props.data.list.length"
  >
    <div
      class="item"
      v-for="(item, index) in $props.data.list"
      :key="index"
      :data-link="item.jump_url"
      @click="$goLink($event)"
      >
      <img class="image" v-lazy="item.image.url" :preload="item.image.h/item.image.w" />
      <div class="text ellipsis" v-if="item.label">{{ item.label }}</div>
    </div>
  </section>
</template>

<script>
// banner
// import VueTypes from 'vue-types'
// import { Swipe, SwipeItem } from 'mint-ui'
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
  name: 'vue-activity',

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
        return Array.isArray(value.list)
      },
    },
    // preLoad: VueTypes.number.def(1),
    // list: VueTypes.array,
  },

  data() {
    return {
      // swiperInfo: {
      //   preLoad: 0.5,
      //   list: [
      //     {
      //       url: '',
      //       image: '',
      //     }
      //   ],
      // },
    }
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

.vue-activity {
  .item {
    background: #fff;

    & + .item {
      margin-top: 5px;
    }
  }

  .text {
    padding: 8px 10px 12px 16px;
    font-size: 15px;
  }

  .image {
    width: 100%;
  }
}
</style>
