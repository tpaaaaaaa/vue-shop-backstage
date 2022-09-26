<template >
    <div class="charts" ref="charts"></div>
</template>
<script>

export default {
  name: 'LineCharts',
  mounted() {
    // 初始化echarts实例
    const lineCharts = this.$echarts.init(this.$refs.charts)

    lineCharts.setOption({
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
          data: [10, 20, 3, 58, 33],
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

}
</script>
<style>
.charts {
    width: 100%;
    height: 100%;
}
</style>
