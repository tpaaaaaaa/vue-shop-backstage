<template >
    <el-card>
        <div slot="header" class="clearfix">
            <div class="search-header">
                线上热门搜索

                <el-dropdown>
                    <span class="el-dropdown-link">
                        <i class="el-icon-more"></i>

                    </span>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item>黄金糕</el-dropdown-item>
                        <el-dropdown-item>狮子头</el-dropdown-item>
                        <el-dropdown-item>螺蛳粉</el-dropdown-item>
                        <!-- <el-dropdown-item disabled>双皮奶</el-dropdown-item>
                        <el-dropdown-item divided>蚵仔煎</el-dropdown-item> -->
                    </el-dropdown-menu>
                </el-dropdown>

            </div>
        </div>

        <div>
            <el-row :gutter="10">
                <el-col :span="12">
                    <lineCharts></lineCharts>
                </el-col>
                <el-col :span="12">
                    <lineCharts></lineCharts>
                </el-col>
            </el-row>

        </div>
    </el-card>
</template>
<script>
import lineCharts from './lineCharts'
export default {
    name: 'SearchComponent',
    components: { lineCharts }
}
</script>
<style scoped>
.search-header {
    display: flex;
    justify-content: space-between;
}
</style>