<template>
  <el-card class="box-card">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>

    <el-row class="elRow">
      <el-col :span="8">
        <el-input placeholder="请输入内容" v-on:input="changeInput" clearable v-on:clear="reloadUsersList" v-model="query" class="input-with-select">
          <el-button v-on:click="searchQuery"  slot="append" icon="el-icon-search"></el-button>
        </el-input>
      </el-col>
      <el-col :span="16">
        <el-button type="success" plain @click="showAddUserDialog = true" class="addUserBtn">添加用户</el-button>
      </el-col>
    </el-row>

    <el-table :data="usersList" border style="width: 100%;margin-top: 30px;" v-loading="loading">
      <el-table-column
        prop="id"
        type="index"
        label="ID"
        width="60" align="center">
      </el-table-column>
      <el-table-column
        prop="username"
        label="姓名"
        width="80" align="center">
      </el-table-column>
      <el-table-column
      prop="email"
      label="邮箱" align="center">
      </el-table-column>
      <el-table-column
        prop="mobile"
        label="电话" align="center">
      </el-table-column>
      <el-table-column
        label="创建时间" width="180" align="center">
        <template slot-scope="usersList">
          {{ usersList.row.create_time | fmtDate }}
        </template>
      </el-table-column>
      <el-table-column
        label="用户状态" width="90" align="center">
        <template slot-scope="usersList">
          <el-switch
            v-model="usersList.row.mg_state"
            active-color="#13ce66"
            inactive-color="#ff4949"
            @change="changUserStatus(usersList.row)">
          </el-switch>
        </template>
      </el-table-column>
      <el-table-column
        label="操作" align="center">
        <template slot-scope="usersList">
          <el-button type="primary" :plain="plain" size="small" icon="el-icon-edit" circle @click="editUser(usersList.row)"></el-button>
          <el-button type="success" :plain="plain" size="small" icon="el-icon-check" circle @click="showRole(usersList.row)"></el-button>
          <el-button type="danger"  :plain="plain" size="small" icon="el-icon-delete" circle @click="deleteUser(usersList.row.id)"></el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="pagenum"
      :page-sizes="[2, 4, 6, 8]"
      :page-size="pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total" class="pagination">
    </el-pagination>

    <el-dialog title="添加用户" center :visible.sync="showAddUserDialog">
      <el-form :model="addUserFormData">
        <el-form-item label="用户名称" :label-width="formLabelWidth">
          <el-input v-model="addUserFormData.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="用户密码" :label-width="formLabelWidth">
          <el-input v-model="addUserFormData.password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="用户邮箱" :label-width="formLabelWidth">
          <el-input v-model="addUserFormData.email" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="用户电话" :label-width="formLabelWidth">
          <el-input v-model="addUserFormData.mobile" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="showAddUserDialog = false">取 消</el-button>
        <el-button type="primary" @click="addUserDataPost">确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog title="编辑用户" center :visible.sync="showEditUserDialog">
      <el-form :model="addUserFormData">
        <el-form-item label="用户名称" :label-width="formLabelWidth">
          <el-input v-model="addUserFormData.username" disabled autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="用户邮箱" :label-width="formLabelWidth">
          <el-input v-model="addUserFormData.email" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="用户电话" :label-width="formLabelWidth">
          <el-input v-model="addUserFormData.mobile" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="showEditUserDialog = false">取 消</el-button>
        <el-button type="primary" @click="editUserDataPost">确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog title="分配角色" center :visible.sync="showSetUserRole">
      <el-form :model="setUserRoleData">
        <el-form-item label="当前用户" :label-width="formLabelWidth">
          {{ currUserData.username }}
        </el-form-item>
        <el-form-item label="选择角色" :label-width="formLabelWidth">
          <el-select v-model="roleId">
            <el-option label="请选择角色" :value="-1"></el-option>
            <el-option :label="item.roleName" :value="item.id" :key="i" v-for="(item, i) in allUserRoles"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="showSetUserRole = false">取 消</el-button>
        <el-button type="primary" @click="setUserRole()">确 定</el-button>
      </div>
    </el-dialog>
  </el-card>
</template>

