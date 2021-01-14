<template>
  <el-row type="flex" justify="space-around" class="panel-group" style="background-color: white">
    <el-col :span="4">
      <div class="card-panel">
        <el-row :gutter="10">
          <el-col :span="10">
            <i class="fontFamily lamajiedian card-panel-icon" style="color: pink"></i>
          </el-col>
          <el-col :span="10">
            <el-row align="left">
              <div class="card-panel-description">{{this.channelMetrics.consensus_etcdraft_cluster_size}}</div>
            </el-row>
            <el-row align="left">
              <div class="card-panel-text">通道节点数</div>
            </el-row>
          </el-col>
        </el-row>
      </div>
    </el-col>
    <el-col :span="1">
      <el-divider direction="vertical" content-position="center" class="divider-panel"></el-divider>
    </el-col>
    <el-col :span="4">
      <div class="card-panel">
        <el-row :gutter="10">
          <el-col :span="10">
            <i class="fontFamily lamajiedian card-panel-icon" style="color: #67C23A"></i>
          </el-col>
          <el-col :span="10">
            <el-row align="left">
              <div class="card-panel-description">{{this.channelMetrics.consensus_etcdraft_active_nodes}}</div>
            </el-row>
            <el-row align="left">
              <div class="card-panel-text">通道活跃节点数</div>
            </el-row>
          </el-col>
        </el-row>
      </div>
    </el-col>
    <el-col :span="1">
      <el-divider direction="vertical" content-position="center" class="divider-panel"></el-divider>
    </el-col>
    <el-col :span="4">
      <div class="card-panel">
        <el-row :gutter="10">
          <el-col :span="10">
            <i class="fontFamily lama-gtsquanjushiwufuwuGTS card-panel-icon"  style="color: #36a3f7"></i>
          </el-col>
          <el-col :span="10">
            <el-row align="left">
              <div class="card-panel-description">{{this.channelMetrics.consensus_etcdraft_normal_proposals_received}}</div>
            </el-row>
            <el-row align="left">
              <div class="card-panel-text">收到的正常事务</div>
            </el-row>
          </el-col>
        </el-row>
      </div>
    </el-col>
    <el-col :span="1">
      <el-divider direction="vertical" content-position="center" class="divider-panel"></el-divider>
    </el-col>
    <el-col :span="4">
      <div class="card-panel">
        <el-row :gutter="10">
          <el-col :span="10">
            <i class="fontFamily lamapeizhi1 card-panel-icon"  style="color: #34bfa3"></i>
          </el-col>
          <el-col :span="10">
            <el-row align="left">
              <div class="card-panel-description">{{this.channelMetrics.consensus_etcdraft_config_proposals_received}}</div>
            </el-row>
            <el-row align="left">
              <div class="card-panel-text">收到的配置事务</div>
            </el-row>
          </el-col>
        </el-row>
      </div>
    </el-col>
    <el-col :span="1">
      <el-divider direction="vertical" content-position="center" class="divider-panel"></el-divider>
    </el-col>
    <el-col :span="4">
      <div class="card-panel">
        <el-row :gutter="10">
          <el-col :span="10">
            <i class="fontFamily lamazuixinqukuai card-panel-icon"  style="color: #666"></i>
          </el-col>
          <el-col :span="10">
            <el-row align="left">
              <div class="card-panel-description">{{this.channelMetrics.consensus_etcdraft_committed_block_number}}</div>
            </el-row>
            <el-row align="left">
              <div class="card-panel-text">最新提交的块号</div>
            </el-row>
          </el-col>
        </el-row>
      </div>
    </el-col>
  </el-row>

</template>

<script>
  export default {
    name: 'PanelChannel',
    data () {
      return {
        channelMetrics: {
          consensus_etcdraft_active_nodes: 0,
          consensus_etcdraft_committed_block_number: 0,
          consensus_etcdraft_normal_proposals_received: 0,
          consensus_etcdraft_config_proposals_received: 0,
          broadcast_processed_count_update: 0,
          broadcast_processed_count_endorse: 0,
          consensus_etcdraft_cluster_size: 0
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
          this.$axios.get('/channelmetrics')
            .then(result => {
              if (result.status === 200) {
                _this.channelMetrics = result.data
                resolve(result.data)
              } else {
                _this.$message.error('获取账本信息失败')
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
    margin: 10px 50px;
  }
  .divider-panel {
    height: 60px;
    margin: 20px 0;
    background-color: #40c9c6;
  }
  .card-panel {
    height: 100px;
    cursor: pointer;
    font-size: 12px;
    position: relative;
    overflow: hidden;
    color: #666;
    background: #fff;
    box-shadow: 4px 4px 40px rgba(0, 0, 0, .05);
    border-color: rgba(0, 0, 0, .05);
  }
  .icon-block {
    background: #40c9c6;
  }
  .icon-task {
    background: #36a3f7;
  }
  .icon-money {
    background: #f4516c;
  }
  .icon-coin {
    background: #34bfa3;
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
    float: right;
    font-size: 48px;
    margin-top: 25px;
    width: 40px;
    height: 40px;
  }
  .card-panel-description {
    float: right;
    font-weight: bold;
    margin: 26px;
    margin-bottom: 10px;
    margin-left: 0px;
    font-size: 20px;
    padding-right: 10px;
  }
  .card-panel-text {
    line-height: 18px;
    /*color: rgba(0, 0, 0, 0.45);*/
    font-size: 10px;
    margin-bottom: 12px;
    font-weight: bold;
  }
  .card-panel-num {
    font-size: 20px;
  }
</style>
