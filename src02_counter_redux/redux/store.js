import {createStore} from "redux";
import {count} from "./reducer";

// 创建store对象，第一次调用reducer，得到初始状态值(state为1)。
export default createStore(count);