import request from '@/utils/request';

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