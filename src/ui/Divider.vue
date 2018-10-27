
<script>
/**
 * Divider 分割器
 * @module packages/Divider
 * @desc 实现分割线
 * @rules
 *   - 默认透明背景的水平 1px 分割线，内容居中显示，可控制内外间距
 * @param {string} [type] - 显示类型
 * @param {string} [size] - 字体大小
 * @param {string} [color] - 字体颜色
 * @param {number} [line] - 分割线高度
 * @param {numer} [lineWidth] - 分割线宽度
 * @param {string} [lineColor] - 分割线颜色
 * @param {string} [gap] - 4个间距
 *
 * @example
 * <vue-divider :line=1 :lineWidth=10 gap="10 20">xxx</vue-divider>
 */
import VueTypes from 'vue-types';

export default {
  name: 'VueDivider',

  props: {
    prefixCls: VueTypes.string.def('vue-divider'),
    content: String,
    size: String,
    color: String,
    line: Number,
    lineWidth: Number,
    lineColor: String,
    gap: String,
  },

  render(h) {
    const {
      prefixCls,
      content,
      lineColor,
      color,
      gap,
      line,
      lineWidth,
      size,
      type,
    } = this.$props;

    const $content = content || this.$slots.default;
    const wrapCls = {
      [`${prefixCls}`]: true,
      [`${prefixCls}-${type}`]: type,
    };

    const lineStyle = {
      transform: `scaleY(${line})`,
      backgroundColor: lineColor,
    };
    if (lineWidth) {
      lineStyle.width = `${lineWidth / 100}rem`;
    }
    const leftPad = { ...lineStyle };
    const rightPad = { ...lineStyle };
    if (gap) {
      // 间距 1、4为间隔线外间距 2、3为间隔线内间距
      const [pad1, pad2 = pad1, pad3 = pad2, pad4 = pad1] = gap.split(
        /\s*,\s*| +/
      );
      leftPad.marginLeft = `${pad1 / 100}rem`;
      leftPad.marginRight = `${pad2 / 100}rem`;
      rightPad.marginLeft = `${pad3 / 100}rem`;
      rightPad.marginRight = `${pad4 / 100}rem`;
    }

    return (
      <div class={wrapCls}>
        <div class={`${prefixCls}-left`} style={leftPad} />
        <div
          class={`${prefixCls}-center`}
          style={{ fontSize: `${size / 100}rem`, color: `${color}` }}>
          {$content}
        </div>
        <div class={`${prefixCls}-right`} style={rightPad} />
      </div>
    );
  },
};
</script>

<style lang="stylus" scope>

.vue-divider {
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: 100%;

  &-left, &-right {
    flex-grow: 1;
    height: 1px;
    background-color: red;
    transform: scaleY(1);
  }

  &-left {
    // margin-right: 16px
  }

  &-right {
    // margin-left: 16px
  }

  &-center {
    flex-grow: 0;
    flex-shrink: 0;
  }
}
</style>
