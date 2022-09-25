import request from '@/utils/request';

//      获取skuList数据  GET /admin/product/list/{page}/{limit}
export const reqGetSkuList = (page, limit) => request({
    url: `/product/list/${page}/${limit}`,
    method: 'get',
});
