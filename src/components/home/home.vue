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
              <a href="" class="loginout">退出</a>
            </div>
          </el-col>
        </el-row>
      </el-header>
      <el-container>
        <el-aside class="aside">Aside</el-aside>
        <el-main class="main">Main</el-main>
      </el-container>
    </el-container>
</template>

<script>
export default {
  name: 'home'
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
