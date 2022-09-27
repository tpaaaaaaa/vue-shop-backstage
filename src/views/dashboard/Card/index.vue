<template >
    <div>
        <el-row :gutter="10">
            <el-col :span="6">
                <el-card>
                    <CardDetail title="总销售额"
                                :count="new Intl.NumberFormat('zh-CN',{style:'currency',currency:'CNY'}).format(list.payTotal)">
                        <template slot="charts">
                            <div class="card-detail-text-rate">
                                <span>
                                    周同比&nbsp;{{transPrecent(list.salesGrowthLastMonth*0.01)}}
                                    <i :class="`el-icon-caret-${list.salesGrowthLastMonth>0?'top':'bottom'}`"
                                       :style="`color:${list.salesGrowthLastMonth>0?'greenyellow':'Red'}`"></i>
                                </span>
                                <span>
                                    日同比&nbsp;{{transPrecent(list.salesGrowthLastDay*0.01)}}
                                    <i :class="`el-icon-caret-${list.salesGrowthLastDay>0?'top':'bottom'}`"
                                       :style="`color:${list.salesGrowthLastDay>0?'greenyellow':'Red'}`"></i>
                                </span>
                            </div>

                        </template>
                        <template slot="footer">
                            <span>日销售额{{new
                            Intl.NumberFormat('zh-CN',{style:'currency',currency:'CNY'}).format(list.salesToday)}}</span>
                        </template>
                    </CardDetail>

                </el-card>
            </el-col>
            <el-col :span="6">
                <el-card>
                    <CardDetail title="访问量" :count="new Intl.NumberFormat().format(list.visitTotal)">
                        <template slot="charts">
                            <lineChart :visitTrend="list.visitTrend"></lineChart>
                        </template>

                        <template slot="footer">
                            <span>日访问量
                                {{new Intl.NumberFormat().format(list.visitToday)}}
                            </span>
                        </template>
                    </CardDetail>

                </el-card>
            </el-col>
            <el-col :span="6">
                <el-card>
                    <CardDetail title="支付笔数" count="495464">
                        <template slot="charts">
                            <barChart :payTrend="this.list.payTrend"></barChart>
                        </template>
                        <template slot="footer">
                            <span>转化率{{transPrecent(list.payRate*0.01)}}</span>
                        </template>
                    </CardDetail>

                </el-card>
            </el-col>
            <el-col :span="6">
                <el-card>
                    <CardDetail title="运营活动效果" count="2253">
                        <template slot="charts">
                            <progressCharts :activityRate="list.activityRate"></progressCharts>
                        </template>
                        <template slot="footer">
                            <span>
                                周同比&nbsp;{{transPrecent(list.activityGrowthLastMonth*0.01)}}
                                <i :class="`el-icon-caret-${list.activityGrowthLastMonth>0?'top':'bottom'}`"
                                   :style="`color:${list.activityGrowthLastMonth>0?'greenyellow':'Red'}`"></i>
                            </span>
                            <span>
                                日同比&nbsp;{{transPrecent(list.activityGrowthLastDay*0.01)}}
                                <i :class="`el-icon-caret-${list.activityGrowthLastDay>0?'top':'bottom'}`"
                                   :style="`color:${list.activityGrowthLastDay>0?'greenyellow':'Red'}`"></i>
                            </span>
                        </template>
                    </CardDetail>

                </el-card>
            </el-col>
        </el-row>

    </div>
</template>
<script>
import CardDetail from './detail';
import lineChart from './LineChart';
import barChart from './barChart';
import progressCharts from './progressCharts';
import { mapState } from 'vuex';
export default {
    name: 'CardComponent',
    components: { CardDetail, lineChart, barChart, progressCharts },
    computed: {
        ...mapState('home', ['list']),
    },
    methods: {
        transPrecent(value) {
            return new Intl.NumberFormat('zh-CN', { style: 'percent', maximumFractionDigits: 2 }).format(value);
        }
    },
}
</script>
<style scoped>
.card-detail-text-rate {
    font-size: 14px;
    position: absolute;
    bottom: 10px;

}
</style>
