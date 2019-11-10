/*
* reducer 函数模块：根据当前state和指定的action返回一个新的state
* */
import {combineReducers} from "redux";
import {INCREMENT, DECREMENT} from "./action-types";

/**
 * 管理状态：count
 */
const count = (state = 1, action) => {
    let result;

    // console.log('count()', state, action);

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

const initUser = {};
/**
 * 管理user装填数据
 * @param state
 * @param action
 */
const user = (state = initUser, action) => {
    return state;
};

/**
 * 接收包含所有reducer函数的对象，返回一个新的reducer函数。
 * 总的reducer函数管理的state的结构
 * {
 *     count: 2,
 *     user: {}
 * }
 */
export default  combineReducers({
    count,
    user
})