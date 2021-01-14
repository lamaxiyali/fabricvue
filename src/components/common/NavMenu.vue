<template>
  <el-menu
    :default-active="'/index'"
    router
    mode="horizontal"
    background-color="white"
    text-color="#222"
    active-text-color="red"
    style="min-width: 1300px">
    <el-menu-item>
      <i class="fontFamily lamabaasqukuailianfuwu logo"></i>
    </el-menu-item>
    <el-menu-item v-for="(item,i) in navList" :key="i" :index="item.name">
      {{ item.navItem }}
    </el-menu-item>
    <el-tooltip effect="dark" content="退出登录" placement="top">
      <i class="el-icon-switch-button" v-on:click="logout" style="float:right;font-size: 40px;color: #222;padding: 10px"></i>
    </el-tooltip>
      <el-submenu index="2" style="float: right">
        <template slot="title">我的信息</template>
        <el-menu-item index="/user">个人中心</el-menu-item>
        <el-menu-item index="2-2">修改密码</el-menu-item>
      </el-submenu>
    <p class="user">当前用户:{{this.$store.state.user.username}}</p>
<!--    <span style="position: absolute;padding-top: 20px;right: 43%;font-size: 20px;font-weight: bold">Sensing data</span>-->
  </el-menu>
</template>

<script>
  export default {
    name: 'NavMenu',
    data () {
      return {
        navList: [
          {name: '/index', navItem: '首页'},
          {name: '/task', navItem: '任务管理'},
          {name: '/blockchain', navItem: '区块链信息管理'}
        ]
      }
    },
    methods: {
      logout: function () {
        var _this = this
        this.$axios.get('/logout')
        .then(response => {
          if (response.data.code === 200) {
            _this.$store.commit('logout')
            _this.$router.replace('/login')
          }
        })
      }
    }
  }
</script>

<style scoped>
  .el-icon-switch-button {
    cursor: pointer;
    outline:0;
  }
  a{
    text-decoration: none;
  }

  span {
    pointer-events: none;
  }
  .logo{
    width: 100px;
    height: 100px;
    color: red;
  }
  .user{
    float:right;
    color: #222;
    margin-top: 20px;
    font-weight: bolder;
  }
</style>
