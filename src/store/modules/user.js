/*
 * created by WuZeHua in 2000/01/10 
 */

import { login, logout } from '@/api/user';
import { getUserInfo, updateUserInfo, userRegister, getUserRole } from "@/api/user";
import { userVer, userVerOk } from "@/api/user";
import { getMembers } from "@/api/user";

import { Message } from 'element-ui'

import router from '@/router';
import store from '@/store';


const state = {
    userId: '',
    uname: '',
    avatar: '',
    gender: '',
    resume: '',
    tolItg: '',
    mchName: '',
    userType: '',
    token: '',
    // 详细的userInfo
    userInfo: {
        // userInformation: {},
        // userExtensionPerson: {},
        // userActivitiesInfo: {},
        // userExtensionOrganization: {},
    }
}

const mutations = {
    // userId
    SET_USERID: (state, data) => {
        state.userId = data;
    },
    // uname
    SET_UNAME: (state, data) => {
        state.uname = data;
    },
    // avatar
    SET_AVATAR: (state, data) => {
        state.avatar = data;
    },
    // gender
    SET_GENDER: (state, data) => {
        state.gender = data;
    },
    // resume
    SET_RESUME: (state, data) => {
        state.resume = data;
    },
    // tolItg
    SET_TOLITG: (state, data) => {
        state.tolItg = data;
    },
    // mchName 
    SET_MCHNAME: (state, data) => {
        state.mchName = data;
    },
    // userType
    SET_USERTYPE: (state, data) => {
        state.userType = data;
    },
    RESET_USERTYPE: (state) => {
        state.userType = '';
    },
    // token
    SET_TOKEN: (state, token) => {
        state.token = token;
    },
    RESET_TOKEN: (state) => {
        state.token = '';
    },
    // userInfo
    SET_USER_INFO: (state, data) => {
        state.userInfo = data;
    },
}

const actions = {
    /**
     * 用户注册、登录、登出
     */
    // 个人用户注册action
    async registerUser({ commit }, data) {
        let params = new URLSearchParams();

        Object.keys(data).forEach(key => {
            params.append(key, data[key]);
        });

        const { data: retData } = await userRegister(params);
        console.log(retData);

        if (retData.status != 200) Message.error(retData.msg);
        else {
            Message.success('注册成功！');
            router.push('/login');
        }
    },
    // 团体用户注册action
    async registerGroup({ commit }, data) {
        // console.log(data);
        let params = new FormData();
        data.offAct = "no";
        data.weibo = "no";
        Object.keys(data).forEach(key => {
            params.append(key, data[key]);
        });

        const { data: retData } = await userRegister(params);

        if (retData.status != 200) Message.error(retData.msg);
        else {
            router.push('/login');
            Message.success("注册请求提交成功，请等待管理员审核！");
            window.sessionStorage.clear();
        }
    },
    // 登录
    async login({ commit }, data) {
        let params = new FormData();
        Object.keys(data).forEach(key => {
            params.append(key, data[key]);
        })

        let { data: retData } = await login(params);

        if (retData.data && retData.data.token)
            commit('SET_TOKEN', retData.data.token);

        if (retData.status !== 200) {
            return Message.error(retData.msg);
        }
        router.push('/dashboard');
    },
    // 登出
    async logout({ commit }) {
        console.log(123);
        const { data: retData } = await logout();
        if (retData.status == 200) {
            commit('RESET_TOKEN');
            window.localStorage.removeItem('vuex');
            Message.success('登出成功！');
        } else {
            Message.error(retData.msg);
        }
        router.push('/login');
    },


    /**
     * 信息获取、管理
     */
    // 获取用户身份
    async getUserRole({ commit }) {
        let { data: respData } = await getUserRole();
        return respData.data;
    },
    // 获取用户信息
    async getUserInfo({ commit }, data) {
        let { data: respData } = await getUserInfo(data);
        // console.log(respData.data)
        return respData.data;
    },
    // 更新用户信息
    async updateUserInfo({ commit }, data) {
        let params = new FormData();

        Object.keys(data).forEach(key => {
            params.append(key, data[key]);
        });

        const { data: respData } = await updateUserInfo(params);
        if (respData.status != 200) {
            Message.error(respData.msg);
            return false;
        }
        Message.success('设置成功！');
        return true;
    },
    // 获取用户自身信息
    async getMyInfo({ commit }) {
        let retData = await store.dispatch('user/getUserInfo', {
            userId: 0,
        });
        // console.log('store/user', retData);
        commit('SET_USER_INFO', JSON.stringify(retData));

        // 判断用户角色信息
        let userType;
        const roleData = await store.dispatch('user/getUserRole');
        // console.log(roleData);

        userType = roleData[0].split('_')[0];
        // console.log(userType);
        // 判断角色属性
        if (userType == 'PERSON') {
            userType = 'personal';
        } else if (userType == 'ENTERPRISE') {
            userType = 'group';
        } else if (userType == 'CLUB') {
            userType = 'club'
        } else if (userType == 'ADMIN') {
            userType = 'admin'
        }

        // 提交相关信息
        if (userType != 'admin') {
            commit('SET_USERID', retData.userInformation.userId);
            commit('SET_TOLITG', retData.userActivitiesInfo.point);
            commit('SET_GENDER', retData.userInformation.sex);
            commit('SET_UNAME', retData.username);
            commit('SET_AVATAR', retData.avatar);
        }
        commit('SET_USERTYPE', userType);

        if (userType != 'admin')
            return {...retData.data, userType };
        else return { userType };
    },
    // 获取用户关系主键（如：属于某一组织的所有会员）
    async getMembers({ commit }, data) {
        const { data: respData } = await getMembers(data);
        if (respData.status != 200) {
            Message.error(respData.msg);
            return [];
        } else {
            return respData.data;
        }
    },

    /**
     * 实名认证
     */
    // 实名认证发送
    async userVer({ commit }, data) {
        let params = new FormData();
        Object.keys(data).forEach(key => {
            params.append(key, data[key]);
        });
        const { data: respData } = await userVer(params);
        return respData;
    },
    // 实名认证确认
    async userVerOk({ commit }, data) {
        let params = new FormData();
        Object.keys(data).forEach(key => {
            params.append(key, data[key]);
        });
        const { data: respData } = await userVerOk(params);
        return respData;
    },

}

export default {
    namespaced: true,
    state,
    mutations,
    actions,
}