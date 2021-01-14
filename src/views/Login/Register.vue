<template>
<!--  <el-card class="box-card">-->
<!--    <div slot="header">-->
<!--      <span style="color:#505458"><h2>任务参与用户注册</h2></span>-->
<!--    </div>-->
<!--    <div>-->
<!--      <el-form ref="ruleForm" :model="ruleForm" :rules="rules"  label-width="80px" label-position="left">-->
<!--        <el-form-item label="用户名称" prop="username">-->
<!--          <el-tooltip placement="right" content="请输入4-8为字符或数字" effect="light">-->
<!--            <el-input v-model="ruleForm.username"></el-input>-->
<!--          </el-tooltip>-->
<!--        </el-form-item>-->
<!--        <el-form-item label="用户密码" prop="password" >-->
<!--          <el-input type="password" v-model="ruleForm.password" autocomplete="off"></el-input>-->
<!--        </el-form-item>-->
<!--        <el-form-item label="确认密码" prop="password1">-->
<!--          <el-input type="password" v-model="ruleForm.password1" autocomplete="off"></el-input>-->
<!--        </el-form-item>-->
<!--        <el-form-item label="Email" prop="email">-->
<!--          <el-tooltip effect="light" placement="right" content="请确保邮箱可以收信，可用于忘记密码">-->
<!--          <el-input v-model="ruleForm.email"></el-input>-->
<!--          </el-tooltip>-->
<!--        </el-form-item>-->
<!--        <el-form-item label="手机号">-->
<!--          <el-input v-model="ruleForm.phone"></el-input>-->
<!--        </el-form-item>-->
<!--        <el-form-item label="真实姓名">-->
<!--          <el-input v-model="ruleForm.truename"></el-input>-->
<!--        </el-form-item>-->
<!--        <el-form-item label="身份证号">-->
<!--          <el-input v-model="ruleForm.idcard"></el-input>-->
<!--        </el-form-item>-->
<!--        <el-form-item label="职业">-->
<!--          <el-select v-model="ruleForm.professional" style="width: 100%" placeholder="请选择职业">-->
<!--            <el-option label="学生" value="student"></el-option>-->
<!--            <el-option label="教师" value="teacher"></el-option>-->
<!--            <el-option label="其他" value="other"></el-option>-->
<!--          </el-select>-->
<!--        </el-form-item>-->
<!--        <el-form-item label="学历">-->
<!--          <el-select v-model="ruleForm.education" style="width: 100%" placeholder="请选择学历">-->
<!--            <el-option label="博士" value="Dr"></el-option>-->
<!--            <el-option label="研究生" value="graduate"></el-option>-->
<!--            <el-option label="本科" value="undergraduate"></el-option>-->
<!--            <el-option label="本科以下" value="other"></el-option>-->
<!--          </el-select>-->
<!--        </el-form-item>-->
<!--        <el-form-item label="专业">-->
<!--          <el-input v-model="ruleForm.major"></el-input>-->
<!--        </el-form-item>-->
<!--        <el-form-item label="年龄">-->
<!--          <el-input v-model="ruleForm.age"></el-input>-->
<!--        </el-form-item>-->
<!--        <el-form-item>-->
<!--          <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>-->
<!--          <el-button @click="resetForm('ruleForm')">重置</el-button>-->
<!--        </el-form-item>-->
<!--      </el-form>-->
<!--    </div>-->
<!--  </el-card>-->
<!--  <el-card class="box-card">-->
<!--    <el-tabs v-model="activename"  @tab-click="handleClick">-->
<!--      <el-tab-pane label="任务参与用户注册" name="first">-->
<!--        first-->
<!--      </el-tab-pane>-->
<!--      <el-tab-pane label="任务发布用户注册" name="second">-->
<!--        second-->
<!--      </el-tab-pane>-->
<!--    </el-tabs>-->
<!--  </el-card>-->
  <el-card>
  <el-tabs v-model="activeName" type="card" @tab-click="handleClick" class="box-card">
    <el-tab-pane label="任务参与用户注册" name="first">
      <div style="margin: 20px">任务参与用户注册</div>
      <div>
        <el-form ref="ruleForm" :model="ruleForm" :rules="rules"  label-width="80px" label-position="left">
          <el-form-item label="用户名称" prop="username">
            <el-tooltip placement="right" content="请输入4-8为字符或数字" effect="light">
              <el-input v-model="ruleForm.username"></el-input>
            </el-tooltip>
          </el-form-item>
          <el-form-item label="用户密码" prop="password" >
            <el-input type="password" v-model="ruleForm.password" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="确认密码" prop="password1">
            <el-input type="password" v-model="ruleForm.password1" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="Email" prop="email">
            <el-tooltip effect="light" placement="right" content="请确保邮箱可以收信，可用于忘记密码">
              <el-input v-model="ruleForm.email"></el-input>
            </el-tooltip>
          </el-form-item>
          <el-form-item label="手机号">
            <el-input v-model="ruleForm.phone"></el-input>
          </el-form-item>
          <el-form-item label="真实姓名">
            <el-input v-model="ruleForm.truename"></el-input>
          </el-form-item>
          <el-form-item label="身份证号">
            <el-input v-model="ruleForm.idcard"></el-input>
          </el-form-item>
          <el-form-item label="职业">
            <el-select v-model="ruleForm.professional" style="width: 100%" placeholder="请选择职业">
              <el-option label="学生" value="student"></el-option>
              <el-option label="教师" value="teacher"></el-option>
              <el-option label="其他" value="other"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="学历">
            <el-select v-model="ruleForm.education" style="width: 100%" placeholder="请选择学历">
              <el-option label="博士" value="Dr"></el-option>
              <el-option label="研究生" value="graduate"></el-option>
              <el-option label="本科" value="undergraduate"></el-option>
              <el-option label="本科以下" value="other"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="专业">
            <el-input v-model="ruleForm.major"></el-input>
          </el-form-item>
          <el-form-item label="年龄">
            <el-input v-model="ruleForm.age"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
            <el-button @click="resetForm('ruleForm')">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-tab-pane>
    <el-tab-pane label="任务发布用户注册" name="second">
      <div style="margin: 20px">任务发布用户注册</div>
      <div>
        <el-form ref="ruleForm" :model="ruleForm" :rules="rules"  label-width="80px" label-position="left">
          <el-form-item label="公司名称" prop="username">
            <el-tooltip placement="right" content="请输入4-8为字符或数字" effect="light">
              <el-input v-model="ruleForm.username"></el-input>
            </el-tooltip>
          </el-form-item>
          <el-form-item label="密码" prop="password" >
            <el-input type="password" v-model="ruleForm.password" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="确认密码" prop="password1">
            <el-input type="password" v-model="ruleForm.password1" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="Email" prop="email">
            <el-tooltip effect="light" placement="right" content="请确保邮箱可以收信，可用于忘记密码">
              <el-input v-model="ruleForm.email"></el-input>
            </el-tooltip>
          </el-form-item>
          <el-form-item label="联系方式">
            <el-input v-model="ruleForm.phone"></el-input>
          </el-form-item>
          <el-form-item label="地址">
            <el-input v-model="ruleForm.idcard"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
            <el-button @click="resetForm('ruleForm')">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-tab-pane>
  </el-tabs>
  </el-card>
