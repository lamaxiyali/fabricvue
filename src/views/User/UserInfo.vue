<template>
      <el-container>
        <el-aside style="width: 200px;margin-top: 20px" >
          <user-side @indexSelect="handleSelect"></user-side>
        </el-aside>
        <el-main>
          <el-container>
            <router-view></router-view>
          </el-container>
        </el-main>
      </el-container>
</template>

<script>
  import UserSide from './UserSide'
    export default {
      name: 'UserInfo',
      components: {UserSide},
      methods: {
        handleSelect: function (key) {
          console.log(key)
          console.log('handleSelect')
          if (key === '0') {
            this.$router.push('/user/personinfo')
          }
          if (key === '1') {
            this.$router.push('/user/persontask')
          }
          if (key === '2') {
            this.$router.push('/user/personcoin')
          }
        }
      }
    }
</script>

<style scoped>

</style>
