<template>
  <div class="app-container">
    <el-form ref="form" :model="form" label-width="120px">
      <el-form-item>
        <!-- <h4>链接种类太多，不知道怎么配置，怎么办？</h4> -->
        <p>以下功能支持自动生成 <b>场景A</b> -> <b>场景B</b> 的跳转链接</p>
      </el-form-item>
      <el-form-item label="在哪配置">
        <el-radio-group v-model="form.source">
          <el-radio label="life">生活号/H5页面</el-radio>
          <el-radio label="couple">拼团小程序</el-radio>
          <el-radio label="point">积分小程序</el-radio>
          <el-radio label="message">短信</el-radio>
          <el-radio label="tplmsg">模板消息</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="选择页面">
        <el-input placeholder="如需要参数，请输入参数 如 id=xxx topic_code=xxx" v-model="form.params" class="input-with-select">
          <el-select v-model="form.page" slot="prepend" placeholder="请选择">
            <el-option label="首页 index" value="index"></el-option>
            <el-option label="详情 detail" value="detail"></el-option>
            <el-option label="专题 zt2" value="zt2"></el-option>
            <el-option label="个人中心 profile" value="profile"></el-option>
            <el-option label="订单列表 order-list" value="order-list"></el-option>
            <el-option label="订单详情 order-detail" value="order-detail"></el-option>
            <el-option label="邀请拼团 couple-share" value="couple-share"></el-option>
          </el-select>
        </el-input>
      </el-form-item>
      <el-form-item label="跳转到哪里">
        <el-radio-group v-model="form.dist">
          <el-radio label="life">生活号</el-radio>
          <el-radio label="couple">拼团小程序</el-radio>
          <el-radio label="point">积分小程序</el-radio>
          <el-radio label="othermini">其他小程序</el-radio>
        </el-radio-group>
        <div v-show="form.dist === 'othermini'">
          <el-input placeholder="其他小程序链接 如 ${page}?appid=${appId}&xx=xxx" v-model="form.othermini" class="input-with-select"></el-input>
          <div class="content-example">
            <p v-for="(value, key) in otherMinis" :key="key">
              {{ key }}: {{ value }}
            </p>
          </div>
        </div>
      </el-form-item>
      <el-form-item label="是否需要渠道">
        <!-- <el-switch v-model="form.channel"></el-switch>
      </el-form-item>
      <el-form-item label="目标渠道"> -->
        <el-radio-group v-model="form.channel">
          <el-radio label="">无渠道</el-radio>
          <el-radio label="point">积分小程序</el-radio>
          <el-radio label="alipay_ant">蚂蚁会员</el-radio>
          <el-radio label="huabei">花呗</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="生成结果">
        <div class="output">
          <div class="output-item">{{ output }}</div>
          <div class="output-item">{{ tip }}</div>
        </div>
      </el-form-item>
      <el-form-item v-show="form.createShortUrl">
        <!-- <el-button type="primary" @click="onSubmit">生成短链接</el-button> -->
        <a href="http://dwz.wailian.work/" target="_blank">
          <el-button type="primary" @click="onSubmit">生成短链接</el-button>
        </a>
        <!-- <el-button type="danger" @click="onCancel">重置</el-button> -->
      </el-form-item>
      <el-form-item label="">
        <div class="output">
          <div class="output-item">{{ form.shortUrl }}</div>
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
// import { ajax } from '@/api/request';
// import base64 from '@/utils/base64';

function stringify(params = {}) {
  if (typeof params === 'string') return params;
  const temp = params;
  const arr = [];
  for (const key in params) {
    if (!temp[key]) {
      delete temp[key];
    } else {
      arr.push(`${key}=${temp[key]}`);
    }
  }
  return arr.join('&');
}
const getPage = (page, source) => {
  if (!page) return '';
  if (['life', 'message'].indexOf(source) > -1 && page === 'index') return '';
  return `pages/${page}/${page}`;
};

const minis = {
  point: 2018051160096372,
  couple: 2017112000051610,
};

const getAliSchema = name => {
  const appId = minis[name];
  return `alipays://platformapi/startApp?appId=${appId}`;
};
const getMiniSchema = ({ page, appid, appname }) => {
  let params = appid ? `appid=${appid}` : `appname=${appname}`;
  if (appname && minis[appname]) {
    params = `appname=${appname}`;
  }
  return `miniapp://pages/${page}/${page}?${params}`;
};
const getMiniOther = params => {
  return `miniapp://${params}`;
};
const getHttpUrl = schemaUrl => {
  return `https://ds.alipay.com/?from=mobilecodec&scheme=${encodeURIComponent(
    schemaUrl
  )}`;
};

/* eslint quote-props: 0 */
const otherMinis = {
  in最美证件照: 'pages/index?appid=2018013102119843&chanel=Haoshiqi',
  in照片打印定制: 'pages/index/index?appid=2017111409929370&_s=haoshiqi',
};

