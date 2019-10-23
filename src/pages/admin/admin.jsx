import React, {Component} from 'react';
import {Layout} from 'antd';
import memoryUtils from "../../utils/memoryUtils";
// import { userOptions } from "../../utils/storageUtils";
import LeftNav from "../../components/left-nav";
import Header from "../../components/header";
import {Switch, Route, Redirect} from "react-router-dom";

import Home from "../home/home";
import Category from "../category/category";
import Product from "../product/product";
import Role from "../role/role";
import User from "../user/user";
import Bar from "../charts/bar";
import Line from "../charts/line";
import Pie from "../charts/pie";

const {Footer, Sider, Content} = Layout;

/**
 * 后台管理的路由组件
 */
class Admin extends Component {
    render() {
        let user = memoryUtils.user
        // let user = userOptions.getUser();

        if (!user) {
            return <Redirect to='/login'/>
        }

        return (
            <Layout style={{minHeight: "100%"}}>
                <Sider>
                    <LeftNav/>
                </Sider>
                <Layout>
                    <Header/>
                    <Content style={{background: "white"}}>
                        <Switch>
                            <Route path='/home' component={Home}/>
                            <Route path='/category' component={Category}/>
                            <Route path='/product' component={Product}/>
                            <Route path='/user' component={User}/>
                            <Route path='/role' component={Role}/>
                            <Route path="/charts/bar" component={Bar}/>
                            <Route path="/charts/pie" component={Pie}/>
                            <Route path="/charts/line" component={Line}/>
                            <Redirect to="/home"/>
                        </Switch>
                    </Content>
                    <Footer style={{textAlign: "center", color: "grey"}}>这是底部</Footer>
                </Layout>
            </Layout>
        );
    }
}

export default Admin;