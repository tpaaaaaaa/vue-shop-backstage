<template >
  <div class="charts" ref="charts"></div>
</template>
<script>

export default {
  name: 'LineCharts',
  props: ['visitTrend'],
  data() {
    return {
      lineCharts: null
    }
  },
  watch: {
    visitTrend() {
      this.createLineCharts(this.visitTrend);
    }
  },
  methods: {
    createLineCharts(data = []) {
      this.lineCharts.setOption({
        xAxis: {
          show: false,
          type: 'category'
        },
        yAxis: {
          show: false
        },
        series: [
          {
            type: 'line',
            data: data,
            smooth: true,
            itemStyle: {
              opacity: 0
            },
            lineStyle: {
              color: 'purple'
            },
            areaStyle: {
              color: {
                // 渐变颜色
                type: 'linear',
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [{
                  offset: 0, color: 'purple' // 0% 处的颜色
                }, {
                  offset: 1, color: 'white' // 100% 处的颜色
                }],
                global: false // 缺省为 false
              }
            }
          }
        ],
        grid: {
          left: 0,
          top: 0,
          right: 0,
          bottom: 0
        }
      })
    }
  },
  mounted() {
    // 初始化echarts实例
    this.lineCharts = this.$echarts.init(this.$refs.charts)
    this.createLineCharts(this.visitTrend);
  }

}
</script>
<style>
.charts {
  width: 100%;
  height: 100%;
}
</style>
