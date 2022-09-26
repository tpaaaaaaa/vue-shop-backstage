<template>
    <div>
        <!-- 按钮 -->
        <el-button type="primary" icon="el-icon-plus" style="margin: 10px 0px;" @click="showDialog">添加</el-button>
        <!-- 表格组件
            data：表格需要展示的数据
            border：边框
            label：标题
            width：对应列的宽度
            align:对齐方式
            prop:对应列内容的字段名，

            table展示的数据以列展示
        -->
        <el-table style="width: 100%;" border :data="list">
            <el-table-column type="index" prop="prop" label="序号" width="80px" align="center">

            </el-table-column>
            <el-table-column prop="tmName" label="品牌名称" width="width">
            </el-table-column>
            <el-table-column prop="prop" label="品牌LOGO" width="width">
                <template slot-scope="{row}">
                    <img :src="row.logoUrl" alt="" style="height: 100px;">
                </template>
            </el-table-column>

            <el-table-column prop="prop" label="操作" width="width">
                <template slot-scope="{row,$index}">
                    <el-button type="warning" icon="el-icon-edit" size="mini" @click="updateTradeMark(row)">修改
                    </el-button>
                    <el-button type="danger" icon="el-icon-delete" size="mini" @click="deleteTradeMark(row)">删除
                    </el-button>

                </template>
            </el-table-column>
        </el-table>
        <!-- 分页器
            current-page：当前页
            total：总页数
            page-size：每一页的数据
            page-sizes可以设置每一页数据
            layout：分页器的布局
            pager-count：按钮数量
        -->
        <el-pagination
                       @current-change="getPageList"
                       @size-change="handleSizeChange"
                       :current-page="page"
                       :total="99"
background
                       :page-size="limit"
                       :page-sizes="[3,5,10]"
                       :pager-count="9"
                       layout="prev, pager, next, jumper,->,sizes,total"
                       style="margin-top: 20px; text-align: center;">
        </el-pagination>

        <!-- 添加对话框
        :visible.sync:控制对话框显示隐藏:true|false

        -->
        <el-dialog :title="tmform.id?'修改品牌':'添加品牌'" :visible.sync="dialogFormVisible">
            <!-- from表单
                :model:把表单数据放到哪个对象上
                Form 组件提供了表单验证的功能，只需要通过 rules 属性传入约定的验证规则，并将 Form-Item 的 prop 属性设置为需校验的字段名即可。校验规则参见 async-validator
            -->
            <el-form style="widows: 70%;" :model="tmform" :rules="rules" ref="ruleForm">
                <el-form-item label="品牌名称" label-width="100px" prop="tmName">
                    <el-input autocomplete="off" v-model="tmform.tmName"></el-input>
                </el-form-item>
                <el-form-item label="品牌图片" label-width="100px" prop="logoUrl">
                    <!-- action:图片上传地址 -->
                    <el-upload
                               class="avatar-uploader"
                               action="/admin/product/fileUpload"
                               :show-file-list="false"
                               :on-success="handleAvatarSuccess"
                               :before-upload="beforeAvatarUpload">
                        <img
v-if="tmform.logoUrl"
:src="tmform.logoUrl"
style="height: 100px;width: auto;"
                             class="avatar">
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                        <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
                    </el-upload>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="addOrUpdateTradeMark">确 定</el-button>
            </div>
        </el-dialog>

    </div>
</template>

<script>
export default {
  name: 'TradeMark',
  data() {
    return {
      // 当前页
      page: 1,
      // 显示数据个数
      limit: 3,
      // 数据总数
      total: 0,
      // 列表展示数据
      list: [],
      // 对话框显示隐藏
      dialogFormVisible: false,
      // 品牌信息
      tmform: {
        tmName: '',
        logoUrl: ''
      },
      rules: {
        // 品牌名称验证规则
        tmName: [
          { required: true, message: '请输入品牌名称', trigger: 'blur' },
          { min: 2, max: 10, message: '长度在 2 到 10 个字符', trigger: 'change' }
        ],
        // 品牌logo验证规则
        logoUrl: [
          { required: true, message: '请选择图片' }
        ]
      }

    }
  },
  methods: {
    // 获取品牌列表
    async getPageList(pager = 1) {
      this.page = pager
      const { page, limit } = this
      const result = await this.$API.trademark.reqTradeMarkList(page, limit)
      if (result.code !== 200) return new Promise.reject(new Error('fail'))
      this.total = result.data.total
      this.list = result.data.records
      // console.log(result);
    },
    // 改变每页数据个数
    handleSizeChange(limit) {
      this.limit = limit
      this.getPageList()
    },
    // 点击添加显示品牌按钮
    showDialog() {
      this.dialogFormVisible = !this.dialogFormVisible

      this.tmform.tmName = ''
      this.tmform.logoUrl = ''
    },
    updateTradeMark(row) {
      this.dialogFormVisible = !this.dialogFormVisible
      this.tmform = { ...row }
    },
    // 上传图片相关
    handleAvatarSuccess(res, file) {
      this.tmform.logoUrl = res.data
    },
    beforeAvatarUpload(file) {
      const imageType = ['jpeg', 'jpg', 'png']

      const isJPG = imageType.find(item => file.type.includes(item)) || false
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isJPG && isLt2M
    },
    // 添加或修改品牌
    addOrUpdateTradeMark() {
      this.$refs.ruleForm.validate(async(success) => {
        if (!success) return

        this.dialogFormVisible = false
        const result = await this.$API.trademark.reqAddOrUpdateTradeMark(this.tmform)
        if (result.code !== 200) return
        this.$message({
          message: this.tmform.id ? '修改品牌成功' : '添加品牌成功',
          type: 'success'
        })
        this.getPageList(this.tmform.id ? this.page : 1)
      }, (error) => {
        console.log(error)
        return false
      })
    },
    deleteTradeMark(row) {
      console.log(row)
      this.dialogFormVisible = false
      this.$confirm(`此操作将永久删除${row.tmName}, 是否继续?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
        this.$API.trademark.reqDeleteTradeMark(row.id)
        this.getPageList(this.list.length > 1 ? this.page : this.page - 1)
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    }

  },
  // 组件挂在完毕
  mounted() {
    // 获取列表数据的方法
    this.getPageList()
  }

}
</script>

<style  scoped>
.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
}

.avatar-uploader .el-upload:hover {
    border-color: #409EFF;
}

.avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
}

.avatar {
    width: 178px;
    height: 178px;
    display: block;
}
</style>
