<template>
    <div>
        <!-- 表格 -->
        <el-table border stripe :data="records">
            <el-table-column type="index" label="序号" align="center" width="80"></el-table-column>
            <el-table-column prop="skuName" label="名称" width="width"></el-table-column>
            <el-table-column prop="skuDesc" label="描述" width="width"></el-table-column>
            <el-table-column label="默认图片" width="100">
                <template slot-scope="{row}">
                    <img :src="row.skuDefaultImg" alt="" style="width: 100px;">
                </template>
            </el-table-column>
            <el-table-column prop="weight" label="重量" width="80"></el-table-column>
            <el-table-column prop="price" label="价格" width="80"></el-table-column>
            <el-table-column prop="prop" label="操作" width="300">
                <template slot-scope="{row,$index}">
                    <el-button
v-if="!row.isSale"
type="success"
size="mini"
icon="el-icon-sort-up"
                               @click="onsale(row)">
                    </el-button>
                    <el-button v-else type="success" size="mini" icon="el-icon-sort-down" @click="cancelSale(row)">
                    </el-button>
                    <el-button type="primary" size="mini" icon="el-icon-edit" @click="edit"></el-button>
                    <el-button type="info" size="mini" icon="el-icon-info" @click="getSkuInfo(row)"></el-button>
                    <el-button type="primary" size="mini" icon="el-icon-delete" @click=""></el-button>

                </template>
            </el-table-column>

        </el-table>

        <!--分页 -->
        <el-pagination
                       @size-change="sizeChange"

                       @current-change="getSkuList"
                       style="text-align: center;"
                       :current-page="1"
                       :page-sizes="[3,5,10]"
                       :page-size="10"
                       layout="prev, pager, next, jumper,->, sizes,total"
                       :total="20"
background>
        </el-pagination>

        <!-- 抽屉效果 -->
        <el-drawer
                   :visible.sync="drawer"
                   :show-close="false"
                   :modal="true"
                   size="50%">
            <el-row>
                <el-col :span="5">名称</el-col>
                <el-col :span="16">{{skuInfo.skuName}}</el-col>
            </el-row>
            <el-row>
                <el-col :span="5">描述</el-col>
                <el-col :span="16">{{skuInfo.skuDesc}}</el-col>
            </el-row>
            <el-row>
                <el-col :span="5">价格</el-col>
                <el-col :span="16">{{skuInfo.price}}</el-col>
            </el-row>

            <el-row>
                <el-col :span="5">平台属性</el-col>
                <el-col :span="16">
                    <el-tag
v-for="saleAttr of skuInfo.skuSaleAttrValueList"
type="success"
size="mini"
                            :key="saleAttr.id">
                        {{saleAttr.saleAttrId}}-{{saleAttr.saleAttrValueId}}
                    </el-tag>
                </el-col>
            </el-row>

            <el-row>
                <el-col :span="5">商品图片</el-col>
                <el-col :span="16">
                    <el-carousel
height="150px"
direction="horizontal"
                                 :initial-index="0"
:autoplay="true"
:interval="3000"
:loop="true"
                                 trigger="hover"
indicator-position="outside"
arrow="hover">
                        <el-carousel-item v-for="img of skuInfo.skuImageList" :key=img.id>
                            <img :src="img.imgUrl" alt="">
                        </el-carousel-item>
                    </el-carousel>

                </el-col>
            </el-row>
        </el-drawer>

    </div>
</template>

<script>
export default {
  name: 'SkuProduct',
  data() {
    return {
      page: 1,
      limit: 10, // 当前页数据
      records: [], // 存储sku列表数组
      total: 0, // 分页器总共数据数
      skuInfo: {},
      drawer: false // 控制抽屉显示
    }
  },
  methods: {
    // 获取数据
    async getSkuList(pages = 1) {
      this.page = pages
      const { page, limit } = this
      const result = await this.$API.sku.reqGetSkuList(page, limit)
      if (result.code !== 200) return
      this.records = result.data.records
      this.total = result.data.total
    },
    sizeChange(limit) {
      this.limit = limit
      this.getSkuList()
    },
    // 上架
    async onsale(row) {
      const result = await this.$API.sku.reqSale(row.id)
      if (result.code !== 200) return
      this.$message({ type: 'success', message: '上架成功' })
      row.isSale = 1
    },
    // 下架
    async cancelSale(row) {
      const result = await this.$API.sku.reqCancel(row.id)
      if (result.code !== 200) return
      this.$message({ type: 'success', message: '下架成功' })
      row.isSale = 0
    },
    edit() {
      this.$message('陆续开发中……')
    },
    // 获取sku详情
    async getSkuInfo(sku) {
      // 展示抽屉
      this.drawer = true
      // 获取sku数组
      const result = await this.$API.sku.reqSkuById(sku.id)
      if (result.code !== 200) return
      this.skuInfo = result.data
    }
  },
  mounted() {
    this.getSkuList()
  }
}
</script>

<style  scoped>
.el-row .el-col-5 {
    font-size: 18px;
    text-align: right;
}

.el-col {
    margin: 10px;
}

.el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
}

li>>>.el-carousel__button {
    width: 10px;
    height: 10px;
    border-radius: 50%;
}
</style>
