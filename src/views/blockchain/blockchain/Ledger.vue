<template>
    <el-main class="elmain">
<!--      <el-header style="text-align: left;font-size: 14px;font-weight: bolder;margin-left: 30px">fabric-version</el-header>-->
      <panel-ledger></panel-ledger>
      <tran-ledger></tran-ledger>
      <el-row style="margin-top:30px;">
        <el-col :span="24" style="padding-right:8px;">
          <el-card>
            <div slot="header" class="clearfix">
              <span>区块与交易信息</span>
            </div>
            <div>
              <block-info-ledger></block-info-ledger>
            </div>
          </el-card>
        </el-col>
      </el-row>
<!--      <dash-ledger></dash-ledger>-->
    </el-main>
</template>

<script>
  import PanelLedger from '../components/PanelLedger'
  import TranLedger from '../components/TranLedger'
  import DashLedger from '../components/DashLedger'
  import PieChart from '../components/PieChart'
  import BlockInfoLedger from '../components/BlockInfoLedger'
    export default {
      name: 'Ledger',
      components: {PanelLedger, TranLedger, DashLedger, PieChart, BlockInfoLedger},
      data () {
        return {
          shoppings: {
            expectedData: [130, 140, 141, 142, 145, 150, 160],
            actualData: [120, 82, 91, 154, 162, 140, 130]
          }
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
