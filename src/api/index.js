import {ajax} from "./ajax";
import {ReqType as reqType, ReqWeatherUrlParts} from "./config";
import jsonp from "jsonp";
import {message} from "antd";

/**
 * 登录
 * 这里的箭头后面不要写“{}”，如果写了就要写“return”。
 */
export const reqLogin = (username, password) => ajax('/login', {username, password}, reqType.POST);

/**
 * 添加用户
 */
export const reqAddUser = (username, password, phone = '', email = '', role_id = '') => ajax('/manage/user/add', {
    username,
    password,
    phone,
    email,
    role_id
}, reqType.POST);

/*
* jsonp请求的接口函数
* 不能使用ajax
* 需要使用jsonp请求，这个是为了适应百度天气的连接而使用的。
* */
export const reqWeather = (city) => {
    let url = ReqWeatherUrlParts[0] + city + ReqWeatherUrlParts[1];

    return new Promise((resolve, reject) => {
        jsonp(url, {}, (err, data) => {
            console.log('jsonp()', err, data);
            if (!err && data.status === 'success') {
                let {currentCity, weather_data} = data.results[0];
                let {date, dayPictureUrl, weather} = weather_data[0];
                resolve({dayPictureUrl, weather});
            } else {
                // console.log('失败了');
                message.error('获取天气数据失败');
            }
        })
    });
};