</template>

<script>
    export default {
      name: 'Register',
      data () {
        var validatePass = (rule, value, callback) => {
          if (value === '') {
            callback(new Error('请输入密码'))
          } else {
            if (this.ruleForm.password1 !== '') {
              this.$refs.ruleForm.validateField('password1')
            }
            callback()
          }
        }
        var validatePass2 = (rule, value, callback) => {
          if (value === '') {
            callback(new Error('请再次输入密码'))
          } else if (value !== this.ruleForm.password) {
            callback(new Error('两次输入密码不一致!'))
          } else {
            callback()
          }
        }
        return {
          activeName: 'first',
          ruleForm: {
            username: '',
            password: '',
            password1: '',
            email: '',
            phone: '',
            truename: '',
            idcard: '',
            professional: '',
            education: '',
            major: '',
            age: '0'
          },
          rules: {
            username: [
              { required: true, message: '请输入名称', trigger: 'blur' },
              { min: 4, max: 8, message: '长度在 4 到 8 个字符', trigger: 'blur' }
            ],
            password: [
              { validator: validatePass, trigger: 'blur' }
            ],
            password1: [
              { validator: validatePass2, trigger: 'blur' }
            ],
            email: [
              { required: true, message: '请输入邮箱', trigger: 'blur' }
            ]
          }
        }
      },
      methods: {
        handleClick: function () {
          if (this.activename === 'first') {
            this.activename = 'second'
          } else {
            this.activename = 'first'
          }
        },
        login: function () {
          this.$router.replace('/login')
        },
        submitForm: function (form) {
          this.$refs[form].validate((valid) => {
            if (valid) {
              var _this = this
              this.$axios
              .post('/register', {
                username: this.ruleForm.username,
                password: this.ruleForm.password,
                email: this.ruleForm.email,
                phone: this.ruleForm.phone,
                name: this.ruleForm.truename,
                cardid: this.ruleForm.idcard,
                profession: this.ruleForm.professional,
                education: this.ruleForm.education,
                major: this.ruleForm.major,
                age: this.ruleForm.age
              })
              .then(response => {
                if (response.data.code === 200) {
                  _this.$message({
                    message: '注册成功',
                    type: 'success'
                  })
                  _this.$router.replace('/login')
                }
                if (response.data.code === 400) {
                  _this.$message({
                    message: '用户已经存在',
                    type: 'warning'
                  })
                }
                if (response.data.code === 401) {
                  _this.$message({
                    message: '邮箱已经存在',
                    type: 'warning'
                  })
                }
                if (response.data.code === 500) {
                  _this.$message.error('服务器错误')
                }
              })
                .catch(failResponse => {
                  _this.$message.error('注册出错')
                })
            } else {
              alert('error')
              return false
            }
          })
        },
        resetForm: function (form) {
          this.$refs[form].resetFields()
        }
      }
    }
</script>

<style scoped>
.box-card{
  width: 80%;
  margin: auto;
}
  .el-form{
    width: 40%;
    margin: auto;
    border-radius: 15px;
    background-clip: padding-box;
  }
</style>
