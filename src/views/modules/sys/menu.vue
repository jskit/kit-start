<!-- 菜单管理 -->
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
        <el-button class="filter-item" style="margin-left: 10px;" @click="handleAddOrUpdate()" type="success" icon="el-icon-edit">新增</el-button>
        <!-- <el-button type="danger" @click="handleDelete()" :disabled="dataListSelections.length <= 0">批量删除</el-button> -->
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
      <!-- <el-table-column
        type="selection"
        header-align="center"
        align="center"
        width="50">
      </el-table-column> -->
      <!-- <el-table-column
        prop="id"
        header-align="center"
        align="center"
        width="80"
        label="ID">
      </el-table-column> -->
      <table-tree-column
        prop="name"
        header-align="center"
        treeKey="id"
        width="180"
        label="名称">
      </table-tree-column>
      <!-- <el-table-column
        prop="parentName"
        header-align="center"
        align="center"
        width="120"
        label="上级菜单">
      </el-table-column> -->
      <el-table-column
        header-align="center"
        align="center"
        label="图标">
        <template slot-scope="scope">
          <icon-svg :icon-class="scope.row.icon || 'menu'"></icon-svg>
        </template>
      </el-table-column>
      <el-table-column
        header-align="center"
        align="center"
        label="类型">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.type === '0'" size="small">目录</el-tag>
          <el-tag v-else-if="scope.row.type === '1'" size="small" type="success">菜单</el-tag>
          <el-tag v-else-if="scope.row.type === '2'" size="small" type="info">按钮</el-tag>
        </template>
      </el-table-column>
      <el-table-column
        prop="position"
        header-align="center"
        align="center"
        label="排序号">
      </el-table-column>
      <el-table-column
        header-align="center"
        width="200"
        :show-overflow-tooltip="true"
        label="菜单URL">
        <template slot-scope="scope">
          {{scope.row.type !== '2' ? scope.row.link : ''}}
        </template>
      </el-table-column>
      <el-table-column
        header-align="center"
        align="center"
        label="可见">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.visible" size="small" type="success">显示</el-tag>
          <el-tag v-else size="small" type="info">隐藏</el-tag>
        </template>
      </el-table-column>
      <el-table-column
        prop="permCode"
        header-align="center"
        width="150"
        :show-overflow-tooltip="true"
        label="授权标识">
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

    <!-- <div class="pagination-container" style="margin-top: 16px;">
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
    </div> -->

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
import {
  // menuLevel,
  treeDataTranslate,
} from '@/utils';
import TableTreeColumn from '@/components/TableTreeColumn';
import AddOrUpdate from './menu-add-or-update';

const modelApi = {
  add: api.addAuth,
  del: api.delAuth,
  edit: api.updateAuth,
  list: api.getAuth,
};

export default {
  name: 'sys_menu',
  components: {
    [TableTreeColumn.name]: TableTreeColumn,
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
      // pageIndex: 1,
      // pageLimit: 10,
      // totalCount: 0,
      dataList: [],
      dataListLoading: true,
      dataListSelections: [],
      addOrUpdateVisible: false,
    };
  },
  filters: {},
  created() {
    this.getDataList();
    // api.getMenu({}, (res) => {
    //   console.log(res);
    // }, (err) => {

    // })
  },
  methods: {
    getDataList() {
      this.dataListLoading = true;
      modelApi.list(
        {
          ...this.dataForm,
          // page: this.pageIndex,
          // size: this.pageLimit,
        },
        res => {
          this.dataListLoading = false;
          this.dataList = treeDataTranslate(res.data);
          // this.totalCount = res.data.total
        },
        err => {}
      );
    },
    handleFilter() {
      // this.pageIndex = 1
      this.getDataList();
    },
    handleSizeChange(val) {
      // this.pageLimit = val
      this.getDataList();
    },
    handleCurrentChange(val) {
      // this.pageIndex = val
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
      });
    },
    handleDelete(id) {
      // 删除是危险动作，至少要气泡提示
      // const ids = id ? [id] : this.dataListSelections.map((item) => {
      //   return item.id
      // });
      const ids = id ? [id] : [];
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
