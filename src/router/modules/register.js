// register
let register = {
    name: 'register',
    path: '/register',
    component: () => import('@/views/register'),
    redirect: "/register/user",
    children: [
        // 个人用户注册
        { name: 'userregister', path: '/register/user', component: () => import('@/views/register/user') },
        { name: 'userregisternext', path: '/register/user/next', component: () => import('@/views/register/user/next') },
        // 团体注册
        { name: 'companyregister', path: '/register/group', component: () => import('@/views/register/group') },
        { name: 'companyregisternext', path: '/register/company/next', 
            component: () => import('@/views/register/group/next/company') },
        { name: 'companyregisterfinal', path: '/register/company/final', component: () => import('@/views/register/group/final/company') },
        { name: 'clubregisternext', path: '/register/club/next', component: () => import('@/views/register/group/next/club') },
        { name: 'clubregisterfinal', path: '/register/club/final', component: () => import('@/views/register/group/final/club') },
    ]
}


export default register