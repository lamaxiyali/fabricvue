<template>
  <div>
    <el-table :data="tableData" style="width: 100%;padding-top: 15px;" v-loading="loading1" >
      <el-table-column label="区块号"  width="80">
        <template slot-scope="scope">
          {{scope.row[0].blockNumber}}
        </template>
      </el-table-column>
      <el-table-column label="区块hash" width="195" align="center">
        <template slot-scope="scope">
          {{scope.row[0].blockHash}}
        </template>
      </el-table-column>
      <el-table-column label="上一区块hash" width="195" align="center">
        <template slot-scope="scope">
          {{scope.row[0].blockPreviousHash}}
        </template>
      </el-table-column>
      <el-table-column label="区块数据hash" width="195" align="center">
        <template slot-scope="scope">
          {{scope.row[0].blockDataHash}}
        </template>
      </el-table-column>
      <el-table-column label="当前区块交易情况" width="195" align="center">
        <template slot-scope="scope">
          <el-tooltip content="点击查看交易情况" placement="top">
            <el-button type="text" @click="partshow(scope.row)">交易个数({{scope.row[0].blockTransactionCount}})</el-button>
          </el-tooltip>
          <el-dialog title="区块交易详细" :visible.sync="sible" width="90%">
            <el-table :data="partData">
              <el-table-column property="transactionID" label="交易ID"></el-table-column>
              <el-table-column property="timestamp" label="交易创建时间" width="150"></el-table-column>
              <el-table-column property="isValid" label="是否有效" width="50"></el-table-column>
              <el-table-column property="MSPID" label="使用的MSP" width="100"></el-table-column>
              <el-table-column property="chaincodeName" label="所用的链码" width="100"></el-table-column>
              <el-table-column property="chaincodeVersion" label="链码版本" width="50"></el-table-column>
              <el-table-column property="endorsementsCount" label="背书节点个数" width="50"></el-table-column>
              <el-table-column property="argus" label="交易参数"></el-table-column>
              <el-table-column property="status" label="交易状态" width="50"></el-table-column>
            </el-table>
          </el-dialog>
        </template>
      </el-table-column>
      <el-table-column label="所在通道ID"  width="135" align="center">
        <template slot-scope="scope">
          {{scope.row[0].blockChannelId}}
        </template>
      </el-table-column>
    </el-table>
    <div align="center">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[5, 10, 20, 30]"
        :page-size="pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="totalCount">
      </el-pagination>
    </div>
  </div>
</template>

<script>
  import {parseTime} from '../../../utils/index'
  export default {
    name: 'BlockInfoLedger',
    components: {parseTime},
    data() {
      return {
        loading1: true,
        startData: [],
        tableData: [],
        partData: [],
        pagesize: 5,
        highlightId: -1,
        currentPage: 1,
        start: 1,
        totalCount: 100,
        dialogVisible: false,
        innerVisible: false,
        sible: false,
        partable: true
      }
    },
    filters: {
      statusFilter(status) {
        const statusMap = {
          已结束: 'success',
          未开始: 'warning',
          进行中: 'info'
        }
        return statusMap[status]
      }
    },
    created() {
      // this.count()
      this.loadData(this.currentPage, this.pagesize)
    },
    methods: {
      partshow (partdata1) {
        partdata1 = partdata1.map(item => {
          item.timestamp = parseTime(item.timestamp)
          item.isValid = item.isValid ? 'true' : 'false'
          item.argus = item.argus.toString()
          return item
        })
        this.partData = partdata1
        this.sible = true
      },
      loadData: function(pageNum, pageSize) {
        var _this = this
        this.$axios.get('/alltranblock').then(res => {
          var before = pageSize * (pageNum - 1)
          _this.tableData = res.data.slice(before, pageSize)
          _this.totalCount = res.data.length
          _this.startData = res.data
          _this.loading1 = false
          // console.log(_this.startData)
        }).catch(failed => {
          _this.$message.error(failed)
        })
      },
      handleSizeChange: function(val) {
        this.pagesize = val
        this.loadCurrentData(this.currentPage, this.pagesize)
      },
      handleCurrentChange: function(val) {
        this.currentPage = val
        this.loadCurrentData(this.currentPage, this.pagesize)
      },
      handleClose: function () {
        this.dialogVisible = false
      },
      handleClose1: function () {
        this.innerVisible = false
      },
      loadCurrentData: function (pageNum, pageSize) {
        var before = pageSize * (pageNum - 1)
        var after = before + pageSize
        this.tableData = this.startData.slice(before, after)
      }
    }
  }
</script>
