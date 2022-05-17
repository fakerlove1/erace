import {
  submitCertification,
  getApplication,
  getOneAuthentication,
  getAuthenticationList,
  submitAnnualAuthentication,
  logoutApplication,
  updateAuthentication,
  submitPostalApplication,
  certificateCreate,
  downloadTemplate,
  getAnnualAuthenticationResult
} from "@/api/certificate";
import { Message } from "element-ui";
const state = {
  athelete_info: "",
  coach_info: "",
  drop_member: "",
};
import store from "@/store";

const mutations = {
  SET_ATHELE(state, data) {
    state.athelete_info = data;
  },
  SET_COACH(state, data) {
    state.coach_info = data;
  },
  SET_DROP(state, data) {
    state.drop_member = data;
  },
};
const actions = {
  // 申请认证
  async submitCertification({ commit }, data) {
    let params = new FormData();
    Object.keys(data).forEach((key) => {
      params.append(key, data[key]);
    });
    const { data: respData } = await submitCertification(params);
    if (respData.status !== 200) return this.$message(respData.msg);
    else {
      Message.success("操作成功!");
    }
    return respData.data;
  },
  // 查看认证用户
  async getAuthenticationList({ commit }, data) {
    let params = new FormData();
    Object.keys(data).forEach((key) => {
      params.append(key, data[key]);
    });
    const { data: respData } = await getAuthenticationList(params);
    if (respData.status != 200) {
      return Message.error(respData.msg);
    } else {
      Message.success("操作成功!");
      return respData.data;
    }
  },
  async getApplication({ commit }, data) {
    let params = new FormData();
    Object.keys(data).forEach((key) => {
      params.append(key, data[key]);
    });
    const { data: respData } = await getApplication(params);
    if (respData.status != 200) {
      return Message.error(respData.msg);
    } else {
      Message.success("操作成功!");
      return respData;
    }
  },
  // 查询该用户的信息
  async getOneAuthentication({ commit }, data) {
    let params = new FormData();
    Object.keys(data).forEach((key) => {
      params.append(key, data[key]);
    });
    const { data: respData } = await getOneAuthentication(params);
    if (respData.status != 200) {
      return Message.error(respData.msg);
    } else {
      return respData;
    }
  },
  // 提交注销申请
  async logoutApplication({ commit }, data) {
    let params = new FormData();
    Object.keys(data).forEach((key) => {
      params.append(key, data[key]);
    });
    const { data: respData } = await logoutApplication(params);
    if (respData.status != 200) {
      return Message.error(respData.msg);
    } else {
      Message.success("操作成功!");
      return respData;
    }
  },
  // 提交修改信息
  async updateAuthentication({ commit }, data) {
    let params = new FormData();
    Object.keys(data).forEach((key) => {
      params.append(key, data[key]);
    });
    const { data: respData } = await updateAuthentication(params);
    if (respData.status != 200) {
      return Message.error(respData.msg);
    } else {
      Message.success("操作成功!");
      return respData;
    }
  },
  // 提交年审材料
  async submitAnnualAuthentication({ commit }, data) {
    let params = new FormData();
    Object.keys(data).forEach((key) => {
      params.append(key, data[key]);
    });
    const { data: respData } = await submitAnnualAuthentication(params);
    if (respData.status != 200) {
      return Message.error(respData.msg);
    } else {
      Message.success(respData.msg);
      return respData;
    }
  },
  // 查看历史年审记录
  async getAnnualAuthenticationResult({ commit }, data) {
    let params = new FormData();
    Object.keys(data).forEach((key) => {
      params.append(key, data[key]);
    });
    const { data: respData } = await getAnnualAuthenticationResult(params);
    if (respData.status != 200) {
      return Message.error(respData.msg);
    } else {
      Message.success(respData.msg);
      return respData;
    }
  },
  // 提交纸质证书申请
  async submitPostalApplication({ commit }, data) {
    let params = new FormData();
    Object.keys(data).forEach((key) => {
      params.append(key, data[key]);
    });
    const { data: respData } = await submitPostalApplication(params);
    if (respData.status != 200) {
      return Message.error(respData.msg);
    } else {
      Message.success("操作成功!");
      return respData;
    }
  },
  // 查看证书信息
  async certificateCreate({ commit }, data) {
    let params = new FormData();
    Object.keys(data).forEach((key) => {
      params.append(key, data[key]);
    });
    const { data: respData } = await certificateCreate(params);
    if (respData.status != 200) {
      return Message.error(respData.msg);
    } else {
      Message.success("操作成功!");
      return respData;
    }
  },
  // 下载证书模板
  async downloadTemplate({ commit }, data) {
    // console.log(store.getters.baseUrl)
    let a = document.createElement("a");
    a.href = `${store.getters.baseUrl}authorize/template/download/${data}`;
    // console.log(a.href)
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
