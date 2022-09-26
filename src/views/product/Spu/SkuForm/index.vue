<template>
    <div>
        <el-form ref="form" label-width="80px" size="normal">
            <el-form-item label="SPU名称">
                SPU名称
            </el-form-item>
            <el-form-item label="SKU名称">
                <el-input placeholder="SKU名称" v-model="skuInfo.skuName"></el-input>
            </el-form-item>
            <el-form-item label="价格(元)">
                <el-input placeholder="价格(元)" type="number" v-model="skuInfo.price"></el-input>
            </el-form-item>
            <el-form-item label="重量(千克)">
                <el-input placeholder="重量(千克)" v-model="skuInfo.weight"></el-input>
            </el-form-item>

            <el-form-item label="规格描述">
                <el-input type="textarea" placeholder="规格描述" rows="4" v-model="skuInfo.skuDesc"></el-input>
            </el-form-item>

            <el-form-item label="平台属性">
                <el-form ref="form" label-width="80px" :inline="true">
                    <el-form-item :label="attr.attrName" v-for="attr of attrInfoList" :key="attr.id">
                        <el-select placegokder="请选择" v-model="attr.attrIdAndValue">
                            <el-option
:label="attrValue.valueName"
:value="`${attr.id}:${attrValue.id}`"
                                       v-for="attrValue of attr.attrValueList"
                                       :key="attrValue.id"></el-option>
                        </el-select>
                    </el-form-item>
                </el-form>
            </el-form-item>

            <el-form-item label="销售属性">
                <el-form ref="form" label-width="80px" :inline="true">
                    <el-form-item :label="saleAttr.saleAttrName" v-for="saleAttr of spuSaleAttrList" :key="saleAttr.id">
                        <el-select placegokder="请选择" v-model="saleAttr.attrIdAndValue">
                            <el-option
:label="saleAttrValue.saleAttrValueName"
                                       :value="`${saleAttr.id}:${saleAttrValue.id}`"
                                       v-for="saleAttrValue of saleAttr.spuSaleAttrValueList"
                                       :key="saleAttrValue.id"></el-option>
                        </el-select>
                    </el-form-item>
                </el-form>
            </el-form-item>

            <el-form-item label="图片列表">
                <el-table border stripe :data="spuImageList" @selection-change="handlerSelectionChange">
                    <el-table-column type="selection" prop="porp" label="" width="80">
                    </el-table-column>
                    <el-table-column prop="porp" label="图片" width="width">
                        <template slot-scope="{row,$index}">
                            <img :src="row.imgUrl" alt="商品图片" style="width: 100px;height: 100px;">
                        </template>
                    </el-table-column>
                    <el-table-column prop="imgName" label="名称" width="width">
                    </el-table-column>
                    <el-table-column prop="porp" label="操作" width="width">
                        <template slot-scope="{row,$index}">
                            <el-button
                                       type="primary"
                                       v-if="!row.isDefault"
                                       @click="changeDefault(row)">
                                设置默认
                            </el-button>

                            <el-button v-else type="success" plain disabled>默认</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </el-form-item>

            <el-form-item>
                <el-button type="primary" @click="save">保存</el-button>
                <el-button @click="cancel">取消</el-button>
            </el-form-item>
        </el-form>

    </div>
</template>

<script>
export default {
  name: 'SkuForm',
  data() {
    return {
      spuImageList: [],
      spuSaleAttrList: [],
      attrInfoList: [],
      skuInfo: {
        // ----第一类:收集数据:来自父组件---------
        category3Id: 0,
        spuId: 0,
        tmId: 0,
        // -----第二类: 数据双向绑定---------
        skuName: '',
        price: 0,
        weight: '',
        skuDesc: '',
        // ------第三类:需要自己写代码---------
        // 默认图片
        skuDefaultImg: '',
        // 图片相关数据
        skuImageList: [
          // {
          //     id: 0,
          //     imgName: '',
          //     imgUrl: '',
          //     isDefault: '',
          //     skuId: 0,
          //     spuImgId: 0
          // }
        ],
        // 平台属性
        skuAttrValueList: [
          // {
          //     attrId: 0,
          //     valueId: 0,
          // }
        ],
        // 销售属性
        skuSaleAttrValueList: [
          // {
          //     id: 0,
          //     saleAttrId: 0,
          //     saleAttrName: '',
          //     saleAttrValueId: 0,
          //     saleAttrValueName: '',
          //     skuId: 0,
          //     spuId: 0
          // }
        ]
      },
      spu: {},
      // 手机图片的数据字段缺少isDefault字段
      imageList: []

    }
  },
  methods: {
    // 获取sku数据
    async getData(categoryIdList, spu) {
      // 收集父组件的数据
      this.skuInfo.category3Id = spu.category3Id
      this.skuInfo.spuId = spu.id
      this.skuInfo.tmId = spu.tmId
      this.spu = spu
      try {
        const results = await Promise.all([
          this.$API.spu.reqSpuImageList(spu.id),
          this.$API.spu.reqSpuSaleAttrList(spu.id),
          this.$API.spu.reqAttrInfoList(Object.values(categoryIdList))
        ])

        this.spuImageList = results?.at(0)?.data.map(item => {
          item.isDefault = 0
          return item
        })
        this.spuSaleAttrList = results?.at(1)?.data
        this.attrInfoList = results?.at(2)?.data
      } catch (err) {
        return this.$message(err.message)
      }
    },
    // 表格复选框按钮事件
    handlerSelectionChange(selection) {
      console.log(selection)
      this.imageList = selection
    },
    // 改变默认
    changeDefault(row) {
      this.spuImageList.forEach(item => {
        item.isDefault = 0
      })
      row.isDefault = 1
      this.skuInfo.skuDefaultImg = row.imgUrl
    },
    cancel() {
      this.$emit('changeScenes', 0)
      Object.assign(this.$data.skuInfo, this.$options.data().skuInfo)
    },
    // 保存事件回调
    async save() {
      // 整理参数
      // 平台属性
      const { attrInfoList, skuInfo, spuSaleAttrList, spuImageList } = this
      attrInfoList.forEach(attr => {
        if (attr?.attrIdAndValue) {
          skuInfo.skuAttrValueList.push({
            attrId: attr.attrIdAndValue.split(':')[0],
            valueId: attr.attrIdAndValue.split(':')[1]
          })
        }
      })
      // 销售属性
      skuInfo.skuSaleAttrValueList = spuSaleAttrList.reduce((prev, item) => {
        if (item?.attrIdAndValue) {
          const [saleAttrId, saleAttrValueId] = item.attrIdAndValue.split(':')
          prev.push({ saleAttrId, saleAttrValueId })
        }
        return prev
      }, [])
      // 整理图片数据
      skuInfo.skuImageList = spuImageList.map(item => {
        return {
          imgName: item.imgName,
          imgUrl: item.imgUrl,
          isDefault: item.isDefault,
          spuImgId: item.id
        }
      })
      skuInfo.weight = +skuInfo.weight

      // 发请求
      const result = await this.$API.spu.reqAddSku(skuInfo)
      if (result.code !== 200) return this.$message(result.message)
      this.$message({ type: 'success', message: '添加SKU成功' })
      this.$emit('changeScenes', 0)
    }
  }

}
</script>

<style scoped>

</style>
