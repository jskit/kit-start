<template>
  <vue-scroll
    class="page-index"
    v-model="pullLoading"
    :finished="finished"
    @onScrollToLower="onScrollToLower"
    :finishedTip="finishedTip"
    :immediate-check="scrollCheck"
    >
    <!-- <h1>首页</h1> -->
    <!-- <img src="~assets/img/logo.png" alt="Vue.js PWA"> -->
    <!-- <p><KitIcon mode="svg" type="check" /></p> -->
    <vue-tabbar
    class="tabbar"
    fixed
    @tab-click="handleTabClick"
    value="index"
    >
      <vue-tab-item
        v-for="(item, index) in tabBar"
        :key="item.id"
        :data-index="index"
        :id="item.id"
      >
        <vue-icon slot="icon" :type="item.icon"></vue-icon>
        {{ item.text }}
      </vue-tab-item>
    </vue-tabbar>

    <div
    class="tpl-modules"
    v-for="item in tplList"
    :key="item.id"
    :data-type="item.type"
    >
      <vue-modules :type="item.type" :data="item"></vue-modules>
    </div>

    <div class="pro-list list-type-card">
      <vue-list-item
        v-if="proList.length"
        v-for="(item, index) in proList"
        :key="index"
        :data="item"
        :data-id="item.id"
        :data-online="item.onLine"
        :data-instock="item.inStock"
        >
        <p v-if="item.isShowDelivery" class="tip">该地区不支持配送</p>
      </vue-list-item>
    </div>
  </vue-scroll>
</template>

<script>
// import { Icon } from 'kit-ui'
// import data from './data'
import api from '@/config/api'
// import { $router } from '@/utils/mini'
import { dealPinList } from '@/utils/dataUtil'
import modules from '@/components/modules/index'
import listItem from '@/components/list-item'
import tabBar from '@/components/tabbar'
import tabItem from '@/components/tab-item'
import icon from '@/components/icon'
import scroll from '@/components/scroll'
// import swiper from '@/components/modules/swiper'
// import category from '@/components/modules/category'

// console.log(data)

export default {
  components: {
    [modules.name]: modules,
    [listItem.name]: listItem,
    [tabBar.name]: tabBar,
    [tabItem.name]: tabItem,
    [icon.name]: icon,
    [scroll.name]: scroll,
    // [category.name]: category,
  },

  data() {
    return {
      selected: '首页',
      tplList: [],
      proList: [],
      finishedTip: '没有更多数据了',
      loadingTip: '加载中...',
      pullLoading: false,
      finished: false,
      scrollCheck: false,
      pullError: false,
      tabBar: [
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
        {
          id: 'wholesale',
          icon: 'tob',
          text: '批发',
        },
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
      ],
    }
  },

  created() {
    const that = this
    this.showLoading()
    api.getIndexNew({
      // sourceType: 1, // 会自动根据 terminal 判断
    }, (res) => {
      console.log(res)
      that.tplList = res.data.list || []
      that.scrollCheck = true
    }, (err) => {
      console.log(err)
    })

    // 滚动加载常用配置
    Object.assign(this, {
      pullParamsDefault: {
        pageNum: 1,
        pageLimit: 20,
        needPagination: 1,
      },
      pullParams: {
        pageNum: 1,
      },
    })

    this.onScrollToLower()
    // this.showLoading()
    // api.getCoupleList({}, (res) => {
    //   console.log(res)
    //   that.proList = dealPinList(res.data.list || [])
    //   this.showToast('test')
    // }, (err) => {
    //   console.log(err)
    // })
  },

  methods: {
    pullModel(...rest) {
      api.getCoupleList.apply(this, rest)
    },
    onRefresh() {
      this.initPullList()
      window.scrollTo(0, 10)
    },
    initPullList() {
      this.pullParams.pageNum = 1
      this.finished = true
    },
    onScrollToLower() {
      // if (this.pullLoading) return
      // console.log('触发滚动加载')
      if (this.finished) {
        // console.log('没有更多数据了')
        return
      }
      this.pullModel({
        ...this.pullParamsDefault,
        ...this.pullParams,
      }, (res) => {
        this.diffTime = res.timestamp * 1000 - Date.now()
        this.dealData(res.data)
        this.pullLoading = false
      }, (err) => {
        this.pullLoading = false
        if (err.errno === 510010) {
          // this.forward('login')
          return true
        }
      }, this)
    },
    dealData(data = {}) {
      const { pageNum } = this.pullParams
      this.finished = data.totalPage <= pageNum
      if (pageNum === 1) {
        this.proList = []
      }
      if (!this.finished) {
        this.pullParams.pageNum += 1
      }
      if (typeof this.dealList === 'function') {
        const { list = [] } = data
        let temp = []
        if (list.length) {
          temp = this.dealList(list) || []
          if (!temp) {
            this.showToast('处理数据返回格式有问题')
            return
          }
        } else {
          console.log('无数据')
          // this.proList = []
          return
        }
        /* eslint no-param-reassign: 0 */
        this.proList.push(...temp)

        if (typeof this.afterPullData === 'function') {
          this.afterPullData()
        }
      }
    },
    dealList(list) {
      return dealPinList(list)
    },
    handleTabClick(...rest) {
      // console.log(rest)
      const [id] = rest
      switch (id) {
        case 'new_product':
        case 'sort_search':
        case 'profile':
          this.goPage(id)
          break
        case 'index':
        default:
          // do nothing
          console.log('nothing')
      }
    },
    goPage(page) {
      const url = `${window.location.origin}/t.html#${page}`
      window.location.href = url
    }
  },
}
</script>

<style lang="stylus" scope>
@import '../style/var';

.page-index {
  position relative
  padding-bottom 100px
}

.list-type-card {
  display: flex;
  justify-content: space-between;
  align-items: stretch;
  flex-wrap: wrap;

  .item {
    flex-direction column
  }
}

.tabbar {
  .item-icon {
    color: #dbdbdb;
  }
  .is-selected .item-icon {
    color: #fdf187;
  }
}
</style>
