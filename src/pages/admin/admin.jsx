import React, {Component} from 'react';
import {Layout} from 'antd';
import {userOptions} from "../../utils/storageUtils";
import LeftNav from "../../components/left-nav";
import Header from "../../components/header";
import {Switch, Route, Redirect} from "react-router-dom";
import "./admin.less";

import Home from "../home/home";
import Category from "../category/category";
import Product from "../product/product";
import Role from "../role/role";
import User from "../user/user";
import Bar from "../charts/bar";
import Line from "../charts/line";
import Pie from "../charts/pie";
import NotFound from "../not-found";


const {Footer, Sider, Content} = Layout;

/**
 * 后台管理的路由组件
 */
class Admin extends Component {
    render() {
        const user = userOptions.getUser();

        // 这里表示浏览器第一次登录，没有store
        if (!user) {
            return <Redirect to='/login'/>
        }

        return (
            <Layout className='first-layout'>
                <Sider>
                    <LeftNav/>
                </Sider>
                <Layout>
                    <Header/>
                    <Content className='content'>
                        <Switch>
                            {/*如果访问项目的根路径，那么转到home*/}
                            <Redirect exact from='/' to="/home"/>
                            <Route path='/home' component={Home}/>
                            <Route path='/category' component={Category}/>
                            <Route path='/product' component={Product}/>
                            <Route path='/user' component={User}/>
                            <Route path='/role' component={Role}/>
                            <Route path="/charts/bar" component={Bar}/>
                            <Route path="/charts/pie" component={Pie}/>
                            <Route path="/charts/line" component={Line}/>
                            {/*上面没有一个匹配，直接显示 not found*/}
                            <Route component={NotFound}/>
                        </Switch>
                    </Content>
                    <Footer>这是底部</Footer>
                </Layout>
            </Layout>
        );
    }
}

export default Admin;