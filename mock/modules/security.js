/**
 * Created by WuZeHua 2020/01/12
 */

const baseURL = 'http://myapi/';

// OK return
const YES = {
    code: 200,
    msg: '',
}

// ERROR return
const NO = {
    code: 400,
    msg: 'error',
}

const PUBLIC_KEY = '-----BEGIN PUBLIC KEY-----MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQC1oPuxYfS5CujWctjzQSuGo/vYSDMscoPhWv7JV4LDdjoMjcPQI1IMSDoBJdO0ZlKdK03Hn4IOfTrcHmAxDSUA07aNaFWccKoAPOQ6BAg3khtLgBDsx39Axk6fpsIhnfyHFSUe9a5CIErfp3HDwZIQW8Lsv/mQyLq//EjskXZNhwIDAQAB-----END PUBLIC KEY-----'

let mocks = [
    {
        url: baseURL + 'key/public',
        method: 'get',
        fn: () => {
            return {
                ...YES,
                data: PUBLIC_KEY,
            }
        }
    }
]

export default [mocks]