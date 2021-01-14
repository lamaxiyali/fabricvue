<template>
  <el-main class="elmain">
    blockchain

  </el-main>
  <!--  </el-container>-->
</template>

<script>
  import BreadBar from './BreadBar'
  const lineChartData = {
    newVisitis: {
      expectedData: [13, 14, 14, 14, 15, 15, 16],
      actualData: [12, 8, 9, 15, 16, 14, 13]
    },
    messages: {
      expectedData: [13, 14, 14, 14, 15, 15, 16],
      actualData: [12, 8, 9, 15, 16, 14, 13]
    },
    purchases: {
      expectedData: [13, 14, 14, 14, 15, 15, 16],
      actualData: [12, 8, 9, 15, 16, 14, 13]
    },
    shoppings: {
      expectedData: [13, 14, 14, 14, 15, 15, 16],
      actualData: [12, 8, 9, 15, 16, 14, 13]
    }
  }
  export default {
    name: 'Blockchain',
    components: {BreadBar},
    data () {
      return {
        shoppings: {
          expectedData: [13, 14, 14, 14, 15, 15, 16],
          actualData: [12, 8, 9, 15, 16, 14, 13]
        }
      }
    },
    methods: {
      handleSetLineChartData (type) {
        this.lineChartData = lineChartData[type]
      }
    }
  }

</script>

<style scoped>
  .breadcrumb-container{
    float: left;
  }
  .maintask{
    border: 1px solid black;
  }
  .elmain{
    background-color: rgb(240, 242, 245);
  }
</style>
