/*
* 1、使用store存储数据，这个数据要读取到内存，也就是userInfo中。
* */

import store from "store";

import {userKey} from "../config/index";

let memoryUser = null;

export const userOptions = {
    /**
     * 获取用户名字
     * let username = getUser().data.username
     * @return {null}
     */
    getUser: () => {
        // 看看store中有没有值。
        // 这么做为了防止“第一次使用当前网页”的时候，浏览器没有local store。
        const userStore = store.get(userKey) || null;
        return memoryUser = memoryUser ? memoryUser : userStore;
    },
    setUser(value) {
        store.set(userKey, value);
        memoryUser = value;
    },
    removeUser() {
        store.remove(userKey);
        memoryUser = null;
    },
};
