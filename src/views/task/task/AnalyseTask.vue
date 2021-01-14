<template>
  <el-main class="elmain">
    <panel-group @handleSetLineChartData="handleSetLineChartData"></panel-group>
    <line-chart :chart-data="shoppings" style="margin-top: 10px"></line-chart>
  </el-main>
  <!--  </el-container>-->
</template>

<script>
  import PanelGroup from '../componets/PanelGroup'
  import LineChart from '../componets/LineChart'
  const lineChartData = {
    newVisitis: {
      expectedData: [100, 120, 161, 134, 105, 160, 165],
      actualData: [120, 82, 91, 154, 162, 140, 145]
    },
    messages: {
      expectedData: [200, 192, 120, 144, 160, 130, 140],
      actualData: [180, 160, 151, 106, 145, 150, 130]
    },
    purchases: {
      expectedData: [80, 100, 121, 104, 105, 90, 100],
      actualData: [120, 90, 100, 138, 142, 130, 130]
    },
    shoppings: {
      expectedData: [130, 140, 141, 142, 145, 150, 160],
      actualData: [120, 82, 91, 154, 162, 140, 130]
    }
  }
  export default {
    name: 'AnalyseTask',
    components: {PanelGroup, LineChart},
    data () {
      return {
        shoppings: {
          expectedData: [130, 140, 141, 142, 145, 150, 160],
          actualData: [120, 82, 91, 154, 162, 140, 130]
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
