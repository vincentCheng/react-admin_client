/*
* 包含多个action creator函数的模块
* 同步action：返回对象{type:'xxx', data:数据值}
* 异步action：返回函数dispatch => {}
* */

import {
    SET_HEAD_TITLE,
    RECEIVE_USER,
    SHOW_ERROR_MSG
} from "./action-types";
import {reqLogin} from "../api";
import {userOptions} from "../utils/storageUtils";

/**
 * 设置头部标题的同步action
 */
export const setHeadTitle = headTitle => ({type: SET_HEAD_TITLE, data: headTitle});

/**
 * 接收用户的同步action
 */
export const receiveUser = (user = null) => ({type: RECEIVE_USER, user});

/**
 * 显示错误信息的同步action
 */
export const showErrorMsg = errorMsg => ({type: SHOW_ERROR_MSG, errorMsg});

/**
 * 登陆的异步action
 */
export const login = (username, password) => {
    return async dispatch => {
        // 1 执行异步ajax请求
        const result = await reqLogin(username, password);
        // 2.1 如果成功了，分发成功的同步action
        if (result.status === 200 && result.data.status === 0) {
            const user = result.data;
            // 保存到local中
            userOptions.setUser(user);
            // 分发接收用户的同步action
            dispatch(receiveUser(user));
        }
        // 2.2 如果失败了，分发失败的同步action
        else {
            const {msg} = result.data;
            // message.error(result.data.msg)
            dispatch(showErrorMsg(msg));
        }
    };
};