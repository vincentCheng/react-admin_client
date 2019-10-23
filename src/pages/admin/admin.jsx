import React, { Component } from 'react';
import memoryUtils from "../../utils/memoryUtils";
import { Redirect } from "react-router-dom";
// import { userOptions } from "../../utils/storageUtils";
import { Layout } from 'antd';
import LeftNav from "../../components/left-nav";
import Header from "../../components/header";

/**
 * 后台管理的路由组件
 */
class Admin extends Component {
	render() {
		let user = memoryUtils.user
		// let user = userOptions.getUser();
		let { Footer, Sider, Content } = Layout;

		if (!user) {
			return <Redirect to='/login' />
		} else {
			return (

				<Layout style={{ height: "100%" }}>
					<Sider>
                        <LeftNav/>
                    </Sider>
					<Layout>
						<Header/>
						<Content style={{background: "white"}}>Content</Content>
						<Footer style={{textAlign:"center", color:"grey"}}>这是底部</Footer>
					</Layout>
				</Layout>
			);
		}
	}
}

export default Admin;

{/* <div>
					用户名: {user.data.username}
				</div> */}