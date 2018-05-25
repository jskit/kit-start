<template>
  <div class="vue-countdown">
    {{ countdown | format }}
  </div>
</template>

<script>
import { formatCountDown } from '@/utils/dateUtil'

export default {
  name: 'vue-countdown',

  props: {
    data: Number,
  },

  filters: {
    format(value) {
      let ff = '<i>H</i>小时<i>F</i>分钟<i>S</i>秒'
      if (value > 86400) {
        ff = `<i>D</i>天${ff}`
      }
      const cdTimes = formatCountDown(ff)
      return value > 0 ? `剩余时间${cdTimes}` : ''
    },
  },
}
</script>

<style lang="stylus" scoped>

</style>

