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
                    <Menu.Item key="1">
                        <Link to='/home'>
                            <Icon type="pie-chart"/>
                            <span>首页</span>
                        </Link>
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
                        <Menu.Item key="2">
                            <Link to='/category'>
								<span>
									<Icon type="mail"/>
									<span>品类管理</span>
								</span>
                            </Link>
                        </Menu.Item>
                        <Menu.Item key="3"><span>
                            <Link to='/product'>
								<span>
									<Icon type="mail"/>
									<span>商品管理</span>
								</span>
							</Link>
						</span>
                        </Menu.Item>
                    </SubMenu>
                </Menu>

            </div>
        );
    }
}

export default Index;