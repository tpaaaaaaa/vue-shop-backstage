import request from '@/utils/request'

//      获取skuList数据  GET /admin/product/list/{page}/{limit}
export const reqGetSkuList = (page, limit) => request({
  url: `/product/list/${page}/${limit}`,
  method: 'get'
})

// 上架     GET /admin/product/onSale/{skuId}
export const reqSale = (skuId) => request({
  url: `/product/onSale/${skuId}`,
  method: 'get'
})

// 下架     GET /admin/product/cancelSale/{skuId}
export const reqCancel = (skuId) => request({
  url: `/product/cancelSale/${skuId}`,
  method: 'get'
})

// 获取SKU详情      GET /admin/product/getSkuById/{skuId}
export const reqSkuById = (skuId) => request({
  url: `/product/getSkuById/${skuId}`,
  method: 'get'
})
