<template>
  <el-dialog
    :title="!dataForm.id ? '新增' : '修改'"
    :close-on-click-modal="false"
    :visible.sync="visible">
    <el-form
      label-width="100px"
      :model="dataForm"
      :rules="dataRule"
      @keyup.enter.native="dataFormSubmit()"
      ref="dataForm">
      <el-form-item label="上级部门" prop="parentName">
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
        <el-input v-model="dataForm.parentName" v-popover:menuListPopover :readonly="true" placeholder="点击选择上级菜单" class="menu-list__input"></el-input>
      </el-form-item>
      <el-form-item label="部门名称" prop="name">
        <el-input v-model="dataForm.name" placeholder="部门名称"></el-input>
      </el-form-item>
      <el-form-item label="部门地址" prop="address">
        <el-input v-model="dataForm.address" placeholder="部门地址"></el-input>
      </el-form-item>
      <el-form-item label="部门网址" prop="url">
        <el-input v-model="dataForm.url" placeholder="部门网址"></el-input>
      </el-form-item>
      <el-form-item label="部门职责" prop="scope">
        <el-input v-model="dataForm.scope" placeholder="部门职责"></el-input>
      </el-form-item>
      <el-form-item label="部门负责人" prop="leader">
        <el-input v-model="dataForm.leader" placeholder="部门负责人"></el-input>
      </el-form-item>
      <el-form-item label="排序" prop="position">
        <el-input-number v-model="dataForm.position" controls-position="right" :min="0" label="排序"></el-input-number>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="visible = false">取消</el-button>
      <el-button type="primary" @click="dataFormSubmit()">确定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { treeDataTranslate } from '@/utils';
import api from '@/api';
// import Icon from '@/icons'

const modelApi = {
  add: api.addDept,
  edit: api.updateDept,
  list: api.getDept,
};

const defaultInfo = {
  id: undefined,
  name: '',
  parentId: 0,
  parentName: '',
  address: '',
  url: '',
  leader: '0',
  scope: '',
  position: 0,
};

export default {
  data() {
    // const validateUrl = (rule, value, callback) => {
    //   if (value && !/\S/.test(value)) {
    //     callback(new Error('网站URL不能为空'))
    //   } else {
    //     callback()
    //   }
    // }
    return {
      visible: false,
      roleList: [],
      dataForm: {
        ...defaultInfo,
      },
      dataRule: {
        name: [
          { required: true, message: '部门名称不能为空', trigger: 'blur' },
        ],
        parentName: [
          { required: true, message: '上级部门不能为空', trigger: 'change' },
        ],
        // url: [
        //   { validator: validateUrl, trigger: 'blur' },
        // ],
      },
      menuList: [],
      menuListTreeProps: {
        label: 'name',
        children: 'children',
      },
    };
  },
  created() {},
  methods: {
    resetDataForm() {
      this.dataForm = {
        ...defaultInfo,
      };
    },
    init(row = {}) {
      this.resetDataForm();
      this.dataForm.id = row.id || 0;

      // if (!this.dataForm.id) {
      //   // 新增
      //   this.menuListTreeSetCurrentNode()
      //   return;
      // }
      // this.dataForm.id = row.id;
      modelApi.list(
        {
          type: 1,
          // ...this.dataForm,
          // type: 'menu',
          // page: this.pageIndex,
          // size: this.pageLimit,
        },
        res => {
          // this.menuList = [{
          //   id: 'root',
          //   name: '一级菜单',
          //   children: treeDataTranslate(res.data.list),
          // }];
          this.menuList = treeDataTranslate(res.data);
          // this.totalCount = res.data.total
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
      this.dataForm.parentId = data.id;
      this.dataForm.parentName = data.name;
    },
    // 菜单树设置当前选中节点
    menuListTreeSetCurrentNode() {
      this.$refs.menuListTree.setCurrentKey(this.dataForm.parentId);
      this.dataForm.parentName = (this.$refs.menuListTree.getCurrentNode() ||
        {})['name'];
    },
    // 表单提交
    dataFormSubmit() {
      console.log(this.dataForm);
      const isAdd = !this.dataForm.id;
      this.$refs['dataForm'].validate(valid => {
        console.log(this.dataForm);
        if (valid) {
          const type = isAdd ? 'add' : 'edit';
          // this.dataForm.type = 'menu';
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
