<template>
  <div :class="className" :style="{height:height,width:width}"></div>
</template>
<script>
  import echarts from 'echarts'
  import { debounce } from '@/utils'
  require('echarts/theme/macarons') // echarts 主题
  export default {
    props: {
      activenode: 0,
      allnode: 0,
      className: {
        type: String,
        default: 'chart'
      },
      width: {
        type: String,
        default: '100%px'
      },
      height: {
        type: String,
        default: '280px'
      },
      chartname: '',
      chartnamex: '',
      chartnamey: ''
    },
    data() {
      return {
        chart: null
      }
    },
    watch: {
      chartname: function () {
        this.initChart()
      },
      activenode: function () {
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
        this.chart = echarts.init(this.$el, 'macarons')
        this.chart.setOption({
          tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b} : {c} ({d}%)'
          },
          legend: {
            left: 'center',
            bottom: '10',
            data: [this.chartnamex, this.chartnamey]
          },
          calculable: true,
          series: [
            {
              name: this.chartname,
              type: 'pie',
              roseType: 'radius',
              radius: [15, 95],
              center: ['50%', '38%'],
              data: [
                { value: this.activenode, name: this.chartnamex },
                { value: this.allnode, name: this.chartnamey }
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
