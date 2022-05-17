/**
 * Created by WuZeHua 2020/01/10
 */

const state = {
    // menu
    PERSONAL_MENU: [
        { id: 1, name: "活动首页", router: "/activity/recommend", },
        { id: 2, name: "报名活动", router: "/activity/all", },
        { id: 3, name: "我的活动", router: "/activity/my", },
        { id: 4, name: "个人信息", router: "/info/my", },
    ],
    GROUP_MENU: [
        { id: 1, name: "活动首页", router: "/activity/recommend", },
        { id: 2, name: "电竞赛事活动报名", router: "/activity/all", },
        { id: 3, name: "电竞赛事活动申请", router: "/activity/release", },
        { id: 4, name: "我的活动", router: "/activity/my", },
        { id: 5, name: "团体信息", router: "/info/group", },
        {
            id: 6,
            name: "认证申请",
            ishidden: true,
            children: [
                { id: 6.1, name: "初次认证", router: "/identify/first" },
                { id: 6.2, name: "更新信息", router: "/identify/update" },
                { id: 6.3, name: "年度审核", router: "/identify/AnnualExamine" },
                //{ id: 6.4, name: "证书申请", router: "/identify/certificate_appli" },
            ]
        },
        { id: 7, name: "证书申请", router: "/identify/CertificateApply", },
    ],
    ADMIN_MENU: [{
            id: 1,
            name: "会员管理",
            ishidden: false,
            children: [
                { id: 1.1, name: "申请审核", router: "/application/review" },
                { id: 1.2, name: "个人会员", router: "/vips/personal" },
                { id: 1.3, name: "团体会员", router: "/vips/enterprise" },
                // { id: 1.4, name: "俱乐部会员", router: "/vips/club" },
                // { id: 1.5, name: "协会会员单位", router: "/vips/association" },
            ]
        },
        {
            id: 2,
            name: "活动管理",
            ishidden: true,
            children: [
                { id: 2.1, name: "审核活动", router: "/activity/review" },
                { id: 2.2, name: "所有活动", router: "/activity/all/admin" },
                // { id: 2.2, name: "发布协会活动", router: "/activity/launch" },
                // { id: 2.3, name: "删除活动", router: "/activity/delete" },
            ]
        },
        // {
        //     id: 3,
        //     name: "会员码管理",
        //     router: "/manager/code",
        // },
        {
            id: 3,
            name: "证书管理",
            ishidden: true,
            //router: "/manager/code",
            children: [
                { id: 3.1, name: "认证管理", router: "/manager/code" },
                { id: 3.2, name: "证书发放", router: "/provide/certificate" },
                // { id: 2.2, name: "发布协会活动", router: "/activity/launch" },
                { id: 3.3, name: "年度审核", router: "/manager/annual" },
            ]
        },
    ],

    isActive: '',
}

const mutations = {
    // which router is actived in menu
    SET_ISACTIVE: (state, data) => {
        state.isActive = data;
    },
}

const actions = {

}

export default {
    namespaced: true,
    state,
    mutations,
    actions,
}