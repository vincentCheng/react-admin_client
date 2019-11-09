/*
* 根据老的state和指定的action生成并且返回新的state函数
* */
import {combineReducers} from "redux";

import {userOptions} from "../utils/storageUtils";

/**
 * 管理头部标题的reducer函数
 */
const initHeadTitle = '首页';
const headTitle = (state = initHeadTitle, action) => {
    switch (action.type) {
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
        default:
            return state;
    }
};

export default combineReducers({
    headTitle,
    user
})