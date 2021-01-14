<template>
  <div>
<!--    <el-row>-->
<!--&lt;!&ndash;      <el-divider content-position="left">链码执行情况</el-divider>&ndash;&gt;-->
<!--    </el-row>-->
    <el-row style="margin-top: 20px; margin-bottom: 20px" :gutter="30">
      <el-col :span="8">
        <div class="chart-wrapper">
          <div  id="dash1" style="width: 300px;height:280px;"></div>
          <div class="chaincode-bottom">调用链码读操作完成情况</div>
        </div>
      </el-col>
      <el-col :span="8">
        <div class="chart-wrapper">
        <div id="dash2" style="width: 300px;height:280px;" ></div>
        <div class="chaincode-bottom">调用链码写操作完成情况</div>
        </div>
      </el-col>
      <el-col :span="8">
        <div class="chart-wrapper">
          <pie-chaincode :receput="this.chaincodeMetrics.chaincode_shim_requests_received_put" :receget="this.chaincodeMetrics.chaincode_shim_requests_received_get"></pie-chaincode>
          <div class="chaincode-bottom">调用链码读写占比情况</div>
<!--        <div id="dash3" style="width: 300px;height:300px;"></div>-->
<!--        <div>调用链码读写占比情况</div>-->
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import echarts from 'echarts'
  import PieChaincode from './PieChaincode'
    export default {
      name: 'Dashboard',
      components: {PieChaincode},
      data () {
        return {
          value1: 0,
          value2: 0,
          value3: 0,
          chaincodeMetrics: {
            chaincode_launch_duration_count: 0,
            chaincode_shim_requests_received_put: 0,
            chaincode_shim_requests_received_get: 0,
            chaincode_shim_requests_completed_put: 0,
            chaincode_shim_requests_completed_get: 0,
            list: []
          }
        }
      },
      created() {
        this.loaddata()
      },
      mounted() {
        this.initdash1()
      },
      watch: {
        chaincodeMetrics: {
          deep: true,
          handler: function () {
            this.initdash1()
          }
        }
      },
      methods: {
        loaddata: function () {
          var _this = this
          return new Promise((resolve, reject) => {
            this.$axios.get('/chaincodemetrics')
            .then(result => {
              if (result.status === 200) {
                _this.chaincodeMetrics = result.data
                resolve(result.data)
              } else {
                _this.$message.error('获取链码信息失败')
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
          // this.loaddata().then(res => {
          me.value1 = (me.chaincodeMetrics.chaincode_shim_requests_completed_get / me.chaincodeMetrics.chaincode_shim_requests_received_get) * 100
          var chart1 = echarts.init(document.getElementById('dash1'))
          var option = {
            tooltip: {
              formatter: '{a} <br/>{b} : {c}%'
            },
            series: [
              {
                name: '读操作完成情况',
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
          me.value2 = (me.chaincodeMetrics.chaincode_shim_requests_completed_put / me.chaincodeMetrics.chaincode_shim_requests_received_put) * 100
          var chart1 = echarts.init(document.getElementById('dash2'))
          var option = {
            tooltip: {
              formatter: '{a} <br/>{b} : {c}%'
            },
            series: [
              {
                name: '写操作完成情况',
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
    padding: 15px 15px 0;
  }
  .chaincode-bottom {
    padding-bottom: 20px;
    font-weight: bolder;
    font-size: 15px;
    font-family: 'Avenir', Helvetica, Arial, sans-serif
  }
</style>
