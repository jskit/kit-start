<template>
  <div class="tpl-default tpl-mobile">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'tpl-default',

  components: {

  },
}
</script>

<style lang="stylus" scoped>
.tpl-mobile {
  height 100%
  overflow hidden
}
</style>
