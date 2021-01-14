<template>
  <el-card class="box-card">
    <el-steps :active="2">
      <el-step title='1、填写邮箱' icon="el-icon-edit"></el-step>
      <el-step title="2、获取验证码" icon="el-icon-message"></el-step>
      <el-step title="3、完成密码重置" icon="el-icon-thumb"></el-step>
    </el-steps>
    <el-divider content-position="left">你正在使用邮箱找回密码</el-divider>
    <el-form label-width="100px" label-position="left" v-model="form">
      <el-form-item label="邮箱安全码">
        <el-col :span="12"><el-input v-model="form.code"></el-input></el-col>
        <el-col :span="12">
          <el-tooltip placement="right" content="点击获取验证码" effect="light">
          <el-button type="primary" icon="el-icon-message" circle @click="getCode">
          </el-button>
          </el-tooltip>
        </el-col>
      </el-form-item>
      <el-form-item label="验证验证码">
        <el-switch
          style="width: 100%"
          v-model="form.value2"
          @change="change"
        >
        </el-switch>
      </el-form-item>
      <el-form-item >
        <el-button type="primary" :disabled="able" style="width: 50%" @click="nextStep">下一步</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
    export default {
      name: 'Repass2',
      data () {
        return {
          able: true,
          form: {
            email: '',
            value2: false,
            code: ''
          }
        }
      },
      methods: {
        getCode: function () {
          this.form.email = this.$route.query.name
          var _this = this
          this.$axios
          .post('/getcode', {
            email: this.form.email
          })
          .then((response) => {
            if (response.data.code === 200) {
              _this.$message({
                type: 'success',
                message: '验证码已成功发送，请查收'
              })
            } else {
              _this.$message.error('验证码发送失败')
            }
          })
          .catch(failed => {
            _this.$message.error('重置服务错误')
          })
        },
        change: function () {
          // var code1 = this.form.code
          var _this = this
          this.$axios
          .post('/checkcode', {
            code: this.form.code
          })
          .then(response => {
            if (response.data.code === 200) {
              _this.$message({
                type: 'success',
                message: '验证码正确，请进行下一步'
              })
              _this.able = false
            } else {
              _this.$message.error('验证码错误，请重新输入')
              _this.form.value2 = false
            }
          })
          .catch(failed => {
            _this.$message.error('重置错误')
          })
        },
        nextStep: function () {
          this.$router.push({
            path: '/repass3',
            query: {name: this.form.email}
          })
        }
      }
    }
</script>

<style scoped>
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
