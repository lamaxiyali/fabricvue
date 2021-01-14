<template>
  <el-row type="flex" justify="space-around" class="panel-group" :gutter="20">
    <el-col :span="8">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>通道节点活跃对比</span>
        </div>
        <div>
          <pie-channel :chartname="this.shiwu.chart" :chartnamex="this.shiwu.chartx" :chartnamey="this.shiwu.charty" :activenode="this.channelMetrics.consensus_etcdraft_active_nodes" :allnode="this.channelMetrics.consensus_etcdraft_cluster_size-this.channelMetrics.consensus_etcdraft_active_nodes"></pie-channel>
        </div>
      </el-card>
    </el-col>
    <el-col :span="8">
      <el-card class="box-card">
        <el-tabs v-model="activename"  @tab-click="handleClick">
          <el-tab-pane label="应用链码与系统链码配置" name="first" lazy>
            <pie-channel :chartname="this.config.chart" :chartnamex="this.config.chartx" :chartnamey="this.config.charty" :activenode="this.channelMetrics.consensus_etcdraft_config_proposals_received" :allnode="this.channelMetrics.broadcast_processed_count_update - this.channelMetrics.consensus_etcdraft_config_proposals_received"></pie-channel>
          </el-tab-pane>
          <el-tab-pane label="正常事务处理情况" name="second" lazy>
            <div>
            <pie-channel :chartname="this.normal.chart" :chartnamex="this.normal.chartx" :chartnamey="this.normal.charty" :activenode="this.channelMetrics.broadcast_processed_count_endorse" :allnode="this.channelMetrics.consensus_etcdraft_normal_proposals_received - this.channelMetrics.broadcast_processed_count_endorse"></pie-channel>
            </div>
          </el-tab-pane>
        </el-tabs>
      </el-card>
    </el-col>
    <el-col :span="8">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>正常事务和配置事务近7次变化情况</span>
        </div>
        <div>
          <bar-chart-channel></bar-chart-channel>
<!--          <pie-channel :chartname="this.shiwu.chart" :chartnamex="this.shiwu.chartx" :chartnamey="this.shiwu.charty" :activenode="this.channelMetrics.consensus_etcdraft_active_nodes" :allnode="this.channelMetrics.consensus_etcdraft_cluster_size-this.channelMetrics.consensus_etcdraft_active_nodes"></pie-channel>-->
        </div>
      </el-card>
    </el-col>
  </el-row>
</template>

<script>
  import PieChannel from './PieChannel'
  import PieChannel1 from './PieChannel1'
  import PieChart from './PieChart'
  import BarChart from './BarChart'
  import BarChartChannel from './BarChartChannel'
  export default {
    name: 'TranChannel',
    components: {PieChannel, PieChart, PieChannel1, BarChart, BarChartChannel},
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
        },
        shiwu: {
          chart: '通道活跃节点占比',
          chartx: '活跃节点',
          charty: '不活跃节点'
        },
        normal: {
          chart: '正常事务完成情况',
          chartx: '完成事务',
          charty: '收到的正常事务'
        },
        config: {
          chart: '应用链码与系统链码配置',
          chartx: '应用链码',
          charty: '系统链码'
        },
        activename: 'first'
      }
    },
    created() {
      this.loaddata()
    },
    methods: {
      handleClick: function () {
        if (this.activename === 'first') {
          this.activename = 'second'
        } else {
          this.activename = 'first'
        }
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
                _this.$message.error('获取用户信息失败')
                resolve(result)
              }
            }).catch(failed => {
            _this.$message.error('网络错误')
            reject(failed)
          })
        })
      }
    }
  }
</script>

<style scoped>
  .panel-group {
    margin: 10px 50px;
  }
  .box-card {
    height: 350px;
    padding: 20px;
  }
  .collapse {
    font-size: 14px;
    font-weight: bold;
  }
</style>
