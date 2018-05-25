<template>
  <div class="tpl-default tpl-mobile">
    <div class="testing" v-if="isShow">！您正在访问测试页面，下单无效</div>
    <router-view class="page-view"></router-view>
  </div>
</template>

<script>
import env from '@/config/env'

export default {
  name: 'tpl-default',

  data() {
    return {
      isShow: !env.isEnv('prod'),
    }
  },

  components: {

  },
}
</script>

<style lang="stylus" scope>
.tpl-mobile {
  height: 100%;
  overflow: hidden;

  .testing {
    position: relative;
    z-index: 100;
    top: 44px;
    // margin-top: 44px;
    padding: 16px;
    width: 100%;
    color: #ffff00;
    background: red;
    // transition: ease 0.4s;

    // &:hover {
    //   opacity: 0.4;
    // }

    & + .page-view {
      // margin-top: 44px;
    }
  }
}
.host-alipay {
  .tpl-mobile {
    .testing {
      top: 0;
    }
  }
}

.page-view {
  height: 100%;
  overflow-y: scroll;
}

.page-scroll {
  display: flex;
  flex-direction: column;
  overflow: hidden;
  padding-bottom: 48px;
  .vue-header,
  .vue-tabbar {
    flex-shrink: 0;
  }

  .vue-pull-scroll {
    flex: 1;
  }
}
</style>
