<template>
  <el-container>
    <el-aside style="width: 130px;margin-top: 20px">
      <task-side @indexSelect="handleSelect"></task-side>
    </el-aside>
    <el-main>
      <el-container>
        <el-header style="height: 30px">
          <bread-bar class="breadcrumb-container"></bread-bar>
        </el-header>
        <router-view></router-view>
      </el-container>
    </el-main>
  </el-container>
</template>

<script>
  import Task from './Task'
  import TaskSide from './TaskSide'
  import BreadBar from './BreadBar'
    export default {
      name: 'TaskIndex',
      components: {Task, TaskSide, BreadBar},
      methods: {
        handleSelect: function (key) {
          console.log(key)
          console.log('handleSelect')
          if (key === '0') {
            this.$router.push('/task/alltask')
          }
          if (key === '1') {
            this.$router.push('/task/addtask')
          }
          if (key === '2') {
            this.$router.push('/task/seetask')
          }
          if (key === '3') {
            this.$router.push('/task/analysetask')
          }
        }
      }
    }
</script>

<style scoped>
  .breadcrumb-container{
    float: left;
  }
</style>
