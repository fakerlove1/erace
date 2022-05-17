/**
 * Created by WuZeHua 2020/01/19
 */
import { sendInvCode, sendVerCode, resetPassward, sendResetVerCode } from '@/api/other'
import { Message } from 'element-ui';
import { testURL } from '@/utils/request'
import router from '@/router'

const state = {
    pageHeight: '',
    routerPath: '',
    baseUrl: testURL,
}

const mutations = {
    // which router is actived in menu
    SET_PAGEHEIGHT: (state, data) => {
        state.pageHeight = data;
    },
    // 设置当前路由值
    SET_ROUTERPATH: (state, data) => {
        state.routerPath = data;
    }
}

const actions = {
    // 发送邀请码
    async sendInvCode({ commit }, data) {
        let params = new FormData();
        Object.keys(data).forEach(key => {
            params.append(key, data[key]);
        });
        const { data: respData } = await sendInvCode(params);
        if (respData.status != 200) return Message.error(respData.msg);
        return Message.success('邀请码发送成功！');
    },
    // 发送验证码（注册）
    async sendVerCode({ commit }, data) {
        let params = new FormData();
        Object.keys(data).forEach(key => {
            params.append(key, data[key]);
        });
        const { data: respData } = await sendVerCode(params);
        if (respData.status != 200) {
            Message.error(respData.msg);
            return false;
        }
        Message.success('验证码发送成功！');
        return true;
    },
    // 发送证码（重置密码）
    async sendResetVerCode({ commit }, data) {
        let params = new FormData();
        Object.keys(data).forEach(key => {
            params.append(key, data[key]);
        });
        const { data: respData } = await sendResetVerCode(params);
        if (respData.status != 200) {
            Message.error(respData.msg);
            return false;
        }
        Message.success('验证码发送成功！');
        return true;
    },
    // 重置密码
    async resetPassward({ commit }, data) {
        let params = new FormData();
        Object.keys(data).forEach(key => {
            params.append(key, data[key]);
        });
        const { data: respData } = await resetPassward(params);
        if (respData.status != 200) return Message.error(respData.msg);
        Message.success('修改成功！');
        router.push('login');
    },

}

export default {
    namespaced: true,
    state,
    mutations,
    actions,
}