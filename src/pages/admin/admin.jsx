import React, { Component } from 'react';
import memoryUtils from "../../utils/memoryUtils";
import { Redirect } from "react-router-dom";
// import { userOptions } from "../../utils/storageUtils";

/**
 * 后台管理的路由组件
 */
class Admin extends Component {
	render() {
		let user = memoryUtils.user
		// let user = userOptions.getUser();

		if (!user) {
			return <Redirect to='/login' />
		} else {
			return (
				<div>
					用户名: {user.data.username}
				</div>
			);
		}
	}
}

export default Admin;