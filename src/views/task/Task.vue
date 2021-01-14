<template>
<!--  <el-container>-->
<!--    <el-header style="height: 30px">-->
<!--      <bread-bar class="breadcrumb-container"></bread-bar>-->
<!--    </el-header>-->
    <el-main class="elmain">
      <panel-group @handleSetLineChartData="handleSetLineChartData"></panel-group>
      <line-chart :chart-data="shoppings" style="margin-top: 10px"></line-chart>
      <el-row style="margin-top:30px;">
        <el-col :span="24" style="padding-right:8px;">
          <el-card>
            <div slot="header" class="clearfix">
              <span>任务情况</span>
            </div>
            <div>
              <transaction-table></transaction-table>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </el-main>
<!--  </el-container>-->
</template>

<script>
  import BreadBar from './BreadBar'
  import PanelGroup from './componets/PanelGroup'
  import LineChart from './componets/LineChart'
  import TransactionTable from './componets/TransactionTable'
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
      name: 'Task',
      components: {BreadBar, PanelGroup, LineChart, TransactionTable},
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
  .clearfix{
    font-weight: bolder;
    font-size: large;
  }
</style>
