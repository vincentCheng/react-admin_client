/*
* reducer 函数模块：根据当前state和指定的action返回一个新的state
* */

import {INCREMENT, DECREMENT} from "./action-types";
// import {combineReducers} from "redux";
import {combineReducers} from "../lib/redux";

/**
 * 管理状态：count
 */
// export const count = (state = 1, action) => {
const count = (state = 1, action) => {
    let result;

    console.log('count()', state, action);

    switch (action.type) {
        case INCREMENT:
            result = state + action.data;
            break;
        case DECREMENT:
            result = state - action.data;
            break;
        default:
            result = state;
            break;
    }
    return result;
};

/**
 * 管理用户信息的reducer函数
 */
const user = (state = {}, action) => {
    switch (action.type) {
        default:
            return state;
    }
};

/**
 * 返回一个整合后的reducer
 * 管理总的状态
 * 总的状态：
 * {count:1,user:{}}
 */
 export default combineReducers ({
    count,
    user
});