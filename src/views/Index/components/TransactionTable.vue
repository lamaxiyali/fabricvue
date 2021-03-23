<template>
  <div>
  <el-table :data="tableData" style="width: 100%;padding-top: 15px;" >
    <el-table-column label="任务编号">
      <template slot-scope="scope">
        {{scope.row.tid}}
      </template>
    </el-table-column>
    <el-table-column label="任务价格" width="195" align="center">
      <template slot-scope="scope">
        ¥{{scope.row.task_price}}
      </template>
    </el-table-column>
    <el-table-column label="已参与人数" width="195" align="center">
      <template slot-scope="scope">
        <el-tooltip content="点击查看参与情况" placement="top">
        <el-button type="text" @click="partshow(scope.row.taskPartList)">{{scope.row.taskPartList.length}}/({{scope.row.people_limit}}人)</el-button>
        </el-tooltip>
        <el-dialog title="任务参与情况" :visible.sync="sible" width="30%">
          <el-table :data="partData">
            <el-table-column property="task_userid" label="用户名称"></el-table-column>
            <el-table-column property="task_id" label="任务编号"></el-table-column>
          </el-table>
        </el-dialog>
      </template>
    </el-table-column>
    <el-table-column label="任务描述"  width="135" align="center">
      <template slot-scope="scope">
        <el-tooltip content="点击查看任务详细描述" placement="top">
        <el-button type="text" @click="dialogVisible = true">任务描述</el-button>
        </el-tooltip>
        <el-dialog
          title="任务描述"
          width="30%"
          :visible.sync="dialogVisible"
          :before-close="handleClose">
          <el-dialog
            width="50%"
            title="任务详细说明"
            :visible.sync="innerVisible"
            :before-close="handleClose1"
            append-to-body>
            {{scope.row.task_desc}}
          </el-dialog>
          <div align="left">
            <div><p style="font-size: medium">任务类型：<strong>{{scope.row.task_type}}</strong></p></div>
            <div><p style="font-size: medium">感知日期：<strong style="color: red">{{scope.row.task_date}}</strong></p></div>
            <div><p style="font-size: medium">感知区域：<strong style="color: red">{{scope.row.task_area}}</strong></p></div>
            <div><p style="font-size: medium">开始时间：<strong style="color: red">{{scope.row.task_startTime}}</strong></p></div>
            <div><p style="font-size: medium">结束时间：<strong style="color: red">{{scope.row.task_endTime}}</strong></p></div>
            <div><p style="font-size: medium">人数限制：<strong style="color: red">{{scope.row.people_limit}}</strong></p></div>
            <div><p style="font-size: medium">任务描述：<el-button type="info" size="small" @click="innerVisible = true">点击查看具体说明</el-button></p></div>
          </div>
        </el-dialog>
      </template>
    </el-table-column>
    <el-table-column label="任务状态"  width="135" align="center">
      <template slot-scope="scope">
        <el-tag  :type="scope.row.task_status | statusFilter"> {{scope.row.task_status}}</el-tag>
      </template>
    </el-table-column>
    <el-table-column label="任务发布者"  width="135" align="center">
      <template slot-scope="scope">
        {{scope.row.task_from}}
      </template>
    </el-table-column>
    <el-table-column label="参加任务"  width="135" align="center">
      <template slot-scope="scope">
        <el-tooltip content="点击参与任务11" placement="right">
        <el-button :type="scope.row.task_status === '进行中' ? 'success' : 'danger'" size="small" :disabled="scope.row.task_status !== '进行中'" @click="partin(scope.row.tid)">参与任务</el-button>
        </el-tooltip>
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
import TaskCard from './TaskCard'
import Task from '../Task'
import bus from '../../../commonjs/bus'
export default {
  components: {Task, TaskCard},
  data() {
    return {
      startData: [],
      tableData: [],
      partData: [],
      multipleSelection: [],
      url: '',
      criteria: '',
      select: '',
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
    this.count()
    this.loadData(this.currentPage, this.pagesize)
  },
  methods: {
    partin (id) {
      alert(id)
      var taskid = id
      this.$axios.post('/partin', {
        info: taskid
      })
      .then(res => {
        if (res.data.code === 200) {
          this.$message({
            type: 'success',
            message: '参与成功'
          })
        }
        if (res.data.code === 400) {
          this.$message.error('该账号已经参与该任务')
        }
      }).catch(failed => {
        this.$message.error('网络错误')
      })
    },
    partshow (partdata1) {
      this.partData = partdata1
      this.sible = true
    },
    count () {
      this.$axios.get('/counttask')
      .then(res => {
        this.totalCount = res.data.code
      }).catch(failed => {
        this.$message.error(failed)
      })
    },
    loadData: function(pageNum, pageSize) {
      var _this = this
      this.$axios.post('/sectiontask', {
        limit: pageSize,
        page: pageNum
      }).then(res => {
        _this.tableData = res.data
        _this.startData = res.data
        console.log(res.data)
      }).catch(failed => {
        _this.$message.error(failed)
      })
      bus.$emit('sendData', _this.startData)
    },
    handleSizeChange: function(val) {
      this.pagesize = val
      this.loadData(this.currentPage, this.pagesize)
    },
    handleCurrentChange: function(val) {
      this.currentPage = val
      this.loadData(this.currentPage, this.pagesize)
    },
    handleClose: function () {
      this.dialogVisible = false
    },
    handleClose1: function () {
      this.innerVisible = false
    }
  }
}
</script>
