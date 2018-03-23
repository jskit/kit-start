<template>
  <div class="price-box">
    <div class="item item-type">{{ type }}</div>
      <div class="item {{rmb ? 'item-rmb' : 'item-price'}}">{{ price | format }}</div>
    <block v-if="point > 0">
      <div class="item item-point">{{ point }}</div>
    </block>
    <block v-if="marketPrice > 0">
      <div class="item item-market-price">{{ marketPrice | format }}</div>
    </block>
  </div>
</template>

<script>
export default {
  name: 'vue-price',

  components: {},

  props: {},

  data() {
    return {}
  },
}
</script>

<style lang="stylus" scoped>
.price-box {
  display: inline-flex;
  justify-content: flex-start;
  align-items: flex-end;
  font-weight: normal;
  line-height: 1;
  font-size: 24rpx;
  color: rgb(136, 136, 136);

  & + & {
    margin-top: 20rpx;
  }

  & .item {
    font-size: 32rpx;
  }

  & .item-type,
  & .item-rmb,
  & .item-price,
  & .item-point {
    color: rgb(237, 0, 0);
  }

  & .item-type {
    font-size: 28rpx;
  }

  & .item-market-price {
    position: relative;
    top: -2rpx;
    font-size: 24rpx;
    text-decoration: line-through;
    color: rgb(136, 136, 136);
  }

  & .item-price:after,
  & .item-market-price:before,
  & .item-point:before,
  & .item-point:after {
    position: relative;
    top: -2rpx;
    font-size: 24rpx;
  }

  .item-rmb + .item-point:before,
  .item-price + .item-point:before {
    content: '+';
  }

  & .item-rmb:before {
    content: '¥';
    font-size: 28rpx;
  }

  & .item-price:after {
    content: '元';
  }

  .item-rmb + .item-market-price,
  .item-price + .item-market-price,
  .item-point + .item-market-price {
    margin-left: 10rpx;
  }

  & .item-market-price:before {
    content: '¥';
    top: 0;
  }

  & .item-point:after {
    content: '积分';
  }
}
</style>
