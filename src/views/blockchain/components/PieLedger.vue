<template>
  <div :class="className" :style="{height:height,width:width}"></div>
</template>
<script>
  import echarts from 'echarts'
  import { debounce } from '@/utils'
  require('echarts/theme/macarons') // echarts 主题
  export default {
    props: {
      rece: 0,
      sent: 0,
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
        default: '280px'
      }
    },
    data() {
      return {
        chart: null
      }
    },
    watch: {
      rece: function () {
        this.initChart()
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
    methods: {
      initChart() {
        console.log(this.receget)
        this.chart = echarts.init(this.$el, 'macarons')
        this.chart.setOption({
          tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b} : {c} ({d}%)'
          },
          legend: {
            left: 'center',
            bottom: '10',
            data: ['发送消息', '接收消息']
          },
          calculable: true,
          series: [
            {
              name: 'gossip发送接受消息占比',
              type: 'pie',
              roseType: 'radius',
              radius: [15, 95],
              center: ['50%', '38%'],
              data: [
                { value: this.sent, name: '发送消息' },
                { value: this.rece, name: '接收消息' }
              ],
              animationEasing: 'cubicInOut',
              animationDuration: 2600
            }
          ]
        })
      }
    }
  }
</script>
