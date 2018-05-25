<template>
  <div class="tpl-alipay tpl-mobile">
    <router-view class="page-view"></router-view>
  </div>
</template>

<script>
export default {
  name: 'tpl-default',

  components: {

  },
}
</script>

<style lang="stylus" scope>
.tpl-mobile {
  height: 100%;
  overflow: hidden;
}
.page-view {
  height: 100%;
  overflow-y: scroll;
}
</style>
