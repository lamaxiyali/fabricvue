<template>
  <div :class="className" :style="{height:height,width:width}"></div>
</template>

<script>
import echarts from 'echarts'
import { debounce } from '@/utils'
require('echarts/theme/macarons') // echarts 主题

const animationDuration = 6000

export default {
  props: {
    className: {
      type: String,
      default: 'chart'
    },
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: String,
      default: '300px'
    }
  },
  data() {
    return {
      chart: null,
      code: 7,
      chartData: {
        normalData: [],
        configData: []
      },
      changeData: []
    }
  },
  mounted() {
    this.initChart()
    this.__resizeHanlder = debounce(() => {
      if (this.chart) {
        this.chart.resize()
      }
    }, 100)
    window.addEventListener('resize', this.__resizeHanlder)
  },
  beforeDestroy() {
    if (!this.chart) {
      return
    }
    window.removeEventListener('resize', this.__resizeHanlder)
    this.chart.dispose()
    this.chart = null
  },
  created() {
    this.loadData()
  },
  watch: {
    changeData: {
      deep: true,
      handler (val) {
        this.initChart()
      }
    }
  },
  methods: {
    loadData: function () {
      var _this = this
      this.$axios.post('/channelchange', {
        code: this.code
      }).then(result => {
        if (result.status === 200) {
          _this.changeData = result.data
        } else {
          alert('获取出错')
        }
      }).catch(failed => {
        alert('网络错误')
      })
    },
    changeD: function (changdata) {
      for (let i = 0; i < changdata.length; i++) {
        let nu = changdata.length - i - 1
        this.chartData.normalData[nu] = changdata[i].normal_tran
        this.chartData.configData[nu] = changdata[i].config_tran
      }
    },
    initChart() {
      this.changeD(this.changeData)
      this.chart = echarts.init(this.$el, 'macarons')
      this.chart.setOption({
        tooltip: {
          trigger: 'axis',
          axisPointer: { // 坐标轴指示器，坐标轴触发有效
            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        grid: {
          top: 10,
          left: '2%',
          right: '2%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: [{
          type: 'category',
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
          axisTick: {
            alignWithLabel: true
          }
        }],
        yAxis: [{
          type: 'value',
          axisTick: {
            show: false
          }
        }],
        series: [{
          name: 'pageA',
          type: 'bar',
          stack: 'vistors',
          barWidth: '60%',
          data: this.chartData.normalData,
          animationDuration
        }, {
          name: 'pageB',
          type: 'bar',
          stack: 'vistors',
          barWidth: '60%',
          data: this.chartData.configData,
          animationDuration
        }]
      })
    }
  }
}
</script>
