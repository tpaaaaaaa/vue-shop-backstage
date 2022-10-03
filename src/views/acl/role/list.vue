<template >
    <div>

        <!-- 查询 -->
        <el-form ref="form" label-width="80px" :inline="true" size="normal">
            <el-form-item label="">
                <el-input placeholder="角色名称"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary"><i class="el-icon-search"></i> 查询</el-button>
                <el-button>清空</el-button>
            </el-form-item>
        </el-form>

        <el-button type="primary">添加</el-button>
        <el-button type="danger" disabled>批量删除</el-button>

        <!-- 表格 -->
        <el-table border stripe v-loading="loading">
            <el-table-column type="selection" width="50">
            </el-table-column>
            <el-table-column type="index" label="序号" width="80" align="center">
            </el-table-column>
            <el-table-column prop="id" label="用户名称" width="">
            </el-table-column>
            <el-table-column prop="id" label="操作" width="width">
                <template slot-scope="{row,$index}">
                    <el-button type="info" size="mini"><i class="el-icon-user"></i></el-button>
                    <el-button type="primary" size="mini"><i class="el-icon-edit"></i></el-button>
                    <el-button type="danger" size="mini"><i class="el-icon-delete"></i></el-button>
                </template>
            </el-table-column>
        </el-table>

        <!-- 分页器 
        @size-change="sizeChange"
                       @current-change="currentChange"
        -->

        <el-pagination
                       :current-page="page"
                       :page-sizes="[3, 5, 10]"
                       :page-size="3"
                       layout=" prev, pager, next, jumper,->, sizes,total"
                       :total="total" background
                       :pager-count="limit">
        </el-pagination>

    </div>
</template>

<script>
export default {
    name: 'roleList',
    data() {
        return {
            page: 1,
            limit: 7,
            total: 50,
            loading: true,
        }
    }
}
</script>

<style >

</style>