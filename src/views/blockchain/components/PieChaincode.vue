<template>
  <div :class="className" :style="{height:height,width:width}"></div>
</template>
<script>
  import echarts from 'echarts'
  import { debounce } from '@/utils'
  require('echarts/theme/macarons') // echarts 主题
  export default {
    props: {
      receput: 0,
      receget: 0,
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
      receput: function () {
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
            data: ['写操作', '读操作']
          },
          calculable: true,
          series: [
            {
              name: '链码读写请求情况',
              type: 'pie',
              roseType: 'radius',
              radius: [15, 95],
              center: ['50%', '38%'],
              data: [
                { value: this.receput, name: '写操作' },
                { value: this.receget, name: '读操作' }
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
