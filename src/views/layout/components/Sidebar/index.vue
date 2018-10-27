<template>
  <section class="kit-sidebar">
    <div class="kit-sidebar__header">
      <h1 class="kit-sidebar__brand">
        <router-link :to="{ name: 'dashboard' }" class="kit-sidebar__brand-lg">{{`${site.title}${site.desc}`}}</router-link>
        <router-link :to="{ name: 'dashboard' }" class="kit-sidebar__brand-mini">{{site.title}}</router-link>
      </h1>
    </div>
    <el-scrollbar class="kit-sidebar__body" wrapClass="scrollbar-wrapper">
      <el-menu
        mode="vertical"
        :show-timeout="200"
        :default-active="$route.path"
        :collapse="isCollapse"
        background-color="#304156"
        text-color="#bfcbd9"
        active-text-color="#409EFF"
      >
        <sidebar-item
          v-for="route in menus"
          :key="route.name"
          :item="route"
          :base-path="route.path">
        </sidebar-item>
      </el-menu>
    </el-scrollbar>
  </section>
</template>

<script>
import { mapGetters } from 'vuex';
import SidebarItem from './SidebarItem';
// import api from '@/api';

export default {
  components: { SidebarItem },
  computed: {
    ...mapGetters([
      'menus',
      // 'permission_routers',
      'sidebar',
      'site',
    ]),
    isCollapse() {
      return !this.sidebar.opened;
    },
  },
  created() {
    // api.getMenu({}, (res) => {
    //   console.log(res);
    // }, (err) => {
    // })
  },
};
</script>

<style lang="stylus" scoped>
/*
background-color="#304156"
text-color="#bfcbd9"
active-text-color="#409EFF"

new
sidebar:
background-color="#001529"
text-color="hsla(0,0%,100%,.65)"
active-text-color="#1890ff"
*/
</style>
