<template>
  <el-dialog
    :title="!dataForm.id ? '新增' : '修改'"
    :close-on-click-modal="false"
    :visible.sync="visible">
    <el-form
      label-width="120px"
      :model="dataForm"
      :rules="dataRule"
      @keyup.enter.native="dataFormSubmit()"
      ref="dataForm">
      <el-form-item label="任务名称" prop="name">
        <el-input v-model="dataForm.name" placeholder="任务名称"></el-input>
      </el-form-item>
      <el-form-item label="关键字" prop="keyWord">
        <el-input v-model="dataForm.keyWord" placeholder="关键字"></el-input>
      </el-form-item>
      <el-form-item label="分类" prop="category">
        <el-input v-model="dataForm.category" placeholder="分类"></el-input>
      </el-form-item>
      <el-form-item label="创建者" prop="creatorId">
        <el-input v-model="dataForm.creatorId" placeholder="创建者"></el-input>
      </el-form-item>
      <el-form-item label="负责人" prop="ownerId">
        <el-input v-model="dataForm.ownerId" placeholder="负责人"></el-input>
      </el-form-item>
      <el-form-item label="描述" prop="description">
        <el-input v-model="dataForm.description" placeholder="描述"></el-input>
      </el-form-item>
      <!-- <el-form-item label="状态" size="mini" prop="state">
        <el-radio-group v-model="dataForm.state">
          <el-radio :label="0">正常</el-radio>
          <el-radio :label="1">禁用</el-radio>
        </el-radio-group>
      </el-form-item> -->
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="visible = false">取消</el-button>
      <el-button type="primary" @click="dataFormSubmit()">确定</el-button>
    </span>
  </el-dialog>
</template>

<script>
// import { isEmail, isMobile } from '@/utils/validate'
import api from '@/api';

const modelApi = {
  list: api.getTask,
  add: api.addTask,
  edit: api.updateTask,
  del: api.delTask,
  detail: api.getTaskDetail,
};

const defaultInfo = {
  id: undefined,
  name: '',
  keyWord: '',
  category: '',
  createtime: '',
  creatorId: '',
  description: '',
  fileId: '',
  ownerId: '', // 项目负责人
  status: '',
};

export default {
  data() {
    return {
      visible: false,
      roleList: [],
      dataForm: {
        ...defaultInfo,
      },
      dataRule: {
        username: [
          { required: true, message: '用户名不能为空', trigger: 'blur' },
        ],
      },
    };
  },
  created() {
    // modelApi.getRole({
    // }, (res) => {
    //   this.roleList = res.data.list;
    // }, (err) => {
    // });
  },
  methods: {
    resetDataForm() {
      this.dataForm = {
        ...defaultInfo,
      };
    },
    init(row = {}) {
      // this.resetDataForm();
      this.dataForm.id = row.id || 0;
      this.showDialog(row);
      // if (this.roleList && this.roleList.length) {
      //   this.showDialog(row);
      // } else {
      //   modelApi.getRole({

      //   }, (res) => {
      //     this.showDialog(row);
      //   }, (err) => {

      //   })
      // }
    },
    showDialog(row) {
      this.visible = true;
      this.$nextTick(() => {
        this.$refs['dataForm'].resetFields();
        Object.assign(this.dataForm, row);
        // modelApi.getUserRole({
        //   userId: row.id,
        // }, (res) => {
        //   this.dataForm.roleIds = res.data;
        // }, (err) => {

        // });
      });
    },
    // 表单提交
    dataFormSubmit() {
      console.log(this.dataForm);
      const isAdd = !this.dataForm.id;
      this.$refs['dataForm'].validate(valid => {
        console.log(this.dataForm);
        if (valid) {
          const type = isAdd ? 'add' : 'edit';
          modelApi[type](
            {
              ...this.dataForm,
            },
            res => {
              this.visible = false;
              // Object.assign(this.dataForm, res.data);
              // this.dataList.unshift(this.dataForm)
              this.$notify({
                title: '成功',
                message: isAdd ? '创建成功' : '编辑成功',
                type: 'success',
                duration: 2000,
              });
              this.$emit('refreshDataList');
            },
            err => {}
          );
        }
      });
    },
  },
};
</script>
