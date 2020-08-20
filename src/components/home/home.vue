<template>
    <el-container class="container">
      <el-header class="header">
        <el-row>
          <el-col :span="4">
            <div class="">
              <img src="../../assets/logo.png" alt="无法显示图片">
            </div>
          </el-col>
          <el-col :span="16" class="middle">
            <h3>电商后台管理系统</h3>
          </el-col>
          <el-col :span="4">
            <div class="grid-content bg-purple">
              <a v-on:click.prevent="handleSignout" class="loginout">退出</a>
            </div>
          </el-col>
        </el-row>
      </el-header>
      <el-container>
        <el-aside class="aside">
          <el-menu :unique-opened="false">
            <el-submenu index="1">
              <template slot="title">
                <i class="el-icon-location"></i>
                <span>用户管理</span>
              </template>
                <el-menu-item index="1-1">
                  <i class="el-icon-location"></i>
                  用户列表
                </el-menu-item>
            </el-submenu>
            <el-submenu index="2">
              <template slot="title">
                <i class="el-icon-location"></i>
                <span>权限管理</span>
              </template>
              <el-menu-item index="2-1">
                <i class="el-icon-location"></i>
                角色列表
              </el-menu-item>
              <el-menu-item index="2-2">
                <i class="el-icon-location"></i>
                权限列表
              </el-menu-item>
            </el-submenu>
            <el-submenu index="3">
              <template slot="title">
                <i class="el-icon-location"></i>
                <span>商品管理</span>
              </template>
              <el-menu-item index="3-1">
                <i class="el-icon-location"></i>
                商品列表
              </el-menu-item>
              <el-menu-item index="3-2">
                <i class="el-icon-location"></i>
                分类参数
              </el-menu-item>
              <el-menu-item index="3-3">
                <i class="el-icon-location"></i>
                商品分类
              </el-menu-item>
            </el-submenu>
            <el-submenu index="4">
              <template slot="title">
                <i class="el-icon-location"></i>
                <span>订单管理</span>
              </template>
              <el-menu-item index="4-1">
                <i class="el-icon-location"></i>
                订单列表
              </el-menu-item>
            </el-submenu>
            <el-submenu index="5">
              <template slot="title">
                <i class="el-icon-location"></i>
                <span>数据统计</span>
              </template>
              <el-menu-item index="5-1">
                <i class="el-icon-location"></i>
                数据报表
              </el-menu-item>
            </el-submenu>
          </el-menu>
        </el-aside>
        <el-main class="main">Main</el-main>
      </el-container>
    </el-container>
</template>

<script>
export default {
  beforeCreate: function () {
    const token = localStorage.getItem('token')
    if (!token) {
      this.$router.push({name: 'login'})
    }
  },
  methods: {
    handleSignout: function () {
      localStorage.clear()
      this.$message({
        message: '退出成功',
        type: 'success'
      })
      this.$router.push({name: 'login'})
    }
  }
  // 获取token
  // if token 有 -> 继续渲染组件
  // token 没有-> 登录
}
</script>

<style scoped>
  .container{
    height: 100%;
  }
  .header{
    background: #b3c0d1;
  }
  .aside{
    background: #d3dce6;
  }
  .main{
    background: #e9eef3;
  }
  .middle{
    text-align: center;
  }
  .loginout{
    line-height: 60px;
    text-decoration: none;
  }
</style>
