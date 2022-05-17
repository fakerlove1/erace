const getters = {
    // user
    userId: state => state.user.userId,
    uname: state => state.user.uname,
    avatar: state => state.user.avatar,
    gender: state => state.user.gender,
    resume: state => state.user.resume,
    tolItg: state => state.user.tolItg,
    mchName: state => state.user.mchName,
    userType: state => state.user.userType,
    token: state => state.user.token,
    userInfo: state => state.user.userInfo,
    // activity
    selected_aty: state => state.activity.selected_aty,
    reLaunched: state=>state.activity.reLaunched,
    // permissions
    PERSONAL_MENU: state => state.permissions.PERSONAL_MENU,
    GROUP_MENU: state => state.permissions.GROUP_MENU,
    ADMIN_MENU: state => state.permissions.ADMIN_MENU,
    isActive: state => state.permissions.isActive,
    // data
    ACTIVITY_TYPE_EN_ZH: state => state.data.ACTIVITY_TYPE_EN_ZH,
    ACTIVITY_TYPE_ZH_EN: state => state.data.ACTIVITY_TYPE_ZH_EN,
    PREF_POS_EN_ZH: state => state.data.PREF_POS_EN_ZH,
    PREF_POS_ZH_EN: state => state.data.PREF_POS_ZH_EN,
    // other
    pageHeight: state => state.other.pageHeight,
    routerPath: state => state.other.routerPath,
    baseUrl: state => state.other.baseUrl,
    // certificate
    ATHLETE_INFO: state=>state.certificate.athelete_info,
    COACH_INFO: state=>state.certificate.coach_info,
    DROP_MEMBER:state =>state.certificate.drop_member
}

export default getters