/**
 * Created by WuZeHua 2020/01/12
 * some functions which can deal with data
 */
import { RSAEncrypt, AESEncrypt } from './encrypt';
import { getPubKey } from '@/api/security';
import locationOptions from '@/data/locationCascaderOptions'

/**
 * 获取省市镇三级级联选择器的数据
 */
export let locationOption = locationOptions;

/**
 * 加密数据
 * @param {String} data 需要加密的数据
 */
export async function DataEncrypt(value) {
    let { data: ret } = await getPubKey();
    let randomString = RandomString(16);
    console.log("randomString: ", randomString);
    const key = RSAEncrypt(randomString, ret.data);
    // console.log(randomString, ' : ', key);

    const retData = AESEncrypt(JSON.stringify(value), randomString);
    console.log("retdata: ", retData);
    console.log("key: ", key);
    return {
        "data": retData,
        "key": key,
    };
    // return {
    //     data: "2/UiHhbHRk1dlrh3OTmwjDSRvB/157wTQ5OCuakpKpVWv7sqDgvNJdgJ9HOCtY08pgT8F0Jlt8I9y/xAR89Un/wjzOH0R8/9HtyyuQIpsiD+ppHGXJjz4qxJYc84o+4YnDLK/6gn1Y4W3M9/i/9g7w==",
    //     key: "MCcITfklJXPAHQFC+fvKpaWJrCSnrzClyVrPfOdxX/AiDBXS1xGLP26EUjnw0Q514azJq+OgbolWiHpeRoAVgAE1ykxLWknRieHDqCiXk7NyCwTojDArkDgempYpZj3e14SqdmxcxbfMDLfnDIizfl7Fy/aJhexQPYIHbU79nhU=",
    // }
}

/**
 * 获取随机字符串，用以AES加密, len => length
 * @param {int} length 随机字符串的长度
 */
export function RandomString(length) {
    let str = '0123456789abcdefghijklmnopqrstuvwxzyABCDEFGHIJKLMNOPQRSTUVWXYZ-_';
    let result = '';
    for (let i = length; i > 0; --i) {
        result += str[Math.floor(Math.random() * str.length)];
    }
    return result;
}

/**
 * 根据生日计算年龄 
 * @param {*} str 
 */
export function computAge(data) {
    let birthY = parseInt(data.slice(0, 4));
    let birthM = parseInt(data.slice(5, 7));
    let birthD = parseInt(data.slice(8, 10));

    let now = new Date();
    let nowY = now.getFullYear();
    let nowM = now.getMonth() + 1;
    let nowD = now.getDate();

    let age = nowY - birthY;
    if (nowM < birthM) age--;
    else if (nowM == birthM && nowD < birthD) age--;
    console.log(age);
    return age;
}