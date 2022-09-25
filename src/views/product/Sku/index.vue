<template>
    <div>
        <!-- 表格 -->
        <el-table border stripe :data="records">
            <el-table-column type="index" label="序号" align="center" width="80"></el-table-column>
            <el-table-column prop="skuName" label="名称" width="width"></el-table-column>
            <el-table-column prop="skuDesc" label="描述" width="width"></el-table-column>
            <el-table-column label="默认图片" width="100">
                <template slot-scope="{row}">
                    <img :src="row.skuDefaultImg" alt="" style="width: 100px;">
                </template>
            </el-table-column>
            <el-table-column prop="weight" label="重量" width="80"></el-table-column>
            <el-table-column prop="price" label="价格" width="80"></el-table-column>
            <el-table-column prop="prop" label="操作" width="300">
                <template slot-scope="{row,$index}">
                    <el-button type="success" size="mini" icon="el-icon-sort-down" @click=""></el-button>
                    <el-button type="success" size="mini" icon="el-icon-sort-up" @click=""></el-button>
                    <el-button type="primary" size="mini" icon="el-icon-edit" @click=""></el-button>
                    <el-button type="info" size="mini" icon="el-icon-info" @click=""></el-button>
                    <el-button type="primary" size="mini" icon="el-icon-delete" @click=""></el-button>

                </template>
            </el-table-column>

        </el-table>

        <!--分页 
            @current-change="currentChange"
        -->
        <el-pagination
                       @size-change="sizeChange"

                       @current-change="getSkuList"
                       style="text-align: center;"
                       :current-page="1"
                       :page-sizes="[3,5,10]"
                       :page-size="10"
                       layout="prev, pager, next, jumper,->, sizes,total"
                       :total="20" background>
        </el-pagination>


    </div>
</template>

<script>
export default {
    name: 'skuProduct',
    data() {
        return {
            page: 1,
            limit: 10,//当前页数据
            records: [],//存储sku列表数组
            total: 0,//分页器总共数据数
        }
    },
    methods: {
        async getSkuList(pages = 1) {
            this.page = pages;
            const { page, limit } = this;
            let result = await this.$API.sku.reqGetSkuList(page, limit);
            if (result.code !== 200) return;
            this.records = result.data.records;
            this.total = result.data.total;
        },
        sizeChange(limit) {
            this.limit = limit;
            this.getSkuList();
        }
    },
    mounted() {
        this.getSkuList();
    }
}
</script>

<style lang="" scoped>
    
</style>