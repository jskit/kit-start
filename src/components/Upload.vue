/**
* <Upload target="avatar" :idx="index" @complete="onComplete"></Upload>
* 当页面需要上传不同种类图片时，可传target区分；list多张图片可点击上传时，可传idx下标区分；
* onComplete(status, result, target, index)，status为返回状态，200为成功（这时result为七牛图片信息，result.pic为https图片链接），其它为失败（这时result为错误信息）；target和index为传入的区分参数、可选项
**/
<template>
  <label class="mo-upload">
      <input type="file" :accept="accepts" @change="upload">
      <slot></slot>
  </label>
</template>
<script>
import api from '@/api';
import { ajaxFormData } from '@/api/request/axios';
export default {
  name: 'Upload',
  props: {
    accepts: {
      //允许的上传类型
      type: String,
      default: 'image/jpeg,image/jpg,image/png,image/gif',
    },
    target: [String, Number], //当前上传标识,以便于在同一个监听函数中区分不同的上传域
    idx: [String, Number], //图片数组下标
    maxSize: {
      type: Number,
      default: 0, //上传大小限制
    },
  },
  data() {
    return {
      result: {},
      timeDiff: 0,
      startTime: 0,
    };
  },
  methods: {
    upload(event) {
      let file = event.target.files[0];
      if (file) {
        if (this.maxSize) {
          //todo filter file
        }
        //filter file, 文件大小,类型等过滤
        //如果是图片文件
        // const reader = new FileReader()
        // const imageUrl = reader.readAsDataURL(file)
        // img.src = imageUrl //在预览区域插入图片
        const formData = new FormData();
        formData.append('file', file);
        let timeNow = parseInt(Date.now() / 1000);
        if (this.result.token && timeNow - this.startTime < this.timeDiff) {
          // token是有有效期的，可将token缓存多用几次，需要后端返回过期时间
          const result = { ...this.result };
          formData.append('token', result.token);
          this.uploadImg(formData, result);
          return;
        }
        //获取token
        api.getQiniuToken(
          {},
          response => {
            const result = response.data;
            formData.append('token', result.token);
            this.startTime = parseInt(Date.now() / 1000) - 10;
            this.timeDiff = result.deadline - response.timestamp;
            this.result = result;
            // formData.append('domain', result.domain)
            //提交给七牛处理,http://upload.qiniu.com
            this.uploadImg(formData, result);
          },
          error => {
            this.$emit('complete', 500, error.message);
            event.target.value = null;
          }
        );
      }
    },
    uploadImg(formData, result) {
      const target = this.target;
      const idx = this.idx;
      ajaxFormData(formData)
        .then(res => {
          const resData = res.data;
          if (resData.hash && resData.key) {
            //传递给父组件的complete方法
            resData.domain = result.img_domain;
            resData.pic = result.img_domain + resData.key;
            let img = new Image();
            img.onload = () => {
              resData.width = img.width;
              resData.height = img.height;
              this.$emit('complete', 200, resData, target, idx);
            };
            img.src = resData.pic;
          } else {
            this.$emit('complete', 500, '上传七牛失败');
            this.result = {};
          }
          //让当前target可以重新选择
          event.target.value = null;
        })
        .catch(error => {
          this.$emit('complete', 500, error.message);
          this.result = {};
          event.target.value = null;
        });
    },
  },
};
</script>
<style rel="stylesheet/stylus" lang="stylus" scoped>
.mo-upload {
  display: inline-block;
  position: relative;
  margin-bottom: 0;
  input[type="file"] {
    position: absolute;
    margin-left: -9999px;
    opacity: 0;
    visibility: hidden;
  }
  .mo-upload--label {
    display: inline-block;
    position: relative;
  }
}
</style>
