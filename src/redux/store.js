import {createStore, applyMiddleware} from "redux";
import {count} from "./reducer";
import thunk from "redux-thunk"; // 异步操作插件

const dev = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();

// 创建store对象，第一次调用reducer，得到初始状态值(state为1)。
export default createStore(
    count,
    applyMiddleware(thunk)
);