<template>
    <el-main >
      <task-detail></task-detail>
    </el-main>
</template>

<script>
  import TaskDetail from '../componets/TaskDetail'
    export default {
      name: 'AddTask',
      components: {TaskDetail}
    }
</script>

<style scoped>
  .elmain{
    background-color: rgb(240, 242, 245);
  }
</style>
