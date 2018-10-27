<template>
  <div class="app-wrapper"
    v-loading.fullscreen.lock="loading"
    element-loading-text="拼命加载中"
    :class="classObj">
    <template v-if="!loading">
      <div
        class="drawer-bg"
        v-if="device==='mobile' && sidebar.opened"
        @click="handleClickOutside"></div>
      <!-- <div class="kit-sidebar">

        <div class="kit-sidebar__body">
        </div>
      </div> -->
      <sidebar class="sidebar-container"></sidebar>
      <section class="main-container">
        <navbar></navbar>
        <tags-view></tags-view>
        <app-main></app-main>
      </section>
    </template>
  </div>
</template>

<script>
import { Navbar, Sidebar, AppMain, TagsView } from './components';
import ResizeMixin from './mixin/ResizeHandler';
// import api from '@/api';

export default {
  name: 'layout',
  components: {
    Navbar,
    Sidebar,
    AppMain,
    TagsView,
  },
  mixins: [ResizeMixin],
  data() {
    return {
      loading: true,
    };
  },
  computed: {
    sidebar() {
      return this.$store.state.app.sidebar;
    },
    device() {
      return this.$store.state.app.device;
    },
    classObj() {
      return {
        hideSidebar: !this.sidebar.opened,
        withoutAnimation: this.sidebar.withoutAnimation,
        mobile: this.device === 'mobile',
      };
    },
  },
  created() {
    this.getUserInfo();
  },
  methods: {
    handleClickOutside() {
      this.$store.dispatch('closeSideBar', { withoutAnimation: false });
    },
    // 获取当前管理员信息
    getUserInfo() {
      // api.getUserInfo()
      setTimeout(() => {
        this.loading = false;
      }, 300);
    },
  },
};
</script>

<style lang="stylus" scoped>
@import '~@/style/var';

.app-wrapper {
  position: relative;
  height: 100%;
  width: 100%;
}
.drawer-bg {
  background: #000;
  opacity: 0.3;
  width: 100%;
  top: 0;
  height: 100%;
  position: absolute;
  z-index: 999;
}
.kit-sidebar {
  display: flex;
  flex-direction: column;
  width: 180px;
}
</style>
