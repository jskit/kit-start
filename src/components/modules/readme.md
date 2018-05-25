# 组件库

自定义组件要求要兼容前端的使用，实现保持一致，为避免差异性，引入其依赖，保证实现完全一致。如有例外，需特殊说明

## 自定义组件

自定义组件命名、数据结构要求统一。

## 注意事项

- 依赖样式库变量 `style/var` 前端项目常用变量
- 组件命名格式 `c-xxx`，以 `c-` 开头，对应数据字段 `type`
- 组件包含多种布局，数据格式如 `layout: '1-3'`，简单表现布局情况
- 必须包含在 `list` 数据

## 数据格式

```js
// 示例 豆腐块
{
  type: 'c-tofu',
  layout: '1-1',
  comment: '新豆腐块广告',
  margin_top: 0,
  margin_bottom: 0,
  width: 5,
  height: 3,
  bg: '',
  list: [
    {
      "id": 261,
      "image": {
        "url": "http://img2.haoshiqi.net/ma88f1285ddc94bc0c0449f52db00e14b5.jpg",
        "w": 540,
        "h": 540
      },
      "link": "https://m.haoshiqi.net/#zt_template?topic_code=9b7071dcbe6bf142260b62c3f277665a"
    },
  ],
}
```
