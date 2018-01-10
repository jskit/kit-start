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
@import './style/index';

body {
  font-size: 16px;
  // background-color: #ececec;
}

</style>
