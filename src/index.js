/*
* 入口js
* */

import React from 'react';
import ReactDOM from "react-dom";
// import 'antd/dist/antd.min.css';// 这里引入ant的样式

import App from "./App";
// import { userOptions } from "./utils/storageUtils";
// import memoryUtils from "./utils/memoryUtils";
//
// // 读取 store 中保存的user，再保存到内存中。
// const user = userOptions.getUser();
// memoryUtils.user = user;
// console.log('入口函数', memoryUtils);

ReactDOM.render(<App />, document.getElementById('root'))