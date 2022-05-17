import admin from "./admin";
import atyRegister from "./atyRegister";

let dashboard = {
  name: "dashboard",
  path: "/dashboard",
  component: () => import("@/views/dashboard"),
  redirect: "/activity/recommend",
  children: [
    // recommend activity
    {
      name: "recommend",
      path: "/activity/recommend",
      component: () => import("@/views/activity/recommend"),
    },
    // all activity
    {
      name: "alllist",
      path: "/activity/all",
      component: () => import("@/views/activity/all"),
      children: [...atyRegister],
    },
    {
      name: "myactivity",
      path: "/activity/my",
      component: () => import("@/views/activity/my"),
    }, // 我的活动页面
    {
      name: "releaseactivity",
      path: "/activity/release",
      component: () => import("@/views/activity/release"),
    }, // 我的活动页面
    // info
    {
      name: "myinfo",
      path: "/info/my",
      component: () => import("@/views/info/my"),
    }, // 我的信息页面
    {
      name: "mmanagermember",
      path: "/info/manager",
      component: () => import("@/views/info/manager"),
    }, // 团队信息页面
    {
      name: "groupInfo",
      path: "/info/group",
      component: () => import("@/views/info/group"),
    },
    //初次申请
    {
      name: "first",
      path: "/identify/first",
      component: () => import("@/views/identify/first"),
      children: [
        // 弹窗详细页面
        {
          name: "info",
          path: "/identify/first/info",
          component: () => import("@/views/identify/info/athlete"),
        },
        {
          name: "confirm",
          path: "/identify/first/confirm",
          component: () => import("@/views/identify/confirm/athlete"),
        },
        {
          name: "infoCoach",
          path: "/identify/first/infoCoach",
          component: () => import("@/views/identify/info/coach"),
        },
        {
          name: "confirmCoach",
          path: "/identify/first/confirmCoach",
          component: () => import("@/views/identify/confirm/coach"),
        },
      ],
    },
    //更新信息
    {
      name: "update",
      path: "/identify/update",
      redirect:'/identify/update/athlete',
      component: () => import("@/views/identify/update/index"),
      children:[
        {
        name: "updateAthlete",
        path: "/identify/update/athlete",
        component: () => import("@/views/identify/update/athlete"),
        children:[
          {
            name: "updateAthleteInfo",
            path: "/identify/uptate/athlete/info",
            component: () => import("@/views/identify/update/info/updateDetailsA"),
          },{
            name: "dropAthleteInfo",
            path: "/identify/drop/athlete/info",
            component: () => import("@/views/identify/update/drop/athlete"),
          }
        ]
          
      },
        {
        name: "updateCoach",
        path: "/identify/update/coach",
        component: () => import("@/views/identify/update/coach"),
        children:[
          {
            name: "updateCoachInfo",
            path: "/identify/uptate/coach/info",
            component: () => import("@/views/identify/update/info/updateDetailsC"),
          },
          {
            name: "dropCoachInfo",
            path: "/identify/drop/coach/info",
            component: () => import("@/views/identify/update/drop/coach"),
          },
        ]
      },
    ]
    },
    //年审
    {
      name: "annualExamine",
      path: "/identify/annualExamine",
      component: () => import("@/views/identify/annual/index"),
    },
    // 证书申请
    {
      name: "CertificateApply",
      path: "/identify/CertificateApply",
      component: () => import("@/views/identify/CertificateApply"),
    },
    ...admin,
  ],
};

export default dashboard;
