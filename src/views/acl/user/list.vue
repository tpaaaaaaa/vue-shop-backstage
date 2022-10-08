<template >
    <div>
        <!-- 表单查询 -->
        <el-form :inline="true">
            <el-form-item label="">
                <el-input placeholder="用户名" v-model="userName"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="searchRole"><i class="el-icon-search"></i> 查询</el-button>
                <el-button @click="clearInput">清空</el-button>
            </el-form-item>
        </el-form>

        <el-button type="primary" @click="openAddUser">添加</el-button>
        <el-button type="danger" :disabled="this.selectUserList.length===0" @click="batchRemove">批量删除</el-button>

        <!-- 表格 -->
        <el-table border stripe v-loading="loading" :data="roleList" @selection-change="handleSelectionChange">
            <el-table-column type="selection" width="40">
            </el-table-column>
            <el-table-column type="index" label="序号" width="50" align="center">
            </el-table-column>
            <el-table-column prop="username" label="用户名称" width="">
            </el-table-column>
            <el-table-column prop="roleName" label="权限列表" width="width">
            </el-table-column>
            <el-table-column prop="gmtCreate" label="创建时间" width="width">
            </el-table-column>
            <el-table-column prop="gmtModified" label="更新时间" width="width">
            </el-table-column>
            <el-table-column prop="id" label="操作" width="width">
                <template slot-scope="{row,$index}">
                    <el-button type="info" size="mini" @click="detailRole(row)"><i class="el-icon-user"></i></el-button>
                    <el-button type="primary" size="mini" @click="updateRole(row)"><i class="el-icon-edit"></i>
                    </el-button>
                    <template>
                        <el-popconfirm title="这是一段内容确定删除吗？" style="margin-left: 10px;" @onConfirm="deleteRole(row)">
                            <el-button slot="reference" type="danger" size="mini">
                                <i class="el-icon-delete"></i>
                            </el-button>
                            <!-- @confirm="deleteRole(row)" -->
                        </el-popconfirm>
                    </template>
                </template>
            </el-table-column>
        </el-table>

        <!-- 分页器 -->

        <el-pagination
                       @current-change="getRoleList"
                       @size-change="sizeChange"
                       :current-page="page"
                       :page-sizes="[3, 5, 10]"
                       :page-size="limit"
                       layout=" prev, pager, next, jumper,->, sizes,total"
                       :total="total" background
                       :pager-count="5">
        </el-pagination>

        <!-- 添加用户 -->
        <el-dialog title="添加用户" :visible.sync="dialogRoleVisible" @closed="cancelAdd">
            <el-form :model="userInfo" ref="addRuleForm" label-width="80px" :rules="rules">
                <el-form-item label="用户名" prop="username">
                    <el-input v-model="userInfo.username"></el-input>
                </el-form-item>
                <el-form-item label="用户昵称">
                    <el-input v-model="userInfo.nickName"></el-input>
                </el-form-item>
                <el-form-item label="用户密码" prop="password">
                    <el-input v-model="userInfo.password"></el-input>
                </el-form-item>

            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="cancelAdd">取 消</el-button>
                <el-button type="primary" @click="submitForm">确 定</el-button>
            </div>
        </el-dialog>

        <!-- 设置角色 -->
        <el-dialog title="设置角色" :visible.sync="dialogDetailVisible" @closed="cancelSetRolesForm">
            <el-form :model="detailInfo" label-width="80px" v-loading="setRoleLoading">
                <el-form-item label="用户名" prop="username">
                    <el-input v-model="detailInfo.username" :disabled="true"></el-input>
                </el-form-item>

                <!-- 多选角色列表 -->
                <el-form-item label="角色列表">
                    <el-checkbox :indeterminate="isIndeterminate"
                                 @change="handleCheckAllChange" v-model="checkAll">
                        <!--  @change="handleCheckAllChange" -->
                        全选
                    </el-checkbox>
                    <div style="margin: 15px 0;"></div>
                    <!--  @change="handleCheckedCitiesChange" -->
                    <el-checkbox-group v-model="checkedRolesIdList" @change="handleCheckedCitiesChange">
                        <el-checkbox v-for="role in allRoles.allRolesList" :label="role.id" :value="role.id"
                                     :key="role.id">
                            {{role.roleName}}
                        </el-checkbox>
                    </el-checkbox-group>
                </el-form-item>
            </el-form>

            <div slot="footer" class="dialog-footer">
                <el-button @click="cancelSetRolesForm">取 消</el-button>
                <el-button type="primary" @click="setRolesForm">确 定</el-button>
            </div>
        </el-dialog>

        <!-- 修改用户 -->
        <el-dialog title="修改用户" :visible.sync="updateRoleLoading" @closed="closeUpdateRolesForm">
            <el-form :model="detailInfo" label-width="80px">
                <!-- v-loading="updateRoleLoading" -->
                <el-form-item label="用户名" prop="username">
                    <el-input v-model="updateUserInfo.username"></el-input>
                </el-form-item>
                <el-form-item label="用户昵称" prop="username">
                    <el-input v-model="updateUserInfo.nickName"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="closeUpdateRolesForm">取 消</el-button>
                <el-button type="primary" @click="updateRolesForm">确 定</el-button>
            </div>
        </el-dialog>


    </div>
