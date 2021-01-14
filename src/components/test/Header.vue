<template>
  <el-container>
    <el-header>
      <el-menu
        mode="horizontal"
      >
        <el-menu-item>
          <el-link><img src="../../assets/register.png" style="width: 45px; height: 45px"></el-link>
        </el-menu-item>
        <el-menu-item index="2"><el-link href="/register" >注册</el-link></el-menu-item>
        <el-menu-item index="3"><el-link href="/login" class="fr">登录</el-link></el-menu-item>
      </el-menu>
    </el-header>
    <el-main>
      <router-view></router-view>
    </el-main>
  </el-container>
</template>

<script>
    export default {
        name: 'Header'
    }
</script>
<style scoped>
.el-header{
  width: 100%;
  height: 150px;
}
.el-main{
  width: 100%;
  height: 100%;
  background-color: #f9f9ff;
}
.el-container {
  position: absolute;
  width: 100%;
  top: 0;
  left: 0 ;
  bottom: 0;
}
  .el-header .fr{
    float: right;
  }
</style>
