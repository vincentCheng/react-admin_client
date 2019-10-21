import ajax from "ajax";
import {ReqType as reqType} from "config";

/**
 * 登录
 * 这里的箭头后面不要写“{}”，如果写了就要写“return”。
 */
export const regLogin = (username, password) => ajax('/login', {username, password}, reqType.POST)

/**
 * 添加用户
 */
export const regAddUser = (username, password, phone='', email='', role_id='') => ajax('/manage/user/add', {username, password, phone, email, role_id}, reqType.POST)