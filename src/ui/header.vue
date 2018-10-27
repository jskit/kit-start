<template>
  <div class="vue-header" :class="{ 'is-fixed': fixed }">
    <div class="header-left"><slot name="left"></slot></div>
    <div class="header-center">
      <slot><h3 class="header-title">{{ title }}</h3></slot>
    </div>
    <div class="header-right"><slot name="right"></slot></div>
  </div>
</template>

<script>
/**
 * header
 * @module components/header
 * @desc header 头部
 * @param {boolean} [fixed = false] - 固定顶部
 * @param {*}
 *
 * @example
 * <vue-header title="标题" fixed>
 *  <div slot="left"></div>
 *  标题
 *  <div slot="right"></div>
 * </vue-header>
 */
export default {
  name: 'vue-header',

  props: {
    fixed: Boolean,
    center: [String, Object],
    right: Object,
    left: Object,
    title: String,
  },

  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
    },
  },
};
</script>

<style lang="stylus" scoped>
@import '~@/style/var';

.vue-header {
  width: 100%;
  height: 44px;

  // .header-inner {
  position: absolute 0 0 auto 0;
  z-index: 500;
  display flex
  align-items center
  // width 100%
  // height 44px
  line-height 1
  overflow hidden
  background #fff
  font-size 12px
  color $rgb33
  border-bottom: 1px solid $color-border;

  &.is-fixed {
    position: fixed 0 0 auto 0;
  }
  // }

  .header-left,
  .header-center,
  .header-right {
    display flex
    height 100%
    align-items center
  }

  .header-center {
    width 100%
    justify-content center
    font-size 16px
  }

  .header-left,
  .header-right {
    position absolute
    top 0
    flex-shrink 0
    flex-grow 0
    font-size 14px
  }

  .header-left {
    left: 8px;
  }
  .header-right {
    right: 8px;
  }
}
</style>
