let admin = [
    // vips
    {
        name: 'appreview',
        path: '/application/review',
        component: () =>
            import ('@/views/admin/vips/appReview')
    },
    {
        name: 'vipPersonal',
        path: '/vips/personal',
        component: () =>
            import ('@/views/admin/vips/personal')
    },
    {
        name: 'vipEnterprise',
        path: '/vips/enterprise',
        component: () =>
            import ('@/views/admin/vips/enterprise')
    },
    {
        name: 'vipClub',
        path: '/vips/club',
        component: () =>
            import ('@/views/admin/vips/club')
    },
    {
        name: 'vipAssociation',
        path: '/vips/association',
        component: () =>
            import ('@/views/admin/vips/association')
    },

    // activity
    {
        name: 'atyReview',
        path: '/activity/review',
        component: () =>
            import ('@/views/admin/activity/review')
    },
    {
        name: 'all',
        path: '/activity/all/admin',
        component: () =>
            import ('@/views/admin/activity/all')
    },

    // {
    //     name: 'atyLaunch',
    //     path: '/activity/launch',
    //     component: () =>
    //         import ('@/views/admin/activity/launch')
    // },
    // {
    //     name: 'atyDelete',
    //     path: '/activity/delete',
    //     component: () =>
    //         import ('@/views/admin/activity/delete')
    // },
    // other
    {
        name: 'mageCertificate',
        path: '/manager/certificate',
        component: () =>
            import ('@/views/admin/manageCertificate')
    },
    {
        name: 'mageCode',
        path: '/manager/code',
        component: () =>
            import ('@/views/admin/manageVipCodes')
    },
    {
        name: 'provideCert',
        path: '/provide/certificate',
        component: () =>
            import ('@/views/admin/certProvide')
    },
    {
        name: 'annualManager',
        path: '/manager/annual',
        component: () =>
            import ('@/views/admin/annualManager')
    },

]


export default admin