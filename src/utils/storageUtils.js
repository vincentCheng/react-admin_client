/*
* 存储数据
* */

import store from "store";
import { userKey } from "../config/index";

export const userOptions = {
	getUser() { return store.get(userKey) },
	setUser(value) { store.set(userKey, value) },
	removeUser() { store.remove(userKey) },
}
