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
*
* - jsonp功能：
	- 1、用来解决ajax的跨域请求问题。只能使用“GET”请求。
	- 2、本质是一般的get请求，不是ajax请求。
	- 3、基本原理：
			- 浏览器端：
				动态生成script请求后台接口（src就是接口的url）。
				定义好用于接收响应数据的函数（fn），并且将函数名通过请求参数提交到服务端。
			- 服务器端：
				接收到请求处理产生结果数据后，返回一个函数调用的js代码，并且将结果数据作为实参传入函数调用。
			- 浏览器端：
				收到响应自动执行函数调用的js代码，也就执行了提前定义好的回调函数，并且得到需要的结果数据。
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