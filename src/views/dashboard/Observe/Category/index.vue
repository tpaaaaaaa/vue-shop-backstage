<template >
    <el-card>
        <div class="header">

            <div class="category-header">
                销售额类别
                <el-radio-group v-model="saleType">
                    <el-radio-button label="全部渠道"></el-radio-button>
                    <el-radio-button label="线上"></el-radio-button>
                    <el-radio-button label="门店"></el-radio-button>
                </el-radio-group>
            </div>
        </div>
        <div class="charts" ref="charts"></div>
    </el-card>
</template>
<script>
import { mapGetters } from 'vuex';
export default {
    name: 'categoryComponent',
    data() {
        return {
            saleType: '全部渠道',
            mycharts: null,
        }
    },
    computed: {
        ...mapGetters('home', ['saleRank', 'allSaleRank']),
        switchType() {
            if (this.saleType === '全部渠道')
                return this.allSaleRank;
            if (this.saleType === '线上')
                return this.saleRank[0].online;
            if (this.saleType === '门店')
                return this.saleRank[1].shop;
        }
    },
    watch: {
        // 切换类别监听
        saleType() {
            this.mycharts.setOption({
                title: {
                    text: this.switchType[0].name,
                    subtext: this.switchType[0].value,
                    left: 'center',
                    top: 'center',
                },
                tooltip: {
                    trigger: 'item'
                },
                series: [
                    {
                        name: 'Access From',
                        type: 'pie',
                        radius: ['40%', '70%'],
                        avoidLabelOverlap: false,
                        itemStyle: {
                            // borderRadius: 10,
                            borderColor: '#fff',
                            borderWidth: 2
                        },
                        label: {
                            show: true,
                            position: 'outside'
                        },

                        labelLine: {
                            show: true
                        },
                        data: this.switchType
                    }
                ]
            });
        },
        // 全部渠道监听
        allSaleRank() {
            this.mycharts.setOption({
                title: {
                    text: this.allSaleRank[0].name,
                    subtext: this.allSaleRank[0].value,
                    left: 'center',
                    top: 'center',
                },
                tooltip: {
                    trigger: 'item'
                },
                series: [
                    {
                        name: 'Access From',
                        type: 'pie',
                        radius: ['40%', '70%'],
                        avoidLabelOverlap: false,
                        itemStyle: {
                            // borderRadius: 10,
                            borderColor: '#fff',
                            borderWidth: 2
                        },
                        label: {
                            show: true,
                            position: 'outside'
                        },

                        labelLine: {
                            show: true
                        },
                        data: this.allSaleRank
                    }
                ]
            });
        }
    },
    mounted() {
        // echarts饼图
        this.mycharts = this.$echarts.init(this.$refs.charts);
        this.mycharts.setOption({
            title: {
                text: '视频',
                subtext: 1048,
                left: 'center',
                top: 'center',
            },
            tooltip: {
                trigger: 'item'
            },
            series: [
                {
                    name: 'Access From',
                    type: 'pie',
                    radius: ['40%', '70%'],
                    avoidLabelOverlap: false,
                    itemStyle: {
                        // borderRadius: 10,
                        borderColor: '#fff',
                        borderWidth: 2
                    },
                    label: {
                        show: true,
                        position: 'outside'
                    },

                    labelLine: {
                        show: true
                    },
                    data: this.allSaleRank
                }
            ]
        });

        // 鼠标悬浮切换标题文字
        this.mycharts.on('mouseover', (params) => {
            const { name, value } = params.data;
            this.mycharts.setOption({
                title: {
                    text: name,
                    subtext: value,
                }
            });
        });


    },
}
</script>
<style scoped>
.category-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.header {
    border-bottom: 1px solid #eee;
}

.charts {
    width: 100%;
    height: 320px;
}
</style>