<template >
    <div>
        <div class="header">
            <span class="search-header">{{title}}</span>
            <svg
                 xmlns="http://www.w3.org/2000/svg"
                 fill="none"
                 viewBox="0 0 24 24"
                 stroke-width="1.5"
                 stroke="currentColor"
                 class="w-6 h-6"
                 style="width: 17px;">
                <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
            </svg>
        </div>
        <div class="main">
            <span>12345</span>
            <span>11.5 <i class="el-icon-caret-top" style="color:greenyellow"></i></span>
            <span>11.5 <i class="el-icon-caret-bottom" style="color:red"></i></span>
        </div>
        <div class="footer">
            <div class="charts" ref="charts"></div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'lineCharts',
    props: ['title', 'dataArray'],
    data() {
        return {
            lineCharts: null
        }
    },
    watch: {
        dataArray() {
            this.createLineCharts(this.dataArray);
        }
    },
    methods: {
        createLineCharts(data = []) {
            this.lineCharts.setOption({
                xAxis: {
                    show: false,
                    type: 'category',
                    boundaryGap: false
                },
                yAxis: {
                    show: false,
                },
                series: [
                    {
                        type: 'line',
                        data: data,
                        areaStyle: {
                            color: {
                                // 渐变颜色
                                type: 'linear',
                                x: 0,
                                y: 0,
                                x2: 0,
                                y2: 1,
                                colorStops: [{
                                    offset: 0, color: 'yellowgreen' // 0% 处的颜色
                                }, {
                                    offset: 1, color: 'white' // 100% 处的颜色
                                }],
                                global: false // 缺省为 false
                            }
                        },
                        smooth: true,
                        itemStyle: {
                            opacity: 0
                        },
                        grid: {
                            left: 100,
                        }
                    }
                ],

            });
        }
    },
    mounted() {
        this.lineCharts = this.$echarts.init(this.$refs.charts)
        this.createLineCharts(this.dataArray);
    },

}
</script>

<style scoped>
.header {
    display: flex;
    align-items: center;
}

.search-header {
    margin-right: 20px;
}

.main {
    margin-top: 10px;
}

.main i {
    margin: 0 10px;
}

.charts {
    width: 100%;
    height: 100px;
}
</style>