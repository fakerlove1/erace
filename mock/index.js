import Mock from 'mockjs'


// import modules automatically
const mockArrNew = require.context('./modules', true, /.js$/)

// 获取引入的mock模块，分别执行Mock.mock
mockArrNew.keys().forEach(key => {
    let el = mockArrNew(key).default[0];
    el.forEach((v) => {
        Mock.mock(v.url, v.method, v.fn);
    })
})