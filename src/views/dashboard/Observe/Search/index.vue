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
                    <lineCharts title="搜索用户数" :dataArray="this.sameLengthArray[0]"></lineCharts>
                </el-col>
                <el-col :span="12">
                    <lineCharts title="人均搜索次数" :dataArray="this.sameLengthArray[1]"></lineCharts>
                </el-col>
            </el-row>
            <!-- table表格 -->
            <el-table
                      :data="searchWord"
                      style="width: 100%" border>
                <el-table-column
                                 label="排名"
                                 type="index"
                                 :index="tIndex"
                                 width="80">
                </el-table-column>
                <el-table-column
                                 label="搜索关键字"
                                 prop="word"
                                 width="180">
                </el-table-column>
                <el-table-column
                                 label="用户数"
                                 prop="user" sortable>
                </el-table-column>
                <el-table-column
                                 label="周涨幅"
                                 prop="count" sortable>
                </el-table-column>
            </el-table>
            <!-- 分页器 -->
            <el-pagination
                           layout=" prev, pager, next"
                           :total="this.total" background
                           :page-size="limit"
                           :current-page="page"
                           @current-change="pageChangeHandler"
                           class="pagination">
            </el-pagination>

        </div>
    </el-card>
</template>
<script>
import lineCharts from './lineCharts';
import { mapGetters } from 'vuex';
export default {
    name: 'SearchComponent',
    components: { lineCharts },
    data() {
        return {
            page: 1,
            limit: 5,

        }
    },
    computed: {
        ...mapGetters('home', ['searchKeyword', 'sameLengthArray']),
        total() {
            return this.searchKeyword?.length;
        },
        searchWord() {
            return this.searchKeyword?.slice((this.page - 1) * this.limit, (this.page * this.limit) - 1);
        },
        tIndex() {
            return (this.page - 1) * this.limit + 1;
        }
    },
    methods: {
        pageChangeHandler(pager) {
            this.page = pager;
        }
    },
}
</script>
<style scoped>
.search-header {
    display: flex;
    justify-content: space-between;
}

.pagination {
    margin-top: 20px;
    text-align: center;
}
</style>