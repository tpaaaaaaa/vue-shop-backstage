<template >
  <div class="charts" ref="charts"></div>
</template>
<script>

export default {
  name: 'BarCharts',
  props: ['payTrend'],
  data() {
    return {
      lineCharts: null,
    }
  },
  watch: {
    payTrend() {
      this.createBarCharts(this.payTrend);
    }
  },
  methods: {
    createBarCharts(data = []) {
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
            type: 'bar',
            data: [16, 20, 33, 58, 43, 56, 12, 35, 41],
            lineStyle: {
              color: 'skyblue'
            }
          }
        ],
        grid: {
          left: 0,
          top: 0,
          right: 0,
          bottom: 0
        },
        tooltip: {}
      })
    }
  },
  mounted() {
    // 初始化echarts实例
    this.lineCharts = this.$echarts.init(this.$refs.charts)
    this.createBarCharts();

  }

}
</script>
<style>
.charts {
  width: 100%;
  height: 100%;
}
</style>
