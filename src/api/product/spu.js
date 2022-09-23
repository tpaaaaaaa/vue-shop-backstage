
import request from '@/utils/request';


//SPU列表    GET /admin/product/{page}/{limit}
export const reqSpuList = (page, limit, category3Id) => request({
    url: `/product/${page}/${limit}`,
    method: 'get',
    params: { category3Id }
});

// SpuForm
// spu信息          GET /admin/product/getSpuById/{spuId}
export const reqGetSpuById = (spuId) => request({
    url: `/product/getSpuById/${spuId}`,
    method: 'get',
});


// 品牌信息     GET /admin/product/baseTrademark/getTrademarkList
export const reqTradeMarkList = () => request({
    url: '/product/baseTrademark/getTrademarkList',
    method: 'get'
});

// spu图片      GET /admin/product/spuImageList/{spuId}
export const reqSpuImageList = (spuId) => request({
    url: `/product/spuImageList/${spuId}`,
    method: 'get',
});

// 品牌销售属性     GET /admin/product/baseSaleAttrList
export const reqBaseSaleAttrList = () => request({
    url: '/product/baseSaleAttrList',
    method: 'get',
});


// 修改||添加spu  POST /admin/product/updateSpuInfo||  POST /admin/product/saveSpuInfo
export const reqAddOrUpdateSpuInfo = (spuInfo) => {
    if (spuInfo.id)
        return request({
            url: '/product/updateSpuInfo',
            method: 'post',
            data: spuInfo,
        });
    return request({
        url: '/product/saveSpuInfo',
        method: 'post',
        data: spuInfo,
    });
};