<template>
  <el-row type="flex" justify="space-around" class="panel-group">
    <el-col :span="4">
      <div class="card-panel" @click="handleSetLineChartData('shoppings')">
        <div >
          <i class="fontFamily lamazhinengheyue card-panel-icon" style="color: #40c9c6"></i>
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">应用链码个数</div>
          {{this.chaincodeMetrics.chaincode_launch_duration_count}}
        </div>
      </div>
    </el-col>
    <el-col :span="4">
      <div class="card-panel" @click="handleSetLineChartData('shoppings')">
        <div >
          <i class="fontFamily lamaxie card-panel-icon" style="color: #36a3f7"></i>
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">链码写操作请求</div>
          {{this.chaincodeMetrics.chaincode_shim_requests_received_put}}次
        </div>
      </div>
    </el-col>
    <el-col :span="4">
      <div class="card-panel" @click="handleSetLineChartData('shoppings')">
        <div >
          <i class="card-panel-icon lamaduqushujuku fontFamily" style="color: #f4516c" >
          </i>
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">链码读操作请求</div>
          {{this.chaincodeMetrics.chaincode_shim_requests_received_get}}次
        </div>
      </div>
    </el-col>
    <el-col :span="4">
      <div class="card-panel" @click="handleSetLineChartData('shoppings')">
        <div >
          <i class="fontFamily lamawancheng card-panel-icon" style="color: #34bfa3"></i>
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">链码写操作完成</div>
          {{this.chaincodeMetrics.chaincode_shim_requests_completed_put}}次
        </div>
      </div>
    </el-col>
    <el-col :span="4">
      <div class="card-panel" @click="handleSetLineChartData('shoppings')">
        <div >
          <i class="fontFamily lamayiwancheng card-panel-icon" style="color: #666"></i>
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">链码读操作完成</div>
          {{this.chaincodeMetrics.chaincode_shim_requests_completed_get}}次
        </div>
      </div>
    </el-col>
  </el-row>

</template>

<script>
export default {
  data () {
    return {
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
    this.loaddatathen()
  },
  methods: {
    handleSetLineChartData (type) {
      this.$emit('handleSetLineChartData', type)
    },
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
    loaddatathen: function () {
      let me = this
      this.loaddata().then(res => {
      }).catch(failed => {
        me.$message.error(failed)
      })
    }
  }
}
</script>

<style scoped>
  .panel-group {
    margin-top: 20px;
  }
  .card-panel {
    height: 108px;
    cursor: pointer;
    font-size: 12px;
    position: relative;
    overflow: hidden;
    color: #666;
    background: #fff;
    box-shadow: 4px 4px 40px rgba(0, 0, 0, .05);
    border-color: rgba(0, 0, 0, .05);
  }
  .icon-people {
    background: #40c9c6;
  }
  .icon-task {
    background: #36a3f7;
  }
  .icon-money {
    background: #f4516c;
  }
  .icon-people {
    color: #40c9c6;
  }
  .icon-shoppingCard {
    color: #34bfa3
  }
  .card-panel-icon-wrapper {
    float: left;
    margin: 14px 0 0 14px;
    padding: 16px;
    transition: all 0.38s ease-out;
    border-radius: 6px;
  }
  .card-panel-icon {
    float: left;
    font-size: 48px;
    margin-top: 20px;
    margin-left: 5px;
    width: 40px;
    height: 40px;
  }
  .card-panel-description {
    float: right;
    font-weight: bold;
    margin: 26px;
    margin-left: 0px;
  }
  .card-panel-text {
    line-height: 18px;
    color: rgba(0, 0, 0, 0.45);
    font-size: 15px;
    margin-bottom: 12px;
  }
  .card-panel-num {
    font-size: 20px;
  }
</style>
