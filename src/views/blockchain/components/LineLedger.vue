<template>
  <div :class="className" :style="{height:height,width:width}"></div>
</template>

<script>
  import echarts from 'echarts'
  import { debounce } from '@/utils'
  require('echarts/theme/macarons') // echarts 主题

  export default {
    name: 'LineLedger',
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
        default: '230px'
      },
      autoResize: {
        type: Boolean,
        default: true
      }
    },
    data () {
      return {
        chart: null,
        code: 7,
        chartData: {
          blockData: [],
          tranData: []
        },
        changeData: []
      }
    },
    created() {
      this.loadchange()
    },
    mounted () {
      this.initChart()
      if (this.autoResize) {
        this.__resizeHanlder = debounce(() => {
          if (this.chart) {
            this.chart.resize()
          }
        }, 100)
        window.addEventListener('resize', this.__resizeHanlder)
      }
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
      setOptions ({ blockData, tranData } = {}) {
        this.chart.setOption({
          xAxis: {
            data: ['One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven'],
            boundaryGap: false,
            axisTick: {
              show: true
            }
          },
          grid: {
            left: 10,
            right: 10,
            bottom: 20,
            top: 30,
            containLabel: true
          },
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'cross'
            },
            padding: [5, 10]
          },
          yAxis: {
            axisTick: {
              show: false
            }
          },
          legend: {
            data: ['区块变化情况', '交易变化情况']
          },
          series: [{
            name: '区块变化',
            itemStyle: {
              normal: {
                color: '#FF005A',
                lineStyle: {
                  color: '#FF005A',
                  width: 2
                }
              }
            },
            smooth: true,
            type: 'line',
            data: blockData,
            animationDuration: 2800,
            animationEasing: 'cubicInOut'
          },
            {
              name: '交易变化',
              smooth: true,
              type: 'line',
              itemStyle: {
                normal: {
                  color: '#3888fa',
                  lineStyle: {
                    color: '#3888fa',
                    width: 2
                  },
                  areaStyle: {
                    color: '#f3f8ff'
                  }
                }
              },
              data: tranData,
              animationDuration: 2800,
              animationEasing: 'quadraticOut'
            }]
        })
      },
      initChart () {
        this.changeD(this.changeData)
        this.chart = echarts.init(this.$el, 'macarons')
        this.setOptions(this.chartData)
      },
      loadchange: function () {
        var _this = this
        this.$axios.post('/ledgerchange', {
          code: this.code
        }).then(result => {
          if (result.status === 200) {
            _this.changeData = result.data
            console.log('inside lineLedger')
            console.log(result.data)
          } else {
            _this.$message.error('获取区块数据错误')
          }
        }).catch(failed => {
          _this.$message.error(failed)
        })
      },
      changeD: function (changdata) {
        for (let i = 0; i < changdata.length; i++) {
          let nu = changdata.length - i - 1
          this.chartData.blockData[nu] = changdata[i].height
          this.chartData.tranData[nu] = changdata[i].tran_number
        }
      }
    }
  }
</script>
