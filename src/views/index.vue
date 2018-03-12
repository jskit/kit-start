<template>
  <div>
    <h1>首页</h1>
    <img src="~assets/img/logo.png" alt="Vue.js PWA">
    <!-- <p><KitIcon mode="svg" type="check" /></p> -->
  </div>
</template>

<script>
// import { Icon } from 'kit-ui'
import api from '@/service/api'

export default {
  components: {
    // [Icon.name]: Icon,
  },

  created() {
    api.getIndex({}, (res) => {
      console.log(res)
    }, (err) => {
      console.log(err)
    })
  },
}
</script>
