import request from '@/utils/request'


/**
 * 获取活动
 */
// 所有可报名活动
export function getAllAty(data) {
    return request({
        url: 'act/user/get',
        method: 'post',
        data
    })
}
// 自己参与的活动
export function getJoinedAty(data) {
    return request({
        url: `act/get/join/${data.userId}`,
        method: 'get',
    })
}
// 自己发布的活动
export function getReleasedAty(data) {
    return request({
        url: `act/get/release/${data.userId}`,
        method: 'get',
    })
}



/**
 * 活动操作
 */
// 发布活动
export function releaseAty(data) {
    return request({
        url: `act/launch`,
        method: 'post',
        data
    })
}
// 报名活动
export function signUpAty(data) {
    return request({
        url: 'act/user/enroll',
        method: 'post',
        data
    })
}
// 获取申请报名人员
export function getSignedUsers(data) {
    return request({
        url: `check/user/get/${data.actId}`,
        method: 'get',
    })
}
// 审核报名是否通过
export function examUserSign(data) {
    return request({
        url: `check/user/act`,
        method: 'put',
        data
    })
}

// 审核用户完成活动
export function examUserFinishAty(data) {
    return request({
        url: 'check/user/act/state',
        method: 'put',
        data
    })
}


// 撤销活动
export function deleteAty(data) {
    return request({
        url: `act/delete/${data.get('actId')}`,
        method: 'delete',
        data
    })
}

/**
 * 获取轮播图
 */
export function getRoundPictures(uuid){
    return request({
        url:`/file/download/round/${uuid}`,
        method: 'get',
    })
}