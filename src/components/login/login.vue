<template>
  <div class="login-wrap">
    <el-form
      :label-position="labelPosition"
      label-width="80px"
      :model="formData"
      class="login-form"
    >
      <h2>用户登录</h2>
      <el-form-item label="用户名">
        <el-input v-model="formData.username"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input type="password" v-model="formData.password"></el-input>
      </el-form-item>
        <el-button v-on:click.prevent="handleLogin" type="primary" class="login-btn">登录</el-button>
    </el-form>
  </div>
</template>

<script>
export default {
  data () {
    return {
      labelPosition: 'top',
      formData: {
        username: '',
        password: ''
      }
    }
  },
  methods: {
    handleLogin: function () {
      this.$http.post('login', this.formData)
        .then((res) => {
          const {
            data,
            meta: {
              msg,
              status
            }
          } = res.data
          if (status === 200) {
            localStorage.setItem('token', data.token)
            // 跳转home
            this.$router.push({
              name: 'home'
            })
            // 提示成功
            this.$message({
              message: msg,
              type: 'success'
            })
          } else {
            this.$message({
              message: msg,
              type: 'error'
            })
          }
        })
    }
  }
}
</script>

<style scoped>
.login-wrap{
  background: #324152;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
  .login-wrap .login-form{
    background: #fff;
    width: 400px;
    padding: 30px;
    border-radius: 5px;
  }
  .login-wrap .login-btn{
    width: 100%;
  }
  .login-wrap h2{
    text-align: center;
  }
</style>
