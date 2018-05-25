<template>
  <div class="page-city">
    <vue-header fixed>
      <router-link to="/" slot="left">返回</router-link>
      选择收货省份
    </vue-header>
    <ul class="city-list">
      <li class="city-title">定位地址</li>
      <li class="city-item">点击获取</li>
      <li class="city-title">省份列表</li>
      <template v-for="(item, index) in list">
        <li
        class="city-item"
        :class="{ current: item.id === selectCity.id }"
        :key="item.id"
        :data-index="index"
        @click="onClick($event)"
        >{{ item.province }}</li>
      </template>
    </ul>
  </div>
</template>

<script>
// import { Icon } from 'kit-ui'
import api from '@/config/api'
// import { mapActions } from 'vuex'
import { SELECT_CITY } from '@/store/modules/app'
import header from '@/ui/header'

export default {
  components: {
    [header.name]: header,
  },

  data() {
    return {
      list: [],
      selectCity: this.$store.state.app.selectCity,
    }
  },

  computed: {
    // province: {
    //   get() {
    //     return this.$store.state.app.province;
    //   },
    //   set(value) {
    //     this.$store.commit(GET_PROVINCE, value);
    //   }
    // }
  },

  created() {
    // this.GET_PROVINCE()
    api.provinceList({}, (res) => {
      this.list = res.data.list
      // const { list = [] } = res.data
      // commit(GET_PROVINCE, list)
    }, (err) => {
    })
  },

  methods: {
    // ...mapActions([GET_PROVINCE]),
    onClick(e) {
      const { index } = e.currentTarget.dataset
      const curCity = { ...this.list[index] }
      this.selectCity = curCity
      // console.log(curCity)
      this.$store.commit(SELECT_CITY, curCity);

      this.$back(true);
    },
  },
}
</script>

<style lang="stylus" scoped>
@import '../style/var';

.city-list {
  list-style: none;
  margin: 0;
  padding: 0;
  background-color: #fff;
  font-size: 14px;

  li {
    padding: 0 16px;
    height: 40px;
    line-height: 40px;
    border-bottom: 1px solid $color-border;

    &.current {
      color: red;
    }
  }

  .city-title {
    color: $rgb153;
    background-color: $rgb226;
  }
}

</style>
