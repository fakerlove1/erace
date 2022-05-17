/**
 * Created by WuZeHua 2020/01/19
 */
import { getExamUsers, examUser } from "@/api/admin";
import { getExamAtys, examAty } from "@/api/admin";
import { getUsersOfRole, getUserById } from "@/api/admin";
import { getCancelAty, examCancelAty } from "@/api/admin";

import { getAllAty } from "@/api/admin";
import { setBlackList } from "@/api/admin";
import {
  getApplications,
  getAuthenticationDetail,
  checkAuthenticationApplication,
  checkLogoutApplication,
  getPostApplications,
  postApplication,
  getAnnualList,
  downloadAnnualZip,
  getClubAnnualList,
  checkAnnual
} from "@/api/admin";

import store from '@/store'
import { Message } from "element-ui";

const state = {};

const mutations = {};

const actions = {
  /**
   * 用户管理
   */
  // 获取待审核用户列表
  async getExamUser({ commit }, data) {
    let params = new FormData();
    Object.keys(data).forEach((key) => {
      params.append(key, data[key]);
    });

    const { data: respData } = await getExamUsers(params);
    if (respData.status !== 200) return Message.error(respData.msg);
    // console.log(respData);
    return respData.data;
  },
  // 审核用户注册(通过/不通过)
  async examUser({ commit }, data) {
    let params = new FormData();
    Object.keys(data).forEach((key) => {
      params.append(key, data[key]);
    });

    const { data: respData } = await examUser(params);

    if (respData.status !== 200) {
      Message.error(respData.msg);
      return false;
    }
    Message.success("操作成功!");
    return true;
  },
  // 获取某角色所有用户
  async getUsersOfRole({ commit }, data) {
    let params = new FormData();
    Object.keys(data).forEach((key) => {
      params.append(key, data[key]);
    });
    // console.log(params.get('number'));
    const { data: respData } = await getUsersOfRole(params);

    console.log(respData);
    if (respData.status !== 200) return Message.error(respData.msg);
    return respData.data;
  },

  /**
   * 活动管理
   */
  // 获取所有活动
  async getAllAty({ commit }, data) {
    let params = new FormData();
    Object.keys(data).forEach((key) => {
      params.append(key, data[key]);
    });
    const { data: respData } = await getAllAty(params);
    // console.log(respData);
    if (respData.status != 200) return Message.error(respData.msg);
    return respData.data;
  },
  // 获取待审核(活动发布)列表
  async getExamAty({ commit }) {
    const { data: atys } = await getExamAtys();
    if (atys.status !== 200) {
      Message.error(atys.msg);
      return [];
    }
    // console.log(atys);
    return atys.data;
  },
  // 审核活动
  async examAty({ commit }, data) {
    let params = new FormData();
    Object.keys(data).forEach((key) => {
      params.append(key, data[key]);
    });
    const { data: respData } = await examAty(params);
    if (respData.status != 200) Message.error(respData.msg);
    else Message.success("操作成功！");
    return respData;
  },

  //获取申请撤回的活动
  async getCancelAty({ commit }) {
    const { data: respData } = await getCancelAty();
    if (respData.status != 200) return Message.error(respData.msg);
    return respData.data;
  },

  // 审核活动撤回申请
  async examCancelAty({ commit }, data) {
    let params = new FormData();
    Object.keys(data).forEach((key) => {
      params.append(key, data[key]);
    });
    const { data: respData } = await examCancelAty(params);
    if (respData.status != 200) {
      Message.error(respData.msg);
      return false;
    } else {
      Message.success("操作成功!");
      return true;
    }
  },

  /**
   * 其他操作
   */
  // 小黑屋操作
  async setBlackList({ commit }, data) {
    let params = new FormData();
    Object.keys(data).forEach((key) => {
      params.append(key, data[key]);
    });
    const { data: respData } = await setBlackList(params);
    if (respData.status != 200) {
      Message.error(respData.msg);
      return false;
    }
    Message.success("操作成功！");
    return true;
  },

  /**
   * 根据用户id查询信息
   */
  async getUserById({ commit }, data) {
    let params = new FormData();
    Object.keys(data).forEach((key) => {
      params.append(key, data[key]);
    });
    const { data: respData } = await getUserById(params);
    if (respData.status != 200) {
      return Message.error(respData.msg);
    } else {
      Message.success("操作成功!");
      return respData;
    }
  },
  /**
   * 认证相关
   * @param {*} param0
   * @param {*} data
   * @returns
   */
  async getApplications({ commit }, data) {
    let params = new FormData();
    Object.keys(data).forEach((key) => {
      params.append(key, data[key]);
    });
    const { data: respData } = await getApplications(params);
    if (respData.status != 200) {
      return Message.error(respData.msg);
    } else {
      Message.success("操作成功!");
      return respData;
    }
  },
  // 根据memberId查询信息
  async getAuthenticationDetail({ commit }, data) {
    let params = new FormData();
    Object.keys(data).forEach((key) => {
      params.append(key, data[key]);
    });
    const { data: respData } = await getAuthenticationDetail(params);
    if (respData.status != 200) {
      return Message.error(respData.msg);
    } else {
      return respData;
    }
    // console.log("...=",respData)
  },

  async checkAuthenticationApplication({ commit }, data) {
    // console.log("0-0-",data);
    let params = new FormData();
    Object.keys(data).forEach((key) => {
      params.append(key, data[key]);
    });
   
    const { data: respData } = await checkAuthenticationApplication(params);
    if (respData.status != 200) {
      return Message.error(respData.msg);
    } else {
      Message.success("操作成功!");
      return respData;
    }
  },
  // 审核注销
  async checkLogoutApplication({ commit }, data) {
    // console.log("0-0-",data);
    let params = new FormData();
    Object.keys(data).forEach((key) => {
      params.append(key, data[key]);
    });
   
    const { data: respData } = await checkLogoutApplication(params);
    if (respData.status != 200) {
      return Message.error(respData.msg);
    } else {
      Message.success("操作成功!");
      return respData;
    }
  },
  //获取邮寄申请列表
  async getPostApplications({ commit }, data) {
    let params = new FormData();
    Object.keys(data).forEach((key) => {
      params.append(key, data[key]);
    });
    const { data: respData } = await getPostApplications(params);
    if (respData.status != 200) return Message.error(respData.msg);
    return respData.data;
  },
  // 年审列表
  async getAnnualList({ commit }, data) {
    let params = new FormData();
    Object.keys(data).forEach((key) => {
      params.append(key, data[key]);
    });
    const { data: respData } = await getAnnualList(params);
    if (respData.status != 200) return Message.error(respData.msg);
    return respData.data;
  },
  // 根据俱乐部查看历史年审记录
  async getClubAnnualList({ commit }, data) {
    let params = new FormData();
    Object.keys(data).forEach((key) => {
      params.append(key, data[key]);
    });
    const { data: respData } = await getClubAnnualList(params);
    if (respData.status != 200) return Message.error(respData.msg);
    return respData.data;
  },
  // 年审
  async checkAnnual({ commit }, data) {
    let params = new FormData();
    Object.keys(data).forEach((key) => {
      params.append(key, data[key]);
    });
    const { data: respData } = await checkAnnual(params);
    if (respData.status != 200) return Message.error(respData.msg);
    return respData.data;
  },
  // 邮寄
  async postApplication({ commit }, data) {
    let params = new FormData();
    Object.keys(data).forEach((key) => {
      params.append(key, data[key]);
    });
    const { data: respData } = await postApplication(params);
    if (respData.status != 200) return Message.error(respData.msg);
    else {
      Message.success("操作成功!");
      return respData;
    }
  },
  /**
   * 下载年审压缩包
   * @param {} uuid
   */
  async downloadAnnualZip({ commit }, uuid) {
    console.log(store.getters.baseUrl + uuid);
    let a = document.createElement("a");
    a.href = `${store.getters.baseUrl}file/authorize/admin/downloadAnnualZip/${uuid}`;
    console.log(a.href);
    document.body.appendChild(a);
    a.click(); //下载
    URL.revokeObjectURL(a.href); // 释放URL 对象
    document.body.removeChild(a); // 删除 a 标签
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
