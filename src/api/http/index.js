import axios from "axios";
import cookie from "react-cookies";
import { createBrowserHistory } from 'history'


let history = createBrowserHistory()


axios.defaults.timeout = 100000;
axios.defaults.baseURL = process.env.REACT_APP_BACKEND_URL;
// axios.defaults.baseURL = "http://localhost:8080";
// axios.defaults.baseURL = "http://49.234.223.32:8080";
// axios.defaults.baseURL = "http://asa-zhang.top:8080";


/**
 * http request 拦截器
 */
axios.interceptors.request.use(
    (config) => {
        config.data = JSON.stringify(config.data);

        // console.log(cookie.load('token'))

        config.headers = {
            // "Content-Type": "multipart/form-data",

            "Content-Type": "application/json",
            "Authorization": cookie.load('token')
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

/**
 * http response 拦截器
 */
axios.interceptors.response.use(
    (response) => {

        // console.log("http response 拦截器")
        // console.log(response)

        if (response.data.error_code === 2000) {
            history.push('/login')
            history.go(0)
            console.log("过期");
        }
        return response;
    },
    (error) => {
        console.log("请求出错：", error);
    }
);

/**
 * 封装get方法
 * @param url  请求url
 * @param params  请求参数
 * @returns {Promise}
 */
export function get(url, params = {}) {
    return new Promise((resolve, reject) => {
        axios.get(url, {
            params: params,
        }).then((response) => {
            landing(url, params, response.data);
            resolve(response.data);
        })
            .catch((error) => {
                reject(error);
            });
    });
}

/**
 * 封装post请求
 * @param url
 * @param data
 * @returns {Promise}
 */

export function post(url, data) {
    return new Promise((resolve, reject) => {
        axios.post(url, data).then(
            (response) => {
                //关闭进度条
                resolve(response.data);
            },
            (err) => {
                reject(err);
            }
        );
    });
}


/**
 * 封装post请求
 * @param url
 * @param data
 * @returns {Promise}
 */
 export function postByFile(url2, data2) {
    return new Promise((resolve, reject) => {
        console.log(url2, data2);
        
        axios({
            method: 'post',
            url: url2,
            data: data2,
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).then(
            (response) => {
                //关闭进度条
                resolve(response.data);
            },
            (err) => {
                reject(err);
            }
        );
    });
}


/**
 * 封装patch请求
 * @param url
 * @param data
 * @returns {Promise}
 */
export function patch(url, data = {}) {
    return new Promise((resolve, reject) => {
        axios.patch(url, data).then(
            (response) => {
                resolve(response.data);
            },
            (err) => {
                msag(err);
                reject(err);
            }
        );
    });
}


/**
 * 封装put请求
 * @param url
 * @param data
 * @returns {Promise}
 */
export function put(url, data = {}) {
    return new Promise((resolve, reject) => {
        axios.put(url, data).then(
            (response) => {
                resolve(response.data);
            },
            (err) => {
                msag(err);
                reject(err);
            }
        );
    });
}


/**
 * 封装delete请求
 * @param url
 * @param data
 * @returns {Promise}
 */
export function Delete(url, data = {}) {
    return new Promise((resolve, reject) => {
        axios.delete(url, data).then(
            (response) => {
                resolve(response.data);
            },
            (err) => {
                msag(err);
                reject(err);
            }
        );
    });
}




//统一接口处理，返回数据
// eslint-disable-next-line import/no-anonymous-default-export
export default function (fecth, url, param) {
    let _data = "";
    return new Promise((resolve, reject) => {
        switch (fecth) {
            case "get":
                get(url, param)
                    .then(function (response) {
                        resolve(response);
                    })
                    .catch(function (error) {
                        console.log("get request GET failed.", error);
                        reject(error);
                    });
                break;
            case "post":
                post(url, param)
                    .then(function (response) {
                        resolve(response);
                    })
                    .catch(function (error) {
                        console.log("get request POST failed.", error);
                        reject(error);
                    });
                break;
            case "put":
                console.log("begin a get request,and url:", url);
                put(url, param)
                    .then(function (response) {
                        resolve(response);
                    })
                    .catch(function (error) {
                        console.log("get request POST failed.", error);
                        reject(error);
                    });
                break;
            case "delete":
                Delete(url, param)
                    .then(function (response) {
                        resolve(response);
                    })
                    .catch(function (error) {
                        console.log("get request POST failed.", error);
                        reject(error);
                    });
                break;

            case "postByFile":
                postByFile(url, param)
                .then(function (response) {
                    resolve(response);
                })
                .catch(function (error) {
                    console.log("get request POSTByFile failed.", error);
                    reject(error);
                });
            default:
                break;
        }
    });
}

//失败提示
function msag(err) {
    if (err && err.response) {
        switch (err.response.status) {
            case 400:
                alert(err.response.data.error.details);
                break;
            case 401:
                alert("未授权，请登录");
                break;

            case 403:
                alert("拒绝访问");
                break;

            case 404:
                alert("请求地址出错");
                break;

            case 408:
                alert("请求超时");
                break;

            case 500:
                alert("服务器内部错误");
                break;

            case 501:
                alert("服务未实现");
                break;

            case 502:
                alert("网关错误");
                break;

            case 503:
                alert("服务不可用");
                break;

            case 504:
                alert("网关超时");
                break;

            case 505:
                alert("HTTP版本不受支持");
                break;
            default:
        }
    }
}

/**
 * 查看返回的数据
 * @param url
 * @param params
 * @param data
 */
function landing(url, params, data) {
    if (data.code === -1) {
    }
}



