import request from '@/utils/request';

// 权限相关API
const api_name = 'acl/permission';


export default {

    // 获取权限（菜单/功能）列表
    getPermissionList() {
        return request({
            url: `${api_name}`,
            method: 'get',
        });
    },

    // 删除权限项
    removePermission(id) {
        return request({
            url: `${api_name}/remove/${id}`,
            method: 'post',
        });
    },

    // 保存一个权限项
    savePermission(permission) {
        return request({
            url: `${api_name}/save`,
            method: 'post',
            data: permission,
        });
    },

    // 更改一个权限项
    updatePermission(permission) {
        return request({
            url: `${permission}/update`,
            method: 'put',
            data: permission,
        });
    },

    // 给角色分配权限
    doAssignPermission(roleId, permissionId) {
        return request({
            url: `${api_name}/doAssign`,
            method: 'post',
            params: { roleId, permissionId }
        });
    },

    // 根据角色获取菜单
    getToAssign(roleId) {
        return request({
            url: `${api_name}/toAssign/${roleId}`,
            method: 'get',
        });
    },




}