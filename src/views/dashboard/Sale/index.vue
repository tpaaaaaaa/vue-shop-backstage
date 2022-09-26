<template >
    <el-card class="box-card">
        <!-- 头部 -->
        <div slot="header" class="clearfix">
            <!-- 头部左侧 -->
            <el-tabs class="tabs" v-model="activeName">
                <el-tab-pane label="销售额" name="销售额">销售额</el-tab-pane>
                <el-tab-pane label="访问量" name="访问量">访问量</el-tab-pane>
            </el-tabs>
            <!-- 头部右侧 -->
            <div class="right">
                <span>今日</span>
                <span>本周</span>
                <span>本月</span>
                <span>今年</span>
                <!-- v-model="value1" -->
                <el-date-picker
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
                <el-col :span="16">1</el-col>
                <el-col :span="8">2</el-col>
            </el-row>

        </div>

    </el-card>
</template>
<script>
export default {
    name: 'SaleComponent',
    data() {
        return {
            activeName: '销售额',
        }
    }
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
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px;
}

.tabs {
    width: 100%;
}

.date {
    width: 200px;
}
</style>