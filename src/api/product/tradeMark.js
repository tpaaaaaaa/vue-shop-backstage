// 品牌管理数据模块
import request from '@/utils/request';

// 获取品牌列表接口    GET /admin/product/baseTrademark/{page}/{limit}
export const reqTradeMarkList = (page, limit) => request({
    url: `/product/baseTrademark/${page}/${limit}`,
    method: 'get',
});

// 处理添加品牌  POST /admin/product/baseTrademark/save   参数:名称 logo

// 修改品牌  PUT /admin/product/baseTrademark/update   参数:id 名称 logo
export const reqAddOrUpdateTradeMark = (tradeMark) => {
    // 修改
    if (tradeMark.id)
        return request({ url: '/product/baseTrademark/update', method: 'put', data: tradeMark });
    return request({
        url: '/product/baseTrademark/save',
        method: 'post',
        data: tradeMark,
    });
};

// 删除品牌         DELETE /admin/product/baseTrademark/remove/{id}
export const reqDeleteTradeMark = (id) => request({
    url: `/product/baseTrademark/remove/${id}`,
    method: 'delete',
});