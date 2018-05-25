<template>
  <div class="page-profile">
    <vue-header>个人中心</vue-header>
    <!-- <div class="header">
      个人中心
    </div>
    <div class="login-desc">
      <div class="user-desc">
        <div class="user-avatar">
        </div>
        <div class="user-name">
          {{ userName }}
        </div>
        <div class="guide-text">
          账户、收货地址管理
        </div>
      </div>
      <div class="order-desc">
        <div class="all-order icon-more">
          <span class="item-title">我的订单</span>
          <span class="item-content">查看全部订单</span>
        </div>
        <div class="column-list">
          <div class="column-item" v-for="item in orderItem">
            <img :src="item.image" alt="">
            <span >{{ item.text }}</span>
          </div>
        </div>
      </div>
    </div>
    <div class="my-active">
      <div class="item icon-more" :class="{'no-border' : !!item.noBorder }" v-for="item in myItem">
        <span>{{item.title}}</span>
      </div>
    </div>
    <div class="my-active">
      <div class="item icon-more" :class="{'no-border' : !!item.noBorder }" v-for="item in appItem">
        <span>{{item.title}}</span>
      </div>
    </div> -->
  </div>
</template>

<script>
import header from '@/ui/header'

export default {
  components: {
    [header.name]: header,
  },

  data() {
    return {
    }
  },
}


// export default{
//   data () {
//     return {
//       userName: '未登录',
//       orderItem: [
//         {
//           image: '',
//           text: '待付款'
//         },
//         {
//           image: '',
//           text: '待收货'
//         },
//         {
//           image: '',
//           text: '待评价'
//         },
//         {
//           image: '',
//           text: '售后'
//         }
//       ],
//       myItem: [
//         {
//           title: '我的优惠券',
//           url: '',
//           noBorder: true
//         },
//         {
//           title: '我的拼团',
//           url: '',
//         },
//         {
//           title: '我的抽奖',
//           url: '',
//         }
//       ],
//       appItem: [
//         {
//           title: '我的收藏',
//           url: '',
//           noBorder: true
//         },
//         {
//           title: '好食期客服',
//           url: '',
//         }
//       ]
//     }
//   },
// }
</script>

<style lang="stylus" scope>



// .profile-page
//   background-color #f8f8f8
// .header{
//   width:100%;
//   height: 44px;
//   background-color: #fff;
//   font-size: 16px;
//   text-align:center;
//   line-height: 44px;
// }
// .user-desc{
//   width:100%;
//   height:96px;
//   margin-bottom: 10px;
//   font-size:12px;
//   background-color:#fcf196;
//   position: relative;
//   overflow:hidden;
//   padding 10px 16px;
// }
// .user-avatar{
//   width 60px;
//   height 60px
//   border-radius 100px
//   margin-top 8px
//   background-color #ed0000
//   float left
// }
// .user-name{
//   overflow hidden;
//   color #212121;
//   line-height 76px
//   padding-left 10px
// }
// .guide-text{
//   position absolute
//   right 16px
//   bottom 10px
// }
// .order-desc{
//   width 100%
//   background-color #fff
// }
// .all-order{
//   overflow hidden
//   line-height 45px
//   padding 0 15px
// }
// .item-title{
//   float left
//   color #212121
//   font-size 12px
// }
// .item-content{
//   float right
//   color #959595
//   white-space nowrap
//   font-size 10px
//   margin-right 10px
// }
// .column-list{
//   width: 100%;
//   height: 73px;
//   display: flex;
//   border-top: 1px solid #e2e2e2;
// }
// .column-item{
//   flex 1
//   text-align: center;
//   justify-content: center;
//   align-items: center;
//   display: flex;
//   flex-direction: column;
// }
// .column-item>img{
//   width: 24px;
//   height: 24px;
//   background-color #ed0000
// }
// .column-item>span{
//   font-size 10px
//   color #959595
//   margin-top 5px
// }
// .icon-more {
//   position relative
//   &::after {
//     content: '';
//     display: inline-block;
//     width: 8px;
//     height: 8px;
//     color inherit
//     border-width: 1px 1px 0 0;
//     border-color: currentColor;
//     border-style: solid;
//     transform: matrix(0.71, 0.71, -0.71, 0.71, 0, 0);
//     position absolute
//     right 15px
//     top 50%
//     margin-top -4px
//     color #999
//   }
// }
// .my-active{
//   margin-top 10px
//   background-color #fff
//   .item{
//     padding 0 16px
//     color #212121
//     font-size 12px
//     border-top 1px solid #e2e2e2
//     &.no-border{
//       border: none;
//     }
//     span{
//       line-height 40px
//     }
//   }
// }
</style>
