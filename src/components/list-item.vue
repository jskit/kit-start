<template>
  <div
    class="item"
    data-type="detail"
    :data-id="data.id"
    @click="goNext($event)"
    >
    <div class="media" v-if="data.image">
      <div class="image">
        <img class="img" v-lazy="data.image" preload="1" />
        <img class="icon" v-if="data.icon" v-lazy="data.icon" />
        <div class="img-badge soldout" v-if="data.soldout" />
      </div>
      <div class="cd-times" v-if="data.countdown">{{ data.countdown }}</div>
    </div>
    <div class="info">
      <div class="intro">
        <h4 class="title max-line-2"><span class="tag"></span>{{ data.title }}</h4>
      </div>
      <div class="extend">
        <span class="tags"
        v-if="data.tags && data.tags.text"
        :style="{ backgroundColor: data.tags.background }"
        >{{data.tags.text}}</span>
        <vue-price :price="data.price" :size="16" style="color: rgb(237, 0, 0)"></vue-price>
        <del class="del-price">{{ data.marketPrice | formatDel }}</del>
      </div>
      <p v-if="data.isShowDelivery" class="tip">该地区不支持配送</p>
    </div>
  </div>
</template>

<script>
import price from './price'

export default {
  name: 'vue-list-item',

  components: {
    [price.name]: price,
  },

  props: {
    data: Object,
  },

  methods: {
    goNext(e) {
      const { id } = e.currentTarget.dataset
      // debugger
      this.$forward('couple_detail', { id })
    },
  },

}
</script>

<style lang="stylus" scoped>
@import '../style/var';

.item {
  position: relative;
  display: flex;
  // justify-content: space-between;
  justify-content: flex-start;
  align-items: center;
  flex-shrink: 0;
  // 此处使用border-bottom实现，渲染时部分边线不显示
  border: 1px solid $rgb226;
  border-top: none;
  border-left: none;
  overflow: hidden;
  background-color: #fff;
  width: 50%;
  font-size: 12px;

  // 如果设置 border-right: none, 则出现渲染时部分边线不显示问题
  &:nth-of-type(2n) {
    border-right: 1px solid #fff;
  }

  // .flex-v {
  //   justify-content: space-between;
  // }

  .media {
    position: relative;
    overflow hidden
    width: 100%;
    padding-top: 85.3333%;
  }
  .image {
    position absolute 20px 20px 0;
    display flex
    justify-content center
    align-items flex-end
    overflow hidden

    .img {
      height 100%
      width auto
    }
  }

  .cd-times {
    position absolute
    right 0
    bottom 16px
    width 100%
    height 24px
    line-height 24px
    text-align center
    color #fff
    background rgba(53, 53, 53, 0.6)
  }

  .info {
    width: 100%;
    padding: 8px 16px 4px;
    // margin-top -8px
    flex-shrink: 1;
    flex-grow: 1;
    min-height: 60px;
  }

  .intro {
    min-height: 36px;
  }

  .title {
    margin-bottom: 4px;
    line-height: 18px
    max-height: 36px;
    font-weight: 400;
    font-size: 12px;
  }

  .tags {
    position: relative;
    top: -2px;
    min-width: 36px;
    height: 16px;
    line-height: 16px;
    background: $rgb237
    padding: 0px 4px;
    border-radius: 4px
    margin-right: 4px;
    white-space: nowrap;
    display inline-block;
    text-align: center;
    font-size: 12px;
    color: #fff;
  }

  .del-price {
    margin-left: 4px;
  }

  .tip {
    align-self: flex-start;
    // line-height 1
    color: $rgb237;
  }
}

</style>
