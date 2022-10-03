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
        <el-button type="danger" disabled>批量删除</el-button>

        <!-- 表格 -->
        <el-table border stripe v-loading="loading" :data="roleList">
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
                    <el-button type="primary" size="mini"><i class="el-icon-edit"></i></el-button>
                    <el-button type="danger" size="mini" @click="deleteRole(row)"><i class="el-icon-delete"></i>
                    </el-button>
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
        <el-dialog title="添加用户" :visible.sync="dialogRoleVisible">
            <el-form :model="userInfo" ref="addRuleForm" label-width="80px" :rules="rules">
                <el-form-item label="用户名" prop="username">
                    <el-input v-model="userInfo.username"></el-input>
                </el-form-item>
                <el-form-item label="用户昵称">
                    <el-input v-model="userInfo.roleName"></el-input>
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
        <el-dialog title="设置角色" :visible.sync="dialogDetailVisible">
            <el-form :model="userInfo" ref="addRuleForm" label-width="80px" :rules="rules">
                <el-form-item label="用户名" prop="username">
                    <el-input v-model="userInfo.username" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item label="角色列表">

                    <el-checkbox :indeterminate="allRoles.assignRoles>=1"
                                 v-model="checkAll">
                        <!--  @change="handleCheckAllChange" -->
                        全选
                    </el-checkbox>
                    <div style="margin: 15px 0;"></div>
                    <!--  @change="handleCheckedCitiesChange" -->
                    <el-checkbox-group v-model="allRoles.assignRoles">
                        <el-checkbox v-for="role in allRoles.allRolesList" :label="role.roleName" :key="role.id">
                            {{role.roleName}}
                        </el-checkbox>
                    </el-checkbox-group>
                </el-form-item>


            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="cancelAdd">取 消</el-button>
                <el-button type="primary" @click="submitForm">确 定</el-button>
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
            // 分页
            page: 1,
            limit: 3,
            total: 0,
            // 加载
            loading: true,
            // 数据
            roleList: [],
            dialogRoleVisible: false,
            dialogDetailVisible: false,
            checkAll: false,
            userInfo: {
                username: '',
                roleName: '',
                password: '',
            },
            allRoles: {},

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
    watch: {
        roleList() {
            this.loading = false;
        }
    },
    methods: {
        // 添加按钮的消息盒子
        openAddUser() {
            this.dialogRoleVisible = true;
        },

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
        // 添加用户确定按钮
        submitForm() {
            this.$refs.addRuleForm.validate(async (valid) => {
                if (valid) {
                    this.dialogRoleVisible = false;
                    this.$message({ type: 'success', message: '添加成功' });
                    const { userInfo } = this;
                    const result = await this.$API.user.save(userInfo);
                    if (result.code !== 200 && result.code !== 20000) return;
                    // console.log(result);
                    this.clearAddRolrForm();
                    this.getRoleList();
                } else {
                    this.$message('请重新输入信息后再试');
                    // return false;
                }
            });
        },
        // 取消添加用户
        cancelAdd() {
            this.dialogRoleVisible = false;
            this.clearAddRolrForm();
        },
        // 更改用户的角色
        async detailRole({ id }) {
            this.dialogDetailVisible = true;
            console.log(id);
            const result = await this.$API.user.detailRole(id);
            if (result.code !== 200 && result.code !== 20000) return;
            this.allRoles = result.data;
        },
        // 删除用户
        async deleteRole(row) {
            const result = await this.$API.user.remove(row.id);
            // console.log(result);
            if (result.code !== 200 && result.code !== 20000) return;
            this.$message({ type: 'success', message: '删除成功' });
            this.getRoleList();
        },
    }


}
</script>

<style >

</style>