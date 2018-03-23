<template>
  <div class="van-loading" :class="['van-loading--' + type, 'van-loading--' + color]" :style="style">
    <span class="van-loading__spinner" :class="'van-loading__spinner--' + type">
      <i v-for="item in (type === 'spinner' ? 12 : 0)" :key="item" />
      <svg v-if="type === 'circular'" class="van-loading__circular" viewBox="25 25 50 50">
        <circle cx="50" cy="50" r="20" fill="none"/>
      </svg>
    </span>
  </div>
</template>

<script>
import VueTypes from 'vue-types'

export default {
  name: 'vue-loading',

  props: {
    size: String,
    type: VueTypes.string.def('circular'),
    color: VueTypes.string.def('black'),
  },

  computed: {
    style() {
      const { size } = this
      return size ? {
        width: size,
        height: size,
      } : {}
    }
  }
}
</script>

<style lang="stylus" scoped>
.vue-loading {

}
</style>