</template>

<script>
export default {
    name: 'userComponent',
    created() {
        this.getRoleList();
    },
    data() {
        return {
            // 搜索
            userName: '',
            // 多选用户
            selectUserList: [],
            // 分页
            page: 1,
            limit: 3,
            total: 0,
            // 加载
            loading: true,
            setRoleLoading: true,
            // 数据
            roleList: [],
            // 表单展示
            dialogRoleVisible: false,
            dialogDetailVisible: false,
            updateRoleLoading: false,

            userInfo: {
                username: '',
                nickName: '',
                password: '',
            },

            updateUserInfo: {
                id: '',
                username: '',
                nickName: '',
            },

            // 设置角色多选
            checkAll: false,
            allRoles: {},
            detailInfo: {
                username: '',
                userId: '',
            },
            checkedRolesIdList: [],
            isIndeterminate: true,
            // 添加用户表单验证规则
            rules: {
                username: [
                    { required: true, message: '请输入用户名', trigger: 'blur' },
                    { min: 4, max: 10, message: '长度在4-10个字符', trigger: 'blur' }
                ],
                password: [
                    { required: true, message: '请输入密码', trigger: 'blur' },
                    { min: 4, max: 10, message: '长度在4-10个字符', trigger: 'blur' }
                ],
            }

        }
    },
    computed: {
        // isIndeterminate() {
        //     return this.allRoles.assignRoles?.length === this.allRoles.allRolesList?.length || !this.checkAll;
        // },

    },
    watch: {
        roleList() {
            this.loading = false;
        },
        checkedRolesIdList() {
            this.setRoleLoading = false;
        },
    },
    methods: {
        // 获取角色数据
        async getRoleList(page = 1) {
            this.loading = true;
            this.page = page;
            const { limit, userName } = this;

            const result = await this.$API.user.getPageList(page, limit, userName);
            // console.log(result);
            if (result.code !== 20000 && result.code !== 200) return;
            this.roleList = result.data.items;
            this.total = result.data.total;
            this.loading = false;
        },
        // 一页展示数据改变
        sizeChange(limit) {
            this.limit = limit;
            this.getRoleList();
        },

        // 选中用户
        handleSelectionChange(val) {
            this.selectUserList = val;
            // console.log(val);
        },
        // 批量删除
        batchRemove() {
            this.$confirm('此操作将永久删除用户, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(async () => {
                const idList = this.selectUserList.map(item => item.id);
                const result = await this.$API.user.batchRemove(idList);
                if (result.code !== 200 && result.code !== 20000) return;
                this.$message({ type: 'success', message: '删除成功!' });
                this.selectUserList = '';
                this.getRoleList(this.page);
            }).catch(() => {
                this.$message({ type: 'info', message: '已取消删除' });
            });
        },

        // 搜索
        searchRole() {
            this.getRoleList();
        },
        // 清空搜索
        clearInput() {
            this.userName = '';
            this.getRoleList();
        },
        // 清除添加用户输入框
        clearAddRolrForm() {
            this.userInfo.username = '';
            this.userInfo.roleName = '';
            this.userInfo.password = '';
        },

        // 添加按钮的消息盒子
        openAddUser() {
            this.dialogRoleVisible = true;
        },
        // 添加用户确定按钮
        submitForm() {
            this.$refs.addRuleForm.validate(async (valid) => {
                if (!valid) return this.$message('请重新输入信息后再试');;
                this.dialogRoleVisible = false;
                this.$message({ type: 'success', message: '添加成功' });
                const { userInfo } = this;

                console.log(this.userInfo, userInfo);

                const result = await this.$API.user.save(userInfo);
                if (result.code !== 200 && result.code !== 20000) return;
                // console.log(result);
                this.getRoleList();
                // this.clearAddRolrForm();
            });
        },
        // 取消添加用户
        cancelAdd() {
            this.dialogRoleVisible = false;
            this.clearAddRolrForm();
        },

        // 删除用户
        async deleteRole(row) {
            const result = await this.$API.user.remove(row.id);
            // console.log(result);
            if (result.code !== 200 && result.code !== 20000) return;
            this.$message({ type: 'success', message: '删除成功' });
            this.getRoleList();
        },

        // 更改用户的角色
        async detailRole(row) {
            this.dialogDetailVisible = true;
            // console.log(row);
            const { id, username } = row;
            const result = await this.$API.user.detailRole(id);
            if (result.code !== 200 && result.code !== 20000) return;
            this.allRoles = result.data;
            this.detailInfo.username = username;
            this.detailInfo.userId = id;
            this.checkedRolesIdList = result.data.assignRoles?.map(item => item.id);

        },
        // 全选事件
        handleCheckAllChange(value) {
            this.checkAll = value;
            this.isIndeterminate = false;
            console.log(value);
            this.checkedRolesIdList = value ? this.allRoles.allRolesList.map(item => item.id) : [];
        },
        // 勾选/取消勾选事件
        handleCheckedCitiesChange(value) {
            const checkArrayLength = value.length;
            this.checkAll = false;
            if (checkArrayLength === this.allRoles.allRolesList.length)
                this.checkAll = true;
            this.checkedRolesIdList = value;
            this.isIndeterminate = checkArrayLength > 0 && checkArrayLength < this.allRoles.allRolesList.length;
        },
        // 清空设置角色之前的状态
        clearSetRolesInfo() {
            this.allRoles = {};
            this.detailInfo.username = '';
            this.detailInfo.userId = '';
            // this.checkedRolesIdList = [];
        },
        // 设置角色确定按钮
        async setRolesForm() {
            // console.log('设置角色确认按钮');
            const { userId } = this.detailInfo;
            const checkedRolesIdList = this.checkedRolesIdList.map(item => item);
            const result = await this.$API.user.doAssign(userId, checkedRolesIdList);
            if (result.code !== 200 && result.code !== 20000) return;
            this.dialogDetailVisible = false;
            this.setRoleLoading = true;
            this.getRoleList(this.page);
        },
        // 设置角色取消按钮
        cancelSetRolesForm() {
            this.clearSetRolesInfo();
            this.dialogDetailVisible = false;
            this.setRoleLoading = true;
        },

        // 关闭修改用户窗口
        closeUpdateRolesForm() {
            this.updateRoleLoading = false;
            this.updateUserInfo.username = '';
            this.updateUserInfo.nickName = '';
        },
        // 修改用户
        updateRole(row) {
            this.updateRoleLoading = true;
            const { username, nickName, id } = row;
            this.updateUserInfo.username = username;
            this.updateUserInfo.nickName = nickName;
            this.updateUserInfo.id = id;
        },
        // 发送修改用户API请求
        async updateRolesForm() {
            const { updateUserInfo } = this;
            const result = await this.$API.user.update(updateUserInfo);
            if (result.code !== 200 && result.code !== 20000) return;
            this.updateRoleLoading = false;
            this.getRoleList(this.page);
        }
    }


}
</script>

<style >

</style>