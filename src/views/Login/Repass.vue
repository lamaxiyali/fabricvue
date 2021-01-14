<template>
  <el-card class="box-card">
    <el-steps :active="1">
      <el-step title='1、填写邮箱' icon="el-icon-edit"></el-step>
      <el-step title="2、获取验证码" icon="el-icon-message"></el-step>
      <el-step title="3、完成密码重置" icon="el-icon-thumb"></el-step>
    </el-steps>
    <el-divider content-position="left">你正在使用邮箱找回密码</el-divider>
    <div>
      <el-form v-model="reForm" label-width="80px" label-position="left" ref="reForm">
        <el-form-item>
          <p><i class="el-icon-info info"></i> 请输入注册邮箱</p>
        </el-form-item>
        <el-form-item label="邮箱" prop="email" >
          <el-input v-model="reForm.email" placeholder="请输入邮箱"></el-input>
        </el-form-item>
        <el-form-item label="验证邮箱">
          <el-switch
            style="width: 100%"
            v-model="reForm.value2"
            @change="change"
            >
          </el-switch>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" :disabled="able" @click="repass2">下一步</el-button>
        </el-form-item>
      </el-form>
    </div>
  </el-card>
</template>

<script>
    export default {
      name: 'Repass',
      data () {
        return {
          reForm: {
            email: '',
            value2: false
          },
          able: true
        }
      },
      methods: {
        change: function (data) {
          if (data === true) {
            var _this = this
            this.$axios
            .post('/checkemail', {
              email: this.reForm.email
            })
            .then(response => {
              if (response.data.code === 200) {
                _this.$message({
                  message: '邮箱存在，请进行下一步操作',
                  type: 'success'
                })
                this.able = false
              }
              if (response.data.code === 400) {
                _this.$message({
                  message: '邮箱不存在，请重新输入',
                  type: 'warning'
                })
                _this.reForm.value2 = false
                _this.able = true
              }
            })
            .catch(failed => {
              _this.$message.error('重置出错')
            })
          }
        },
        click1: function () {
          this.able = !this.able
        },
        repass2: function () {
          this.$router.push({
            path: '/repass2',
            query: {name: this.reForm.email}
          })
        }
      }
    }
</script>

<style scoped>
   .info{
     color: #409EFF;
   }
  .box-card{
    width: 80%;
    margin: auto;
    height: 100%;
  }
  .el-form{
    width: 40%;
    margin: auto;
    border-radius: 15px;
    background-clip: padding-box;
  }
</style>
