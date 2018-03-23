<script>
export default {
  name: 'vue-price',
  props: {
    data: [String, Number],
    size: Number,
  },
  computed: {
    priceArr() {
      return Number(this.data * 0.01).toFixed(2).split('.')
    },
  },
  render(h) {
    const { priceArr, size } = this
    const styles = size ? { fontSize: `${size / 100}rem` } : {}
    return (
      <span
      class="now-price">¥<dfn
      class="price"
      style={ styles }
      >
        { priceArr[0] }
        <i class="num">.{ priceArr[1] }</i></dfn>
      </span>
    )
  }
}
</script>

<style lang="stylus" scope>
@import '../style/var';

// .del-price {
//   color: $rgb153
// }

.now-price {
  font-size: 12px
  color: $rgb234
  dfn.price {
    margin-left 2px
    font-size: 27px
    font-style: normal
  }
  i.num {
    font-size: 12px
  }
}
</style>
