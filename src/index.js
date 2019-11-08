/*
* 入口js
* */

import React from 'react';
import ReactDOM from "react-dom";
import store from "./redux/store";
import App from "./App";

ReactDOM.render(<App store={store}/>, document.getElementById('root'))

// store绑定状态更新的监听
store.subscribe(() => { // store 内部的状态数据发生改变的回调
    // 重新渲染APP组件标签
    ReactDOM.render(<App store={store}/>, document.getElementById('root'))
})