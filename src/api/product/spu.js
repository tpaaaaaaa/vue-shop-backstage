
import request from '@/utils/request'

// SPU列表    GET /admin/product/{page}/{limit}
export const reqSpuList = (page, limit, category3Id) => request({
  url: `/product/${page}/${limit}`,
  method: 'get',
  params: { category3Id }
})

// SpuForm
// spu信息          GET /admin/product/getSpuById/{spuId}
export const reqGetSpuById = (spuId) => request({
  url: `/product/getSpuById/${spuId}`,
  method: 'get'
})

// 品牌信息     GET /admin/product/baseTrademark/getTrademarkList
export const reqTradeMarkList = () => request({
  url: '/product/baseTrademark/getTrademarkList',
  method: 'get'
})

// spu图片      GET /admin/product/spuImageList/{spuId}
export const reqSpuImageList = (spuId) => request({
  url: `/product/spuImageList/${spuId}`,
  method: 'get'
})

// 品牌销售属性     GET /admin/product/baseSaleAttrList
export const reqBaseSaleAttrList = () => request({
  url: '/product/baseSaleAttrList',
  method: 'get'
})

// 修改||添加spu  POST /admin/product/updateSpuInfo||  POST /admin/product/saveSpuInfo
export const reqAddOrUpdateSpuInfo = (spuInfo) => {
  if (spuInfo.id) {
    return request({
      url: '/product/updateSpuInfo',
      method: 'post',
      data: spuInfo
    })
  }
  return request({
    url: '/product/saveSpuInfo',
    method: 'post',
    data: spuInfo
  })
}

// 删除SPU      DELETE /admin/product/deleteSpu/{spuId}
export const reqDeleteSpu = (spuId) => request({
  url: `/product/deleteSpu/${spuId}`,
  method: 'delete'
})

// --------添加sku---------

// 获取销售属性的数据
// 销售属性：  GET /admin/product/spuSaleAttrList/{spuId}
export const reqSpuSaleAttrList = (spuId) => request({
  url: `/product/spuSaleAttrList/${spuId}`,
  method: 'get'
})

// 属性数据   GET /admin/product/attrInfoList/{category1Id}/{category2Id}/{category3Id}
export const reqAttrInfoList = ([category1Id, category2Id, category3Id]) => request({
  url: `/product/attrInfoList/${category1Id}/${category2Id}/${category3Id}`,
  method: 'get'
})

// 添加sku      POST /admin/product/saveSkuInfo
export const reqAddSku = (skuInfo) => request({
  url: `/product/saveSkuInfo`,
  method: 'post',
  data: skuInfo
})

// 获取sku列表数据的接口    GET /admin/product/findBySpuId/{spuId}
export const reqSkuList = (spuId) => request({
  url: `/product/findBySpuId/${spuId}`,
  method: 'get'
})
