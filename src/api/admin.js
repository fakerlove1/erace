import request from "@/utils/request";

/**
 * 人员操作
 */
// 获取待审核用户
export function getExamUsers(data) {
  return request({
    url: "check/user/get",
    method: "post",
    data,
  });
}
// 审核用户通过注册
export function examUser(data) {
  return request({
    url: "check/user",
    method: "put",
    data,
  });
}
// 获取某角色的所有用户
export function getUsersOfRole(data) {
  return request({
    url: `info/user/getByRole/${data.get("roleName")}/${data.get(
      "page"
    )}/${data.get("number")}`,
    method: "post",
    data,
  });
}

/**
 * 活动操作
 */
// 获取待审核活动(活动发布)
export function getExamAtys() {
  return request({
    url: "check/act/get",
    method: "get",
  });
}
// 审核活动发布
export function examAty(data) {
  return request({
    url: "check/act",
    method: "put",
    data,
  });
}
// 获取待审核活动(活动撤销)
export function getCancelAty() {
  return request({
    url: "check/act/cancel/get",
    method: "get",
  });
}
// 审核活动撤销
export function examCancelAty(data) {
  return request({
    url: "check/act/cancel",
    method: "put",
    data,
  });
}
// 获取所有活动
export function getAllAty(data) {
  return request({
    url: `admin/getAll`,
    method: "post",
    data,
  });
}

/**
 * 根据用户id获取信息
 */
export function getUserById(data) {
  return request({
    url: `info/user/select`,
    method: "post",
    data,
  });
}

/**
 * 其他操作
 */
// 小黑屋操作
export function setBlackList(data) {
  return request({
    url: `admin/blacklist/user`,
    method: "post",
    data,
  });
}

/**
 * 证书相关
 */
// 查看申请列表
export function getApplications(data) {
  return request({
    url: `authorize/admin/getApplications/${data.get("pageNum")}/${data.get( "pageSize" )}`,
    method: "get",
  });
}
// 处理邮寄申请列表
export function getPostApplications(data) {
  return request({
    url: `authorize/admin/getPostApplications/${data.get("pageNum")}/${data.get( "pageSize" )}`,
    method: "get",
  });
}
// 年审列表
export function getAnnualList(data) {
  return request({
    url: `authorize/admin/getAnnualList/${data.get("pageNum")}/${data.get( "pageSize" )}`,
    method: "get",
  });
}
// 根据俱乐部查看
export function getClubAnnualList(data) {
  return request({
    url: `authorize/admin/getAllAnnualList/${data.get("clubName")}/${data.get("pageNum")}/${data.get( "pageSize" )}`,
    method: "get",
  });
}
// 填写单号
export function postApplication(data) {
  return request({
    url: "authorize/admin/post",
    method: "post",
    data
  });
}
// 根据memberId查看成员信息
export function getAuthenticationDetail(data) {
  return request({
    url: `authorize/admin/getAuthenticationDetail`,
    method: "post",
    data
  });
}
// 审核认证信息
export function checkAuthenticationApplication(data) {
  return request({
    url: `authorize/admin/checkAuthenticationApplication`,
    method: "post",
    data
  });
}
// 审核注销信息
export function checkLogoutApplication(data) {
  return request({
    url: `authorize/admin/checkLogoutApplication`,
    method: "post",
    data
  });
}
// 年审
export function checkAnnual(data) {
  return request({
    url: 'authorize/admin/annual',
    method: "post",
    data
  });
}


