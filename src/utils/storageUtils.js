/*
* 1、使用store存储数据，这个数据要读取到内存，也就是userInfo中。
* */

import store from "store";
import {userKey} from "../config/index";
import memoryUtils from "./memoryUtils";

// let userInfo = memoryUtils.user;
// const memoryUtils = {user:null}; // 这里真的很奇怪，这样写就会出错。换成import引入，就不会。
export const userOptions = {
    /**
     * 获取用户名字
     * let username = getUser().data.username
     * @return {null}
     */
    getUser() {
        /**
         * 为什么这里会不断的被解析?
         */
        // console.log('getUser()');
        if (!memoryUtils.user) memoryUtils.user = store.get(userKey);
        return memoryUtils.user;
    },
    setUser(value) {
        // console.log('setUser()');
        store.set(userKey, value);
        memoryUtils.user = value;
        // debugger;
    },
    removeUser() {
        // console.log('removeUser()');
        store.remove(userKey);
        memoryUtils.user = null;
    },
};
