<template>
  <svg
    :class="svgClass"
    :width="width"
    :height="height"
    aria-hidden="true">
    <use :xlink:href="iconName"></use>
  </svg>
</template>

<script>
export default {
  name: 'icon-svg',
  props: {
    iconClass: {
      type: String,
      required: true,
    },
    className: {
      type: String,
    },
    width: {
      type: String,
    },
    height: {
      type: String,
    },
  },
  computed: {
    iconName() {
      return `#icon-${this.iconClass}`;
    },
    svgClass() {
      return [
        'icon-svg',
        // `icon-svg__${this.name}`,
        this.className, // && /\S/.test(this.className) ? `${this.className}` : '',
      ];
    },
  },
};
</script>

<style scoped>
.icon-svg {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
</style>
