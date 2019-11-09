// 这是在浏览器中安装开发插件的用法
import {createStore, applyMiddleware, compose} from "redux";
import reducer from "./reducer";
import thunk from "redux-thunk"; // 异步操作插件

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// 创建store对象，第一次调用reducer，得到初始状态值(state为1)。
export default createStore(
    reducer,
    composeEnhancers(applyMiddleware(thunk))
);

// 如果网页的redux工具无法正常显示
// 再安装“redux-devtools-extension/logOnlyInProduction”
// 这是在项目中安装插件的用法
// 其实下面的方法不需要再使用

// import {createStore, applyMiddleware} from "redux";
// import reducer from "./reducer";
// import thunk from "redux-thunk"; // 异步操作插件
// import {composeWithDevTools} from 'redux-devtools-extension/logOnlyInProduction';
//
// // const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
//
// const composeEnhancers = composeWithDevTools({
//     // options like actionSanitizer, stateSanitizer
//     reducer
// });
//
// export default createStore(reducer, /* preloadedState, */ composeEnhancers(
//     applyMiddleware(thunk)
// ));