<template>
  <el-main class="elmain">
    <panel-channel></panel-channel>
    <tran-channel></tran-channel>
  </el-main>
</template>

<script>
  import PanelChannel from '../components/PanelChannel'
  import TranChannel from '../components/TranChannel'
    export default {
      name: 'Channel',
      components: {PanelChannel, TranChannel},
      created() {
        // var time1 = parseTime(1609144258199)
        // alert(time1)
      }
    }
</script>

<style scoped>
  .elmain{
    background-color: rgb(240, 242, 245);
  }
</style>
