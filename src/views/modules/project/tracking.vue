<template>
  <div class="app-container calendar-list-container">
    <div class="filter-container">
      <el-form
      :model="dataForm"
      :inline="true">
        <el-form-item label="">
          <el-input
            placeholder="搜索关键字"
            width="200"
            class="filter-item"
            @keyup.enter.native="handleFilter"
            v-model="dataForm.keywords"
            clearable
          ></el-input>
        </el-form-item>
        <el-button class="filter-item" type="primary" v-waves icon="el-icon-search" @click="handleFilter">搜索</el-button>
        <!-- <el-button class="filter-item" style="margin-left: 10px;" @click="handleAddOrUpdate()" type="success" icon="el-icon-edit">上传文件</el-button> -->
        <!-- <el-button class="filter-item" style="margin-left: 10px;" @click="handleConfig" type="primary" icon="el-icon-edit">云存储配置</el-button> -->
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
        prop="id"
        header-align="center"
        align="center"
        width="80"
        label="ID">
      </el-table-column> -->
      <el-table-column
        prop="url"
        header-align="center"
        align="center"
        label="URL地址">
      </el-table-column>
      <el-table-column
        prop="createDate"
        header-align="center"
        align="center"
        width="180"
        label="创建时间">
      </el-table-column>
      <el-table-column
        fixed="right"
        header-align="center"
        align="center"
        width="100"
        label="操作">
        <template slot-scope="scope">
          <!-- <el-button type="primary" size="mini" @click="handleUpdate(scope.row)">编辑</el-button> -->
          <el-button type="danger" size="mini" @click="handleDelete(scope.row)">删除</el-button>
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

    <!-- 弹窗, 云存储配置 -->
    <!-- <oss-config v-if="configVisible" ref="config"></oss-config> -->
    <!-- 弹窗, 上传文件 -->
    <!-- <oss-upload v-if="addOrUpdateVisible" ref="addOrUpdate" @refreshDataList="getDataList"></oss-upload> -->
  </div>
</template>

<script>
import api from '@/api';
// import { copy } from 'kit-qs';
import waves from '@/directive/waves'; // 水波纹指令
// import OssConfig from './oss-config'
// import OssUpload from './oss-upload'

const modelApi = {
  getAccessToken: api.getAccessToken,
  list: api.getUser,
  add: api.addFile,
  // edit: api.updateUser,
  del: api.delFile,
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
  name: 'project_tracking',
  components: {
    // OssConfig,
    // OssUpload,
    // AddOrUpdate,
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
      configVisible: false,
    };
  },
  filters: {},
  created() {
    // activated() {
    this.getDataList();
  },
  methods: {
    getDataList() {
      this.dataListLoading = true;
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
    // 云存储配置
    handleConfig() {
      this.configVisible = true;
      this.$nextTick(() => {
        this.$refs.config.init();
      });
    },
    /* eslint dot-notation: 0 */
    handleAddOrUpdate(id) {
      this.addOrUpdateVisible = true;
      this.$nextTick(() => {
        // this.$refs.upload.init(id)
        this.$refs.addOrUpdate.init(id);
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
    // 不能删除自己，不能删除最后一个用户，不能删除超管
    handleDelete(id) {
      // 删除是危险动作，至少要气泡提示
      const ids = id
        ? [id]
        : this.dataListSelections.map(item => {
            return item.id;
          });
      this.$confirm(
        `确定对[id=${ids.join(',')}]进行[${id ? '删除' : '批量删除'}]操作?`,
        '提示',
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        }
      )
        .then(() => {
          modelApi.del(
            {
              ids,
            },
            res => {
              this.$notify({
                // title: '成功',
                message: '操作成功',
                type: 'success',
                duration: 1500,
                onClose: () => {
                  this.getDataList();
                },
              });

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
        })
        .catch(() => {});
    },
  },
};
</script>

<style lang="stylus" scoped>

</style>
