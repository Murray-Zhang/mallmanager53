<template>
  <el-card class="box-card">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>

    <el-row class="elRow">
      <el-col :span="8">
        <el-input placeholder="请输入内容" v-model="query" class="input-with-select">
          <el-button slot="append" icon="el-icon-search"></el-button>
        </el-input>
      </el-col>
      <el-col :span="16">
        <el-button type="success">添加用户</el-button>
      </el-col>
    </el-row>

    <el-table :data="usersList" border style="width: 100%;margin-top: 30px;">
      <el-table-column
        prop="id"
        type="index"
        label="ID"
        width="60">
      </el-table-column>
      <el-table-column
        prop="username"
        label="姓名"
        width="80">
      </el-table-column>
      <el-table-column
      prop="email"
      label="邮箱">
      </el-table-column>
      <el-table-column
        prop="mobile"
        label="电话">
      </el-table-column>
      <el-table-column
        label="创建时间">
        <template slot-scope="usersList">
          {{ usersList.row.create_time | fmtDate }}
        </template>
      </el-table-column>
      <el-table-column
        label="用户状态">
        <template slot-scope="usersList">
          <el-switch
            v-model="usersList.row.mg_state"
            active-color="#13ce66"
            inactive-color="#ff4949">
          </el-switch>
        </template>
      </el-table-column>
      <el-table-column
        label="操作">
        <template slot-scope="usersList">
          <el-button type="primary" plain="false" size="small" icon="el-icon-edit" circle></el-button>
          <el-button type="success" plain="false" size="small" icon="el-icon-check" circle></el-button>
          <el-button type="danger"  plain="false" size="small" icon="el-icon-delete" circle></el-button>
        </template>
      </el-table-column>
    </el-table>
  </el-card>
</template>

<script>
export default {
  data: function () {
    return {
      query: '',
      pagenum: 1,
      pagesize: 2,
      total: '',
      usersList: []
    }
  },
  created () {
    this.getUsersList()
  },
  methods: {
    // 获取用户列表的请求
    async getUsersList () {
      const AUTH_TOKEN = localStorage.getItem('token')
      this.$http.defaults.headers.common['Authorization'] = AUTH_TOKEN
      const res = await this.$http.get(`users?query=${this.query}&pagenum=${this.pagenum}&pagesize=${this.pagesize}`)
      const {meta:{msg,status},data:{users,total}} = res.data
      if (status === 200) {
        this.total = total
        this.usersList = users
        this.$message.success(msg)
      } else {
        this.$message.warning(msg)
      }
    }
  }
}
</script>

<style scoped>
  .box-card{
    height: 100%;
  }
  .elRow{
    margin-top: 20px;
  }
</style>
