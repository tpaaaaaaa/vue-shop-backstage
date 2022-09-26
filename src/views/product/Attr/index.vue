<template>
    <div>
        <el-card shadow="always" style="margin: 20px 0;">
            <CategorySelect @getCategoryId="getCategoryId" :show="!isShowTable"></CategorySelect>

        </el-card>

        <el-card shadow="always" style="margin: 20px 0;">
            <!-- 对应分类属性 -->
            <div v-show="isShowTable">
                <el-button
                           :disabled="!(this.categoryIdList.category3Id)"
                           type="primary"
                           @click="addAttr"
                           icon="el-icon-plus">
                    添加属性
                </el-button>
                <el-table :data="attrList" border stripe>
                    <el-table-column
                                     type="index"
                                     prop="prop"
                                     label="序号"
                                     width="80px"
                                     align="center">
                    </el-table-column>
                    <el-table-column
                                     prop="attrName"
                                     label="属性名称"
                                     width="150px">
                    </el-table-column>
                    <el-table-column
                                     prop="prop"
                                     label="属性值列表"
                                     width="width">
                        <template slot-scope="{row}">
                            <el-tag
type="success"
                                    effect="plain"
                                    v-for="attrValue of row.attrValueList"
                                    :key="attrValue.id"
                                    style="margin: 2px 5px;">
                                {{attrValue.valueName}}
                            </el-tag>

                        </template>
                    </el-table-column>
                    <el-table-column
                                     prop="prop"
                                     label="操作"
                                     width="200px">
                        <template slot-scope="{row}">
                            <el-button
                                       type="warning"
                                       icon="el-icon-edit"
                                       round
                                       size="mini"
                                       @click="updateAttr(row)">
                            </el-button>
                            <el-button
                                       type="primary"
                                       icon="el-icon-delete"
                                       round
                                       size="mini"
                                       @click="">
                            </el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
            <!-- 添加、修改属性 -->
            <div v-show="!isShowTable">

                <el-form ref="form" label-width="80px" :inline="true" :model="attrInfo">
                    <el-form-item label="属性名">
                        <el-input placeholder="请输入属性名" v-model="attrInfo.attrName" ref="attr"></el-input>
                    </el-form-item>
                </el-form>
                <el-button type="primary" icon="el-icon-plus" @click="addAttrValue" :disabled="!attrInfo.attrName">添加属性值
                </el-button>

                <el-table border style="width: 100%; margin: 20px 0;" :data="attrInfo.attrValueList">
                    <el-table-column align="center" type="index" label="序号" width="80px"></el-table-column>
                    <el-table-column prop="prop" label="属性值名称" width="width">
                        <template slot-scope="{row,$index}">
                            <el-input
                                      v-model="row.valueName"
                                      placeholder="请输入属性值名称"
                                      size="mini"
                                      v-if="row.flag"
                                      @blur="toLook(row,$index)"
                                      @keyup.native.enter="toLook(row,$index)"
                                      autofocus="true"
                                      :ref="$index">
                            </el-input>
                            <span
                                  v-else
                                  @click="toEdit(row,$index)"
                                  style="display:block; min-height:22px;">
                                {{row.valueName}}
                            </span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="prop" label="操作" width="width">
                        <template slot-scope="{row,$index}">
                            <el-button
                                       type="warning"
                                       icon="el-icon-edit"
                                       size="mini">
                            </el-button>

                            <!-- 气泡提示框 -->
                            <el-popconfirm @onConfirm="deleteAttrValue($index)" :title="`确定删除${row.valueName}吗？`">
                                <el-button
                                           type="danger"
                                           icon="el-icon-delete"
                                           size="mini"
                                           slot="reference">
                                </el-button>
                            </el-popconfirm>

                        </template>
                    </el-table-column>
                </el-table>

                <el-button type="primary" :disabled="attrInfo.attrValueList.length<1" @click="addOrUpdateAttr">保存
                </el-button>
                <el-button @click="addAttr">取消</el-button>

            </div>

        </el-card>

    </div>
