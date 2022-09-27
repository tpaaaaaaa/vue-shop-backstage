<template >
    <el-card class="box-card">
        <!-- 头部 -->
        <div slot="header" class="clearfix">
            <!-- 头部左侧 -->
            <el-tabs class="tabs" v-model="activeName">
                <el-tab-pane label="销售额" name="sale"></el-tab-pane>
                <el-tab-pane label="访问量" name="visite"></el-tab-pane>
            </el-tabs>
            <!-- 头部右侧 -->
            <div class="right flex-center">
                <span class="click" @click="setDay">今日</span>
                <span class="click" @click="setWeek">本周</span>
                <span class="click" @click="setMonth">本月</span>
                <span class="click" @click="setYear">今年</span>
                <!-- v-model="value1" -->
                <el-date-picker
                                v-model="date"
                                value-format="yyyy-MM-dd"
                                class="date"
                                type="datetimerange"
                                start-placeholder="开始日期"
                                end-placeholder="结束日期"
                                :default-time="['12:00:00']">
                </el-date-picker>
            </div>
        </div>
        <!-- 内容区域 -->
        <div>
            <el-row :gutter="10">
                <el-col :span="19">
                    <div class="charts" ref="charts"></div>
                </el-col>
                <el-col :span="5">
                    <div class="rights">
                        <h4>门店销售排名</h4>
                        <ul>
                            <li class="flex-center" v-for="rank of this.saleInfo.orderRank" :key="rank.no">
                                <span class="rindex text-hidden">{{rank.no}}</span>
                                <span class="rtext text-hidden">{{rank.name}}</span>
                                <span class="rvalue text-hidden">{{rank.money}}</span>
                            </li>

                        </ul>
                    </div>
                </el-col>
            </el-row>

        </div>

    </el-card>
</template>
<script>
import dayjs from 'dayjs';
import { mapGetters } from 'vuex';
export default {
    name: 'SaleComponent',
    data() {
        return {
            activeName: 'sale',
            mycharts: null,
            date: []
        }
    },
    computed: {
        title() {
            return this.activeName === 'sale' ? '销售额' : '访问量';
        },
        isOrder() {
            return this.title === '销售额';
        },
        ...mapGetters('home', ['saleInfo']),
    },
    watch: {
        title() {
            this.mycharts.setOption({
                title: {
                    text: `${this.title}趋势`,
                },
                xAxis: {
                    data: this.isOrder ? this.saleInfo.orderFullYearAxis : this.saleInfo.userFullYearAxis,
                },
                yAxis: [
                    {
                        type: 'value'
                    }
                ],
                series: [
                    {
                        name: 'Direct',
                        type: 'bar',
                        barWidth: '60%',
                        data: this.isOrder ? this.saleInfo.orderFullYear : this.saleInfo.userFullYear,
                        color: this.isOrder ? '#228be6' : '#74b816'
                    },
                ],

            });
        },
        saleInfo() {
            this.mycharts.setOption({
                title: {
                    text: '销售额趋势'
                },
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'shadow'
                    }
                },
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '3%',
                    containLabel: true
                },
                xAxis: [
                    {
                        type: 'category',
                        data: this.saleInfo.orderFullYearAxis,
                        axisTick: {
                            alignWithLabel: true
                        }
                    }
                ],
                yAxis: [
                    {
                        type: 'value'
                    }
                ],
                series: [
                    {
                        name: 'Direct',
                        type: 'bar',
                        barWidth: '60%',
                        data: this.saleInfo.orderFullYear,
                        color: '#228be6'
                    }
                ]
            });
        }
    },
    methods: {
        setDay() {
            const day = dayjs().format('YYYY-MM-DD');
            this.date = [day, day];
        },
        setWeek() {
            const start = dayjs().day(1).format('YYYY-MM-DD');
            const end = dayjs().day(7).format('YYYY-MM-DD');
            this.date = [start, end];
        },
        setMonth() {
            const start = dayjs().startOf('month').format('YYYY-MM-DD');
            const end = dayjs().endOf('month').format('YYYY-MM-DD');
            this.date = [start, end];
        },
        setYear() {
            const start = dayjs().startOf('year').format('YYYY-MM-DD');
            const end = dayjs().endOf('year').format('YYYY-MM-DD');
            this.date = [start, end];
        }

    },
    mounted() {
        this.mycharts = this.$echarts.init(this.$refs.charts);

    },
}
</script>

<style scoped>
.box-card {
    margin: 10px 0;
}

div>>>.el-card__header {
    border-bottom: 0;
}

.clearfix {
    position: relative;
    display: flex;
    justify-content: space-between;
}

.right {
    position: absolute;
    right: 0;

}

.flex-center {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px;
}

.tabs {
    width: 100%;
}

.date {
    width: 240px;
}

.charts {
    width: 100%;
    height: 300px;
}

.rights {
    margin: 0;
}

ul {
    list-style: none;
    width: 100%;
    height: 300px;
    padding: 0;
}

ul li {
    height: 8%;
    gap: 15px !important;
    margin: 15px 0;
}

.rindex {
    box-sizing: border-box;
    display: block;
    min-width: 18px;
    height: 17px;
    border-radius: 50%;
    background-color: #f8f9fa;
    color: black;

    text-align: center;

}

.rvalue {
    width: 58px;
    margin-left: 5px;
}

.rtext {
    width: 80px;
}

.text-hidden {
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
}

ul .flex-center:nth-child(-n+3) .rindex {
    background-color: black;
    color: white;

}

.click {
    cursor: pointer;
}
</style>
