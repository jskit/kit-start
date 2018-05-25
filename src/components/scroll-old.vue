<template>
  <section class="infinite-wrapper" ref="wrapper" :style="{ height: `100vh`}">
    <div class="scoll-list"
    v-infinite-scroll="loadMore"
    :infinite-scroll-disabled="loading"
    :infinite-scroll-distance="distance"
    >
      <slot></slot>
    </div>
    <div v-show="$props.loading" class="page-infinite-loading">
      <mt-spinner type="fading-circle"></mt-spinner> 加载中...
    </div>
    <div class="scroll-loadover" v-if="loadoverTip">{{ loadoverTip }}</div>
  </section>
</template>

<script>
import VueTypes from 'vue-types'
import { Spinner } from 'mint-ui'

export default {
  name: 'vue-scroll',

  components: {
    [Spinner.name]: Spinner,
  },

  props: {
    loading: Boolean,
    loadoverTip: String,
    distance: VueTypes.number.def(200),
    // wrapperHeight: VueTypes.number.def(100),
  },

  data() {
    return {
      // list: [],
      // loading: false,
      // allLoaded: false,
      wrapperHeight: 0
    }
  },

  methods: {
    loadMore() {
      // console.log(1111)
      // this.loading = true
      this.$emit('scrolltolower')
    },
  },

  mounted() {
    // 可见区域高度 - 元素顶部相对视窗的位置
    this.wrapperHeight = document.documentElement.clientHeight -
            this.$refs.wrapper.getBoundingClientRect().top
    console.log(this.wrapperHeight)
  },
}
</script>
