/*
* 根据老的state和指定的action生成并且返回新的state函数
* */
import {combineReducers} from "redux";

import {userOptions} from "../utils/storageUtils";
import {
    SET_HEAD_TITLE,
    RECEIVE_USER,
    SHOW_ERROR_MSG,
    SET_HASH_ROUTE_PARAMS
} from "./action-types";

/**
 * 管理头部标题的reducer函数
 */
const initHeadTitle = '首页';
const headTitle = (state = initHeadTitle, action) => {
    switch (action.type) {
        case SET_HEAD_TITLE:
            return action.data;
        default:
            return state;
    }
};

/**
 * 管理当前登录用户的reducer函数
 */
// const initUser = userOptions.getUser().data.username;
const initUser = userOptions.getUser();
const user = (state = initUser, action) => {
    switch (action.type) {
        case RECEIVE_USER:
            return action.user;
        case SHOW_ERROR_MSG:
            const errorMsg = action.errorMsg;
            // state.errorMsg = errorMsg; // 不能这样做，不能修改原来的数据。
            return {...state, errorMsg}; // 必须这样做
        default:
            return state;
    }
};

/**
 * 哈希路由的参数
 */
// const initUser = userOptions.getUser();
const hashRouteParams = (state = {}, action) => {
    switch (action.type) {
        case SET_HASH_ROUTE_PARAMS:
            return action.hashRouteParams;
        default:
            return state;
    }
};

export default combineReducers({
    headTitle,
    user,
    hashRouteParams
})