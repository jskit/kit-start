<template>
  <el-upload action="https://upload.qbox.me" :data="dataObj" drag :multiple="true" :before-upload="beforeUpload">
    <i class="el-icon-upload"></i>
    <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
  </el-upload>
</template>


<script>
import { getToken } from '@/api/old/qiniu';
// 获取七牛token 后端通过Access Key,Secret Key,bucket等生成token
// 七牛官方sdk https://developer.qiniu.com/sdk#official-sdk

export default {
  data() {
    return {
      dataObj: { token: '', key: '' },
      image_uri: [],
      fileList: [],
    };
  },
  methods: {
    beforeUpload() {
      const that = this;
      return new Promise((resolve, reject) => {
        getToken()
          .then(res => {
            const key = res.data.qiniu_key;
            const token = res.data.qiniu_token;
            /* eslint no-underscore-dangle: 0 */
            that._data.dataObj.token = token;
            that._data.dataObj.key = key;
            resolve(true);
          })
          .catch(err => {
            console.log(err);
            /* eslint prefer-promise-reject-errors: 0 */
            reject(false);
          });
      });
    },
  },
};
</script>
