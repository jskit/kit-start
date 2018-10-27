<template>
  <a class="vue-tab-item"
    @click="$parent.$emit('tab-click', id, $event)"
    :class="{ 'is-selected': $parent.value === id }">
    <div class="item-icon">
      <slot name="icon"></slot>
    </div>
    <div class="item-text"><slot></slot></div>
  </a>
</template>

<script>
/**
 * tab-item
 * @module components/tab-item
 * @desc 搭配 tabbar 或 navbar 使用
 * @param {*} id - 选中后的返回值，任意类型
 * @param {string} [id] - key
 * @param {string} [icon] - icon 图标类（推荐使用svg）
 * @param {string} [iconPath] - icon 图标路径
 * @param {string} [activeIcon] - 选择高亮
 * @param {string} [text] - 文字
 *
 * @example
 * <vue-tab-item>
 *   <img slot="icon" src="http://placehold.it/100x100">
 *   订单
 * </vue-tab-item>
 */
export default {
  // 数据应以对象形式传入，点击时返回当前数据
  name: 'vue-tab-item',

  props: {
    id: [Number, String],
    icon: String,
    iconPath: String,
    selectedIconPath: String,
    text: String,
  },
};
</script>

<style lang="stylus" scoped>
.vue-tab-item {
  display: block;
  padding: 4px 0 4px;
  flex: 1;
  text-decoration: none;
  user-select: none;

  &.is-selected .item-icon {
    color: #fdf187;
  }

  .item-icon {
    size: 24px;
    margin: 0 auto 4px;
    color: #dbdbdb;

    &:empty {
      display: none;
    }

    & > * {
      display: block;
      size: 100%;
    }
  }

  .item-text {
    color: inherit;
    font-size: 12px;
    line-height: 1;
  }
}
</style>
