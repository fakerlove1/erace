import request from '@/utils/request'
/**
 * 申请运动员认证
 */
 export function submitCertification(data) {
    return request({
        url: 'authorize/organization/submitCertification',
        method: 'post',
        data
    })
}
// 查看认证列表
 export function getAuthenticationList(data) {
    return request({
        url: `/authorize/organization/getAuthenticationList`,
        method: 'post',
        data
    })
}
 export function getApplication(data) {
    return request({
        url: `/authorize/organization/getApplication/${data.get('pageNum')}/${data.get('pageSize')}`,
        method: 'get',
    })
}
// 查询该用户的信息
export function getOneAuthentication(data) {
    return request({
        url: 'authorize/organization/getOneAuthentication',
        method: 'post',
        data
    })
}
// 提交注销申请
export function logoutApplication(data) {
    return request({
        url: 'authorize/organization/logoutApplication',
        method: 'post',
        data
    })
}
// 修改认证
export function updateAuthentication(data) {
    return request({
        url: '/authorize/organization/updateAuthentication',
        method: 'post',
        data
    })
}
// 提交纸质证书申请
export function submitPostalApplication(data) {
    return request({
        url: '/authorize/organization/submitPostalApplication',
        method: 'post',
        data
    })
}

// 查看证书的内容
export function certificateCreate(data) {
    return request({
        url: '/authorize/certificate/create',
        method: 'post',
        data
    })
}

// 提交年审
export function submitAnnualAuthentication(data) {
    return request({
        url: '/authorize/organization/submitAnnualAuthentication',
        method: 'post',
        data
    })
}
// 年审历史记录
export function getAnnualAuthenticationResult(data) {
    return request({
        url: `authorize/organization/getAnnualAuthenticationResult/${data.get("pageNum")}/${data.get("pageSize")}`,
        method: 'get',
    })
}
/**
 * 下载证书模板
 * @param {*} data 
 * @returns 
 */
 export function downloadTemplate(data) {
    return request({
        url: `authorize/template/download/${data.get('flag')}`,
        method: 'get',
        data
    })
}