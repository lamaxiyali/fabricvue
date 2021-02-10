<template>
  <el-row class="panel-group" :gutter="40">
    <el-col :span="6">
      <div class="card-panel" @click="handleSetLineChartData('shoppings')">
        <div >
          <i class="el-icon-user-solid card-panel-icon" style="color: #40c9c6"></i>
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">总参与人数</div>
          560
        </div>
      </div>
    </el-col>
    <el-col :span="6">
      <div class="card-panel" @click="handleSetLineChartData('shoppings')">
        <div >
          <i class="el-icon-files card-panel-icon" style="color: #36a3f7"></i>
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">总任务数</div>
          {{totalCount}}
        </div>
      </div>
    </el-col>
    <el-col :span="6">
      <div class="card-panel" @click="handleSetLineChartData('shoppings')">
        <div >
          <i class="card-panel-icon el-icon-money" style="color: #f4516c" >
          </i>
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">任务总价值</div>
          {{totalValue}}
        </div>
      </div>
    </el-col>
    <el-col :span="6">
      <div class="card-panel" @click="handleSetLineChartData('shoppings')">
        <div >
          <i class="el-icon-coin card-panel-icon" style="color: #34bfa3"></i>
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">已发放金额</div>
          845
        </div>
      </div>
    </el-col>
  </el-row>

</template>

<script>
export default {
  data () {
    return {
      totalCount: 0,
      totalValue: 0
    }
  },
  created() {
    this.count()
  },
  methods: {
    handleSetLineChartData (type) {
      this.$emit('handleSetLineChartData', type)
    },
    count () {
      this.$axios.get('/counttask')
        .then(res => {
          this.totalCount = res.data.code
        }).catch(failed => {
        this.$message.error(failed)
      })
      this.$axios.get('/countvalue')
        .then(res => {
          this.totalValue = res.data
        }).catch(failed => {
        this.$message.error(failed)
      })
    }
  }
}
</script>

<style scoped>
  .panel-group {
    margin: 20px;
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
    float: left;
    font-size: 48px;
    margin-top: 20px;
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
    font-size: 16px;
    margin-bottom: 12px;
  }
  .card-panel-num {
    font-size: 20px;
  }
</style>
