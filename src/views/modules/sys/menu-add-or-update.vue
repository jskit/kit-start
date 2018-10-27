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
      <el-form-item label="类型" prop="type">
        <el-radio-group v-model="dataForm.type">
          <el-radio v-for="(type, index) in dataForm.typeList" :label="index" :key="index">{{ type }}</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item :label="dataForm.typeList[dataForm.type] + '名称'" prop="name">
        <el-input v-model="dataForm.name" :placeholder="dataForm.typeList[dataForm.type] + '名称'"></el-input>
      </el-form-item>
      <el-form-item label="上级菜单" prop="parentName">
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
      <el-form-item label="菜单路由" prop="link">
        <el-input v-model="dataForm.link" placeholder="菜单路由"></el-input>
      </el-form-item>
      <el-form-item v-if="dataForm.type !== 0" label="授权标识" prop="perms">
        <el-input v-model="dataForm.perms" placeholder="多个用逗号分隔, 如: user:list,user:create"></el-input>
      </el-form-item>
      <el-form-item v-if="dataForm.type !== 2" label="排序号" prop="position">
        <el-input-number v-model="dataForm.position" controls-position="right" :min="0" label="排序号"></el-input-number>
      </el-form-item>
      <el-form-item v-if="dataForm.type !== 2" label="菜单图标" prop="icon">
        <el-row>
          <el-col :span="22">
            <el-popover
              ref="iconListPopover"
              placement="bottom-start"
              trigger="click"
              popper-class="menu__icon-popover">
              <div class="menu__icon-list">
                <el-button
                  v-for="(item, index) in iconList"
                  :key="index"
                  @click="handleIconActive(item)"
                  :class="{ 'is-active': item === dataForm.icon }">
                  <icon-svg :icon-class="item"></icon-svg>
                </el-button>
              </div>
            </el-popover>
            <el-input v-model="dataForm.icon" v-popover:iconListPopover :readonly="true" placeholder="菜单图标名称" class="icon-list__input"></el-input>
          </el-col>
          <el-col :span="2" class="icon-list__tips">
            <el-tooltip placement="top" effect="light">
              <div slot="content">全站推荐使用SVG Sprite, 详细请参考:<a href="//github.com/daxiongYang/renren-fast-vue/blob/master/src/icons/index.js" target="_blank">icons/index.js</a>描述</div>
              <i class="el-icon-warning"></i>
            </el-tooltip>
          </el-col>
        </el-row>
      </el-form-item>
      <el-form-item v-if="dataForm.type !== 2" label="菜单状态" prop="visible">
        <el-switch v-model="dataForm.visible"></el-switch> {{dataForm.visible ? '显示' : '隐藏'}}
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="visible = false">取消</el-button>
      <el-button type="primary" @click="dataFormSubmit()">确定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import {
  // menuLevel,
  treeDataTranslate,
} from '@/utils';
import api from '@/api';
import Icon from '@/icons';

const modelApi = {
  add: api.addAuth,
  edit: api.updateAuth,
  list: api.getAuth,
};

const defaultInfo = {
  id: undefined,
  type: 0,
  typeList: ['目录', '菜单', '按钮'],
  name: '',
  parentId: 0,
  parentName: '',
  url: '',
  perms: '',
  // orderNum: 0,
  position: 0,
  icon: '',
  iconList: [],
  visible: true,
};

export default {
  data() {
    const validateUrl = (rule, value, callback) => {
      if (this.dataForm.type === 1 && !/\S/.test(value)) {
        callback(new Error('菜单URL不能为空'));
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
        name: [
          { required: true, message: '菜单名称不能为空', trigger: 'blur' },
        ],
        parentName: [
          { required: true, message: '上级菜单不能为空', trigger: 'change' },
        ],
        url: [{ validator: validateUrl, trigger: 'blur' }],
      },
      menuList: [],
      menuListTreeProps: {
        label: 'name',
        children: 'children',
      },
    };
  },
  created() {
    this.iconList = Icon.getNameList();
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
      // Object.assign(this.dataForm, row);

      // if (!this.dataForm.id) {
      //   // 新增
      //   this.menuListTreeSetCurrentNode()
      //   return;
      // }
      // this.dataForm.id = row.id;
      modelApi.list(
        {
          // ...this.dataForm,
          type: 1,
          // page: this.pageIndex,
          // size: this.pageLimit,
        },
        res => {
          this.menuList = treeDataTranslate(res.data);
          // this.totalCount = res.data.total
          this.visible = true;
          this.$nextTick(() => {
            this.$refs['dataForm'].resetFields();
            // this.showData();
            if (!this.dataForm.id) {
              // 新增
              // this.menuListTreeSetCurrentNode()
            } else {
              // 修改
              Object.assign(this.dataForm, row);
              this.dataForm.type = Number(row.type);
              this.dataForm.visible = Boolean(row.visible);
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
      // const aa = this.$refs.menuListTree.getCurrentNode();
      // console.log(aa);
      // debugger
      this.dataForm.parentName = (this.$refs.menuListTree.getCurrentNode() ||
        {})['name'];
    },
    handleIconActive(iconName) {
      this.dataForm.icon = iconName;
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
              visible: Number(this.dataForm.visible),
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
