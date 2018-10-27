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
      <el-form-item label="字典名称" prop="label">
        <el-input v-model="dataForm.label" placeholder="字典名称"></el-input>
      </el-form-item>
      <el-form-item label="字典值" prop="value">
        <el-input v-model="dataForm.value" placeholder="字典值"></el-input>
      </el-form-item>
      <el-form-item label="字典类型" prop="type">
        <el-input v-model="dataForm.type" placeholder="字典类型"></el-input>
      </el-form-item>
      <el-form-item label="排序" prop="position">
        <el-input v-model="dataForm.position" placeholder="排序号"></el-input>
      </el-form-item>
      <el-form-item label="备注" prop="remark">
        <el-input v-model="dataForm.remark"></el-input>
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
  add: api.addDict,
  edit: api.updateDict,
};

const defaultInfo = {
  id: undefined,
  label: '',
  value: '',
  type: '',
  position: 0,
  remark: '',
  // state: 0,
};

export default {
  data() {
    return {
      visible: false,
      roleList: [],
      dataForm: {
        ...defaultInfo,
      },
      dataRule: {},
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

      this.visible = true;
      this.$nextTick(() => {
        this.$refs['dataForm'].resetFields();
        Object.assign(this.dataForm, row);
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
