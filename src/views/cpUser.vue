<template>
  <div class="manage">
    <el-dialog title="提示" :visible.sync="dialogVisible" width="50%" :before-close="handleClose">
      <el-form :rules="rules" :inline="true" ref="form" :model="form" label-width="80px">
        <el-form-item label="姓名" prop="name">
          <el-input v-model="form.name" placeholder="请输入姓名"></el-input>
        </el-form-item>
        <el-form-item label="年龄" prop="age">
          <el-input v-model="form.age" placeholder="请输入年龄"></el-input>
        </el-form-item>
        <el-form-item label="性别" placeholder="请选择性别" prop="sex">
          <el-select v-model="form.sex">
            <el-option label="男" :value="1"></el-option>
            <el-option label="女" :value="0"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="出生日期" placeholder="请选择出生日期" prop="birth">
          <el-date-picker v-model="form.birth" type="date" placeholder="选择日期" value-format="yyyy-MM-dd">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="地址" prop="addr">
          <el-input v-model="form.addr" placeholder="请选择地址"></el-input>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="submit">确 定</el-button>
      </span>
    </el-dialog>
    <div class="manage-header">
      <el-button @click="handelAdd()" type="primary">
        + 新增
      </el-button>
      <!-- 搜索框区域 -->
      <el-form :model="userform" :inline="true">
        <el-form-item>
          <el-input placeholder="请输入姓名" v-model="userform.name"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit()">查询</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="common-tabel">
      <el-table height="90%" :data="tableData" style="width: 100%" stripe>
        <el-table-column prop="name" label="姓名">
        </el-table-column>
        <el-table-column prop="sex" label="性别">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.sex ==1? '男':'女'}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="age" label="年龄">
        </el-table-column>
        <el-table-column prop="birth" label="出生日期">
        </el-table-column>
        <el-table-column prop="addr" label="地址">
        </el-table-column>
        <el-table-column prop="addr" label="操作">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleEdit(scope.row)">编辑</el-button>
            <el-button type="danger" size="mini" @click="handleDelete(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="pager">
        <el-pagination layout="prev, pager, next" :total="total" @current-change="handelPage">
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import { getUser, addUser, editUser, delUser } from '../api/index'
export default {
  data() {
    return {
      dialogVisible: false,
      form: {
        name: '',
        age: '',
        sex: '',
        birth: '',
        addr: ''
      },
      rules: {
        name: [{ required: true, message: '请输入名字' }],
        age: [{ required: true, message: '请输入年龄' }],
        sex: [{ required: true, message: '请选择性别' }],
        birth: [{ required: true, message: '请选择出生日期' }],
        addr: [{ required: true, message: '请输入地址' }]
      },
      tableData: [],
      modalType: 0, //0表示点击新增的弹窗，1表示编辑的弹窗
      total: 0, //信息总量
      pageData: {
        page: 1,
        limit: 10
      },
      userform: {
        name: ''
      }
    }
  },
  methods: {
    //提交用户表单
    submit() {
      this.$refs.form.validate(valid => {
        if (valid) {
          //对后续表单数据的处理
          if (this.modalType === 0) {
            addUser(this.form).then(() => {
              this.getList()
            })
          } else {
            editUser(this.form).then(() => {
              this.getList()
            })
          }
          this.$refs.form.resetFields()
          this.dialogVisible = false
        }
      })
    },
    handleClose() {
      this.$refs.form.resetFields()
      this.dialogVisible = false
    },
    cancel() {
      this.handleClose()
      this.dialogVisible = false
    },
    handleEdit(row) {
      this.modalType = 1
      this.dialogVisible = true

      this.form = JSON.parse(JSON.stringify(row)) //注意需要对当前行数据进行深拷贝，否则出错
      console.log(row)
    },

    handleDelete(row) {
      this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          delUser({ id: row.id }).then(() => {
            this.$message({
              type: 'success',
              message: '删除成功!'
            })
            this.getList()
          })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
      console.log(row)
    },
    //获取列表数据
    getList() {
      getUser({ params: { ...this.userform, ...this.pageData } }).then(({ data }) => {
        console.log(data)
        this.tableData = data.list
        this.total = data.count || 0
      })
    },
    handelAdd() {
      this.modalType = 0
      this.dialogVisible = true
    },
    //选择页码的回调函数
    handelPage(val) {
      console.log(val, 'val')
      this.pageData.page = val
      this.getList()
    },
    onSubmit() {
      this.getList()
    }
  },
  mounted() {
    this.getList()
  }
}
</script>

<style lang="less" scoped>
.manage {
  height: 90%;
  .manage-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .common-tabel {
    position: relative;
    height: calc(100% - 62px);
    .pager {
      position: absolute;
      bottom: 0;
      right: 20px;
    }
  }
}
</style>