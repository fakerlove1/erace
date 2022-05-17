import request from '@/utils/request'

/**
 * 登录
 * data: { username, password }
 * @param {object} data 
 */
export function login(data) {
    return request({
        url: 'user/login',
        method: 'put',
        data
    })
}

/**
 * 登出
 */
export function logout() {
    return request({
        url: 'user/token',
        method: 'delete',
    })
}

/**
 * 注册（已修改）
 * @param {Object} data 
 */
export function userRegister(data) {
    return request({
        url: 'user/register',
        method: 'post',
        data,
    })
}

/**
 * 获取用户信息
 * id为0为获取自己的信息
 * @param {Number} id 
 */
export function getUserInfo(data) {
    return request({
        url: `info/user/get/${data.userId}`,
        method: 'get',
    })
}

/**
 * 修改用户信息
 * @param {*}} data 
 */
export function updateUserInfo(data) {
    return request({
        url: `info/user/update`,
        method: 'post',
        data
    })
}

/**
 * 获取用户角色
 * @param {intger} id 用户id
 */
export function getUserRole() {
    return request({
        url: `info/user/get/role`,
        method: 'get',
    })
}


/**
 * 实名认证发送
 * @param {intger} data 
 */
export function userVer(data) {
    return request({
        url: 'user/ver',
        method: 'post',
        data
    })
}

/**
 * 实名认证结果确认
 * @param {intger} data 
 */
export function userVerOk(data) {
    return request({
        url: 'user/ver',
        method: 'put',
        data
    })
}


/**
 * 获取组织成员（组织、俱乐部专用）
 */
export function getMembers(userId) {
    // 获取id为userId用户的信息
    return request({
        url: `user/rlp/${userId}`,
        method: 'get',
    })
}