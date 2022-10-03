<template >
    <div>
        <el-table border stripe v-loading="loading">
            <el-table-column prop="id" label="名称" width="width"> </el-table-column>
            <el-table-column prop="id" label="权限值" width="width"> </el-table-column>
            <el-table-column prop="id" label="跳转权限值" width="width"> </el-table-column>
            <el-table-column prop="id" label="操作" width="width">
                <template slot-scope="{row,$index}">
                    <el-button type="primary" size="mini" @click=""> <i class="el-icon-plus"></i></el-button>
                    <el-button type="primary" size="mini" @click=""> <i class="el-icon-edit"></i></el-button>
                    <el-button type="danger" size="mini" @click=""> <i class="el-icon-delete"></i></el-button>

                </template>
            </el-table-column>
        </el-table>

    </div>
</template>

<script>
export default {
    name: 'permissionList',
    data() {
        return {
            loading: true,
        }
    }
}
</script>

<style >

</style>