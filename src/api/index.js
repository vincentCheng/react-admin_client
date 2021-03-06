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
 * 添加/更新用户
 * user = {username, password, phone = '', email = '', role_id = ''}
 */
export const reqAddOrUpdateUser = user => ajax('/manage/user/' + (user._id ? 'update' : 'add'), {...user}, reqType.POST);

/**
 * 获取所有用户列表
 */
export const reqUsers = () => ajax('/manage/user/list');

/**
 * 删除用户
 */
export const reqUserDelete = userId => ajax('/manage/user/delete', {userId}, reqType.POST);

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
    let tempCity = city || '北京';
    let url = ReqWeatherUrlParts[0] + tempCity + ReqWeatherUrlParts[1];

    return new Promise((resolve, reject) => {
        jsonp(url, {}, (err, data) => {
            // console.log('jsonp()', err, data);
            if (!err && data.status === 'success') {
                let {weather_data} = data.results[0];
                let {dayPictureUrl, weather} = weather_data[0];
                resolve({dayPictureUrl, weather});
            } else {
                // console.log('失败了');s
                message.error('获取天气数据失败');
            }
        })
    });
};
/**
 * 获取一级（parentId===0）、二级(parentId!==0)分类列表
 * 这个parentId如果是'0'，必须变成数字0否则得不到数据。
 */
export const reqCategorys = (parentId = 0) => ajax('/manage/category/list', {parentId});
/**
 * 添加分类
 * @param categoryName
 * @param parentId
 */
export const reqAddCategory = (categoryName, parentId = 0) => ajax('/manage/category/add', {
    parentId,
    categoryName
}, reqType.POST);
/**
 * 更新分类
 * @param categoryName
 * @param categoryId
 */
export const reqUpdateCategory = (categoryName, categoryId) => ajax('/manage/category/update', {
    categoryName,
    categoryId
}, reqType.POST);
/**
 * 根据_id获取分类名称
 * @param categoryId
 */
export const reqCategory = categoryId => ajax('/manage/category/info', {categoryId});
/**
 * 获取商品的分页列表
 * @param pageNum 表示哪一页
 * @param pageSize 每一页显示的数据数量
 */
export const reqProducts = (pageNum = 1, pageSize = 1) => ajax('/manage/product/list', {
    pageSize,
    pageNum
});
/**
 * 搜索商品分页列表
 * @param pageNum 页码
 * @param pageSize 每页数据量
 * @param searchName 产品名/产品描述
 * @param searchType 这个的值是 productName/productDesc 。说明：让一个变量的值成为key，必须加上中括号。
 */
export const reqSearchProducts = ({pageNum, pageSize, searchName, searchType}) => ajax('/manage/product/search', {
    pageNum,
    pageSize,
    [searchType]: searchName
});
/**
 * 对商品进行上架/下架处理
 * @param productId
 * @param status
 */
export const reqUpdateStatus = (productId, status) => ajax('/manage/product/updateStatus', {
    productId,
    status
}, reqType.POST);
/**
 * 删除图片
 */
export const reqImgDelete = name => ajax('/manage/img/delete', {name}, reqType.POST);
/**
 * 添加/修改商品
 * @param product
 */
export const reqAddOrUpdateProduct = product => ajax('/manage/product/' + (product._id ? 'update' : 'add'), product, reqType.POST);
/**
 * 获取角色列表
 */
export const reqRoles = () => ajax('/manage/role/list');
/**
 * 添加角色
 * @param roleName
 */
export const reqAddRoles = roleName => ajax('/manage/role/add', {roleName}, reqType.POST);
/**
 * 更新角色(给角色设置权限)
 * @param _id
 * @param menus
 * @param auth_name
 */
// export const reqUpdateRole = (_id, menus, auth_name) => ajax('/manage/role/update', {
//     _id,
//     menus,
//     auth_name
// }, reqType.POST);
export const reqUpdateRole = role => ajax('/manage/role/update', role, reqType.POST);