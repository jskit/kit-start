<template>
  <div id="root">
    <router-view class="page-tpl"></router-view>
  </div>
</template>

<script>
export default {
  name: 'root',
}
</script>

<style lang="stylus">
// @import './style/var';

body {
  font-size 16px
  min-width 320px
  max-width 600px
  margin 0 auto
  // background-color: #ececec;
}

</style>
