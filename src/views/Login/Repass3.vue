<template>
  <el-card class="box-card">
    <el-steps :active="3">
      <el-step title='1、填写邮箱' icon="el-icon-edit"></el-step>
      <el-step title="2、获取验证码" icon="el-icon-message"></el-step>
      <el-step title="3、完成密码重置" icon="el-icon-thumb"></el-step>
    </el-steps>
    <el-divider content-position="left">你正在使用邮箱找回密码</el-divider>
    <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
      <el-form-item label="密码" prop="pass">
        <el-input type="password" v-model="ruleForm.pass" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="checkPass">
        <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
  export default {
    name: 'Repass3',
    data () {
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'))
        } else {
          if (this.ruleForm.checkPass !== '') {
            this.$refs.ruleForm.validateField('checkPass')
          }
          callback()
        }
      }
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'))
        } else if (value !== this.ruleForm.pass) {
          callback(new Error('两次输入密码不一致!'))
        } else {
          callback()
        }
      }
      return {
        ruleForm: {
          pass: '',
          checkPass: '',
          email: ''
        },
        rules: {
          pass: [
            { validator: validatePass, trigger: 'blur' }
          ],
          checkPass: [
            { validator: validatePass2, trigger: 'blur' }
          ]
        }
      }
    },
    methods: {
      submitForm (formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.ruleForm.email = this.$route.query.name
            var _this = this
            this.$axios
              .post('/updatepass', {
                email: this.ruleForm.email,
                password: this.ruleForm.pass
              })
              .then(response => {
                if (response.data.code === 200) {
                  _this.$message({
                    type: 'success',
                    message: '密码重置成功'
                  })
                  _this.$router.replace('/login')
                } else {
                  _this.$message.error('重置失败')
                  _this.form.value2 = false
                }
              })
              .catch(failed => {
                _this.$message.error('重置错误')
              })
          } else {
            console.log('error submit!!')
            return false
          }
        })
      },
      resetForm (formName) {
        this.$refs[formName].resetFields()
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
