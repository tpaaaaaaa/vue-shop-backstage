<template >
    <div>
        <el-input value="新媒体" disabled></el-input>

        <!-- 树形控件 -->
        <el-tree :data="data" node-key="id" show-checkbox style="margin-top: 20px;">
        </el-tree>

        <el-button type="primary" @click="">保存</el-button>
        <el-button @click="">取消</el-button>


    </div>
</template>

<script>
export default {
    name: 'roleAuth',
    data() {
        return {
            data: [{
                id: 1,
                label: '一级 1',
                children: [{
                    id: 4,
                    label: '二级 1-1',
                    children: [{
                        id: 9,
                        label: '三级 1-1-1'
                    }, {
                        id: 10,
                        label: '三级 1-1-2'
                    }]
                }]
            }, {
                id: 2,
                label: '一级 2',
                children: [{
                    id: 5,
                    label: '二级 2-1'
                }, {
                    id: 6,
                    label: '二级 2-2'
                }]
            }, {
                id: 3,
                label: '一级 3',
                children: [{
                    id: 7,
                    label: '二级 3-1'
                }, {
                    id: 8,
                    label: '二级 3-2'
                }]
            }],
        };
    }
}
</script>

<style >

</style>