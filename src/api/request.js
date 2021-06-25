import Vue from 'vue'
import axios from 'axios'
import qs from 'qs'
import router from '../router/index'
import {isBlob} from '../utils/util'


axios.defaults.timeout = 60000
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'


// 添加请求拦截器
axios.interceptors.request.use(config => {
    // 在发送请求之前判断token是否存在
    if (!localStorage.getItem('token')) {
        config.headers['token'] = localStorage.getItem('token')
    }
    if(localStorage.getItem('token') != null){
        config.headers['token'] = localStorage.getItem('token')
    }
    return config;
}, error => {
    // 对请求错误做些什么
    return Promise.reject(error);
});

// 添加响应拦截器
let num
axios.interceptors.response.use(response => {
    // 2xx 范围内的状态码都会触发该函数。
    // 对响应数据做点什么
    return new Promise((resolve, reject) => {
        const res = response.data
        if (!num) {
            num = 0
        }
        if (res.code == 200) {
            resolve(res)
        } else if (res.code == 2 || res.code == 3) {
            if (num == 0) {
                num++
                Vue.prototype.$alert('登录信息已过期,请重新登录', '提示', {
                    confirmButtonText: '确定',
                    type: 'warning',
                    callback: function () {
                        router.replace({path: '/',})
                    }
                })
            } else if (res.code === 5) {
                Vue.prototype.$message({type: 'warning', message: res.msg})
            } else if (res.status === '200') {
                resolve(res)
            } else if (isBlob(res)) {
                resolve(res)
            } else {
                Vue.prototype.$message({type: 'error', message: res.msg, duration: 1000})
                reject(res)
            }
        } else if (res.code == 504) {
            if (num == 0) {
                num++
                Vue.prototype.$alert('您还没有登录, 请登录', '提示', {
                    confirmButtonText: '确定',
                    type: 'warning',
                    callback: function () {
                        router.replace({path: '/',})
                    }
                })
            }
        }
    });
}, error => {
    // 超出 2xx 范围的状态码都会触发该函数。
    // 对响应错误做点什么
    if (!error.response) {
        return Promise.reject(error)
    }
    const status = error.response.status
    console.log(status)
    switch (status) {
        case 500:
            console.log('服务器内部错误')
            break
        case 502:
            console.log('服务器内部错误')
            break
        case 404:
            console.log('未找到服务器')
            break
        default:
            console.log(error.response.data.message)
    }
    return Promise.reject(status ? null : error)
});


let setParams = {}
// 请求header
const header = {
    // clientIp: '11',
    // clientType: '11',
    // serialNum: ''
}
/*
get 请求
*/
export function get(url, params, response) {
    return axios.get(url, params, response)
}

// post 请求无header
export function postBase(url, params, response) {
    return axios.post(url, params, response)
}

// post 请求有header
export function post(url, params, response) {
    setParams = {
        header,
        body: params
    }
    return axios.post(url, setParams, response)
}

// post 请求FormData
export function postForm(url, params) {
    return axios.post(url, qs.stringify(params))
}

// put请求有header
export function put(url, params, response) {
    setParams = {
        header,
        body: params
    }
    return axios.put(url, setParams, response)
}

// delete请求
export function DEL(url, params) {
    return axios.detele(url, params)
}

