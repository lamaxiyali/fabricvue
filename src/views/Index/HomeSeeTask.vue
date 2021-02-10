<template>
  <el-main class="elmain">
    <h2>已发布任务如下</h2>
    <el-row style="margin-top:30px;">
      <el-row>
        <el-col :span="12">
          <search-task @onSearch="search" ref="SearchTask"></search-task>
        </el-col>
        <el-col :span="6">
          <status-task @onStatus="statusChange" ref="StatusTask"></status-task>
        </el-col>
      </el-row>
      <el-col :span="24" style="padding-right:8px;">
        <transaction-table ref="TransactionTable" @statusC="statusChange"></transaction-table>
      </el-col>
    </el-row>
  </el-main>
  <!--  </el-container>-->
</template>

<script>
import TransactionTable from '../task/componets/TransactionTable'
import StatusTask from '../task/componets/StatusTask'
import SearchTask from '../task/componets/SearchTask'
export default {
  name: 'HomeSeeTask',
  components: {TransactionTable, SearchTask, StatusTask},
  data () {
    return {
      shoppings: {
        expectedData: [130, 140, 141, 142, 145, 150, 160],
        actualData: [120, 82, 91, 154, 162, 140, 130]
      }
    }
  },
  methods: {
    search (value9) {
      var tt = this.$refs.TransactionTable.startData
      tt = tt.filter(item => {
        if (item.task_from === value9) {
          return item
        }
      })
      this.$refs.TransactionTable.tableData = tt
    },
    statusChange (callvalue) {
      this.search(this.$refs.SearchTask.value9)
      var tt = this.$refs.TransactionTable.tableData
      if (callvalue === '已结束') {
        tt = tt.filter(item => {
          if (item.task_status === '已结束') {
            return item
          }
        })
        this.$refs.TransactionTable.tableData = tt
      } else if (callvalue === '进行中') {
        tt = tt.filter(item => {
          if (item.task_status === '进行中') {
            return item
          }
        })
        this.$refs.TransactionTable.tableData = tt
      } else if (callvalue === '未开始') {
        tt = tt.filter(item => {
          if (item.task_status === '未开始') {
            return item
          }
        })
        this.$refs.TransactionTable.tableData = tt
      } else {
        this.$refs.TransactionTable.tableData = tt
      }
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
</style>
