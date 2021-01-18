<template>
  <div>
    <el-card class="userinfo">
      <h3 style="text-align: left">个人基本信息
      <span>
        <el-button type="text" @click="editPersonInfo"><i class="el-icon-edit">编辑</i> </el-button>
      </span>
      </h3>
        <div v-for="(value,o) in this.personinfo1" :key="o" class="word">
          <span style="width:80px; text-align:left;  display:inline-block;">{{o}}:</span>
          <span>{{value}}</span>
        </div>
    </el-card>
    <el-card class="userinfo">
      <h3 style="text-align: left">账号信息
        <span>
        <el-button type="text" @click="editContactInfo"><i class="el-icon-edit">编辑</i> </el-button>
      </span>
      </h3>
      <div v-for="(value,o) in this.contact" :key="o" class="word">
        <span style="width:80px; text-align:left;  display:inline-block;">{{o}}:</span>
        <span>{{value}}</span>
      </div>
    </el-card>
    <el-card class="userinfo">
      <h3 style="text-align: left">信誉奖励信息
        <span>
        <el-button type="text" @click="seeUserCredit"><i class="el-icon-edit">查看</i> </el-button>
      </span>
      </h3>
      <div v-for="(value,o) in this.usercredit" :key="o" class="word">
        <span style="width:80px; text-align:left;  display:inline-block;">{{o}}:</span>
        <span>{{value}}</span>
      </div>
    </el-card>
  </div>
</template>

<script>
    export default {
      name: 'PersonInfo',
      data () {
        return {
          personinfo: ['昵称', '真实姓名', '身份证号', '专业', '学历', '年龄'],
          personinfo1: {
            '用户名': 'lama',
            '真实姓名': 'lilama',
            '身份证号': '',
            '专业': '',
            '学历': '',
            '年龄': ''
          },
          contact: {
            'email': '',
            'phone': ''
          },
          usercredit: {
            'credit': '',
            'reward': ''
          }
        }
      },
      created() {
        this.loadPersonInfo()
        this.loadCreditAndReward()
      },
      methods: {
        editPersonInfo: function () {
          alert('personinfo')
        },
        editContactInfo: function () {
          alert('contactinfo')
        },
        seeUserCredit: function () {
          this.loadCreditAndReward()
          this.$message({
            message: '已获取最新数据',
            type: 'success'
          })
        },
        loadPersonInfo: function () {
          var _this = this
          this.$axios
          .post('/user/getpersoninfo', {
            username: _this.$store.state.user.username
          })
          .then(res => {
            if (res.status === 200) {
              _this.personinfo1['用户名'] = res.data.username
              _this.personinfo1['真实姓名'] = res.data.name
              _this.personinfo1['身份证号'] = res.data.cardid
              _this.personinfo1['专业'] = res.data.major
              _this.personinfo1['学历'] = res.data.education
              if (res.data.age === 0) {
                _this.personinfo1['年龄'] = ''
              } else {
                _this.personinfo1['年龄'] = res.data.age
              }
              _this.contact['email'] = res.data.email
              _this.contact['phone'] = res.data.phone
            } else {
              alert('获取个人信息出错')
            }
          })
          .catch(failed => (
            alert('网络错误')
          ))
        },
        loadCreditAndReward: function () {
          var _this = this
          this.$axios.post('/user/credit', {
            key: _this.$store.state.user.username
          }).then(res => {
            if (res.status === 200) {
              if (res.data !== '') {
                _this.usercredit['credit'] = res.data.record.credit
                _this.usercredit['reward'] = res.data.record.reward
              } else {
                _this.$message({
                  message: '链上不存在您的信息',
                  type: 'warning'
                })
              }
            }
          })
          .catch(failed => (
            alert('网络错误')
          ))
        }

      }
    }
</script>

<style scoped>

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both
  }

  .box-card {
    width: 1000px;
    margin: 10px;
    float: left;
    background: white;
  }
  .userinfo{
    width: 1000px;
    margin: 20px 20px;
  }
  .word{
    font-size: 14px;
    margin: 20px;
    text-align: left;
  }
</style>
