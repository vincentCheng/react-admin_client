/*
* 能发送异步ajax请求的函数模块
* 封装axios库
* 函数的返回值是promise对象
*
* 1、优化：统一处理请求异常。
*       在外层包一个Promise对象
*       请求出错不用reject，使用错误提示。
* */

import {BaseUrl, ReqType} from "./config";
import axios from "axios";
import {message} from "antd";

export function ajax(url, data = {}, type = ReqType.GET) {
    url = BaseUrl + url

    return new Promise((resolve, reject) => {
        // 1、执行ajax请求
        let promise = ReqType.GET === type ? axios.get(url, {params: data}) : axios.post(url, data)

        // 2、成功就resolve
        // 3、 失败，不调用reject（如果调用，那么外面就会执行catch中的错误处理），显示异常信息。
        promise
            .then(response => resolve(response))
            .catch(err => message.error('错误信息:' + err.message))
    })
}