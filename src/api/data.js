/**
 * Created by WuZeHua in 2020/01/30
 */
import request from '@/utils/request'

/**
 * 下载附件
 * @param {*} data 
 */
export function downloadAnnex(uuid) {
    return request({
        url: `file/${uuid}`,
        method: 'get',
    })
}

/**
 * 上传附件
 * @param {*}} data 
 */
export function uploadAnnex(data) {
    return request({
        url: `file`,
        method: 'post',
        data
    })
}
