<!-- 页面容器 -->
<template>
  <section class="page-container">
    <div class="page-view">
      <slot></slot>
    </div>
  </section>
</template>

<script>
export default {
  name: 'Page',
};
</script>

<style lang="stylus" scoped>
// .transition-box {
//   position: absolute;
//   z-index: 0;
//   width: 100%;
//   overflow-x: hidden;
//   overflow-y: auto;
//   transition: all 0.4s ease;

//   height: 100%;
// }

// forward  router-transition-forward router-transition-css-forward
// backward router-transition-backward router-transition-css-backward
.router-transition-css-forward .page-next {
  animation: page-next-to-current .4s forwards
}

.router-transition-css-forward .page-next:before {
  position: absolute;
  top: 0;
  width: 16px;
  bottom: 0;
  z-index: -1;
  content: '';
  opacity: 0;
  right: 100%;
  background: linear-gradient(to right,rgba(0,0,0,0) 0%,rgba(0,0,0,0) 10%,rgba(0,0,0,.01) 50%,rgba(0,0,0,.2) 100%);
  animation: page-next-to-current-shadow .4s forwards
}

.router-transition-css-forward .page-current {
  -webkit-animation: page-current-to-previous .4s forwards;
  animation: page-current-to-previous .4s forwards
}

.router-transition-css-forward .page-current:after {
  position: absolute;
  left: 0;
  top: 0;
  background: rgba(0,0,0,.1);
  width: 100%;
  bottom: 0;
  content: '';
  opacity: 0;
  z-index: 10000;
  animation: page-current-to-previous-opacity .4s forwards
}
@keyframes page-next-to-current {
  from {
    -webkit-transform: translate3d(100%,0,0);
    transform: translate3d(100%,0,0)
  }

  to {
    -webkit-transform: translate3d(0%,0,0);
    transform: translate3d(0%,0,0)
  }
}
@keyframes page-previous-to-current {
  from {
    -webkit-transform: translate3d(-20%,0,0);
    transform: translate3d(-20%,0,0)
  }

  to {
    -webkit-transform: translate3d(0%,0,0);
    transform: translate3d(0%,0,0)
  }
}
@keyframes page-previous-to-current-opacity {
  from {
    opacity: 1
  }

  to {
    opacity: 0
  }
}
@keyframes page-current-to-previous-opacity {
  from {
    opacity: 0
  }

  to {
    opacity: 1
  }
}
.page-previous {
  transform: translate3d(-20%,0,0)
}
.page-next {
  transform: translate3d(100%,0,0)
}

// .slide-left-enter,
// .slide-right-leave-active{
//   opacity: 0;
//   transform: translate3D(30px, 0, 0);
// }

// .slide-left-leave-active,
// .slide-right-enter{
//   opacity: 0;
//   transform: translate3D(-30px, 0, 0);
// }

.no-mode-translate-fade-enter-active, .no-mode-translate-fade-leave-active {
  transition: all 1s;
}
.no-mode-translate-fade-enter, .no-mode-translate-fade-leave-active {
  opacity: 0;
}
.no-mode-translate-fade-enter {
  transform: translateX(31px);
}
.no-mode-translate-fade-leave-active {
  transform: translateX(-31px);
}
</style>
