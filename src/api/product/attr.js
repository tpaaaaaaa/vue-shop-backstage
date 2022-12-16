// 平台属性管理模块
import request from "@/utils/request";

// 一级分类         GET /admin/product/getCategory1
export const reqCategory1List = () =>
  request({
    url: "/product/getCategory1",
    method: "get",
  });

// 二级分类         GET /admin/product/getCategory2/{category1Id}
export const reqCategory2List = (category1Id) =>
  request({
    url: `/product/getCategory2/${category1Id}`,
    method: "get",
  });
// 三级分类         GET /admin/product/getCategory3/{category2Id}
export const reqCategory3List = (category2Id) =>
  request({
    url: `/product/getCategory3/${category2Id}`,
    method: "get",
  });

// 获取对应属性    GET /admin/product/attrInfoList/{category1Id}/{category2Id}/{category3Id}
export const reqAttrList = (category1Id, category2Id, category3Id) =>
  request({
    url: `/product/attrInfoList/${category1Id}/${category2Id}/${category3Id}`,
    method: "get",
  });

// 添加属性与属性值  POST /admin/product/saveAttrInfo
/*
{
  "attrName": "string",         属性名
  "attrValueList": [            属性值
    {
      "attrId": 0,
      "id": 0,
      "valueName": "string"
    }
  ],
  "categoryId": 0,              分类Id
  "categoryLevel": 0,           几级id
  "id": 0
}
*/
export const reqAddOrUpdateAttr = (data) =>
  request({
    url: "/product/saveAttrInfo",
    method: "post",
    data,
  });
