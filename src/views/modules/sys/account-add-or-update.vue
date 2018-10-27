<template>
  <el-dialog
    :title="!dataForm.id ? '新增' : '修改'"
    :close-on-click-modal="false"
    :visible.sync="visible">
    <el-form
      label-width="80px"
      :model="dataForm"
      :rules="dataRule"
      @keyup.enter.native="dataFormSubmit()"
      ref="dataForm">
      <el-form-item label="用户名" prop="username">
        <el-input v-model="dataForm.username" placeholder="登录帐号"></el-input>
      </el-form-item>
      <el-form-item label="邮箱" prop="email">
        <el-input v-model="dataForm.email" placeholder="邮箱"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password" :class="{ 'is-required': !dataForm.id }">
        <el-input v-model="dataForm.password" type="password" placeholder="密码"></el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="comfirmPassword" :class="{ 'is-required': !dataForm.id }">
        <el-input v-model="dataForm.comfirmPassword" type="password" placeholder="确认密码"></el-input>
      </el-form-item>
      <el-form-item label="手机号" prop="mobile">
        <el-input v-model="dataForm.mobile" placeholder="手机号"></el-input>
      </el-form-item>
      <el-form-item label="备注" prop="description">
        <el-input v-model="dataForm.description"></el-input>
      </el-form-item>
      <el-form-item label="角色" size="mini" prop="role">
        <el-checkbox-group v-model="dataForm.roleIds">
          <el-checkbox v-for="role in roleList" :key="role.id" :label="role.id">{{ role.code }}</el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <!-- <el-form-item label="角色" prop="role">
        <el-select class="filter-item" v-model="dataForm.role" placeholder="请选择">
          <el-option v-for="item in roleList" :key="item.id" :label="item.value" :value="item.role">
          </el-option>
        </el-select>
      </el-form-item> -->
      <el-form-item label="状态" size="mini" prop="state">
        <el-radio-group v-model="dataForm.state">
          <el-radio :label="0">正常</el-radio>
          <el-radio :label="1">禁用</el-radio>
        </el-radio-group>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="visible = false">取消</el-button>
      <el-button type="primary" @click="dataFormSubmit()">确定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { isEmail, isMobile } from '@/utils/validate';
import api from '@/api';

const modelApi = {
  add: api.addUser,
  edit: api.updateUser,
  getRole: api.getRole,
  getUserRole: api.getUserRole,
};

const defaultInfo = {
  id: undefined,
  email: '',
  password: '',
  comfirmPassword: '',
  roleIds: [],
  // avatar: '',
  username: '',
  mobile: '',
  description: '',
  state: 0,
};

export default {
  data() {
    const validatePassword = (rule, value, callback) => {
      if (!this.dataForm.id && !/\S/.test(value)) {
        callback(new Error('密码不能为空'));
      } else {
        callback();
      }
    };
    const validateComfirmPassword = (rule, value, callback) => {
      if (!this.dataForm.id && !/\S/.test(value)) {
        callback(new Error('确认密码不能为空'));
      } else if (this.dataForm.password !== value) {
        callback(new Error('确认密码与密码输入不一致'));
      } else {
        callback();
      }
    };
    const validateEmail = (rule, value, callback) => {
      if (!isEmail(value)) {
        callback(new Error('邮箱格式错误'));
      } else {
        callback();
      }
    };
    const validateMobile = (rule, value, callback) => {
      if (!isMobile(value)) {
        callback(new Error('手机号格式错误'));
      } else {
        callback();
      }
    };
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
        password: [{ validator: validatePassword, trigger: 'blur' }],
        comfirmPassword: [
          { validator: validateComfirmPassword, trigger: 'blur' },
        ],
        email: [
          { required: true, message: '邮箱不能为空', trigger: 'blur' },
          { validator: validateEmail, trigger: 'blur' },
        ],
        mobile: [
          { required: true, message: '手机号不能为空', trigger: 'blur' },
          { validator: validateMobile, trigger: 'blur' },
        ],
      },
    };
  },
  created() {
    modelApi.getRole(
      {},
      res => {
        this.roleList = res.data.list;
      },
      err => {}
    );
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

      if (this.roleList && this.roleList.length) {
        this.showDialog(row);
      } else {
        modelApi.getRole(
          {},
          res => {
            this.showDialog(row);
          },
          err => {}
        );
      }
    },
    showDialog(row) {
      this.visible = true;
      this.$nextTick(() => {
        this.$refs['dataForm'].resetFields();
        Object.assign(this.dataForm, row);
        modelApi.getUserRole(
          {
            userId: row.id,
          },
          res => {
            this.dataForm.roleIds = res.data;
          },
          err => {}
        );
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
