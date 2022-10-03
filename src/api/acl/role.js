import request from '@/utils/request';

// 角色管理相关API

const api_name = '/acl/role';


export default {


    // 获取角色分页列表（带搜索）
    getPageList(page, limit, roleName) {
        return request({
            url: `${api_name}/${page}/${limit}`,
            method: 'get',
            params: { roleName },
        });
    },

    // 获取某个角色
    getById(id) {
        return request({
            url: `${api_name}/get/${id}`,
            method: 'get',
        });
    },

    // 保存新角色
    save(role) {
        return request({
            url: `${api_name}/save`,
            method: 'post',
        });
    },

    // 删除角色
    delete(role) {
        return request({
            url: `${api_name}/remove/${id}`,
            method: 'delete',
        });
    },

    // 修改角色
    update(role) {
        return request({
            url: `${api_name}/update`,
            method: 'put',
            data: role
        });
    },

    // 根据id列表删除角色
    batchRemove(idList) {
        return request({
            url: `${api_name}/batchRemove`,
            method: 'delete',
            data: idList,
        });
    },


}