export default {
  data() {
    return {
      otherMinis,
      form: {
        createShortUrl: false,
        source: 'life',
        page: 'index',
        params: '',
        dist: 'couple',
        othermini: otherMinis[0],
        miniapp: false,
        channel: '',
        tip: '',
        result: '',
        shortUrl: '',
      },
    };
  },
  computed: {
    output() {
      return this.computedUrl();
    },
  },
  methods: {
    computedUrl() {
      // 一系列运算
      // 判断当前以及目标环境，页面以及参数，渠道信息，生成结果
      /* eslint prefer-const: 0 */
      this.tip = '';
      let {
        source = '',
        dist = '',
        params = '',
        page = 'index',
        channel = '',
        spm = '',
      } = this.form;
      this.form.createShortUrl = source === 'message';
      if (params) {
        params = `?${params}`;
      }
      const channelParams = stringify({
        spm,
        channel_id: channel,
      });
      const url = {
        query: encodeURIComponent(channelParams),
        page: `${getPage(page, source)}${encodeURIComponent(params)}`,
      };
      let result = stringify(url);
      switch (source) {
        case 'tplmsg':
          if (dist === 'life') {
            this.tip = '暂未支持！！！';
            return '';
          }
          if (['couple', 'point'].indexOf(dist) > -1) {
            this.tip = '模板消息，跳转到对应小程序，支持配置渠道';
            params = params
              ? `${params}${channelParams}`
              : channelParams
                ? `?${channelParams}`
                : `${channelParams}`;
            return `${getPage(page)}${params}`;
          }
          break;
        /* eslint no-case-declarations: 0 */
        case 'couple':
        case 'point':
          if (dist === 'life') {
            this.tip = '小程序不支持向外跳转！！！';
            return '';
          }
          if (dist === source) {
            this.tip =
              '这是小程序内跳转，直接使用以前的H5链接即可，注意：此时暂不支持渠道';
            this.form.channel = '';
            return ``;
            // return `${getPage(page)}${params}`;
          }
          this.tip = '这是小程序间跳转';
          if (dist === 'point') {
            channel = channel ? `&channel_id=${channel}` : '';
          } else {
            this.tip += '，跳转拼团小程序不支持渠道';
            channel = '';
          }
          if (dist === 'othermini') {
            this.tip += '，跳转其他小程序，请设置跳转页面以及appid，请参考示例';
            channel = '';
            result = getMiniOther(this.form.othermini);
            return result;
          }
          let tempParams = this.form.params;
          if (tempParams) {
            tempParams = `&${tempParams}`;
          }
          const miniApp = {
            page,
            appname: dist,
            appid: minis[dist],
          };
          result = `${getMiniSchema(miniApp)}${channel}${tempParams}`;
          break;
        case 'message': {
          this.tip = '短信内限制必须使用http协议';
          // if (dist === 'life') {
          //   return 'alipays://platformapi/startapp?appId=20000943&path=homepage&groupId=027be25993b141474225295709100000&sourceId=referLink';
          // }
          if (dist === 'life') {
            this.tip = '这个？O__O … 你自己有的吧';
            return '';
          }
          if (result) result = `&${result}`;
          const schemaUrl = `${getAliSchema(dist)}${result}`;
          result = `${getHttpUrl(schemaUrl)}`;
          break;
        }
        case 'life':
          // 生活号配置跳转到小程序，需要使用alipaySchema
          if (dist === 'life') {
            this.tip = '你本就可以随意配置';
            return '';
          }
          if (result) result = `&${result}`;
          result = `${getAliSchema(dist)}${result}`;
          break;
        default:
        // do nothing...
      }

      this.resultUrl = result;
      return result;
    },
    onSubmit() {
      if (this.form.source !== 'message') {
        this.$message({
          message: '暂时只支持短信配置生成短链接',
          type: 'warning',
        });
        return;
      }

      console.log(111);
      // this.shortUrl = '请打开链接自己生成';
      // 都存在跨域问题，无法直接调用生成结果
      // http://dwz.wailian.work/
      // http://dwz.cn/
      // const base64Url = base64.encode(this.resultUrl);
      // ajax({
      //   // url: 'http://dwz.cn/create.php',
      //   url: 'http://dwz.wailian.work/api.php',
      //   method: 'post',
      //   data: {
      //     url: base64Url,
      //     // site: sina
      //   },
      // }).then((res) => {
      //   console.log(res);
      //   this.loading = false;
      // }).catch(err => {
      //   this.loading = false;
      // });
    },
    onCancel() {
      this.$message({
        message: 'reset!',
        type: 'warning',
      });
    },
  },
};
</script>

<style lang="stylus">
.line{
  text-align: center;
}
.output {
  max-width: 600px;
  padding-top: 10px;
  line-height: 1.5;
  word-break: break-all;

  .output-item {
    margin-bottom: 16px;
  }
  .output-item:empty {
    display: none;
  }
}
.input-with-select .el-input__inner {
  // width: 130px;
  min-width: 240px;
}
.input-with-select .el-input-group__prepend {
  // background-color: #fff;
}
.content-example {
  line-height: 1.5;
}
</style>
