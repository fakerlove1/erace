/**
 * Created by WuZeHua 2020/01/19
 */
import { locationOption } from '@/utils/data'

import store from '@/store'


/**
 * 映射表关键词名
 * 
 * 业务范围 bizScope
 * BIZ_SCOPE_ABOUT_ESPORTS_FIRST
 * BIZ_SCOPE_ABOUT_ESPORTS_SECOND
 * BIZ_SCOPE_ABOUT_ESPORTS_THIRD
 * BIZ_SCOPE_IRRELEVANT_ESPORTS_FIRST
 * BIZ_SCOPE_IRRELEVANT_ESPORTS_SECOND
 * BIZ_SCOPE_IRRELEVANT_ESPORTS_THIRD
 * 
 * 活动类型 ACTIVITY_TYPE
 * 意向岗位 PREF_POS
 */

const state = {
    ACTIVITY_TYPE_EN_ZH: [],
    ACTIVITY_TYPE_ZH_EN: [],

    PREF_POS_EN_ZH: [],
    PREF_POS_ZH_EN: [],
}

const mutations = {
    // 活动类型
    SET_ACTIVITY_TYPE_EN_ZH(state, data) {
        state.ACTIVITY_TYPE_EN_ZH = data;
    },
    SET_ACTIVITY_TYPE_ZH_EN(state, data) {
        state.ACTIVITY_TYPE_ZH_EN = data;
    },

    // 意向岗位
    SET_PREF_POS_EN_ZH(state, data) {
        state.PREF_POS_EN_ZH = data;
    },
    SET_PREF_POS_ZH_EN(state, data) {
        state.PREF_POS_ZH_EN = data;
    },
}

const actions = {
    /**
     * 获取省市镇三级级联选择器
     */
    getLocationOptions() {
        return locationOption;
    },

    /**
     * 下载附件
     * @param {} uuid 
     */
    async downloadAnnex({ commit }, uuid) {
        console.log(store.getters.baseUrl+uuid)
        let a = document.createElement("a");
        a.href = `${store.getters.baseUrl}/file/download/${uuid}`;
        console.log(a.href);
        document.body.appendChild(a);
        a.click(); //下载
        URL.revokeObjectURL(a.href); // 释放URL 对象
        document.body.removeChild(a); // 删除 a 标签
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions,
}