/**
 * @file 全局方法
 */

import Axios from 'axios';
import config from '@/api/config';

interface args {
    [proppName: string]: any;
}

function splitStr(str: string) {
    return str.split('|');
}

function initCgi() {
    let cgis = Object.create(null);
    for (let key in config.cgis) {
        let [hostname, api] = splitStr(config.cgis[key]);
        cgis[key] = {
            hostname,
            api
        }
    }

    return cgis;
}

const cgis = initCgi();

addTcpAndCgiToWindow('cgis', cgis);

function addTcpAndCgiToWindow(type: any, data: args) {
    let obj: any = {};
    if (!obj) {
        obj = {}
    }

    let keys = Object.keys(data);

    for (let key of keys) {
        if (obj.hasOwnProperty(key)) {
            //console.log(`${type} api ${key} 已被占用`);
        } else {
            obj[key] = data[key];
        }
    }
}

/**
 * 封装axios，以及axios mock
 */
function createAxiosInstance() {
    return {
        get: function (...args: any[]): Promise<any> {
            let name = args[0];
            let conf = args[1] || {};
            return axiosSend(name, conf, 'get');

        },
        post: function (...args: any[]): Promise<any> {
            let name = args[0];
            let data = args[1] || {};
            let conf = args[2] || {};
            conf.data = data.data;
            conf.headers = data.headers;
            return axiosSend(name, conf, 'post');
        },
        head: function () {
            let name = arguments[0];
            let conf = arguments[1] || {};
            return axiosSend(name, conf, 'head');
        },
        delete: function () {
            let name = arguments[0];
            let conf = arguments[1] || {};
            return axiosSend(name, conf, 'delete');
        },
        options: function () {
            let name = arguments[0];
            let conf = arguments[1] || {};
            return axiosSend(name, conf, 'options');
        },
        put: function () {
            let name = arguments[0];
            let data = arguments[1] || {};
            let conf = arguments[2] || {};

            conf.data = data;
            return axiosSend(name, conf, 'put');
        },
        patch: function () {
            let name = arguments[0];
            let data = arguments[1] || {};
            let conf = arguments[2] || {};

            conf.data = data;
            return axiosSend(name, conf, 'patch');
        },
    }
}

/**
 * 
 * @param {string} name cgi别名
 * @param {object} conf  axios配置
 * @param {string} method  请求方法
 */

function axiosSend(name: any, conf: args, method: string) {
    let { hostname, api } = cgis[name];
    let host = config.apiHost[hostname];
    let url = `${host}${api}`;
    let obj: any = { url, conf };
    //consoleInfo('AXIOS', method, name, obj);

    // 如果未设置请求头 则设置默认请求头 避免CORS options请求
    if (!conf.headers || !conf.headers['Content-Type']) {
        conf.headers['Content-Type'] = 'application/json'
    }

    return new Promise((resolve, reject) => {
        Axios.request({
            url,
            method,
            timeout: 10000,
            ...conf,
        }).then((resp: any) => {
            obj.res = resp.data;
            //consoleInfo('AXIOS', method, name, obj);
            resolve(resp.data);
        }).catch((err: any) => {
            obj.err = err;
            //consoleInfo('AXIOS', method, name, obj, false, false);
            reject(err);
        })
    })
}

function consoleInfo(apiType: string, method: string, name: string, res: args, mock = false, success = true) {
    if (process.env.NODE_ENV != 'development') {
        return;
    }

    let key = `------${success ? '' : 'fail'} ${mock ? 'MOCK' : ''} [${apiType}] ${method}Message [${name}] ------`;

    debugInfo(key, { ...res })

}
function debugInfo(label: string, ...args: any[]) {
    if (!console) {
        return;
    }

    console.groupCollapsed(label);

    args.forEach((item) => {
        if (typeof item === 'object' && !Array.isArray(item)) {
            Object.keys(item).forEach((key) => {
                console.log(`${key}:`, item[key]);
            })
        } else {
            console.log(item);
        }
    });

    console.groupEnd();
}

/**
 * 全局方法
 * @class 
 * @hideconstructor
 */
const requestMethods = {
    /**
     * axios封装
     */
    ...createAxiosInstance()

}

export default requestMethods;
