<template>
  <div
    class="item"
    data-type="detail"
    :data-id="data.p_sku_id"
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
        <h4 class="title max-line-2"><span class="tags"
        v-if="data.tags && data.tags.text"
        :style="{ color: data.tags.background, borderColor: data.tags.background }"
        >{{data.tags.text}}</span>{{ data.title }}</h4>
      </div>
      <div class="extend flex-v flex-items-center">
        <vue-price
        :price="data.price"
        :point="data.point"
        :size="16"
        style="color: rgb(237, 0, 0)"></vue-price>
        <p class="del-price">价格 <del>{{ data.marketPrice | formatDel }}</del></p>
      </div>
    </div>
  </div>
</template>

<script>
import price from './price'

export default {
  name: 'vue-point-item',

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
      this.$forward('ali_detail', { id })
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

  .media {
    position: relative;
    overflow hidden
    width: 100%;
    padding-top: 85.3333%;
  }
  .image {
    position: absolute 20px 20px 0;
    display: flex;
    justify-content: center;
    align-items: flex-end;
    overflow: hidden;

    .img {
      height: 100%;
      width: auto;
    }
  }

  .cd-times {
    position: absolute;
    right: 0;
    bottom: 16px;
    width: 100%;
    height: 24px;
    line-height: 24px;
    text-align: center;
    color: #fff;
    background: rgba(53, 53, 53, 0.6);
  }

  .info {
    width: 100%;
    padding: 8px 16px 10px;
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
    line-height: 18px;
    max-height: 36px;
    font-weight: 400;
    font-size: 12px;
  }

  .tags {
    min-width: 28px;
    height: 16px;
    line-height: 16px;
    border: 1px solid $rgb237;
    padding: 0px 3px;
    border-radius: 2px;
    margin-right: 4px;
    white-space: nowrap;
    display: inline-block;
    text-align: center;
    font-size: 12px;
    color: #fff;
  }

  .del-price {
    margin-left: 4px;
  }

  .flex-v {
    .now-price + .del-price {
      margin-top: 4px;
    }
  }

  .tip {
    align-self: flex-start;
    // line-height 1
    color: $rgb237;
  }
}

</style>
