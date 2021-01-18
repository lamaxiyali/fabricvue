<template>
  <div>
    <el-table :data="tableData" style="width: 100%;padding-top: 15px;" v-loading="loading1" >
      <el-table-column label="用户链上索引" >
        <template slot-scope="scope">
          {{scope.row.key}}
        </template>
      </el-table-column>
      <el-table-column label="用户名称" >
        <template slot-scope="scope">
          {{scope.row.record.user_name}}
        </template>
      </el-table-column>
      <el-table-column label="用户邮箱"  align="center">
        <template slot-scope="scope">
          {{scope.row.record.email}}
        </template>
      </el-table-column>
      <el-table-column label="用户信誉值"  align="center">
        <template slot-scope="scope">
          {{scope.row.record.credit}}
        </template>
      </el-table-column>
      <el-table-column label="用户奖励值" align="center">
        <template slot-scope="scope">
          {{scope.row.record.reward}}
        </template>
      </el-table-column>
      <el-table-column label="用户已完成任务个数"  align="center">
        <template slot-scope="scope">
          0
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
    created() {
      this.loadData(this.currentPage, this.pagesize)
    },
    methods: {
      loadData: function(pageNum, pageSize) {
        var _this = this
        this.$axios.get('/allusersonchain').then(res => {
          var before = pageSize * (pageNum - 1)
          _this.tableData = res.data.slice(before, pageSize)
          _this.totalCount = res.data.length
          _this.startData = res.data
          _this.loading1 = false
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
