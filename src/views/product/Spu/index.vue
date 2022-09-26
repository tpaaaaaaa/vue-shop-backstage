<template>
    <div>
        <!-- 分类选择 -->
        <el-card shadow="always" style="margin: 20px 0;">
            <CategorySelect @getCategoryId="getCategoryId" :show="scene!==0"></CategorySelect>

        </el-card>
        <!-- 数据内容 -->
        <el-card shadow="always" style="margin: 20px 0;">
            <!-- 对应分类属性 -->
            <div v-show="scene===0&&isShowTable">
                <el-button
                           type="primary"
                           @click="addSpu"
                           icon="el-icon-plus"
                           :disabled="!categoryIdList.category3Id">
                    添加SPU
                </el-button>
                <el-table border stripe :data="records">
                    <el-table-column
                                     type="index"
                                     prop="prop"
                                     label="序号"
                                     width="80px"
                                     align="center">
                    </el-table-column>
                    <el-table-column
                                     prop="spuName"
                                     label="SPU名称"
                                     width="width">
                    </el-table-column>
                    <el-table-column
                                     prop="description"
                                     label="SPU描述"
                                     width="width">

                    </el-table-column>
                    <el-table-column
                                     prop="prop"
                                     label="操作"
                                     width="250px">

                        <template slot-scope="{row}">
                            <el-button
                                       type="primary"
                                       icon="el-icon-plus"
round
                                       size="mini"
                                       title="添加sku"
                                       @click="addSku(row)">
                            </el-button>
                            <el-button
                                       type="warning"
                                       icon="el-icon-edit"
                                       round
size="mini"
                                       title="修改spu"
                                       @click="updateSpu(row)">
                            </el-button>
                            <el-button
type="info"
icon="el-icon-info"
round
size="mini"
                                       @click="handler(row)"
title="查看sku全部列表">
                            </el-button>

                            <el-popconfirm
                                           title="确定删除吗？"
@onConfirm="deleteSpu(row)"
style="margin-left: 10px;">
                                <el-button
slot="reference"
type="danger"
icon="el-icon-delete"
round
size="mini"
                                           title="删除spu"></el-button>
                            </el-popconfirm>
                        </template>
                    </el-table-column>
                </el-table>

                <!--  分页 -->
                <el-pagination
                               style="text-align: center;"
                               :page-sizes="[3,5,10]"
                               :page-size="limit"
                               layout="prev, pager, next, jumper, ->,sizes, total"
                               :total="total"
background
                               :current-page="page"
                               @current-change="getSpuList"
                               @size-change="sizeChange">
                </el-pagination>
            </div>

            <SpuForm v-show="scene===1" @changeScene="changeScene" ref="spu">2</SpuForm>
            <SkuForm v-show="scene===2" @changeScenes="changeScenes" ref="sku">1</SkuForm>
        </el-card>

        <el-dialog :title="`${spu.spuName}的SKU全部列表`" :visible.sync="dialogTableVisible" @close="closeDialog">
            <el-table :data="skuList" border v-loading="loading">
                <el-table-column prop="skuName" label="名称" width="200"></el-table-column>
                <el-table-column prop="price" label="价格" width="80"></el-table-column>
                <el-table-column prop="weight" label="重量" width="width"></el-table-column>
                <el-table-column label="图片">
                    <template slot-scope="{row,$index}">
                        <img :src="row.skuDefaultImg" alt="" style="max-width: 100px;">
                    </template>
                </el-table-column>
            </el-table>
        </el-dialog>

    </div>
</template>

<script>
import SpuForm from './SpuForm'
import SkuForm from './SkuForm'
export default {
  name: 'SpuProduct',
  components: {
    SpuForm,
    SkuForm
  },
  data() {
    return {
      isShowTable: true,
      categoryIdList: [],
      page: 1, // 当前页
      limit: 3, // 每页数据
      records: [],
      total: 0,
      scene: 0, // 0:展示spu列表；1：添加修改spu；2：添加sku
      dialogTableVisible: false,
      spu: {},
      skuList: [],
      loading: true
    }
  },
  methods: {
    // 三级联动自定义事件回调
    getCategoryId(...idList) {
      if (idList.at(-1)?.noData) { return idList[0].noData.map(num => this.categoryIdList[`category${num}Id`] = '') }
      this.categoryIdList = idList[0]
      this.getSpuList()
    },
    // 获取SPU数据
    async getSpuList(pager = 1) {
      // 切换页数
      this.page = pager
      const result = await this.$API.spu.reqSpuList(this.page, this.limit, this.categoryIdList.category3Id)
      if (result.code !== 200) return
      this.total = result.data.total
      this.records = result.data.records
    },
    sizeChange(limit) {
      this.limit = limit
      this.getSpuList()
    },
    // 添加Spu按钮回调
    addSpu() {
      this.scene = 1
      // 通知子组件发请求
      this.$refs.spu.addSpuData(this.categoryIdList.category3Id)
    },
    // 修改spu
    updateSpu(row) {
      this.scene = 1
      this.$refs.spu.initSpuData(row)
    },
    // SpuForm自定义事件回调
    changeScene({ scene, flag }) {
      this.scene = scene
      if (flag === '修改') return this.getSpuList(this.page)
      this.getSpuList()
    },
    // 删除spu的回调
    async deleteSpu(row) {
      const result = await this.$API.spu.reqDeleteSpu(row.id)
      if (result.code !== 200) return
      this.getSpuList(this.records.length > 1 ? this.page : this.page - 1)
    },
    // 添加sku按钮回调
    addSku(row) {
      this.scene = 2
      this.$refs.sku.getData(this.categoryIdList, row)
    },
    // skuForm通知父组件
    changeScenes(scene) {
      this.scene = scene
    },
    // 查看sku列表回调
    async handler(spu) {
      this.dialogTableVisible = true
      this.spu = spu
      // 获取sku列表的数据展示
      const result = await this.$API.spu.reqSkuList(spu.id)
      if (result.code !== 200) return
      this.skuList = result.data
      this.loading = false
    },
    // 关闭对话框的回调
    closeDialog() {
      this.loading = true
      this.skuList = []
    }
  }

}
</script>

<style lang="" scoped>

</style>
