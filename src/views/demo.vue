<template>
  <div>
    <h1>demo</h1>
    <img src="~assets/img/logo.png" alt="Vue.js PWA">
    <van-row v:for="item in list" v:key="item.id">
      <van-col span="8">span: 8</van-col>
      <van-col span="8">span: 8</van-col>
      <van-col span="8">span: 8</van-col>
    </van-row>
    <!-- <p><KitIcon mode="svg" type="check" /></p> -->
  </div>
</template>

<script>
// import { Icon } from 'kit-ui'
import { Row, Col } from 'vant'

export default {
  components: {
    // [Icon.name]: Icon,
    [Row.name]: Row,
    [Col.name]: Col,
  },

  data() {
    return {
      list: [],
    }
  },

  created() {

  },
}
</script>
