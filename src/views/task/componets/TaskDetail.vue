<template>
  <el-card class="box-card">
    <div slot="header">
      <span style="color:#505458"><h2>任务发布</h2></span>
    </div>
    <div>
      <el-form ref="ruleForm" :model="ruleForm" :rules="rules"  label-width="100px" label-position="left">
        <el-form-item label="任务名称" prop="username">
          <el-tooltip placement="right" content="请输入4-8为字符或数字" effect="light">
            <el-input v-model="ruleForm.username"></el-input>
          </el-tooltip>
        </el-form-item>
        <el-form-item label="发布者来源" prop="tinfo" >
          <el-input  v-model="ruleForm.tinfo" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="参与人数限制">
          <el-slider v-model="ruleForm.number"></el-slider>
        </el-form-item>
        <el-form-item label="任务类型">
          <el-select v-model="ruleForm.ttype" style="width: 100%" placeholder="请选择任务类型">
            <el-option label="温度感知" value="温度感知" ></el-option>
            <el-option label="噪声感知" value="噪声感知"></el-option>
            <el-option label="空气质量感知" value="空气质量感知"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="感知区域限制">
          <el-select v-model="ruleForm.limit" style="width: 100%" placeholder="请选择区域">
            <el-option label="海淀区" value="海淀区" ></el-option>
            <el-option label="朝阳区" value="朝阳区"></el-option>
            <el-option label="西土城区" value="西土城区"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="感知日期设置">
          <el-col :span="20">
            <el-date-picker type="date" placeholder="选择日期" v-model="ruleForm.date" style="width: 100%;"></el-date-picker>
          </el-col>
        </el-form-item>
        <el-form-item label="时间限制" style="width: 100%">
          <el-row>
            <el-col :span="10">
            <el-time-select
              placeholder="起始时间"
              style="width: 150px"
              v-model="ruleForm.startTime"
              :picker-options="{
                start: '08:30',
                step: '00:15',
                end: '18:30'
              }">
            </el-time-select>
            </el-col>
            <el-col :span="4">-</el-col>
            <el-col :span="10">
            <el-time-select
              placeholder="结束时间"
              style="width: 150px"
              v-model="ruleForm.endTime"
              :picker-options="{
              start: '08:30',
              step: '00:15',
              end: '18:30',
              minTime: ruleForm.startTime
              }">
            </el-time-select>
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item label="偏好选择">
          <el-checkbox-group v-model="ruleForm.type1" style="width: 100%">
            <el-checkbox label="投标价格" name="toubiao"></el-checkbox>
            <el-checkbox label="采样频率" name="pinlv"></el-checkbox>
            <el-checkbox label="采样时间" name="shijan"></el-checkbox>
            <el-checkbox label="感知位置" name="weizhi"></el-checkbox>
            <el-checkbox label="定位精度" name="jingdu"></el-checkbox>
            <el-checkbox label="未中标数" name="cishu"></el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="任务价格" prop="price" >
          <el-input type="number"  v-model="ruleForm.price"></el-input>
        </el-form-item>
        <el-form-item label="任务状态" >
          <el-input  v-model="ruleForm.status" disabled></el-input>
        </el-form-item>
        <el-form-item label="任务描述">
          <el-input type="textarea" v-model="ruleForm.desc"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">发布任务</el-button>
          <el-button @click="resetForm('ruleForm')">重置任务</el-button>
        </el-form-item>
      </el-form>
    </div>
  </el-card>
</template>

<script>
    export default {
      name: 'TaskDetail',
      data () {
        var validatePass = (rule, value, callback) => {
          if (value === '') {
            callback(new Error('请输入发布者信息'))
          } else {
            callback()
          }
        }
        return {
          ruleForm: {
            username: '感知任务1',
            tinfo: 'company1',
            ttype: '',
            limit: '',
            date: '',
            desc: '感知任务测试',
            startTime: '',
            endTime: '',
            number: 45,
            price: 234,
            type1: [],
            status: '未开始'
          },
          rules: {
            username: [
              { required: true, message: '请输入名称', trigger: 'blur' },
              { min: 4, max: 8, message: '长度在 4 到 8 个字符', trigger: 'blur' }
            ],
            tinfo: [
              { validator: validatePass, trigger: 'blur' }
            ],
            price: [
              { required: true, message: '请输入价格', trigger: 'blur' }
            ],
            limit: [
              { required: true, message: '请选择区域限制', trigger: 'change' }
            ],
            startTime: [
              { type: 'date', required: true, message: '请选择起始时间', trigger: 'change' }
            ],
            endTime: [
              { type: 'date', required: true, message: '请选择截至时间', trigger: 'change' }
            ],
            date: [
              { type: 'date', required: true, message: '请选择发布日期', trigger: 'change' }
            ]
          }
        }
      },
      methods: {
        submitForm: function (form) {
          this.$refs[form].validate((valid) => {
            if (valid) {
              var _this = this
              this.$axios
              .post('/addtask', {
                task_name: this.ruleForm.username,
                task_from: this.ruleForm.tinfo,
                task_type: this.ruleForm.ttype,
                task_area: this.ruleForm.limit,
                task_date: this.ruleForm.date,
                task_desc: this.ruleForm.desc,
                task_startTime: this.ruleForm.startTime,
                task_endTime: this.ruleForm.endTime,
                people_limit: this.ruleForm.number,
                task_price: this.ruleForm.price,
                task_status: this.ruleForm.status
              })
              .then(response => {
                if (response.data.code === 200) {
                  this.$notify({
                    title: '成功',
                    message: '发布文章成功',
                    type: 'success'
                  })
                }
                if (response.data.code === 400) {
                  _this.$message({
                    message: '任务添加失败',
                    type: 'warning'
                  })
                }
              })
                .catch(failResponse => {
                  _this.$message.error('发布失败')
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
    width: 50%;
    margin: auto;
    border-radius: 15px;
    background-clip: padding-box;
  }
</style>
