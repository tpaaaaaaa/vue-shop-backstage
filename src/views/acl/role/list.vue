<template >
    <div>

        <!-- 查询 -->
        <el-form ref="form" label-width="80px" :inline="true" size="normal" @submit.prevent>
            <el-form-item label="">
                <el-input v-model=" searchRoleName" placeholder="角色名称">
                </el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="getAllRoles(page)"><i class="el-icon-search"></i> 查询</el-button>
                <el-button @click="clearSearchInput">清空</el-button>
            </el-form-item>
        </el-form>
        <el-button type="primary" @click="addRoleButton">添加</el-button>
        <el-button type="danger" :disabled="deleteIdListLength" @click="batchRemove">批量删除</el-button>


        <!-- 表格 -->
        <el-table :data="allRoles" border stripe v-loading="tableLoading" @selection-change="handleSelectionChange"
                  highlight-current-row
                  @current-change="handlerCurrent">
            <el-table-column type="selection" width="50">
            </el-table-column>
            <el-table-column type="index" :index="indexRe" label="序号" width="80" align="center">
            </el-table-column>

            <el-table-column prop="roleName" label="角色名称">
                <template slot-scope="{row,$index}">
                    <el-input v-if="row.id===editNum" :ref="$index" v-model="row.roleName" size="mini"></el-input>
                    <span v-else>{{row.roleName}}</span>
                </template>

            </el-table-column>
            <el-table-column label="操作" width="width">
                <template slot-scope="{row,$index}">
                    <el-button title="详情" type="info" size="mini" @click="roleAuthDetail(row)" alt="详情"><i
                           class="el-icon-user"></i>
                    </el-button>

                    <el-button v-if="row.id!==editNum" title="更改" type="primary" size="mini" @click="editRole(row)">
                        <i class="el-icon-edit"></i>
                    </el-button>
                    <el-button v-else title="确认修改" type="primary" size="mini" @click="confirmEditRole(row)">
                        <i class="el-icon-check"></i>
                    </el-button>

                    <el-popconfirm title="确定要删除吗？" @onConfirm="deleteRole(row)" style="margin-left: 10px;">
                        <el-button title="删除" slot="reference" type="danger" size="mini">
                            <i class="el-icon-delete"></i>
                        </el-button>
                        <!-- @click="deleteRole(row)" -->
                    </el-popconfirm>
                </template>
            </el-table-column>
        </el-table>

        <!-- 分页器  -->
        <el-pagination
                       @size-change="sizeChange"
                       @current-change="getAllRoles"
                       :current-page="page"
                       :page-sizes="[3, 5, 10]"
                       :page-size="limit"
                       layout=" prev, pager, next, jumper,->, sizes,total"
                       :total="total" background>
        </el-pagination>

        <!-- 添加角色 -->
        <el-dialog title="添加角色" :visible.sync="addDialogFormVisible" width="40%" :before-close="closeAddform">
            <el-form :model="newRole" :rules="rules" ref="addRoleForm">
                <el-form-item label="请输入新名称" label-width="formLabelWidth" prop="roleName">
                    <el-input v-model="newRole.roleName" autocomplete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="addDialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="addRole">确 定</el-button>
            </div>
        </el-dialog>



    </div>
</template>

