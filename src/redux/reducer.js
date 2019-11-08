/*
* reducer 函数模块：根据当前state和指定的action返回一个新的state
* */

import {INCREMENT, DECREMENT} from "./action-types";

/**
 * 管理状态：count
 */
export default (state = 1, action) => {
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