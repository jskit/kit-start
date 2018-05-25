<template>
  <div class="page-scroll page-alipay-index">
    <!-- <vue-header fixed>
      <div class="index-header">
        <div class="item logo"><img class="img" src="~assets/img/logo-small.png" alt="logo"></div>
        <div class="item city" data-type="city" @click="goNext($event)">
          <div class="current ellipsis">{{ selectCity.province || '上海' }}</div>
          <vue-icon mode="custom" type="arrow-bottom" style="margin-top: -0.04rem"></vue-icon>
        </div>
        <div class="item search ellipsis" data-type="search" @click="goNext($event)">
          <vue-icon class="icon-index-search flex-shrink" type="search" :size="14"></vue-icon>
          <div class="keywords ellipsis">{{$store.state.app.config | hotSearch}}</div>
        </div>
        <div class="item service" data-type="zt" @click="goNext($event)">
          <vue-icon type="message" :size="20"></vue-icon>
        </div>
      </div>
    </vue-header> -->

    <my-tabbar value="index"></my-tabbar>

    <vue-scroll
      v-model="pullLoading"
      :finished="finished"
      @onScrollToLower="onScrollToLower"
      :finishedTip="finishedTip"
      :immediate-check="scrollCheck"
      >
      <div
      class="tpl-modules"
      v-for="item in tplList"
      :key="item.id"
      :data-type="item.type"
      >
        <vue-modules :type="item.type" :data="item"></vue-modules>
      </div>

      <div class="pro-list list-type-card">
        <vue-point-item
          v-if="proList.length"
          v-for="(item, index) in proList"
          :key="index"
          :data="item"
          :data-id="item.id"
          :data-online="item.onLine"
          :data-instock="item.inStock"
          >
        </vue-point-item>
      </div>
    </vue-scroll>

  </div>
</template>

<script>
// import { mapState } from 'vuex'
// import data from './data'
import api from '@/config/api'
// import { $router } from '@/utils/mini'
import { dealPointList } from '@/utils/dataUtil'
// import bridge from '@/utils/bridge'
import header from '@/ui/header'
import icon from '@/ui/icon'
import scroll from '@/ui/scroll'
import modules from '@/components/modules/index'
import pointItem from '@/components/point-item'
import tabbar from '@/components/tabbar'

export default {
  components: {
    [header.name]: header,
    [modules.name]: modules,
    [pointItem.name]: pointItem,
    [tabbar.name]: tabbar,
    [icon.name]: icon,
    [scroll.name]: scroll,
    // [category.name]: category,
  },

  data() {
    return {
      // selectCity,
      selected: '首页',
      tplList: [],
      proList: [],
      finishedTip: '本服务是由"好食期"提供，服务热线：4006458058。',
      loadingTip: '加载中...',
      pullLoading: false,
      finished: false,
      scrollCheck: false,
      pullError: false,
    }
  },

  computed: {
    // ...mapState({ note: state => state.note }),
    // ...mapState({
    //   config: state => state.app.config
    // }),

    // this.$store.state.app.config === {},
  },

  filters: {
    hotSearch(value = {}) {
      const hotSearch = value.hotSearch || {}
      return hotSearch.value || '搜索您想找的商品'
    },
  },

  created() {
    const that = this
    this.$showLoading()
    api.getIndexNew({
      // sourceType: 1, // 会自动根据 terminal 判断
    }, (res) => {
      that.tplList = res.data.list || []
      that.scrollCheck = true
    }, (err) => {
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
        pointChannelId: 1,
      },
    })

    // wechat.share()

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

  mounted() {
    // console.log(this.config)
  },

  methods: {
    pullModel(...rest) {
      api.getPointList.apply(this, rest)
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
          // this.$forward('login')
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
      return dealPointList(list)
    },
    goNext(e) {
      const { type } = e.currentTarget.dataset
      switch (type) {
        // case 'search':
        //   this.$goH5Url(type)
        //   break
        // case 'city':
        //   this.$goH5Url(type)
        //   break
        case 'zt':
          this.$forward(type)
          break
        default:
          // do nothing...
      }
    },
  },
}
</script>

<style lang="stylus" scope>
@import '../../style/var';

.img-badge.soldout {
  position: absolute;
  size: 100%;
  background: url('~assets/img/soldout.png') center no-repeat;
  // background-size: contain;
  background-size: 66.6%;
}

.page-alipay-index {
  position: relative;
  padding-top: 0;
  padding-bottom: 48px;

  .mint-swipe-indicators {
    display: flex;
    align-items: center;
    justify-content: center;
    transform: translateX(-50%) scale(0.5);
    transform-origin: center;
    bottom: 6px;

    .mint-swipe-indicator {
      opacity: 1;
      size: 10px;
      border: 1px solid $rgb226;
      background: $rgb33;

      &.is-active {
        size: 12px;
        background: #fff;
        border: 1px solid $rgb33;
      }
    }
  }

  .index-header {
    display: flex;
    align-items: center;
    padding: 0 16px;
    width: 100%;
    height: 44px;
    line-height: 1;
    overflow: hidden;
    background: #fff;
    font-size: 12px;
    color: $rgb33;
    border-bottom: 1px solid $color-border;

    > .item {
      flex-shrink: 0;
      flex-grow: 0;
    }
    .search {
      flex-shrink: 1;
      flex-grow: 1;
      display: inline-flex;
      align-items: center;
      padding: 0 8px;
      color: $rgb153;
    }
    .icon-index-search {
      margin-right: 4px;
    }
  }
  .logo {
    width: 60px;
    height: 18px;
    .img {
      height: 18px;
    }
  }
  .city {
    height: 100%;
    min-width: 36px;
    max-width: 50px;
    display: inline-flex;
    justify-content: space-between;
    align-items: center;
  }
  .current {
    min-width: 28px;
    max-width: 36px;
    margin-right: 4px;
  }
  .search {
    margin-left: 10px;
    width: 145px;
    height: 30px;
    background: rgb(247, 248, 244);
  }

  .search + .service {
    margin-left: 10px;
  }
}

.list-type-card {
  display: flex;
  justify-content: space-between;
  align-items: stretch;
  flex-wrap: wrap;

  > .item {
    flex-direction: column;
  }
}
</style>
