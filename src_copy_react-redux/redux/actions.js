/*
* 包含n个用来创建action的工厂函数（action creator）
* */

import {INCREMENT, DECREMENT} from "./action-types";

/**
 * 增加
 */
export const increment = number => ({type: INCREMENT, data: number});

/**
 * 减少
 */
export const decrement = number => ({type: DECREMENT, data: number});

/**
 * 异步增加，返回的是函数
 */
export const incrementAsync = number => {
    return dispatch => {
        // 执行异步（定时器，ajax请求，promise）
        setTimeout(() => {
            // 执行完成，分发一个同步action
            dispatch(increment(number))
        }, 1000)
    }
};