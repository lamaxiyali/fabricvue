<template>
  <div>
    <el-table :data="this.chaincodeMetrics.list" style="width: 100%;padding-top: 15px;" >
      <el-table-column label="链码编号">
        <template slot-scope="scope">
          {{scope.row.chaincode_number}}
        </template>
      </el-table-column>
      <el-table-column label="链码名称" width="135" align="center">
        <template slot-scope="scope">
          {{scope.row.name}}
        </template>
      </el-table-column>
      <el-table-column label="链码版本"  width="135" align="center">
        <template slot-scope="scope">
         {{scope.row.version}}
        </template>
      </el-table-column>
      <el-table-column label="链码状态"  width="135" align="center">
        <template slot-scope="scope">
          <el-tag  :type="scope.row.status | statusFilter"> {{scope.row.status}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="链码所在通道"  width="135" align="center">
        <template slot-scope="scope">
          {{scope.row.channel}}
        </template>
      </el-table-column>
    </el-table>
  </div>
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
    filters: {
      statusFilter(status) {
        const statusMap = {
          success: 'success',
          failure: 'warning'
        }
        return statusMap[status]
      }
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
          console.log(res.list)
        }).catch(failed => {
          me.$message.error(failed)
        })
      }
    }
  }
</script>
