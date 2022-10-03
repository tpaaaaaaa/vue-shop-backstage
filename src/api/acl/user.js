import request from '@/utils/request';

import qs from 'qs';


// 用户API

export function login(data) {
    return request({
        url: '/acl/index/login',
        method: 'post',
        data
    });
};

export function getInfo() {
    return request({
        url: '/acl/index/info',
        method: 'get',
    });
};

export function logout() {
    return request({
        url: '/acl/index/logout',
        method: 'post'
    });
};


const api_name = '/acl/user';

export function getPageList(page, limit, username) {
    return request({
        url: `${api_name}/${page}/${limit}`,
        method: 'get',
        params: { username },
    });
};

export function save(data) {
    return request({
        url: `${api_name}/save`,
        method: 'post',
        data,
    });
};

export function remove(id) {
    return request({
        url: `${api_name}/remove/${id}`,
        method: 'delete',
    });
};

export function detailRole(userId) {
    return request({
        url: `${api_name}/toAssign/${userId}`,
        method: 'get',
    });
};

// 给用户分配角色
export function doAssign(userId, roleId) {
    console.log('API：', userId, roleId);
    return request({
        url: `${api_name}/doAssign`,
        method: 'post',
        // params: { userId, roleId: qs.stringify(roleId, { arrayFormat: 'repeat' }) },
        params: { userId, roleId: roleId.toString() },
    });
};

// 批量删除用户
export const batchRemove = function (idList) {
    return request({
        url: `${api_name}/batchRemove`,
        method: 'delete',
        data: idList,
    });
};

// 修改用户
export const update = function (data) {
    return request({
        url: `${api_name}/update`,
        method: 'put',
        data,
    });
};