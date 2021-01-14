<template>
  <div>
<!--        <el-row>-->
<!--    &lt;!&ndash;      <el-divider content-position="left">链码执行情况</el-divider>&ndash;&gt;-->
<!--        </el-row>-->
<!--    <el-row  style="margin-top:30px;" :gutter="30">-->
<!--      <el-col :span="8" align="center" class="chart-wrapper">-->
<!--        <div  id="dash1" style="width: 300px;height:300px;"></div>-->
<!--        <div>客户端提案完成情况</div>-->
<!--      </el-col>-->
<!--      <el-col :span="8" align="center" class="chart-wrapper">-->
<!--        <div id="dash2" style="width: 300px;height:300px;" ></div>-->
<!--        <div>gossip消息发收占比情况</div>-->
<!--      </el-col>-->
<!--      <el-col :span="8" align="center" class="chart-wrapper">-->
<!--        <div id="dash3" style="width: 300px;height:300px;"></div>-->
<!--        <div>测试</div>-->
<!--      </el-col>-->
<!--    </el-row>-->
    <el-row style="margin-top:30px;" :gutter="30">
      <el-col :span="12">
        <div class="chart-wrapper">
          <div  id="dash1" style="width: 300px;height:300px;margin-left: 100px"></div>
          <div>客户端提案完成情况</div>
        </div>
      </el-col>
      <el-col :span="12">
        <div class="chart-wrapper">
          <pie-ledger :rece="this.ledgerMetrics.gossip_comm_messages_received" :sent="this.ledgerMetrics.gossip_comm_messages_sent"></pie-ledger>
<!--            <div id="dash2" style="width: 300px;height:300px;" ></div>-->
            <div>gossip消息发收占比情况</div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import echarts from 'echarts'
  import PieChart from './PieChart'
  import PieLedger from './PieLedger'
  // import { debounce } from '@/utils'
  export default {
    name: 'DashLedger',
    components: {PieChart, PieLedger},
    data () {
      return {
        value1: 0,
        value2: 0,
        value3: 0,
        ledgerMetrics: {
          fabric_version: 0,
          //    区块高度--9443--peer
          ledger_blockchain_height: 0,
          //    处理的事务数--9443--peer
          ledger_transaction_count: 0,
          //    收到的提案数量--9443--peer
          endorser_proposals_received: 0,
          //    成功提案的数量--9443--peer
          endorser_successful_proposals: 0,
          //    gossip 消息收到的消息数--9443--peer
          gossip_comm_messages_received: 0,
          //    gossip 消息发送的消息树--9443--peer
          gossip_comm_messages_sent: 0,
          //   当前安装的应用链码个数
          chaincode_launch_duration_count: 0
        }
      }
    },
    created() {
      this.loaddata()
    },
    mounted() {
      // this.initdash1()
    },
    watch: {
      ledgerMetrics: {
        deep: true,
        handler: function () {
          this.loaddata()
        }
      }
    },
    methods: {
      loaddata: function () {
        var _this = this
        return new Promise((resolve, reject) => {
          this.$axios.get('/ledgermetrics')
            .then(result => {
              if (result.status === 200) {
                _this.ledgerMetrics = result.data
                resolve(result.data)
              } else {
                _this.$message.error('获取用户信息失败')
                resolve(result)
              }
            }).catch(failed => {
            _this.$message.error('网络错误')
            reject(failed)
          })
        })
      },
      initdash1: function () {
        let me = this
        me.value1 = me.ledgerMetrics.endorser_successful_proposals / me.ledgerMetrics.endorser_proposals_received * 100
        // alert(me.value1)
        me.value1 = me.value1.toFixed(2)
        var chart1 = echarts.init(document.getElementById('dash1'))
        var option = {
          tooltip: {
            formatter: '{a} <br/>{b} : {c}%'
          },
          series: [
            {
              name: '客户端提案完成情况',
              type: 'gauge',
              detail: {formatter: '{value}%'},
              data: [{value: this.value1, name: '完成率'}]
              // startAngle: 0,
              // endAngle: 359.999
            }
          ]
        }
        chart1.setOption(option)
        this.initdash2()
      },
      initdash2: function () {
        let me = this
        me.value2 = me.ledgerMetrics.gossip_comm_messages_sent / me.ledgerMetrics.gossip_comm_messages_received * 100
        me.value2 = me.value2.toFixed(2)
        var chart1 = echarts.init(document.getElementById('dash2'))
        var option = {
          tooltip: {
            formatter: '{a} <br/>{b} : {c}%'
          },
          series: [
            {
              name: 'gossip消息发收情况',
              type: 'gauge',
              detail: {formatter: '{value}%'},
              data: [{value: this.value2, name: '完成率'}]
            }
          ]
        }
        chart1.setOption(option)
      }
    }
  }
</script>

<style scoped >
  .chart-wrapper {
    background: #fff;
    padding: 15px 15px ;
    text-align: center;
  }
</style>
