<template>
    <el-main class="elmain">
      <el-row style="margin-top:30px;">
        <el-col :span="24" style="padding-right:8px;">
          <el-card>
            <div slot="header" class="clearfix">
              <span>链上用户信息</span>
            </div>
            <div>
              <user-info-on-chain></user-info-on-chain>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </el-main>
</template>

<script>
  import UserInfoOnChain from '../components/UserInfoOnChain'
    export default {
      name: 'UserOnBlockchain',
      components: {UserInfoOnChain},
      data () {
        return {
        }
      }
    }
</script>

<style scoped>
  .elmain{
    background-color: rgb(240, 242, 245);
  }
  .chart-wrapper {
    background: #fff;
    padding: 15px 15px 0;
  }
  .clearfix{
    font-weight: bolder;
    font-size: large;
  }
</style>
