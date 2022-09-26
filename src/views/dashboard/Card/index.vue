<template >
    <div>
        <el-row :gutter="10">
            <el-col :span="6">
                <el-card>
                    <CardDetail title="总销售额" count="123">
                        <template slot="charts">
                            <span>周同比&nbsp;56.67%
                                <svg
xmlns="http://www.w3.org/2000/svg"
viewBox="0 0 20 20"
                                     fill="currentColor"
class="w-5 h-5">
                                    <path
fill-rule="evenodd"
                                          d="M14.77 12.79a.75.75 0 01-1.06-.02L10 8.832 6.29 12.77a.75.75 0 11-1.08-1.04l4.25-4.5a.75.75 0 011.08 0l4.25 4.5a.75.75 0 01-.02 1.06z"
                                          clip-rule="evenodd" />
                                </svg>
                            </span>
                            <span>日同比&nbsp;19.96%
                                <svg
xmlns="http://www.w3.org/2000/svg"
viewBox="0 0 20 20"
fill="currentColor"
                                     class="w-5 h-5">
                                    <path
fill-rule="evenodd"
                                          d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                                          clip-rule="evenodd" />
                                </svg>

                            </span>
                        </template>
                        <template slot="footer">
                            <span>日销售额￥123456</span>
                        </template>
                    </CardDetail>

                </el-card>
            </el-col>
            <el-col :span="6">
                <el-card>
                    <CardDetail title="访问量" count="88460">
                        <template slot="charts">
                            <lineChart></lineChart>
                        </template>

                        <template slot="footer">
                            <span>日访问量23456</span>
                        </template>
                    </CardDetail>

                </el-card>
            </el-col>
            <el-col :span="6">
                <el-card>
                    <CardDetail title="支付笔数" count="495464">
                        <template slot="charts">
                            <barChart></barChart>
                        </template>
                        <template slot="footer">
                            <span>转化率23%</span>
                        </template>
                    </CardDetail>

                </el-card>
            </el-col>
            <el-col :span="6">
                <el-card>
                    <CardDetail title="运营活动效果" count="2253">
                        <template slot="charts">
                            <progressCharts></progressCharts>
                        </template>
                        <template slot="footer">
                            <span>周同比&nbsp;56.67%
                                <svg
xmlns="http://www.w3.org/2000/svg"
viewBox="0 0 20 20"
                                     fill="currentColor"
class="w-5 h-5">
                                    <path
fill-rule="evenodd"
                                          d="M14.77 12.79a.75.75 0 01-1.06-.02L10 8.832 6.29 12.77a.75.75 0 11-1.08-1.04l4.25-4.5a.75.75 0 011.08 0l4.25 4.5a.75.75 0 01-.02 1.06z"
                                          clip-rule="evenodd" />
                                </svg>
                            </span>
                            <span>日同比&nbsp;19.96%
                                <svg
xmlns="http://www.w3.org/2000/svg"
viewBox="0 0 20 20"
fill="currentColor"
                                     class="w-5 h-5">
                                    <path
fill-rule="evenodd"
                                          d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                                          clip-rule="evenodd" />
                                </svg>
                            </span>
                        </template>
                    </CardDetail>

                </el-card>
            </el-col>
        </el-row>

    </div>
</template>
<script>
import CardDetail from './detail'
import lineChart from './LineChart'
import barChart from './barChart'
import progressCharts from './progressCharts'
export default {
  name: 'CardComponent',
  components: { CardDetail, lineChart, barChart, progressCharts }
}
</script>
<style >

</style>
