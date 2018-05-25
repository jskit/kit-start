<template>
  <vue-tpl
  v-if="$props.data.list.length"
  :data-type="$props.data.type"
  :bg="$props.data.bg && $props.data.bg.url"
  :ratio="ratio"
  :style="styles"
  >
    <section
    class="vue-category"
    :class="classes"
    >
      <div
      class="item"
      v-for="(item, index) in $props.data.list"
      :key="index"
      :data-link="item.jump_url"
      :data-index="index"
      @click="$goLink($event)"
      >
        <div class="image"><img class="full" v-lazy="item.icon" :preload="1" /></div>
        <div class="text">{{item.label}}</div>
      </div>
    </section>
  </vue-tpl>
</template>

<script>
// 小按钮导航
// sub_button
// import xxx from 'xxx'
import vuetpl from './vuetpl'

const defaultData = {
  // preLoad: 0.5,
  // list: [
  //   {
  //     url: '',
  //     image: '',
  //   }
  // ],
}
export default {
  name: 'vue-category',

  components: {
    [vuetpl.name]: vuetpl,
  },

  props: {
    data: {
      type: Object,
      default() {
        return { ...defaultData }
      },
      validator(value = {}) {
        // const isArray = Array.isArray(value.list)
        // const len = isArray && value.list.length
        // return isArray && value.preLoad
        return Array.isArray(value.list)
      },
    },
  },

  data() {
    return { }
  },

  computed: {
    styles() {
      const len = this.$props.data.list.length
      return {
        // minHeight: len < 6 ? '75px' : '140px',
        // maxHeight: len < 6 ? '75px' : '140px',
        height: len < 6 ? '75px' : '140px',
        paddingTop: '0',
      }
    },
    classes() {
      const len = this.$props.data.list.length
      return (len < 6) ? 'r1' : `r${Math.ceil(len / 2)}`
    },
    ratio() {
      return 0
      // const { w, h = 0 } = (this.$props.data.bg || {})
      // if (w) return h / w
      // const len = this.$props.data.list.length
      // return len < 6 ? 0.20 : 0.3733333
    },
  },

  mounted() {
    console.log(this.$props)
  },

  methods: {
    // handleClick(e) {
    //   e.preventDefault()
    //   const { link } = e.currentTarget.dataset
    //   this.$forward(link)
    //   // const dom = this.$el
    //   // dom.style.height = `${dom.offsetHeight}px`
    //   // this.closing = false;
    //   // (this.onClose || noop)(e, this)
    // },
  },
}
</script>

<style lang="stylus" scoped>
@import '../../style/var';

.vue-category {
  width: 100%;
  display: flex;
  flex-flow: row wrap;
  padding: 5px 0;
  align-content: flex-start;
  align-items: center;
  margin-bottom: 5px;

  .item {
    flex: 0 0 20%;
    margin: 5px 0;
    min-width: 20%;
    display: flex;
    align-items: center;
    // justify-content: center;
    justify-content: flex-start;
    flex-direction: column;
  }

  .image {
    width: 35px;
    height: 35px;
  }

  .text {
    display: block;
    font-size: 12px;
    text-align: center;
    color: #333;
    margin-top: 4px;
  }

  &.r1 {
    justify-content: space-around;
  }
  &.r3 .item { flex: 0 0 33.333%; }
  &.r4 .item { flex: 0 0 25%; }
  &.r5 .item { flex: 0 0 20%; }
}
</style>
