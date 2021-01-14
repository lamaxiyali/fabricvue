<template>
  <el-main class="elmain"
  >
    <panel-group @handleSetLineChartData="handleSetLineChartData"></panel-group>
    <dashboard></dashboard>
    <chaincode-table></chaincode-table>
  </el-main>
  <!--  </el-container>-->
</template>

<script>
  import PanelGroup from '../components/PanelGroup'
  import Dashboard from '../components/Dashboard'
  import ChaincodeTable from '../components/ChaincodeTable'
  const lineChartData = {
    shoppings: {
      expectedData: [130, 140, 141, 142, 145, 150, 160],
      actualData: [120, 82, 91, 154, 162, 140, 130]
    }
  }
  export default {
    name: 'Chaincode',
    components: {PanelGroup, Dashboard, ChaincodeTable},
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
