<template>
  <div >
    <el-form class="login-container" label-position="left"
             label-width="80px">
      <h3 class="login_title">系统登录</h3>
      <el-form-item label="账号">
        <el-input type="text" v-model="loginForm.username"
                  auto-complete="off" placeholder="账号" ></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input type="password" v-model="loginForm.password"
                  auto-complete="off" placeholder="密码" @keyup.enter.native="login" ></el-input>
      </el-form-item>
      <el-form-item label="登录角色">
        <el-select v-model="loginForm.parttype" style="width: 100%" placeholder="请选择类型">
          <el-option label="任务参与者" value="task_part"></el-option>
          <el-option label="任务发布者" value="task_request"></el-option>
          <el-option label="管理员" value="admin" disabled></el-option>
        </el-select>
      </el-form-item>
      <el-form-item style="width: 100%">
        <el-button type="primary" style="width: 100%;background: #505458;border: none" v-on:click="login">登录</el-button>
      </el-form-item>
      <el-form-item style="width: 100%">
        <el-row :gutter="10">
          <el-col :span="8">
            <el-link type="info" href="/register" style="text-align: left">
              注册
            </el-link>
          </el-col>
          <el-col :span="8">
            <el-link type="info"  href="/repass" style="text-align: right">忘记密码?</el-link>
          </el-col>
        </el-row>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  export default {
    name: 'Login',
    data () {
      return {
        loginForm: {
          username: 'lamaxiya',
          password: '123456',
          parttype: 'task_part'
        },
        responseResult: []
      }
    },
    methods: {
      login () {
        var _this = this
        alert(this.loginForm.parttype)
        this.$axios
          .post('/login', {
            username: this.loginForm.username,
            password: this.loginForm.password
          })
          .then(successResponse => {
            if (successResponse.data.code === 200) {
              // var data = this.loginForm
              _this.$store.commit('login', _this.loginForm)
              var path = _this.$route.query.redirect
              _this.$message({
                message: '登录成功',
                type: 'success'
              })
              this.$router.replace({
                path: path === '/' || path === undefined ? '/index' : path
              })
            }
            if (successResponse.data.code === 400) {
              _this.$message.error('账号或密码错误')
            }
          })
          .catch(failResponse => {
            _this.$message.error('登陆出错')
          })
      }
    }
  }
</script>
<style>
  .login-container {
    border-radius: 15px;
    background-clip: padding-box;
    margin: 90px auto;
    width: 350px;
    padding: 35px 35px 15px 35px;
    background: #fff;
    box-shadow: 0 0 25px #cac6c6;
  }

  .login_title {
    margin: 0 auto 40px auto;
    text-align: center;
    color: #505458;
  }
  /*#poster {*/
  /*  background:url("src/assets/header.jpg") ;*/
  /*  background-position: center;*/
  /*  height: 100%;*/
  /*  width: 100%;*/
  /*  background-size: cover;*/
  /*  position: fixed;*/
  /*}*/
</style>
<style scoped>

</style>