<script>
export default {
    name: 'roleList',
    created() {
        this.getAllRoles();
    },
    data() {
        return {
            page: 1,
            limit: 5,
            total: 50,
            tableLoading: true,
            addDialogFormVisible: false,
            edit: true,
            editNum: 1,
            searchRoleName: '',
            allRoles: [],
            deleteIdList: [],
            newRole: {
                roleName: '',
            },
            editRoleDate: {

            },
            rules: {
                roleName: [
                    { required: true, message: '请输入角色名称', trigger: 'blur' },
                    { min: 3, max: 10, message: '长度在3到5个字符', trigger: 'blur' },
                ],
            },


        }
    },
    computed: {
        // 计算索引换页后的值
        indexRe() {
            return (this.page - 1) * this.limit + 1;
        },
        deleteIdListLength() {
            return this.deleteIdList.length === 0;
        }
    },
    watch: {
        // 监听数据改变加载动画
        allRoles() {
            this.tableLoading = true;
            if (this.allRoles.length >= 1)
                this.tableLoading = false;
        }
    },
    methods: {
        // 清除当前数据状态
        clearNowState() {
            this.allRoles = [];
            this.tableLoading = true;
        },
        // 获取角色
        async getAllRoles(pager = 1) {
            this.clearNowState();
            this.page = pager;
            const { page, limit, searchRoleName } = this;
            const result = await this.$API.role.getPageList(page, limit, searchRoleName);
            if (result.code !== 200 && result.code !== 20000) return;
            // console.log(result);
            this.allRoles = result.data.items;
            this.total = result.data.total;
            this.clearSearchInput();
        },
        //数据展示个数
        sizeChange(limit) {
            this.limit = limit;
            this.getAllRoles();
        },
        // 清除搜索框
        clearSearchInput() {
            this.searchRoleName = '';

        },
        // 删除角色
        async deleteRole(row) {
            // console.log(row);
            const result = await this.$API.role.delete(row.id);
            if (result.code !== 200 && result.code !== 20000) return;
            // console.log(result);
            this.$message({ type: 'success', message: '删除成功' });
            this.getAllRoles(this.page);
        },
        // 编辑角色
        editRole(row) {
            const { id, roleName } = row;
            console.log(row);
            this.editNum = id;
            this.edit = false;
            this.editRoleDate.roleName = roleName;
        },
        // 提交修改
        async confirmEditRole(row) {
            const { id, roleName } = row;
            this.edit = true;
            this.editNum = '';
            if (this.editRoleDate.roleName === roleName) return this.editRoleDate.roleName = '';;

            const result = await this.$API.role.update({ id, roleName });
            if (result.code !== 200 && result.code !== 20000) return;
            // console.log(result);
            this.editRoleDate.roleName = '';
            this.getAllRoles(this.page);
        },

        // 多选角色
        handleSelectionChange(val) {
            console.log(val);
            this.deleteIdList = val.map(item => item.id);
        },
        // 批量删除
        batchRemove() {
            this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(async () => {
                const { deleteIdList, page } = this;
                const result = await this.$API.role.batchRemove(deleteIdList);
                if (result.code !== 200 && result.code !== 20000) return;
                this.getAllRoles(page);
                this.$message({ type: 'success', message: '批量删除成功' });

            }).catch(() => {
                this.$message({ type: 'info', message: '已取消删除' });
            });
        },

        // 添加
        addRoleButton() {
            this.addDialogFormVisible = true;
        },
        // 提示框关闭之前的回调函数
        closeAddform(done) {
            this.addDialogFormVisible = false;
            this.newRole.roleName = '';
            this.$refs.addRoleForm.resetFields();
            done();
        },
        // 添加角色确定按钮
        addRole() {
            this.$refs.addRoleForm.validate(async (valid) => {
                if (!valid) return alert('请填入名称后提交') && false;

                const { newRole } = this;
                const result = await this.$API.role.save(newRole);
                if (result.code !== 200 && result.code !== 20000) return;
                this.$message({ type: 'success', message: '角色添加成功' });
                this.getAllRoles();
                this.addDialogFormVisible = false;
            });
        },

        // 查看角色权限
        roleAuthDetail(row) {
            const { id, roleName } = row;
            this.$router.push({
                name: 'RoleAuth',
                params: { id },
                query: { roleName },
            });
            // const result = await this.$API.permission.getToAssign(row.id);
            // console.log(result);

        },

        handlerCurrent(currentRow, oldCurrentRow) {
            // console.log(111);
            // console.log(currentRow, oldCurrentRow);
        },
    },
}
</script>

<style >

</style>