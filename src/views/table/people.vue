<template>
  <div class="app-container calendar-list-container">
    <div class="filter-container">
      <el-form
      :inline="true"
      :model="queryForm">
        <el-form-item label="">
          <el-input
            placeholder="搜索关键字"
            width="200"
            class="filter-item"
            @keyup.enter.native="handleFilter"
            v-model="queryForm.keywords"
          ></el-input>
        </el-form-item>
        <el-button class="filter-item" type="primary" v-waves icon="el-icon-search" @click="handleFilter">搜索</el-button>
        <el-button class="filter-item" style="margin-left: 10px;" @click="handleCreate" type="primary" icon="el-icon-edit">添加</el-button>
        <!-- <el-button class="filter-item" type="primary" :loading="downloadLoading" v-waves icon="el-icon-download" @click="handleDownload">{{$t('table.export')}}</el-button> -->
        <!-- <el-checkbox class="filter-item" style='margin-left:15px;' @change='tableKey=tableKey+1' v-model="showReviewer">{{$t('table.reviewer')}}</el-checkbox> -->
      </el-form>
    </div>

    <el-table
      :key="tableKey"
      :data="list"
      v-loading="listLoading"
      element-loading-text="给我一点时间"
      border
      highlight-current-row
      >
      <el-table-column label="姓名" prop="username"></el-table-column>
      <el-table-column label="性别">
        <template slot-scope="scope">
          <span>{{ scope.row.gender | sexFilter }}</span>
        </template>
      </el-table-column>
      <el-table-column label="手机号" prop="mobile"></el-table-column>
      <el-table-column label="邮箱" prop="email"></el-table-column>
      <el-table-column label="学历">
        <template slot-scope="scope">
          <span>{{ scope.row.education }}</span>
        </template>
      </el-table-column>
      <el-table-column label="职称">
        <template slot-scope="scope">
          <span>{{ scope.row.jobTitle }}</span>
        </template>
      </el-table-column>
      <el-table-column label="部门">
        <template slot-scope="scope">
          <span>{{ scope.row.deptId }}</span>
        </template>
      </el-table-column>
      <el-table-column label="职位">
        <template slot-scope="scope">
          <span>{{ scope.row.scope }}</span>
        </template>
      </el-table-column>
      <el-table-column label="是否领导">
        <template slot-scope="scope">
          <span>{{ scope.row.isLeader }}</span>
        </template>
      </el-table-column>
      <el-table-column label="养老金是否参保">
        <template slot-scope="scope">
          <span>{{ scope.row.isPension }}</span>
        </template>
      </el-table-column>
      <!-- <el-table-column align="center" label="最近访问">
        <template slot-scope="scope">
          <span>{{scope.row.lastVisit | formatDate('Y-M-D H:F')}}</span>
        </template>
      </el-table-column> -->
      <el-table-column align="center" label="操作" width="200" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="handleUpdate(scope.row)">编辑</el-button>
          <el-button type="danger" size="mini" @click="handleDelete(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <div class="pagination-container" style="margin-top: 16px;">
      <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="queryForm.page" :page-sizes="[10, 20,30, 50]" :page-size="queryForm.size" layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </div>

    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form
      :rules="rules"
      ref="dataForm"
      :model="temp"
      label-position="left"
      label-width="70px"
      style='min-width: 300px; max-width: 400px; margin-left:50px;'>
        <el-form-item label="姓名" prop="username">
          <el-input v-model="temp.username"></el-input>
        </el-form-item>
        <el-form-item label="性别" prop="gender">
          <el-radio-group v-model="temp.gender">
            <el-radio :label="0">未知</el-radio>
            <el-radio :label="1">男</el-radio>
            <el-radio :label="2">女</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="手机号" prop="mobile">
          <el-input v-model="temp.mobile"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="temp.email"></el-input>
        </el-form-item>
        <el-form-item label="学历" prop="education">
          <el-select class="filter-item" v-model="temp.education" placeholder="请选择">
            <el-option v-for="item in educations" :key="item.id" :label="item.value" :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="部门" prop="deptId">
          <el-select class="filter-item" v-model="temp.deptId" placeholder="请选择">
            <el-option v-for="item in deptIds" :key="item.id" :label="item.value" :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="职称" prop="jobTitle">
          <el-select class="filter-item" v-model="temp.jobTitle" placeholder="请选择">
            <el-option v-for="item in jobTitles" :key="item.id" :label="item.value" :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <!-- <el-form-item label="备注" prop="description">
          <el-input v-model="temp.description"></el-input>
        </el-form-item> -->
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取消</el-button>
        <el-button v-if="dialogStatus=='create'" type="primary" @click="createData">确定</el-button>
        <el-button v-else type="primary" @click="updateData">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import api from '@/api';
import { copy } from 'kit-qs';
import waves from '@/directive/waves'; // 水波纹指令

const model = {
  add: api.addPersonal,
  del: api.delPersonal,
  edit: api.updatePersonal,
  search: api.getPersonal,
};

