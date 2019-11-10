/*
* 自定义redux库
*
* 主模块：
*  1、向外暴露的函数
*  createStore() 接收的参数为reducer函数，返回store“对象”。
*  combineReducers() 接收包含多个reducer方法的“对象”，返回一个新的reducer“函数”
*  applyMiddleware() 暂时不实现
*  2、store对象的内部结构
*  getState() 返回值为内部保存的state数据
*  dispatch() 参数为action对象
*  subscribe() 参数为监听内部state更新的回调函数
* */

/**
 * 根据指定的reducer函数创建一个store对象
 * @param reducer
 * @return {{getState: getState, dispatch: dispatch, subscribe: subscribe}}
 */
export const createStore = reducer => {
// export const createStore = reducer => {

    // 存储内部状态数据的变量，初始值为调用reducer函数返回的结果。
    let state = reducer(undefined, {type: '@@redux/init'});
    let listeners = [];
    /**
     * 返回当前内部的state数据
     */
    const getState = () => {
        return state;
    };

    /**
     * 分发action，触发reducer调用，产生新的state
     * @param action
     */
    const dispatch = (action) => {
        // 触发reducer调用，得到新的state
        const newState = reducer(state, action);
        // 保存新的state
        state = newState;
        // 调用所有已经存在的监视回调函数
        listeners.forEach(listener => listener());
    };

    /**
     * 绑定内部state改变的监听回调
     * @param listener
     */
    const subscribe = (listener) => {
        // 保存到缓存
        listeners.push(listener)
    };

    // 返回store对象
    return {
        getState,
        dispatch,
        subscribe
    };
};

/**
 * 接收包含多个reducer方法的“对象”，返回一个新的reducer“函数”
 * 新的reducer管理的总状态：{r1:state1, r2:state2}
 *
 * 就是返回一个对象，这个对象包含reducer.js中对外暴露的函数执行后的值+属性。
 * 这个对象叫做新的状态。
 * @param reducers
 * @return {Function}
 */
export const combineReducers = reducers => {

    // 执行reducers中每个reducer函数，得到一个新的子状态，并且封装一个对象容器。

    return (state = {}, action) => {
        const newState = Object.keys(reducers).reduce((preState, key) => {
            preState[key] = reducers[key](state[key], action);
            return preState;
        }, {});

        return newState;
    }
};