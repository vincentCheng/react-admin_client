import React, {Component} from 'react';
import logo from "../../assets/images/logo.png";
import './index.less';
import {Link} from "react-router-dom";
import {Menu, Icon} from 'antd';

const {SubMenu} = Menu;

class Index extends Component {
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
                    <Menu.Item key="/home">
                        <Link to='/home'>
                            <Icon type="pie-chart"/>
                            <span>首页</span>
                        </Link>
                    </Menu.Item>

                    <SubMenu
                        key="goods"
                        title={
                            <span>
								<Icon type="mail"/>
								<span>商品</span>
							</span>
                        }
                    >
                        <Menu.Item key="/category">
                            <Link to='/category'>
								<span>
									<Icon type="mail"/>
									<span>品类管理</span>
								</span>
                            </Link>
                        </Menu.Item>
                        <Menu.Item key="/product"><span>
                            <Link to='/product'>
								<span>
									<Icon type="mail"/>
									<span>商品管理</span>
								</span>
							</Link>
						</span>
                        </Menu.Item>
                    </SubMenu>

                    <Menu.Item key="/user">
                        <Link to='/user'>
								<span>
									<Icon type="pie-chart"/>
									<span>用户管理</span>
								</span>
                        </Link>
                    </Menu.Item>

                    <Menu.Item key="/role">
                        <Link to='/role'>
								<span>
									<Icon type="pie-chart"/>
									<span>角色管理</span>
								</span>
                        </Link>
                    </Menu.Item>
                </Menu>

            </div>
        );
    }
}

export default Index;