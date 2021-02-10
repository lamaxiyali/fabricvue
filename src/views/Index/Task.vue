<template>
    <el-main class="elmain">
      <panel-group @handleSetLineChartData="handleSetLineChartData"></panel-group>
      <line-chart :chart-data="shoppings" style="margin-top: 10px"></line-chart>
      <el-row style="margin-top:30px;">
        <el-col :span="24" style="padding-right:8px;">
<!--          <el-card>-->
            <home-see-task></home-see-task>
<!--&lt;!&ndash;            <div slot="header" class="clearfix">&ndash;&gt;-->
<!--&lt;!&ndash;              <span>任务情况</span>&ndash;&gt;-->
<!--&lt;!&ndash;            </div>&ndash;&gt;-->
<!--            <div>-->
<!--              <home-see-task></home-see-task>-->
<!--            </div>-->
<!--          </el-card>-->
        </el-col>
      </el-row>
    </el-main>
<!--  </el-container>-->
</template>

<script>
import PanelGroup from './components/PanelGroup'
import LineChart from './components/LineChart'
import HomeSeeTask from './HomeSeeTask'
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
      components: {PanelGroup, LineChart, HomeSeeTask},
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
