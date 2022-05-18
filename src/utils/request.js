import axios from 'axios'
// 导入nprogress包对应的js和css
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import store from '@/store'
import { Message, MessageBox } from 'element-ui';

/*
 * URLs
 * development URL
 * serve URL
 */

//'http://124.220.203.26:8090' ;'http://81.68.154.123:8090/'///测试用url
const devURL = 'http://myapi/ ';
export const testURL =  'http://106.13.40.7:9003/' // 开发用url
// export const serveURL = 'http://218.94.50.237:28190/'



// create axios instance
const request = axios.create({
    // baseURL: serveURL, // url = base url + request url
    baseURL: testURL,
    // withCredentials: true, // send cookies when cross-domain requests
    timeout: 20000 // request timeout
});

// axios配置
// 在request拦截器中，展示进度条 NProgress.start()
request.interceptors.request.use(config => {
    NProgress.start();
    // console.log("token:", store.getters.token);
    config.headers["token"] = store.getters.token;
    return config
})


request.interceptors.response.use(config => {
    // 在response拦截器中，隐藏进度条 NProgress.done()
    NProgress.done();

    return config;
}, err => {
    console.log(err)
    window.localStorage.clear();
    if (err.response.status == 401) {
        MessageBox.alert('登录超时，请重新登录', '提示', {
            confirmButtonText: '确定',
            callback: action => {
                location.reload();
            }
        });


        // Message.warning('登陆超时，请重新登录！')
    }
})


export default request