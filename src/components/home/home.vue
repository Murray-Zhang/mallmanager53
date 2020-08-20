<template>
    <el-container class="container">
      <el-header class="header">Header</el-header>
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
</style>
