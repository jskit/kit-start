# api 配置说明

实现便捷的 api 配置管理

## Mock 数据

如何方便的模拟请求数据

- 基本数据请求
- 交互操作

### usage

```js
import api from '@/api';

api.setCommonParams({});   // 修改全局参数
api.getCommonParams(key);  // 不写key，则返回全部
api.setHeader({});         // 修改header头
api.getHeader(key);        // 不写key，则返回全部

api.login(
  {
    mobile,
    password,
    showLoading: false,    // 是否显示loading，默认 true 显示
  },
  res => {
    console.log(res);
  },
  err => {
    console.log(err);
    // return true;         // 写 return true; 则会阻止后续错误弹出
  }
);
```
