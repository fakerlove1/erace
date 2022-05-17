/**
 * Created by WuZeHua  2020/01/10
 */
const baseURL = 'http://myapi/';

// OK return
const YES = {
    code: 200,
    msg: '',
}

// ERROR return
const NO = {
    code: 400,
    msg: 'error',
}

const TOKENS = {
    user: "user token",
    group: "group token",
}

const USER_INFO_USER = {
    "id": 0,
    "username": "user",
    "nickname": "no-nickname",
    "state": false,
    "realName": "no-real-name",
    "cardId": "no-card-id",
    "gender": "X",
    "birthDate": 0,
    "mchName": "no-mch-name",
    "mchType": "no-mch-type",
    "mchCode": "no-mch-code",
    "bizScope": "no-biz-scope",
    "avatar": "no-avatar",
    "resume": "no-resume",
    "profile": "no-profile",
    "profession": "no-profession",
    "workExp": "no-work-exp",
    "eduExp": "no-edu-exp",
    "location": "no-location",
    "locationUrl": "no-location-url",
    "cord": "no-cord",
    "rcvEmail": "no-rcv-email",
    "prohibit": 0,
    "atyTimes": 0,
    "totalPoint": 0,
    "note": "no-note",
    "remark": "no-remark",
    "label": "no-label",
    "invCodeRemNum": 0,
    "logo": "no-logo",
    "additionFile": "no-addition-file",
    "tolItg": "no-tol-itg",
    "phone": 0,
    "tel": "no-tel",
    "email": "no-email",
    "uname": "Lily",
    "qq": 0,
    "wechat": "no-wechat",
    "alipay": "no-alipay",
    "weibo": "no-weibo",
    "offAct": "no-off-act",
    "website": "no-website"
}

const USER_INFO_GROUP = {
    "id": 0,
    "username": "user",
    "nickname": "no-nickname",
    "state": false,
    "realName": "no-real-name",
    "cardId": "no-card-id",
    "gender": "X",
    "birthDate": 0,
    "mchName": "have-mch-name",
    "mchType": "no-mch-type",
    "mchCode": "no-mch-code",
    "bizScope": "no-biz-scope",
    "avatar": "no-avatar",
    "resume": "no-resume",
    "profile": "no-profile",
    "profession": "no-profession",
    "workExp": "no-work-exp",
    "eduExp": "no-edu-exp",
    "location": "no-location",
    "locationUrl": "no-location-url",
    "cord": "no-cord",
    "rcvEmail": "no-rcv-email",
    "prohibit": 0,
    "atyTimes": 0,
    "totalPoint": 0,
    "note": "no-note",
    "remark": "no-remark",
    "label": "no-label",
    "invCodeRemNum": 0,
    "logo": "no-logo",
    "additionFile": "no-addition-file",
    "tolItg": "no-tol-itg",
    "phone": 0,
    "tel": "no-tel",
    "email": "no-email",
    "uname": "no-uname",
    "qq": 0,
    "wechat": "no-wechat",
    "alipay": "no-alipay",
    "weibo": "no-weibo",
    "offAct": "no-off-act",
    "website": "no-website"
}

let mocks = [
    // login mock
    {
        url: baseURL + 'user/login',
        method: 'post',
        fn: (request) => {
            return {
                token: TOKENS.group,
                ...YES
            }
        },
    },
    // get all user mock
    {
        url: `http://myapi/user/info`,
        method: 'get',
        fn: function () {
            return {
                ...USER_INFO_USER,
                ...YES
            }
        },
    },
];

export default [mocks] 