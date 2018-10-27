<template>
  <div
  class="hamburger-box"
  @click="toggleClick"
  >
    <svg t="1492500959545" class="hamburger" :class="{'is-active':isActive}" style="" viewBox="0 0 1024 1024"
      version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1923" xmlns:xlink="http://www.w3.org/1999/xlink" width="64" height="64">
      <path d="M112 799.99999998h800c26.5 0 48 21.5 48 48s-21.5 48-48 48H113c-26.5 0-48-21.5-48-48s21.5-48 48-48z m801-240H433c-26.5 0-48-21.5-48-48s21.5-48 48-48h480c26.5 0 48 21.5 48 48s-21.5 48-48 48zM243.7 668.39999998L78.6 524.09999998c-6.7-5.8-7.3-15.9-1.5-22.6 0.5-0.5 1-1.1 1.5-1.5l165.1-144c3.3-2.9 8.4-2.6 11.3 0.8 1.3 1.5 2 3.3 2 5.3v300.3c0 4.4-3.6 8-8 8-1.9 0-3.8-0.7-5.3-2zM913 223.99999998H113c-26.5 0-48-21.5-48-48S86.5 127.99999998 113 127.99999998h800c26.5 0 48 21.5 48 48s-21.5 48-48 48z" p-id="1924"></path>
    </svg>
  </div>
</template>

<script>
export default {
  name: 'hamburger',
  props: {
    isActive: {
      type: Boolean,
      default: false,
    },
    toggleClick: {
      type: Function,
      default: null,
    },
  },
};
</script>

<style scoped>
.hamburger-box {
  cursor: pointer;
}
.hamburger {
  display: inline-block;
  width: 20px;
  height: 20px;
  transform: scaleX(-1);
  transition: 0.38s;
  transform-origin: 50% 50%;
  /* opacity: 0.5; */
}
/* .hamburger:hover {
  opacity: 1;
} */
.hamburger.is-active {
  transform: scaleX(1);
}
</style>
