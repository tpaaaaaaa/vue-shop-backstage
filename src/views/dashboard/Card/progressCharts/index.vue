<template >
  <div class="charts" ref="charts"></div>
</template>
<script>

export default {
  name: 'ProgressCharts',
  props: ['activityRate'],
  data() {
    return {
      progressCharts: null,
    }
  },
  watch: {
    activityRate() {
      this.createProgressCharte([this.activityRate]);
    }
  },
  methods: {
    createProgressCharte(data = []) {
      this.progressCharts.setOption({
        data: [100],
        xAxis: {
          show: false,
          max: 100
        },
        yAxis: {
          show: false,
          type: 'category'
        },
        series: [
          {
            type: 'bar',
            data: data,
            color: 'yellowgreen',
            // 柱状图宽度
            barWidth: 10,
            // 背景颜色设置
            showBackground: true,
            backgroundStyle: {
              color: '#eee'
            },
            // 文本标签
            label: {
              show: true,
              formatter: '|',
              position: 'right'
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
    this.progressCharts = this.$echarts.init(this.$refs.charts);
    this.createProgressCharte([this.activityRate]);

  }

}
</script>
<style>
.charts {
  width: 100%;
  height: 100%;
}
</style>
