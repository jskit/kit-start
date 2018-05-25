<template>
  <vue-tabbar
    class="tabbar"
    fixed
    @tab-click="handleTabClick"
    :value="value"
    >
    <vue-tab-item
      v-for="(item, index) in tabBar"
      :key="item.id"
      :data-index="index"
      :data-link="item.link"
      :id="item.id"
    >
      <vue-icon slot="icon" :type="item.icon"></vue-icon>
      {{ item.text }}
    </vue-tab-item>
  </vue-tabbar>
</template>

<script>
import device from '@/utils/device'
import icon from '@/ui/icon'
import tabBar from '@/ui/tabbar'
import tabItem from '@/ui/tab-item'

const tabBarData = device.alipay ? [
  {
    id: 'index', // page
    icon: 'home',
    text: '首页',
    link: 'ali_portal',
  },
  {
    id: 'community',
    icon: 'community',
    text: '圈子',
    link: 'alipays://platformapi/startapp?appId=20000943&path=homepage&groupId=027be25993b141474225295709100000&sourceId=referLink',
  },
  {
    id: 'profile',
    icon: 'mine',
    text: '我的订单',
    link: 'ali_profile',
  },
] : [
  {
    id: 'index',
    icon: 'home',
    text: '超值特卖',
  },
  {
    id: 'new_product',
    icon: 'todaynew',
    text: '今日新品',
  },
  // {
  //   id: 'wholesale',
  //   icon: 'goods',
  //   text: '批发',
  // },
  {
    id: 'sort_search',
    icon: 'sort',
    text: '分类',
  },
  {
    id: 'profile',
    icon: 'mine',
    text: '我的',
  },
]

export default {
  name: 'my-tabbar',

  components: {
    [icon.name]: icon,
    [tabBar.name]: tabBar,
    [tabItem.name]: tabItem,
  },

  props: {
    value: String,
  },

  data() {
    return {
      tabBar: tabBarData,
    }
  },

  created() {
  },

  mounted() {
  },

  methods: {
    handleTabClick(...rest) {
      // console.log(rest)
      const [id, e] = rest
      if (id === this.value) return

      const { link } = e.currentTarget.dataset
      switch (id) {
        case 'index':
        case 'profile':
        case 'community':
          this.$forward(link || id)
          break
        case 'new_product':
        case 'sort_search':
        case 'wholesale':
          this.$goH5Url(id)
          break
        default:
          // do nothing
          console.log('nothing')
      }
    },
  },
}
</script>

<style lang="stylus" scoped>
@import '../style/var';

</style>
