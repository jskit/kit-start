<template>
  <section class="tpl-zt">
    <transition :name="transition">
      <router-view class="page-zt"></router-view>
    </transition>
  </section>
</template>

<script>
export default {
  name: 'tpl-zt',
  data() {
    return {
      transition: 'slide-left',
    }
  },
  // watch $route 决定使用哪种过渡
  watch: {
    $route(to, from) {
      const toDepth = to.path.split('/').length
      const fromDepth = from.path.split('/').length
      this.transition = toDepth < fromDepth ? 'slide-right' : 'slide-left'
    },
  },
}
</script>

<style>

</style>
