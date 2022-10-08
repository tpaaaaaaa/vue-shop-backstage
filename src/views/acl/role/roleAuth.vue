<template >
    <div>
        <el-input :value="roleName" disabled></el-input>

        <!-- 树形控件 -->
        <el-tree
                 @check="handlerChangeChecked"
                 v-loading="loading"
                 :data="permissionList"
                 :props="porpOption"
                 node-key="id"
                 show-checkbox
                 :default-expand-all="true"
                 :default-checked-keys="checkedIdList"

                 style="margin-top: 20px;">
        </el-tree>

        <el-button type="primary" @click="savePermission">保存</el-button>
        <el-button @click="cancelUpdatePermission">取消</el-button>


    </div>
</template>

<script>
export default {
    name: 'roleAuth',
    data() {
        return {
            // data: [{
            //     id: 1,
            //     label: '一级 1',
            //     children: [{
            //         id: 4,
            //         label: '二级 1-1',
            //         children: [{
            //             id: 9,
            //             label: '三级 1-1-1'
            //         }, {
            //             id: 10,
            //             label: '三级 1-1-2'
            //         }]
            //     }]
            // }, {
            //     id: 2,
            //     label: '一级 2',
            //     children: [{
            //         id: 5,
            //         label: '二级 2-1'
            //     }, {
            //         id: 6,
            //         label: '二级 2-2'
            //     }]
            // }, {
            //     id: 3,
            //     label: '一级 3',
            //     children: [{
            //         id: 7,
            //         label: '二级 3-1'
            //     }, {
            //         id: 8,
            //         label: '二级 3-2'
            //     }]
            // }],
            permissionList: [],
            loading: true,
            porpOption: {
                label: 'name',
            },
            checkedIdList: [],
            updateIdList: [],
        };
    },
    computed: {
        roleName() {
            return this.$route.query?.roleName;
        },
        roleId() {
            return this.$route.params?.id;
        },

    },
    watch: {
        permissionList() {
            this.loading = false;
            this.getIdList(this.permissionList);
        }
    },
    created() {
        this.getAllPermissionList();
    },
    methods: {
        // 获取当前角色权限
        async getAllPermissionList() {
            const result = await this.$API.permission.getToAssign(this.roleId);
            if (result.code !== 200 && result.code !== 20000) return;
            this.permissionList = result.data.children;
        },
        // 递归出id数组
        getIdList(arr) {
            arr.forEach(item => {
                (item.select && item.children.length === 0) ? this.checkedIdList.push(item.id) : '';
                this.getIdList(item.children);
            });
        },
        // 复选边框变化
        handlerChangeChecked(checkObj, checkState) {
            console.log(checkObj, checkState);
            this.checkedIdList = checkState.checkedKeys;
            this.updateIdList = checkState.checkedKeys.concat(checkState.halfCheckedKeys);
            // checkState.checkedNodes.map()
        },

        // 保存当前权限
        async savePermission() {
            const { updateIdList } = this;
            const result = await this.$API.permission.doAssignPermission(this.roleId, updateIdList.toString());
            if (result.code !== 200 && result.code !== 20000) return;
            // console.log(result);
            this.$message({ type: 'success', message: '更改成功' });
            this.cancelUpdatePermission();
        },

        // 返回前一页
        cancelUpdatePermission() {
            this.$router.back();
        }

    }
}
</script>

<style >

</style>