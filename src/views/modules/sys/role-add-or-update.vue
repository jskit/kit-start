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
      <el-form-item label="角色标识" prop="code">
        <el-input v-model="dataForm.code" placeholder="角色标识"></el-input>
      </el-form-item>
      <el-form-item label="角色名称" prop="name">
        <el-input v-model="dataForm.name" placeholder="角色名称"></el-input>
      </el-form-item>
      <el-form-item label="备注" prop="description">
        <el-input v-model="dataForm.description" placeholder="备注"></el-input>
      </el-form-item>
      <el-form-item size="mini" label="授权">
        <el-tree
          :data="menuList"
          :props="menuListTreeProps"
          node-key="id"
          ref="menuListTree"
          :default-expand-all="false"
          show-checkbox>
        </el-tree>
      </el-form-item>
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
// import { copy } from 'kit-qs'
import { treeDataTranslate } from '@/utils';

const modelApi = {
  add: api.addRole,
  edit: api.updateRole,
  list: api.getAuth,
  getRoleDetail: api.getRoleDetail,
};

const defaultInfo = {
  name: '',
  code: '',
  description: '',
  permIds: [],
};

export default {
  data() {
    return {
      visible: false,
      menuList: [],
      menuListTreeProps: {
        label: 'name',
        children: 'children',
      },
      dataForm: {
        ...defaultInfo,
      },
      dataRule: {
        code: [
          { required: true, message: '角色名称不能为空', trigger: 'blur' },
        ],
      },
      // 临时key, 用于解决tree半选中状态项不能传给后台接口问题. # 待优化
      // tempKey: -666666,
    };
  },
  methods: {
    resetDataForm() {
      this.dataForm = {
        ...defaultInfo,
      };
    },
    init(row = {}) {
      this.resetDataForm();
      this.dataForm.id = row.id || 0;

      modelApi.list(
        {
          // ...this.dataForm,
          // page: this.pageIndex,
          // size: this.pageLimit,
        },
        res => {
          this.menuList = treeDataTranslate(res.data);
          // this.totalCount = res.data.total
          this.visible = true;
          this.$nextTick(() => {
            this.$refs['dataForm'].resetFields();
            this.$refs.menuListTree.setCheckedKeys([]);

            if (this.dataForm.id) {
              Object.assign(this.dataForm, row);
              this.getRoleDetail();
            }
          });
        },
        err => {}
      );
    },
    getRoleDetail() {
      const { id } = this.dataForm;
      modelApi.getRoleDetail(
        {
          id,
        },
        ({ data }) => {
          this.dataForm.code = data.code;
          this.dataForm.name = data.name;
          this.dataForm.description = data.description;
          // const idx = data.permIds.indexOf(this.tempKey)
          // if (idx !== -1) {
          //   data.permIds.splice(idx, data.permIds.length - idx)
          // }
          // this.dataForm = data;
          this.$refs.menuListTree.setCheckedKeys(data.permIds);
        },
        err => {}
      );
    },
    // 表单提交
    dataFormSubmit() {
      console.log(this.dataForm);
      const isAdd = !this.dataForm.id;
      this.dataForm.permIds = [
        ...this.$refs.menuListTree.getCheckedKeys(),
        // this.tempKey,
        // ...this.$refs.menuListTree.getHalfCheckedKeys(),
      ];
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
