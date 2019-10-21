/*
* 能发送异步ajax请求的函数模块
* 封装axios库
* 函数的返回值是promise对象
* */

import {BaseUrl, ReqType} from "./config";
import axios from "axios";

export function ajax(url, data = {}, type = ReqType.GET) {
    url = BaseUrl + url

    if (ReqType.GET === type) {
        return axios.get(url, {
            params: data
        })
    } else {
        return axios.post(url, data)
    }
}