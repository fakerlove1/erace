/**
 * Created by WuZeHua 2020/01/27
 */
import { getAllAty, releaseAty, signUpAty, deleteAty } from "@/api/activity";
import { getJoinedAty, getReleasedAty,getRoundPictures } from "@/api/activity";
import {
  getSignedUsers,
  examUserSign,
  examUserFinishAty,
} from "@/api/activity";
import { Message } from "element-ui";

import router from "@/router";

const state = {
  // 用户报名活动，选中的内容(报名时使用)
  selected_aty: {},

  // 用户点击海报时的状态
  clicked: "",
  // 重新发布活动时带的参数
  reLaunched: "",
};

const mutations = {
  SET_SELECTED_ATY: (state, data) => {
    state.selected_aty = data;
  },
  SET_RELAUNCHED: (state, data) => {
    state.reLaunched = data;
  },
};

const actions = {
  /**
   * 活动获取
   */
  // 获取所有活动
  async getAllAty({ commit }, data) {
    let params = new FormData();
    Object.keys(data).forEach((key) => {
      params.append(key, data[key]);
    });
    const { data: respData } = await getAllAty(params);
    if (respData.status == 200) {
      return respData.data;
    } else {
      return null;
    }
  },

  // 获取参与的活动
  async getJoinedAty({ commit }, data) {
    const { data: respData } = await getJoinedAty(data);
    if (respData.status !== 200) {
      Message.error(respData.msg);
      return [];
    }
    return respData.data;
  },

  // 获取所有发布的活动
  async getReleaseAty({ commit }, data) {
    const { data: respData } = await getReleasedAty(data);
    if (respData.status !== 200) {
      Message.error(respData.msg);
      return [];
    }
    return respData.data;
  },

  /**
   * 活动基础操作
   */
  // 发布活动
  async releaseAty({ commit }, data) {
    let params = new FormData();
    Object.keys(data).forEach((key) => {
      params.append(key, data[key]);
    });
    params.delete('picture')
    // 处理活动组图，以picture为key传入
    for (var i = 0; i < data.picture.length; i++) {
      params.append("picture", data.picture[i]);
    }
     console.log(params.get("picture"))
    const { data: respData } = await releaseAty(params);
    // console.log(respData);
    if (respData.status !== 200) {
      Message.error(respData.msg);
      return false;
    }
    Message.success("活动发布成功！");
    return true;
  },
  // 报名活动
  async signUpAty({ commit }, data) {
    let params = new FormData();
    Object.keys(data).forEach((key) => {
      params.append(key, data[key]);
    });

    // const { data: respData } = await signUpAty(params);
    const respData = await signUpAty(params);
    // console.log(respData)
    if (respData.status != 200) {
      Message.error(respData.msg);
      return false;
    } else {
      Message.success("报名成功！请刷新页面并耐心等待活动发布者的审核");
      return true;
    }
  },
  // 删除活动
  async deleteAty({ commit }, data) {
    let params = new FormData();
    Object.keys(data).forEach((key) => {
      params.append(key, data[key]);
    });
    const { data: respData } = await deleteAty(params);
    if (respData.status != 200) {
      Message.error(respData.msg);
      return false;
    } else {
      // console.log(respData)
      Message.success("撤回活动申请成功！");
      return true;
    }
  },

  /**
   * 活动审核
   */
  // 获取报名审核人员名单
  async getSignedUsers({ commit }, value) {
    const { data: respData } = await getSignedUsers(value);
    // console.log(respData);
    if (respData.status != 200) {
      Message.error(respData.msg);
      return [];
    } else {
      return respData.data;
    }
  },
  // 审核个人用户报名活动是否通过
  async examUserSign({ commit }, data) {
    let params = new FormData();
    Object.keys(data).forEach((key) => {
      params.append(key, data[key]);
    });
    const { data: respData } = await examUserSign(params);
    if (respData.status != 200) {
      Message.error(respData.msg);
    } else {
      Message.success("操作成功！");
    }
    location.reload();
  },
  // 审核用户完成活动
  async examUserFinishAty({ commit }, data) {
    let params = new FormData();
    Object.keys(data).forEach((key) => {
      params.append(key, data[key]);
    });
    const { data: respData } = await examUserFinishAty(params);
    if (respData.status != 200) {
      Message.error(respData.msg);
      return false;
    } else {
      Message.success("操作成功！");
      return true;
    }
  },

  /**
   * 获取轮播图
   */
   async getRoundPictures({commit},data){
    const { data: respData } = await getRoundPictures(data);
    // console.log(respData);
    if (respData.status == 200) {
      return respData.data;
    } else {
      return null;
    }
   }
};
export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