<script>
export default {
  data: function () {
    return {
      query: '',
      pagenum: 1,
      pagesize: 2,
      total: -1,
      usersList: [],
      showAddUserDialog: false,
      showEditUserDialog: false,
      showSetUserRole: false,
      roleId: -1,
      allUserRoles: {},
      currUserData: {},
      setUserRoleData: {}, // 绑定表单数据
      formLabelWidth: '120px',
      addUserFormData: {
        username: '',
        password: '',
        email: '',
        mobile: ''
      },
      loading: false,
      plain: true
    }
  },
  created () {
    this.getUsersList()
  },
  methods: {
    // 获取用户列表的请求
    searchQuery () {
      this.getUsersList()
    },
    reloadUsersList () {
      this.getUsersList()
    },
    changeInput () {
      this.getUsersList()
    },
    async getUsersList () {
      this.loading = true
      const AUTH_TOKEN = localStorage.getItem('token')
      this.$http.defaults.headers.common['Authorization'] = AUTH_TOKEN
      const res = await this.$http.get(`users?query=${this.query}&pagenum=${this.pagenum}&pagesize=${this.pagesize}`)
      if (res.data) {
        this.loading = false
        const {meta: {msg, status}, data: {users, total}} = res.data
        if (status === 200) {
          this.total = total
          this.usersList = users
        } else {
          this.$message.warning(msg)
        }
      }
    },
    handleSizeChange (val) {
      this.pagenum = 1
      this.pagesize = val
      this.getUsersList()
    },
    handleCurrentChange (val) {
      this.pagenum = val
      this.getUsersList()
    },
    async addUserDataPost () {
      const res = await this.$http.post('users', this.addUserFormData)
      // eslint-disable-next-line no-unused-vars
      const {meta: {msg, status}, data} = res.data
      this.showAddUserDialog = false
      if (status === 201) {
        this.addUserFormData = {}
        this.getUsersList()
        this.$message.success(msg)
      } else {
        this.$message.error(msg)
      }
    },
    async editUserDataPost () {
      const editPostData = {
        id: this.addUserFormData.id,
        email: this.addUserFormData.email,
        mobile: this.addUserFormData.mobile
      }
      const res = await this.$http.put(`users/${editPostData.id}`, editPostData)
      // eslint-disable-next-line no-unused-vars
      const {meta: {msg, status}} = res.data
      this.showEditUserDialog = false
      if (status === 200) {
        this.addUserFormData = {}
        this.getUsersList()
        this.$message.success(msg)
      } else {
        this.$message.error(msg)
      }
    },
    deleteUser (userId) {
      this.$confirm('此操作将永久删除该数据, 是否继续?', '请注意', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true
      }).then(async () => {
        const res = await this.$http.delete(`users/${userId}`)
        const { meta: {msg, status} } = res.data
        if (status === 200) {
          this.getUsersList()
          this.$message({
            type: 'success',
            message: msg
          })
        } else {
          this.$message({
            type: 'waring',
            message: msg
          })
        }
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    editUser (editUserData) {
      this.addUserFormData = editUserData
      this.showEditUserDialog = true
    },
    async changUserStatus (userData) {
      const res = await this.$http.put(`users/${userData.id}/state/${userData.mg_state}`)
      const {meta: { msg, status }} = res.data
      if (status === 200) {
        this.$message.success(msg)
      } else {
        this.$message.error(msg)
      }
    },
    async showRole (userData) {
      this.showSetUserRole = true
      const userRid = await this.$http.get(`users/${userData.id}`)
      this.roleId = userRid.data.data.rid
      // 获取所有的角色列表
      const allRoles = await this.$http.get(`roles`)
      this.allUserRoles = allRoles.data.data
      this.currUserData = userData
    },
    async setUserRole () {
      const setUserRolePut = {
        rid: this.roleId
      }
      const res = await this.$http.put(`users/${this.currUserData.id}/role`, setUserRolePut)
      const {meta: {msg, status}} = res.data
      if (status === 200) {
        this.$message.success(msg)
      } else {
        this.$message.error(msg)
      }
      this.showSetUserRole = false
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
  .pagination{
    margin-top: 20px;
  }
  .addUserBtn{
    margin-left: 20px;
  }
</style>
