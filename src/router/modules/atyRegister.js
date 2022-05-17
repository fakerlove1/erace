let admin = [
    // 活动详情页
    {
        name: 'atyRegisterInfo',
        path: '/activity/all/register/info',
        component: () =>
            import ('@/views/activity/all/modules/atyRegister/AtyInfo')
    },

    // 参加活动的报名页
    {
        name: 'atyRegisterInfoGroupRegister',
        path: '/activity/all/register/register',
        component: () =>
            import ('@/views/activity/all/modules/atyRegister/register')
    },

    // 参加活动的确认页
    {
        name: 'atyRegisterPersonalConfirm',
        path: '/activity/all/register/confirm',
        component: () =>
            import ('@/views/activity/all/modules/atyRegister/confirm')
    },
]


export default admin