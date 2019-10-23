import React, {Component} from 'react';
import logo from "../../assets/images/logo.png";
import './index.less';
import {Link} from "react-router-dom";
import {Menu, Icon, Button} from 'antd';

const {SubMenu} = Menu;

class LeftNav extends Component {
    render() {
        return (
            <div>
                <div className='left-nav'>
                    <Link to='/home' className='left-nav-header '>
                        <img src={logo} alt="logo"/>
                        <h1>硅谷后台</h1>
                    </Link>
                </div>


                <Menu
                    mode="inline"
                    theme="dark"
                >
                    <Menu.Item key="1">
                        <Icon type="pie-chart"/>
                        <span>首页</span>
                    </Menu.Item>
                    <SubMenu
                        key="sub1"
                        title={
                            <span>
                                <Icon type="mail"/>
                                <span>商品</span>
                            </span>
                        }
                    >
                        <Menu.Item key="1">
                            <span>
                                <Icon type="mail"/>
                                <span>品类管理</span>
                            </span>
                        </Menu.Item>
                        <Menu.Item key="2"><span>
                                <Icon type="mail"/>
                                <span>商品管理</span>
                            </span>
                        </Menu.Item>
                    </SubMenu>
                </Menu>

            </div>
        );
    }
}

export default LeftNav;