// const roles = [
//   { id: 1, value: 'admin' },
//   { id: 2, value: 'manager' },
//   // { id: 3, value: 'editor' },
//   // { id: 4, value: 'guest' },
// ];
const educations = [
  { id: 1, value: '高中' },
  { id: 2, value: '职专' },
  { id: 3, value: '本科' },
  { id: 4, value: '硕士' },
  { id: 5, value: '博士' },
];
const deptIds = [{ id: 1, value: '总部' }, { id: 2, value: '分部' }];
const jobTitles = [{ id: 1, value: '高级' }, { id: 2, value: '中级' }];

// arr to obj ,such as { CN : "China", US : "USA" }
// const roleIds = roles.reduce((obj, item) => {
//   obj[item.id] = item.value
//   return obj
// }, {})

const defaultInfo = {
  id: undefined,
  username: '',
  mobile: '',
  email: '',
  gender: 0,
  remark: '',
  education: '',
  jobTitle: '',
  deptId: '',
  scope: '',
  isLeader: '',
  isPension: '',
  state: '',
};

export default {
  name: 'user_people',
  directives: {
    waves,
  },
  data() {
    return {
      tableKey: 0,
      list: null,
      total: null,
      listLoading: true,
      queryForm: {
        page: 1,
        size: 20,
        keywords: '',
      },
      educations,
      deptIds,
      jobTitles,
      temp: {
        ...defaultInfo,
      },
      dialogFormVisible: false,
      dialogStatus: '',
      textMap: {
        update: '编辑',
        create: '新增',
      },
      rules: {
        // password: [{
        //   required: true,
        //   message: '密码必须填写',
        //   trigger: 'blur',
        // }],
        email: [
          {
            required: true,
            message: '邮箱必须填写',
            trigger: 'blur',
          },
        ],
        // role: [{
        //   required: true,
        //   message: '角色必须选择',
        //   trigger: 'blur',
        // }],
      },
    };
  },
  filters: {
    sexFilter(value) {
      const sexMap = ['未知', '男', '女'];
      return sexMap[value];
    },
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'info',
        deleted: 'danger',
      };
      return statusMap[status];
    },
    // typeFilter(type) {
    //   return roleIds[type]
    // },
  },
  created() {
    this.getList();
  },
  methods: {
    getList() {
      this.listLoading = true;
      model.search(
        {
          ...this.queryForm,
        },
        res => {
          this.listLoading = false;
          const { data = {} } = res;
          this.list = data.list || [];
          this.total = data.total;
        },
        err => {}
      );
    },
    handleFilter() {
      this.queryForm.page = 1;
      this.getList();
    },
    handleSizeChange(val) {
      this.queryForm.size = val;
      this.getList();
    },
    handleCurrentChange(val) {
      this.queryForm.page = val;
      this.getList();
    },
    handleModifyStatus(row, status) {
      switch (status) {
        case 'delete':
          this.handleDelete(row);
          break;
        default:
        // do nothing...
      }
      this.$message({
        message: '操作成功',
        type: 'success',
      });
      row.status = status;
    },
    resetTemp() {
      this.temp = {
        ...defaultInfo,
      };
    },
    /* eslint dot-notation: 0 */
    handleCreate() {
      this.resetTemp();
      this.dialogStatus = 'create';
      this.dialogFormVisible = true;
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate();
      });
    },
    createData() {
      this.$refs['dataForm'].validate(valid => {
        if (valid) {
          model.add(
            {
              ...this.temp,
            },
            res => {
              this.dialogFormVisible = false;
              Object.assign(this.temp, res.data);
              this.list.unshift(this.temp);
              this.$notify({
                title: '成功',
                message: '创建成功',
                type: 'success',
                duration: 2000,
              });
            },
            err => {}
          );
        }
      });
    },
    handleUpdate(row) {
      this.temp = copy(row); // copy obj
      this.dialogStatus = 'update';
      this.dialogFormVisible = true;
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate();
      });
    },
    updateData() {
      this.$refs['dataForm'].validate(valid => {
        if (valid) {
          const tempData = copy(this.temp);
          model.edit(
            {
              ...tempData,
            },
            res => {
              for (const v of this.list) {
                if (v.id === this.temp.id) {
                  const index = this.list.indexOf(v);
                  this.list.splice(index, 1, this.temp);
                  break;
                }
              }
              this.dialogFormVisible = false;
              this.$notify({
                title: '成功',
                message: '更新成功',
                type: 'success',
                duration: 2000,
              });
            },
            err => {}
          );
        }
      });
    },
    // 不能删除自己，不能删除最后一个用户，不能删除超管
    handleDelete(row) {
      model.del(
        {
          id: row.id,
        },
        res => {
          this.$notify({
            title: '成功',
            message: '删除成功',
            type: 'success',
            duration: 2000,
          });
          const index = this.list.indexOf(row);
          this.list.splice(index, 1);
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
