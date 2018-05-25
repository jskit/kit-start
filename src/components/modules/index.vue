<script>
/**
 * Modules
 * @module components/modules
 * @desc 自定义布局模板库
 * @rules
 *   - 使用模板，如果模板不存在，则无视数据
 *   - 动态渲染
 * @example
 *
 */
import PropTypes from 'vue-types'
import swiper from './swiper'
import category from './category'
import ads from './ads'
import adsTofu from './ads-tofu'
import cTofu from './c-tofu'
import cLabels from './c-labels'
import adsActivity from './ads-activity'
import recActivity from './rec-activity'
import recPoint from './rec-point'
import titleBar from './title-bar'

const tpls = {
  banner: swiper,
  sub_button: category,
  ads,
  ads_tofu: adsTofu,
  'c-tofu': cTofu,
  'c-labels': cLabels,
  ads_activity: adsActivity,
  rec_pin_activites: recActivity,
  rec_point_sku: recPoint,
  title_bar: titleBar,
  // ads_vertical: adsVertical,
}
const tplsName = {}
const components = {}

console.log(tpls)
Object.keys(tpls).map((key) => {
  const module = tpls[key]
  components[module.name] = module
  tplsName[key] = module.name
  return true
})

const defaultData = {}
export default {
  name: 'vue-modules',

  components: {
    ...components,
  },

  props: {
    type: PropTypes.string.isRequired,
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

  computed: {

  },

  methods: {

  },

  render(createElement, context) {
    const { type, data } = this.$props
    /* eslint camelcase: 0 */
    const { margin_top = 0, margin_bottom = 0 } = data

    console.log(type, data)
    // let moduleNode = null
    return tplsName[type] ? createElement(tplsName[type], {
      props: {
        data,
      },
      style: {
        marginTop: `${margin_top / 100}rem`,
        marginBottom: `${margin_bottom / 100}rem`,
      },
    }) : null
    // let moduleNode = null
    // switch (type) {
    //   case 'sub_button': {
    //     moduleNode = (
    //       <vue-category data={ data }></vue-category>
    //     )
    //     break
    //   }
    //   default: {
    //     // do nothing...
    //   }
    // }

    // return moduleNode
  },
}
</script>

<style lang="stylus" scope>

</style>
