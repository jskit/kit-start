<!-- 项目管理 -->
<template>
  <div class="app-container calendar-list-container">
    <div class="filter-container">
      <el-form
      :model="dataForm"
      :inline="true">
        <el-form-item label="">
          <el-input
            placeholder="关键字"
            width="200"
            class="filter-item"
            @keyup.enter.native="handleFilter"
            v-model="dataForm.keywords"
            clearable
          ></el-input>
        </el-form-item>
        <el-button class="filter-item" type="primary" v-waves icon="el-icon-search" @click="handleFilter">搜索</el-button>
        <el-button class="filter-item" style="margin-left: 10px;" @click="handleAddOrUpdate()" type="success" icon="el-icon-edit">新增</el-button>
        <el-button type="danger" @click="handleDelete()" :disabled="dataListSelections.length <= 0">批量删除</el-button>
      </el-form>
    </div>

    <el-table
      :key="tableKey"
      :data="dataList"
      v-loading="dataListLoading"
      element-loading-text="给我一点时间"
      border
      highlight-current-row
      @selection-change="handleSelectionChange"
      >
      <el-table-column
        type="selection"
        header-align="center"
        align="center"
        width="50">
      </el-table-column>
      <!-- <el-table-column
        prop="userId"
        header-align="center"
        align="center"
        width="80"
        label="ID">
      </el-table-column> -->
      <el-table-column
        prop="name"
        header-align="center"
        label="项目名称">
      </el-table-column>
      <el-table-column
        prop="keyWord"
        header-align="center"
        width="200"
        label="项目关键字">
      </el-table-column>
      <el-table-column
        prop="category"
        header-align="center"
        label="分类">
      </el-table-column>
      <!-- <el-table-column
        prop="state"
        header-align="center"
        align="center"
        label="状态">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.state === 0" size="small">正常</el-tag>
          <el-tag v-if="scope.row.state === 1" size="small" type="danger">禁用</el-tag>
        </template>
      </el-table-column> -->
      <el-table-column
        prop="creatorId"
        header-align="center"
        width="180"
        label="项目创建者">
      </el-table-column>
      <el-table-column
        prop="ownerId"
        header-align="center"
        width="180"
        label="项目负责人">
      </el-table-column>
      <el-table-column
        prop="createTime"
        header-align="center"
        width="180"
        label="创建时间">
      </el-table-column>
      <el-table-column
        prop="status"
        header-align="center"
        label="项目状态">
      </el-table-column>
      <el-table-column
        fixed="right"
        header-align="center"
        align="center"
        width="200"
        label="操作">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="handleAddOrUpdate(scope.row)">编辑</el-button>
          <el-button type="danger" size="mini" @click="handleDelete(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <div class="pagination-container" style="margin-top: 16px;">
      <el-pagination
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="pageIndex"
        :page-size="pageLimit"
        :total="totalCount"
        :page-sizes="[10, 20, 50, 100]"
        layout="total, sizes, prev, pager, next, jumper">
      </el-pagination>
    </div>

    <!-- 弹窗, 新增 / 修改 -->
    <add-or-update
      v-if="addOrUpdateVisible"
      ref="addOrUpdate"
      @refreshDataList="getDataList">
    </add-or-update>
  </div>
</template>

<script>
import api from '@/api';
// import { copy } from 'kit-qs';
import waves from '@/directive/waves'; // 水波纹指令
import AddOrUpdate from './task-add-or-update';

const modelApi = {
  list: api.getTask,
  add: api.addTask,
  edit: api.updateTask,
  del: api.delTask,
  detail: api.getTaskDetail,
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
  name: 'project_task',
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
