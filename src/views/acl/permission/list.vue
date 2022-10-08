<template >
    <div>
        <el-table
                  :data="permissionList" border stripe
                  v-loading="loading"
                  default-expand-all
                  row-key="id"
                  :tree-props="{children:'children',hasChildren:'hasChildren'}">
            <el-table-column prop="name" label="名称" width="width"> </el-table-column>
            <el-table-column prop="code" label="权限值" width="width"> </el-table-column>
            <el-table-column prop="" label="跳转权限值" width="width"> </el-table-column>
            <el-table-column label="操作" width="width">
                <template slot-scope="{row,$index}">
                    <el-button type="primary" title="添加" size="mini" @click="addPermissionButton(row)"><i
                           class="el-icon-plus"></i></el-button>
                    <el-button type="primary" title="修改" size="mini" @click="editPermissionButton(row)"> <i
                           class="el-icon-edit"></i></el-button>

                    <el-popconfirm v-if="row.level>2" title="这是一段内容确定删除吗？" @onConfirm="deletePermissionButton(row)"
                                   style="margin-left: 10px;">
                        <el-button type="danger" title="删除" size="mini" slot="reference">
                            <i class="el-icon-delete"></i>
                        </el-button>
                    </el-popconfirm>
                </template>
            </el-table-column>
        </el-table>

        <!-- 添加 -->
        <el-dialog
                   @close="cancelAdd"
                   :title="`添加${addLevel}级菜单`"
                   :visible.sync="addPermissionFormVisible"
                   width="50%">
            <el-form :model="addpermissionList" :rules="rules" @submit.prevent ref="addPermissionForm">
                <el-form-item label="名称" prop="name" label-width="100px">
                    <el-input v-model="addpermissionList.name"></el-input>
                </el-form-item>
                <el-form-item label="功能权限值" prop="code" label-width="100px">
                    <el-input v-model="addpermissionList.code"></el-input>
                </el-form-item>
                <el-form-item align="right">
                    <el-button type="primary" @click="addPermission">立即创建</el-button>
                    <el-button @click="cancelAdd">取消</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>

        <!-- 修改 -->
        <el-dialog
                   @close="cancelEdit"
                   title="修改"
                   :visible.sync="editPermissionFormVisible"
                   width="50%">
            <el-form :model="editPermission" :rules="rules" @submit.prevent ref="editPermissionForm">
                <el-form-item label="名称" prop="name" label-width="100px">
                    <el-input v-model="editPermission.name"></el-input>
                </el-form-item>
                <el-form-item label="功能权限值" prop="code" label-width="100px">
                    <el-input v-model="editPermission.code"></el-input>
                </el-form-item>
                <el-form-item align="right">
                    <el-button type="primary" @click="editPermissionForm">立即创建</el-button>
                    <el-button @click="cancelEdit">取消</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>



    </div>
</template>

<script>
export default {
    name: 'permissionList',
    data() {
        return {
            loading: true,
            permissionList: [],
            addpermissionList: {
                name: '',
                code: '',
                level: '',
                pid: '',
            },
            editPermission: {
                id: '',
                pid: '',
                name: '',
                code: '',
            },
            addPermissionFormVisible: false,
            editPermissionFormVisible: false,
            rules: {
                name: [
                    { required: true, message: '请输入名称', trigger: 'blur' },
                    { min: 3, max: 8, message: '长度限制为3-8个字符', trigger: 'blur' },
                ],
                code: [
                    { required: true, message: '请输入权限值', trigger: 'blur' },
                    { min: 3, max: 12, message: '长度限制为3-12个字符', trigger: 'blur' },
                ],
            }
        }
    },
    computed: {
        addLevel() {
            return new Intl.NumberFormat('zh-Hans-CN-u-nu-hanidec').format(this.addpermissionList.level + 1);
        }
    },
    created() {
        this.getPermissionList();
    },
    watch: {
        permissionList() {
            this.loading = false;
        }
    },
    methods: {
        async getPermissionList() {
            const result = await this.$API.permission.getPermissionList();
            // console.log(result);
            if (result.code !== 200 && result.code !== 20000) return;
            this.permissionList = result.data.children;
        },
        // 点击添加按钮
        addPermissionButton(row) {
            this.addPermissionFormVisible = true;
            this.addpermissionList.level = row.level;
            this.addpermissionList.pid = row.id;
            // console.log(row);
        },
        // 发送添加请求
        addPermission() {
            this.$refs.addPermissionForm.validate(async (valid) => {
                if (!valid) return this.$message({ type: 'success', message: '请将信息正确填写' });
                const { name, code, pid } = this.addpermissionList;
                const result = await this.$API.permission.savePermission({ name, code, pid });
                if (result.code !== 200 && result.code !== 20000) return;
                // console.log(result);
                this.getPermissionList();
                this.$message({ type: 'success', message: '添加成功' });
                this.cancelAdd();
            })
        },
        // 取消添加、清空数据
        cancelAdd() {
            this.$refs.addPermissionForm.resetFields();
            this.addPermissionFormVisible = false;
            this.addpermissionList.name = '';
            this.addpermissionList.code = '';
            this.addpermissionList.level = '';
            this.addpermissionList.pid = '';
        },
        // 发送删除请求
        async deletePermissionButton(row) {
            const result = await this.$API.permission.removePermission(row.id);
            if (result.code !== 200 && result.code !== 20000) return;
            // console.log(result);
            this.getPermissionList();
            this.$message({ type: 'success', message: '删除成功' });
        },

        // 编辑按钮
        editPermissionButton(row) {
            this.editPermissionFormVisible = true;
            const { id, pid, name, code } = row;
            this.editPermission.id = id;
            this.editPermission.pid = pid;
            this.editPermission.name = name;
            this.editPermission.code = code;

        },
        // 发送编辑请求
        editPermissionForm() {
            this.$refs.editPermissionForm.validate(async (valid) => {
                if (!valid) return this.$message({ type: 'success', message: '请按照格式填写' });

                const { id, pid, name, code } = this.editPermission;
                const result = await this.$API.permission.updatePermission({ id, pid, name, code });
                if (result.code !== 200 && result.code !== 20000) return this.$message({ type: 'success', message: '编辑失败请重新再试' });
                // console.log(result);
                this.$message({ type: 'success', message: '修改成功' });
                this.cancelEdit();
            });

        },
        // 取消编辑状态
        cancelEdit() {
            this.$refs.editPermissionForm.resetFields();
            this.editPermissionFormVisible = false;
            this.editPermission.id = '';
            this.editPermission.pid = '';
            this.editPermission.name = '';
            this.editPermission.code = '';
        },



    }
}
</script>

<style >

</style>