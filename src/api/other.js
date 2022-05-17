/**
 * Created by WuZeHua in 2020/02/5
 */
import request from '@/utils/request'

// 发送邀请码
export function sendInvCode(data) {
    return request({
        url: `msg/ext/inv`,
        method: 'post',
        data
    })
}

// 发送验证码(注册)
export function sendVerCode(data) {
    return request({
        url: `msg/ext/ver/register`,
        method: 'post',
        data
    })
}
// 发送验证码（重置密码）
export function sendResetVerCode(data) {
    return request({
        url: 'msg/ext/ver/reset',
        method: 'post',
        data
    })
}
// 重置密码
export function resetPassward(data) {
    return request({
        url: 'user/findPassword',
        method: 'put',
        data
    })
}