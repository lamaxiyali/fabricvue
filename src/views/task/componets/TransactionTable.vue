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
            <el-table-column prop="task_userid" label="数据提交">
              <template slot-scope="scope">
              <el-button :type="checkcolor(scope.row.task_userid)" plain size="small" :disabled="checkusername(scope.row.task_userid)" @click="summitData(scope.row)">
                  上传感知数据
            </el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-dialog>
      </template>
    </el-table-column>
    <el-table-column label="任务描述"  width="135" align="center">
      <template slot-scope="scope">
        <el-tooltip content="点击查看任务详细描述" placement="top">
        <el-button type="text" @click="changebutton(scope)">任务描述
        </el-button>
        </el-tooltip>
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
        <el-tooltip content="点击参与任务" placement="right">
        <el-button :type="scope.row.task_status === '进行中' ? 'success' : 'danger'" size="small" :disabled="scope.row.task_status !== '进行中'" @click="partin(scope.row)">参与任务</el-button>
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
    <el-dialog
      title="上传属性集"
      :visible.sync="dialogFormVisible"
      >
      <el-form v-model="form" style="text-align: left" ref="dataForm">
        <el-form-item label="任务编号"  prop="title">
          <el-input v-model="form.task_id" autocomplete="off" disabled></el-input>
        </el-form-item>
        <el-form-item label="用户期望价格（ep）"  prop="title">
          <el-input v-model.number="form.ep" autocomplete="off" placeholder="最大价格为"></el-input>
        </el-form-item>
        <el-form-item label="采样频率（ad）"  prop="author">
          <el-input v-model.number="form.ad" autocomplete="off" placeholder="默认为1-10次"></el-input>
        </el-form-item>
        <el-form-item label="采样时间（at）"  prop="date">
          <el-input v-model.number="form.at" autocomplete="off" placeholder="默认10-100s"></el-input>
        </el-form-item>
        <el-form-item label="感知位置（pl）" prop="press">
          <el-input v-model.number="form.pl" autocomplete="off" placeholder="默认介于1-1000m"></el-input>
        </el-form-item>
        <el-form-item label="定位精度（pa）"  prop="cover">
          <el-input v-model.number="form.pa" autocomplete="off" placeholder="默认介于5-50m"></el-input>
        </el-form-item>
        <el-form-item label="未中标次数（bn）"  prop="abs">
          <el-input v-model.number="form.bn" autocomplete="off" placeholder="默认为0" disabled></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancle">取 消</el-button>
        <el-button type="primary" @click="onSubmit">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog
      title="上传感知数据"
      :visible.sync="dialogdataFormVisible"
    >
      <el-form v-model="form" style="text-align: left">
        <el-form-item label="任务编号"  prop="title">
          <el-input v-model="sensedata.task_id" autocomplete="off" disabled></el-input>
        </el-form-item>
        <el-form-item label="感知日期">
          <el-input v-model="sensedata.date" autocomplete="off" disabled></el-input>
        </el-form-item>
        <el-form-item label="感知时间" style="width: 100%">
          <el-input v-model="sensedata.time" placeholder="请输入获取感知数据花费时间（设备消耗时间）" autocomplete="off" ></el-input>
        </el-form-item>
        <el-form-item label="位置经度" >
          <el-input v-model="sensedata.latitude" placeholder="获取数据大致经度" autocomplete="off" ></el-input>
        </el-form-item>
        <el-form-item label="位置维度" >
          <el-input v-model="sensedata.longitude" placeholder="获取数据大致维度" autocomplete="off" ></el-input>
        </el-form-item>
        <el-form-item label="温度数据" >
          <el-input v-model="sensedata.temperature" placeholder="感知数据平均值" autocomplete="off" ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancle">取 消</el-button>
        <el-button type="primary" @click="onSubmit">确 定</el-button>
      </div>
    </el-dialog>
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
      username: this.$store.state.user.username,
      attrisupload: false,
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
      dialogFormVisible: false,
      dialogdataFormVisible: false,
      innerVisible: false,
      sible: false,
      partable: true,
      form: {
        ep: '',
        ad: '',
        at: '',
        pl: '',
        pa: '',
        bn: '',
        task_id: ''
      },
      sensedata: {
        task_id: '',
        date: '',
        latitude: '',
        longitude: '',
        temperature: ''
      }
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
    partin (row) {
      this.form.task_id = row.tid
      this.form.bn = 0
      var pri = row.task_price / row.people_limit
      this.form.ep = pri
      this.dialogFormVisible = true
      // this.$axios.post('/partin', {
      //   info: taskid
      // })
      // .then(res => {
      //   if (res.data.code === 200) {
      //     that.dialogFormVisible = true
      //   }
      //   if (res.data.code === 400) {
      //     this.$message.error('该账号已经参与该任务')
      //   }
      //   if (res.data.code === 401) {
      //     this.$message.error('参与人数到达上线')
      //   }
      // }).catch(failed => {
      //   this.$message.error('网络错误')
      // })
    },
    cancle () {
      this.dialogFormVisible = false
    },
    checkcolor (username) {
      if (username === this.username) {
        return 'success'
      }
      return 'warning'
    },
    checkusername (username) {
      if (username === this.username) {
        return false
      }
      return true
    },
    addDate () {
      let nowDate = new Date()
      let date = {
        year: nowDate.getFullYear(),
        month: nowDate.getMonth() + 1,
        date: nowDate.getDate()
      }
      var systemTime = date.year + '-' + date.month + '-' + date.date
      return systemTime
    },
    summitData (row) {
      if (row.task_userid !== this.$store.state.user.username) {
        this.$message.error('当前登录用户与所选参与用户不匹配')
      } else {
        this.sensedata.task_id = row.task_id
        this.sensedata.date = this.addDate()
        this.dialogdataFormVisible = true
      }
    },
    onSubmit () {
      var that = this
      this.$axios.post('/addattr', {
        ep: this.form.ep,
        ad: this.form.ad,
        at: this.form.at,
        pl: this.form.pl,
        pa: this.form.pa,
        bn: this.form.bn,
        task_id: this.form.task_id
      })
        .then(res => {
          if (res.data.code === 200) {
            this.$message({
              type: 'success',
              message: '参与成功'
            })
            that.dialogFormVisible = false
          }
          if (res.data.code === 400) {
            this.$message.error('该账号已经参与该任务')
          }
          if (res.data.code === 402) {
            this.$message.error('链上属性插入逻辑错误')
          }
          if (res.data.code === 401) {
            this.$message.error('参与人数到达上线')
          }
        }).catch(failed => {
        this.$message.error('网络错误')
      })

      // alert('onSumbit')
    },
    partshow (partdata1) {
      this.partData = partdata1
      console.log(partdata1)
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
    },
    changebutton(scope) {
      this.dialogVisible = true
      var strs = '<pre>'
      strs += '任务类型：' + scope.row.task_type + '\n'
      strs += '感知日期：' + scope.row.task_date + '\n'
      strs += '感知区域：' + scope.row.task_area + '\n'
      strs += '开始时间：' + scope.row.task_startTime + '\n'
      strs += '结束时间：' + scope.row.task_endTime + '\n'
      strs += '人数限制：' + scope.row.people_limit + '\n'
      strs += '任务描述：' + scope.row.task_desc + '\n'
      strs += '</pre>'
      this.$alert(strs, '任务情况说明', {
        confirmButtonText: '确定',
        dangerouslyUseHTMLString: true,
        callback: action => {
          // this.$message({
          //   type: 'info',
          //   // message: `${action}`
          // })
        }
      })
    }
  }
}
</script>
