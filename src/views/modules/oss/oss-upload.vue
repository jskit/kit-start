<!-- 文件上传 -->
<template>
  <el-dialog
    title="上传文件"
    :close-on-click-modal="false"
    @close="handleClose"
    :visible.sync="visible">
    <el-upload
      drag
      :action="url"
      :before-upload="handleBeforeUpload"
      :on-success="handleSuccess"
      multiple
      :file-list="fileList"
      style="text-align: center;">
      <i class="el-icon-upload"></i>
      <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
      <div class="el-upload__tip" slot="tip">只支持jpg、png、gif格式的图片！</div>
    </el-upload>
  </el-dialog>
</template>

<script>
import api from '@/api';
// import { copy } from 'kit-qs';

const modelApi = {
  add: api.addFile,
};

export default {
  name: 'oss-upload',
  data() {
    return {
      visible: false,
      url: '',
      num: 0,
      successNum: 0,
      fileList: [],
    };
  },
  methods: {
    init(id) {
      // modelApi.getAccessToken({}, (res) => {
      //   this.token = res.token;
      // }, (err) => {

      // });
      this.url = 'https://dapi.cloudai.net/oss/upload';
      // this.fileList.push({
      //   file:
      // })
      console.log(modelApi);
      // modelApi.add({}, (res) => {
      // }, (err) => {

      // })
      // this.url = this.$http.adornUrl(`/sys/oss/upload?token=${this.$cookie.get('token')}`)
      this.visible = true;
    },
    // 上传之前
    handleBeforeUpload(file) {
      if (
        file.type !== 'image/jpg' &&
        file.type !== 'image/jpeg' &&
        file.type !== 'image/png' &&
        file.type !== 'image/gif'
      ) {
        this.$message.error('只支持jpg、png、gif格式的图片！');
        return false;
      }
      this.num++;
    },
    // 上传成功
    handleSuccess(response, file, fileList) {
      this.fileList = fileList;
      this.successNum++;
      if (response && response.code === 0) {
        if (this.num === this.successNum) {
          this.$confirm('操作成功, 是否继续操作?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
          }).catch(() => {
            this.visible = false;
          });
        }
      } else {
        this.$message.error(response.msg);
      }
    },
    // 弹窗关闭时
    handleClose() {
      this.fileList = [];
      this.$emit('refreshDataList');
    },
  },
};
</script>
