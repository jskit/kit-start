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
      <el-form-item label="名称" prop="name">
        <el-input v-model="dataForm.name" placeholder="名称"></el-input>
      </el-form-item>
      <el-form-item label="方法名称" prop="method">
        <el-input v-model="dataForm.method" placeholder="方法名称"></el-input>
      </el-form-item>
      <el-form-item label="参数" prop="params">
        <el-input v-model="dataForm.params" placeholder="参数"></el-input>
      </el-form-item>
      <el-form-item label="表达式" prop="cron">
        <el-input v-model="dataForm.cron" placeholder="表达式"></el-input>
      </el-form-item>
      <el-form-item label="备注" prop="remark">
        <el-input v-model="dataForm.remark" placeholder="备注"></el-input>
      </el-form-item>
      <el-form-item label="是否禁用" size="mini" prop="state">
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
import api from '@/api';

const modelApi = {
  add: api.addJob,
  edit: api.updateJob,
};

const defaultInfo = {
  id: undefined,
  name: '',
  method: '', // methodName
  params: '',
  // http://cron.qqe2.com/
  cron: '', // cronExpression
  remark: '',
  state: 0,
  // 0准备 1运行中 2已暂定 3已终止
  // status: 0,
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
