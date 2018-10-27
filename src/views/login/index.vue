<template>
  <div class="login-container">
    <el-form
      class="login-form"
      autoComplete="on"
      :model="loginForm"
      :rules="loginRules"
      ref="loginForm"
      label-position="left">
      <div class="title-container">
        <h3 class="title">{{site.title}}</h3>
        <!-- <lang-select class="set-language"></lang-select> -->
      </div>
      <el-form-item prop="username">
        <span class="svg-container svg-container_login">
          <icon-svg icon-class="user" />
        </span>
        <el-input name="username" type="text" v-model="loginForm.username" autoComplete="on" placeholder="用户名" />
      </el-form-item>

      <el-form-item prop="password">
        <span class="svg-container">
          <icon-svg icon-class="password" />
        </span>
        <el-input name="password" :type="passwordType" @keyup.enter.native="handleLogin" v-model="loginForm.password" autoComplete="on" placeholder="密码" />
        <span class="show-pwd" @click="showPwd">
          <icon-svg icon-class="eye" />
        </span>
      </el-form-item>

      <el-button class="btn-login" :loading="loading" @click.native.prevent="handleLogin">{{$t('login.logIn')}}</el-button>

      <!-- <div class="tips">
        <span>{{$t('login.username')}} : admin</span>
        <span>{{$t('login.password')}} : {{$t('login.any')}}</span>
      </div>
      <div class="tips">
        <span style="margin-right:18px;">{{$t('login.username')}} : editor</span>
        <span>{{$t('login.password')}} : {{$t('login.any')}}</span>
      </div>

      <el-button class="thirdparty-button" type="primary" @click="showDialog=true">{{$t('login.thirdparty')}}</el-button> -->
    </el-form>

    <!-- <el-dialog :title="$t('login.thirdparty')" :visible.sync="showDialog" append-to-body>
      {{$t('login.thirdpartyTips')}}
      <br/>
      <br/>
      <br/>
      <social-sign />
    </el-dialog> -->
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { isvalidUsername } from '@/utils/validate';
import LangSelect from '@/components/LangSelect';
// import SocialSign from './socialsignin'

export default {
  components: {
    LangSelect,
    // SocialSign,
  },
  name: 'login',
  data() {
    const validateUsername = (rule, value, callback) => {
      if (!isvalidUsername(value)) {
        callback(new Error('请输入正确的用户名'));
      } else {
        callback();
      }
    };
    const validatePassword = (rule, value, callback) => {
      if (value.length < 6) {
        callback(new Error('密码不能小于5位'));
      } else {
        callback();
      }
    };
    return {
      loginForm: {
        username: 'test@admin.com',
        password: '123456',
      },
      loginRules: {
        username: [
          {
            required: true,
            trigger: 'blur',
            validator: validateUsername,
          },
        ],
        password: [
          {
            required: true,
            trigger: 'blur',
            validator: validatePassword,
          },
        ],
      },
      passwordType: 'password',
      loading: false,
      showDialog: false,
    };
  },
  computed: {
    ...mapGetters(['site']),
  },
  methods: {
    showPwd() {
      if (this.passwordType === 'password') {
        this.passwordType = '';
      } else {
        this.passwordType = 'password';
      }
    },
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true;
          const { username = '', password } = this.loginForm;
          const userInfo = {
            email: username.trim(),
            password,
          };
          console.log('login');
          this.$store
            .dispatch('Login', userInfo)
            .then(() => {
              this.loading = false;
              debugger;
              this.$router.push({ path: '/' });
            })
            .catch(() => {
              this.loading = false;
            });
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    afterQRScan() {
      // const hash = window.location.hash.slice(1)
      // const hashObj = getQueryObject(hash)
      // const originUrl = window.location.origin
      // history.replaceState({}, '', originUrl)
      // const codeMap = {
      //   wechat: 'code',
      //   tencent: 'code'
      // }
      // const codeName = hashObj[codeMap[this.auth_type]]
      // if (!codeName) {
      //   alert('第三方登录失败')
      // } else {
      //   this.$store.dispatch('LoginByThirdparty', codeName).then(() => {
      //     this.$router.push({ path: '/' })
      //   })
      // }
    },
  },
  created() {
    // window.addEventListener('hashchange', this.afterQRScan)
  },
  destroyed() {
    // window.removeEventListener('hashchange', this.afterQRScan)
  },
};
</script>

<style lang="stylus">
$bg = #2d3a4b;
$light_gray = #eee;

/* reset element-ui css */
.login-container {
  .el-input {
    display: inline-block;
    height: 48px;
    width: 85%;
    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      // color: $light_gray;
      color: rgba(0, 0, 0, 0.65);
      color: #555555;
      font-size: 16px;
      height: 48px;

      &:focus {
        // border: #40a9ff;
      }

      &:-webkit-autofill {
        // background: #fff;
        -webkit-box-shadow: 0 0 0px 1000px #fff inset !important;
        // -webkit-text-fill-color: #fff !important;
        // -webkit-box-shadow: none !important;
        // -webkit-text-fill-color: #fff !important;
      }
    }
  }
  .el-form-item {
    // border: 1px solid rgba(255, 255, 255, 0.1);
    // background: rgba(0, 0, 0, 0.1);
    // color: #454545;
    margin-bottom: 24px;
    border: 1px solid #d9d9d9;
    border-radius: 5px;
    color: rgba(0, 0, 0, 0.65);
    color: #555555;
  }
  .el-form-item__content {
    display: flex;
  }
}

</style>

<style lang="stylus" scoped>
@import '~@/style/var';

$bg = #2d3a4b;
$dark_gray = #889aa4;
$light_gray = #eee;

.login-container {
  position: fixed;
  height: 100%;
  width: 100%;
  background-color: $bg;
  background-image: url('~assets/img/bg-login.png');;
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  overflow: hidden;
  .login-form {
    position: absolute;
    left: 0;
    right: 0;
    width: 420px;
    padding: 40px;
    margin: 130px auto 0;
    background-color: #fff;
    border-radius: 4px;
    animation-duration: 0.3s;
    animation-fill-mode: both;
    animation-name: kit-enter-up;
  }
  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;
    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }
  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
    font-size: 16px;
  }
  .title-container {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 10px 0 0 -60px;
    padding: 20px 16px 20px 60px;
    background: $logoColor;
    position: relative;
    margin-bottom: 60px;
    color: #fff;

    &:before {
      content: '';
      position: absolute;
      left: 0;
      bottom: -8px;
      width: 0;
      height: 0;
      border-width: 8px 0 0 20px;
      border-style: solid;
      border-color: #151515 transparent transparent transparent;
    }

    .title {
      font-size: 16px;
      font-weight: 400;
      // color: $light_gray;
      // margin: 0px auto;
      // text-align: center;
      font-weight: bold;
    }
    .set-language {
      color: #fff;
      // position: absolute;
      // top: 5px;
      // right: 0px;
    }
  }
  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }
  .btn-login {
    display: block;
    margin-top: 40px;
    width: 100%;
    height: 48px;
    font-size: 16px;
    background-color: $logoColor;
    border-color: $logoColor;
    color: #fff;
  }
  .thirdparty-button {
    position: absolute;
    right: 35px;
    bottom: 28px;
  }
}
</style>
