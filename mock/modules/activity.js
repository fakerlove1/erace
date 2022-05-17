/**
 * Created by WuZeHua 2020/01/12
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

const recommends = [
    {
        imgSrc: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
        activityUrl: "",
    },
    {
        imgSrc: 'https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg',
        activityUrl: "",
    },
    {
        imgSrc: 'https://fuss10.elemecdn.com/9/bb/e27858e973f5d7d3904835f46abbdjpeg.jpeg',
        activityUrl: "",
    },
    {
        imgSrc: 'https://fuss10.elemecdn.com/2/11/6535bcfb26e4c79b48ddde44f4b6fjpeg.jpeg',
        activityUrl: "",
    },
]

const atyList = [
    {
        id: 1,
        available: true,
        name: "王者荣耀常州赛区线下赛",
        launcherId: 0,
        bgnTime: 0,
        endTime: 0,
        signupBgnTime: 0,
        signupEndTime: 0,
        // 比赛类型
        types: "线下比赛",
        // 个人、团体
        scope: "no-scope",
        location: "常州市",
        state: "no-state",
        // 需求职位
        prefPos: "no-pref-pos",
        // 需求数量
        prefNum: "no-pref-num",
        locationUrl: "no-location-url",
        // 经纬度坐标
        cord: "no-cord",
        // note不超过255
        note: "no-note",
        detail: "no-detail",
        // 参加活动总人数
        total: 0,
        // 积分
        point: 0,
        // 报名费用
        cost: 0,
        // 奖励费用
        reward: '200-600',
        // 封面图片URL
        covImg:
            "https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg",
        // 图片组
        images: "no-images",
        // 附件文件
        additionFile: "no-addition-file",
    },
    {
        id: 2,
        available: true,
        name: "王者荣耀常州赛区线下赛",
        launcherId: 0,
        bgnTime: 0,
        endTime: 0,
        signupBgnTime: 0,
        signupEndTime: 0,
        // 比赛类型
        types: "线下比赛",
        // 个人、团体
        scope: "no-scope",
        location: "昆山市",
        state: "no-state",
        // 需求职位
        prefPos: "no-pref-pos",
        // 需求数量
        prefNum: "no-pref-num",
        locationUrl: "no-location-url",
        // 经纬度坐标
        cord: "no-cord",
        // note不超过255
        note: "no-note",
        detail: "no-detail",
        // 参加活动总人数
        total: 0,
        // 积分
        point: 0,
        // 报名费用
        cost: 0,
        // 奖励费用
        reward: '200-600',
        // 封面图片URL
        covImg:
            "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg",
        // 图片组
        images: "no-images",
        // 附件文件
        additionFile: "no-addition-file",
    },
    {
        id: 3,
        available: true,
        name: "王者荣耀常州赛区线下赛",
        launcherId: 0,
        bgnTime: 0,
        endTime: 0,
        signupBgnTime: 0,
        signupEndTime: 0,
        // 比赛类型
        types: "no-types",
        // 个人、团体
        scope: "no-scope",
        location: "南京市",
        state: "no-state",
        // 需求职位
        prefPos: "no-pref-pos",
        // 需求数量
        prefNum: "no-pref-num",
        locationUrl: "no-location-url",
        // 经纬度坐标
        cord: "no-cord",
        // note不超过255
        note: "no-note",
        detail: "no-detail",
        // 参加活动总人数
        total: 0,
        // 积分
        point: 0,
        // 报名费用
        cost: 200,
        // 奖励费用
        reward: 0,
        // 封面图片URL
        covImg:
            "https://fuss10.elemecdn.com/9/bb/e27858e973f5d7d3904835f46abbdjpeg.jpeg",
        // 图片组
        images: "no-images",
        // 附件文件
        additionFile: "no-addition-file",
    },
    {
        id: 4,
        available: true,
        name: "王者荣耀常州赛区线下赛",
        launcherId: 0,
        bgnTime: 0,
        endTime: 0,
        signupBgnTime: 0,
        signupEndTime: 0,
        // 比赛类型
        types: "线下比赛",
        // 个人、团体
        scope: "no-scope",
        location: "昆山市",
        state: "no-state",
        // 需求职位
        prefPos: "no-pref-pos",
        // 需求数量
        prefNum: "no-pref-num",
        locationUrl: "no-location-url",
        // 经纬度坐标
        cord: "no-cord",
        // note不超过255
        note: "no-note",
        detail: "no-detail",
        // 参加活动总人数
        total: 0,
        // 积分
        point: 0,
        // 报名费用
        cost: 0,
        // 奖励费用
        reward: '200-600',
        // 封面图片URL
        covImg:
            "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg",
        // 图片组
        images: "no-images",
        // 附件文件
        additionFile: "no-addition-file",
    },
]

let mocks = [
    // activity recommend
    {
        url: baseURL + 'activity/recommend',
        method: 'get',
        fn: (request) => {
            return {
                data: recommends,
                ...YES
            }
        },
    },
    // activity all list
    {
        url: baseURL + 'activity/all',
        method: 'get',
        fn: (request) => {
            return {
                data: atyList,
                ...YES
            }
        },
    },
]

export default [mocks]