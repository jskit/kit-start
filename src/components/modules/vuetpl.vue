<template>
  <div class="vue-tpl-wrapper" :style="styles">
    <slot></slot>
  </div>
</template>

<script>
// import VueTypes from 'vue-types'
// import xxx from 'xxx'

export default {
  name: 'vue-tpl',

  components: {
    // [swiper.name]: swiper,
  },

  props: {
    bg: String,
    ratio: [Number, String],
  },

  data() {
    return {}
  },

  computed: {
    styles() {
      const {
        bg = '',
        ratio = 0,
      } = this.$props
      return [
        bg ? { backgroundImage: `url(${bg})` } : { },
        ratio ? { paddingTop: `${ratio * 100}%` } : {},
      ]
    },
  },

  methods: {
  },
}
</script>

<style lang="stylus" scoped>
@import '../../style/var';

.vue-tpl-wrapper {
  position: relative;
  height: 0;
  overflow: hidden;
  // background-size: 100% auto;
  background-size: cover;
  background-position: top center;
  background-repeat: no-repeat;
  background-color: #fff;

  &>.vue-tpl-inner,
  &>section {
    position: absolute 0 0 0 0;
    // height: 100%;
    overflow: hidden;
  }
}
</style>
