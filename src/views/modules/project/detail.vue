<!-- 项目详情 -->
<template>
  <div class="app-container calendar-list-container">
    <div class="title">
      {{!dataForm.id ? '新增' : '修改'}}
    </div>
    <el-form
      label-width="120px"
      :model="dataForm"
      :rules="dataRule"
      @keyup.enter.native="dataFormSubmit()"
      ref="dataForm">
      <el-form-item label="项目名称" prop="name">
        <el-input v-model="dataForm.name" placeholder="项目名称"></el-input>
      </el-form-item>
      <el-form-item label="项目关键字" prop="keyWord">
        <el-input v-model="dataForm.keyWord" placeholder="项目关键字"></el-input>
      </el-form-item>
      <el-form-item label="项目分类" prop="category">
        <el-input v-model="dataForm.category" placeholder="项目分类"></el-input>
      </el-form-item>
      <el-form-item label="项目创建者" prop="creatorId">
        <el-input v-model="dataForm.creatorId" placeholder="项目创建者"></el-input>
      </el-form-item>
      <el-form-item label="项目负责人" prop="ownerId">
        <el-input v-model="dataForm.ownerId" placeholder="项目负责人"></el-input>
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

    <!-- 弹窗, 新增 / 修改 -->
    <!-- <add-or-update
      v-if="addOrUpdateVisible"
      ref="addOrUpdate"
      @refreshDataList="getDataList">
    </add-or-update> -->
  </div>
</template>

<script>
import api from '@/api';
// import { copy } from 'kit-qs';
import waves from '@/directive/waves'; // 水波纹指令
import AddOrUpdate from './proj-add-or-update';

const modelApi = {
  list: api.getProject,
  add: api.addProject,
  edit: api.updateProject,
  del: api.delProject,
  detail: api.getProjectDetail,
};

// const roles = [
//   { id: 1, value: 'admin' },
//   { id: 2, value: 'manager' },
//   // { id: 3, value: 'editor' },
//   // { id: 4, value: 'guest' },
// ]

// arr to obj ,such as { CN : "China", US : "USA" }
// const roleIds = roles.reduce((obj, item) => {
//   obj[item.id] = item.value
//   return obj
// }, {})

export default {
  name: 'project_proj',
  components: {
    AddOrUpdate,
  },
  directives: {
    waves,
  },
  data() {
    return {
      dataForm: {
        keywords: '',
        // sort: '+id',
      },
      tableKey: 0,
      pageIndex: 1,
      pageLimit: 10,
      totalCount: 0,
      dataList: [],
      dataListLoading: true,
      dataListSelections: [],
      addOrUpdateVisible: false,
    };
  },
  filters: {},
  created() {
    this.getDataList();
  },
  methods: {
    getDataList() {
      this.dataListLoading = true;
      // this.dataListLoading = false
      modelApi.list(
        {
          ...this.dataForm,
          page: this.pageIndex,
          size: this.pageLimit,
        },
        res => {
          this.dataListLoading = false;
          this.dataList = res.data.list;
          this.totalCount = res.data.total;
        },
        err => {}
      );
    },
    handleFilter() {
      this.pageIndex = 1;
      this.getDataList();
    },
    handleSizeChange(val) {
      this.pageLimit = val;
      this.getDataList();
    },
    handleCurrentChange(val) {
      this.pageIndex = val;
      this.getDataList();
    },
    // 多选
    handleSelectionChange(val) {
      this.dataListSelections = val;
    },
    /* eslint dot-notation: 0 */
    handleAddOrUpdate(id) {
      this.addOrUpdateVisible = true;
      this.$nextTick(() => {
        this.$refs.addOrUpdate.init(id);
        // this.$refs['dataForm'].clearValidate()
      });
    },
    updateItem(data, type) {
      if (type === 'add') {
        this.dataList.unshift(data);
      } else {
        for (const v of this.dataList) {
          if (v.id === data.id) {
            const index = this.dataList.indexOf(v);
            this.dataList.splice(index, 1, data);
            break;
          }
        }
      }
    },
    // updateData() {
    //   this.$refs['dataForm'].validate((valid) => {
    //     if (valid) {
    //       const tempData = copy(this.temp)
    //       modelApi.edit({
    //         ...tempData,
    //       }, (res) => {
    //         for (const v of this.dataList) {
    //           if (v.id === this.temp.id) {
    //             const index = this.dataList.indexOf(v)
    //             this.dataList.splice(index, 1, this.temp)
    //             break
    //           }
    //         }
    //         this.dialogFormVisible = false
    //         this.$notify({
    //           title: '成功',
    //           message: '更新成功',
    //           type: 'success',
    //           duration: 2000,
    //         })
    //       }, (err) => {

    //       });
    //     }
    //   })
    // },
    // 不能删除自己，不能删除最后一个用户，不能删除超管
    handleDelete(id) {
      // 删除是危险动作，至少要气泡提示
      const ids = id
        ? [id]
        : this.dataListSelections.map(item => {
            return item.id;
          });
      modelApi.del(
        {
          ids,
        },
        res => {
          this.$notify({
            title: '成功',
            message: '删除成功',
            type: 'success',
            duration: 2000,
          });

          this.getDataList();
          // const index = this.dataList.indexOf({

          // })
          // this.dataList.splice(index, 1)
        },
        err => {
          this.$message({
            message: '删除失败',
            type: 'danger',
          });
        }
      );
    },
  },
};
</script>

<style lang="stylus" scoped>

</style>
