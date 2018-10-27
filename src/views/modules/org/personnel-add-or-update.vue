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
      <el-form-item label="姓名" prop="username">
        <el-input v-model="dataForm.username" placeholder="姓名"></el-input>
      </el-form-item>
      <el-form-item label="性别" size="mini" prop="gender">
        <el-radio-group v-model="dataForm.gender">
          <el-radio :label="1">男</el-radio>
          <el-radio :label="2">女</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="邮箱" prop="email">
        <el-input v-model="dataForm.email" placeholder="邮箱"></el-input>
      </el-form-item>
      <el-form-item label="手机号" prop="mobile">
        <el-input v-model="dataForm.mobile" placeholder="手机号"></el-input>
      </el-form-item>
      <!-- <el-form-item label="密码" prop="password" :class="{ 'is-required': !dataForm.id }">
        <el-input v-model="dataForm.password" type="password" placeholder="密码"></el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="comfirmPassword" :class="{ 'is-required': !dataForm.id }">
        <el-input v-model="dataForm.comfirmPassword" type="password" placeholder="确认密码"></el-input>
      </el-form-item> -->
      <el-form-item label="所属部门" prop="deptName">
        <el-popover
          ref="menuListPopover"
          placement="bottom-start"
          trigger="click">
          <el-tree
            :data="menuList"
            :props="menuListTreeProps"
            node-key="id"
            ref="menuListTree"
            accordion
            @current-change="handleMenuListTreeCurrentChange"
            :default-expand-all="false"
            :highlight-current="true"
            :expand-on-click-node="false">
          </el-tree>
        </el-popover>
        <el-input v-model="dataForm.deptName" v-popover:menuListPopover :readonly="true" placeholder="点击选择所属部门" class="menu-list__input"></el-input>
      </el-form-item>
      <el-form-item label="学历" prop="education">
        <el-input v-model="dataForm.education" placeholder="学历"></el-input>
      </el-form-item>
      <el-form-item label="备注" prop="remark">
        <el-input v-model="dataForm.remark"></el-input>
      </el-form-item>
      <!-- <el-form-item label="角色" size="mini" prop="roleIdList">
        <el-checkbox-group v-model="dataForm.roleIdList">
          <el-checkbox v-for="role in roleList" :key="role.roleId" :label="role.roleId">{{ role.roleName }}</el-checkbox>
        </el-checkbox-group>
      </el-form-item> -->
      <!-- <el-form-item label="角色" prop="role">
        <el-select class="filter-item" v-model="dataForm.role" placeholder="请选择">
          <el-option v-for="item in roles" :key="item.id" :label="item.value" :value="item.id">
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
import { treeDataTranslate } from '@/utils';
import api from '@/api';

const modelApi = {
  add: api.addPersonal,
  edit: api.updatePersonal,
  list: api.getDept,
};

const defaultInfo = {
  id: undefined,
  username: '',
  gender: 0,
  email: '',
  mobile: '',
  education: '',
  deptId: '',
  deptName: '',
  remark: '',
  // avatar: '',
  state: 0,
};

export default {
  data() {
    // const validatePassword = (rule, value, callback) => {
    //   if (!this.dataForm.id && !/\S/.test(value)) {
    //     callback(new Error('密码不能为空'))
    //   } else {
    //     callback()
    //   }
    // }
    // const validateComfirmPassword = (rule, value, callback) => {
    //   if (!this.dataForm.id && !/\S/.test(value)) {
    //     callback(new Error('确认密码不能为空'))
    //   } else if (this.dataForm.password !== value) {
    //     callback(new Error('确认密码与密码输入不一致'))
    //   } else {
    //     callback()
    //   }
    // }
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
        // password: [
        //   { validator: validatePassword, trigger: 'blur' },
        // ],
        // comfirmPassword: [
        //   { validator: validateComfirmPassword, trigger: 'blur' },
        // ],
        email: [
          { required: true, message: '邮箱不能为空', trigger: 'blur' },
          { validator: validateEmail, trigger: 'blur' },
        ],
        mobile: [
          { required: true, message: '手机号不能为空', trigger: 'blur' },
          { validator: validateMobile, trigger: 'blur' },
        ],
        deptName: [
          { required: true, message: '所属部门不能为空', trigger: 'change' },
        ],
        // deptId: [
        //   { required: true, message: '必须选择部门', trigger: 'blur' },
        // ],
      },
      menuList: [],
      menuListTreeProps: {
        label: 'name',
        children: 'children',
      },
    };
  },
  // filters: {
  //   sexFilter(value) {
  //     const sexMap = ['未知', '男', '女'];
  //     return sexMap[value];
  //   },
  // },
  methods: {
    resetDataForm() {
      this.dataForm = {
        ...defaultInfo,
      };
    },
    init(row = {}) {
      this.resetDataForm();
      // if (row && row.password) row.password = '';
      this.dataForm.id = row.id || 0;

      modelApi.list(
        {
          // type: 1,
        },
        res => {
          this.menuList = treeDataTranslate(res.data);
          this.visible = true;
          this.$nextTick(() => {
            this.$refs['dataForm'].resetFields();
            Object.assign(this.dataForm, row);
            if (!this.dataForm.id) {
              // 新增
              this.menuListTreeSetCurrentNode();
            } else {
              // 修改
              // Object.assign(this.dataForm, row);
              // this.dataForm.type = Number(row.type)
              this.menuListTreeSetCurrentNode();
            }
          });
        },
        err => {}
      );
    },
    // 菜单树选中
    handleMenuListTreeCurrentChange(data, node) {
      this.dataForm.deptId = data.id;
      this.dataForm.deptName = data.name;
    },
    // 菜单树设置当前选中节点
    menuListTreeSetCurrentNode() {
      this.$refs.menuListTree.setCurrentKey(this.dataForm.parentId);
      // const aa = this.$refs.menuListTree.getCurrentNode();
      // console.log(aa);
      // debugger
      this.dataForm.deptName = (this.$refs.menuListTree.getCurrentNode() || {})[
        'name'
      ];
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

<style lang="stylus">
.menu__icon-popover {
  width: 50%;
}

.menu-list__input,
.icon-list__input {
  > .el-input__inner {
    cursor: pointer;
  }
}
&__icon-popover {
  max-width: 370px;
}
&__icon-list {
  max-height: 180px;
  padding: 0;
  margin: -8px 0 0 -8px;
  > .el-button {
    padding: 8px;
    margin: 8px 0 0 8px;
    > span {
      display: inline-block;
      vertical-align: middle;
      width: 18px;
      height: 18px;
      font-size: 18px;
    }
  }
}
.icon-list__tips {
  font-size: 18px;
  text-align: center;
  color: #e6a23c;
  cursor: pointer;
}
</style>
