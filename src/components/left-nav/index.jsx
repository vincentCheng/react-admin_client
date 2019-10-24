import React, {Component} from 'react';
import logo from "../../assets/images/logo.png";
import './index.less';
import {Link} from "react-router-dom";
import {Menu, Icon} from 'antd';
import {menuConfig} from "../../config/menuConfig";

const {SubMenu} = Menu;

class Index extends Component {
    /**
     * 根据menu的数据生成对应的标签
     *
     * 使用map+递归调用
     * @param menuList
     */
    static getMenuNodes(menuList) {
        return menuList.map(item => {
            if (!item.children) {
                return (
                    <Menu.Item key={item.key}>
                        <Link to={item.key}>
                            <Icon type={item.icon}/>
                            <span>{item.title}</span>
                        </Link>
                    </Menu.Item>
                )
            }

            // 如果有子元素
            // 循环使用，继续生成子元素
            return (
                <SubMenu
                    key={item.key}
                    title={
                        <span>
								<Icon type={item.icon}/>
								<span>{item.title}</span>
							</span>
                    }
                >
                    {Index.getMenuNodes(item.children)}
                </SubMenu>
            )
        })
    }

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
                    {Index.getMenuNodes(menuConfig)}
                </Menu>
            </div>
        );
    }

}

export default Index;