</template>

<script>
// 按需引入lodash
import cloneDeep from 'lodash/cloneDeep'
export default {
  name: 'AttrProduct',
  data() {
    return {
      categoryIdList: [],
      attrList: [],
      // 显示隐藏表格
      isShowTable: true,
      // 收集新增|修改属性
      attrInfo: {
        attrName: '', // 属性名
        attrValueList: [ // 属性值可以有多个
          // {
          //     attrId: 0,        //相应属性名id
          //     valueName: ''
          // }
        ],
        categoryId: 0, // 三级分类id
        categoryLevel: 3 // 几级id
      }

    }
  },
  methods: {
    // 自定义事件回调
    getCategoryId(...idList) {
      if (idList.at(-1)?.noData) { return idList[0].noData.map(num => this.categoryIdList[`category${num}Id`] = '') }
      this.categoryIdList = idList[0]
      this.getAttrList()
    },
    // 获取平台的属性数据
    async getAttrList() {
      const { category1Id, category2Id, category3Id } = this.categoryIdList
      const result = await this.$API.attr.reqAttrList(category1Id, category2Id, category3Id)
      if (result.code !== 200) return
      this.attrList = result.data
    },
    // 添加属性值
    addAttrValue() {
      this.attrInfo.attrValueList.push({
        attrId: this.attrInfo.id,
        valueName: '',
        flag: true
      })
      // 点击span切换时，页面的重绘与重拍需要耗费时间的，此时无法马上得到元素
      this.$nextTick(() => {
        this.$refs[this.attrInfo.attrValueList.length - 1].focus()
      })
    },
    // 添加属性按钮的回调
    addAttr() {
      this.isShowTable = !this.isShowTable
      this.attrInfo = {
        attrName: '', // 属性名
        attrValueList: [],
        categoryId: this.categoryIdList.category3Id, // 三级分类id
        categoryLevel: 3 // 几级id
      }
      this.$nextTick(() => {
        this.$refs['attr'].focus()
      })
    },
    // 修改属性
    updateAttr(row) {
      this.isShowTable = false
      this.attrInfo = cloneDeep(row)
      this.attrInfo.attrValueList.forEach(item => {
        // Vue无法探测普通的新增属性
        // item.flag = false;
        // 添加新的响应式属性，this.$set(对象,属性名,属性值)
        this.$set(item, 'flag', false)
      })
    },
    // 失去焦点
    toLook(row, index) {
      this.$refs[index].focus()
      if (row.valueName.trim() === '') { return this.$message('请输入确定的值') }
      const re = this.attrInfo.attrValueList.some(attr => {
        // 排除自己本身
        if (row !== attr) { return attr.valueName === row.valueName }
      })
      if (re) return this.$message('不要输入重复的值')
      row.flag = false
    },
    // 点击span的回调
    toEdit(row, index) {
      row.flag = true
      // 点击span切换时，页面的重绘与重拍需要耗费时间的，此时无法马上得到元素
      this.$nextTick(() => {
        this.$refs[index].focus()
      })
    },
    // 气泡确认框，确定按钮回调
    deleteAttrValue(index) {
      this.attrInfo.attrValueList.splice(index, 1)
    },
    // 保存属性
    async addOrUpdateAttr() {
      try {
        this.attrInfo.attrValueList = this.attrInfo.attrValueList.filter(item => {
          if (item.valueName === '') return false
          delete item.flag
          return true
        })

        const result = await this.$API.attr.reqAddOrUpdateAttr(this.attrInfo)
        if (result.code !== 200) return
        this.isShowTable = true
        this.$message({ type: 'success', message: '保存成功' })
        this.getAttrList()
      } catch (error) {
        console.log(error)
      }
    }

  }
}
</script>

<style lang="" scoped>

</style>
