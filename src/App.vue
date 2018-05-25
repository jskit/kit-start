<template>
  <div id="root">
    <router-view class="page-tpl"></router-view>
  </div>
</template>

<script>
// import api from '@/config/api'
import { mapActions } from 'vuex'
import { INIT_CONFIG } from '@/store/modules/app'

export default {
  name: 'root',

  created() {
    // api.getConfig({}, (res) => {

    // }, (err) => {

    // })
    console.log('api: init config')
    this.INIT_CONFIG()
  },

  methods: {
    ...mapActions([INIT_CONFIG]),
  },
}
</script>

<style lang="stylus">
@import './style/index';
@import './style/var';

body {
  font-size: 16px;
  min-width: 320px;
  max-width: 780px;
  margin: 0 auto;
}

</style>
