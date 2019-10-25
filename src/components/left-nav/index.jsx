import React, {Component} from 'react';
import logo from "../../assets/images/logo.png";
import './index.less';
import {Link, withRouter} from "react-router-dom";
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
    getMenuNodes_map = (menuList) => {
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
                    {this.getMenuNodes_map(item.children)}
                </SubMenu>
            )
        })
    };

    /**
     * 累计累加
     *
     * pre是“上一个”的意思，先往pre中添加数据。完成之后再向第二个参数“[]”添加pre的数据。
     * 记得最后一定要
     * return pre
     * @param menuList
     */
    getMenuNodes_reduce = (menuList) => {
        let path = this.props.location.pathname;

        return menuList.reduce((pre, item) => {
            if (!item.children) {
                pre.push((
                    <Menu.Item key={item.key}>
                        <Link to={item.key}>
                            <Icon type={item.icon}/>
                            <span>{item.title}</span>
                        </Link>
                    </Menu.Item>
                ))
            }
            else {
                let cItem = item.children.find(e => e.key === path);
                if (cItem) {
                    this.openKey = item.key;
                }

                pre.push((
                    <SubMenu
                        key={item.key}
                        title={
                            <span>
								<Icon type={item.icon}/>
								<span>{item.title}</span>
							</span>
                        }
                    >
                        {this.getMenuNodes_reduce(item.children)}
                    </SubMenu>
                ))
            }
            return pre;
        }, [])
    };

    /**
     * 在第一次render()之前执行一次
     * 为第一个render()同步准备数据
     */
    UNSAFE_componentWillMount() {
        // 在这里先计算，并且记录要打开的子选项
        this.menuNodes = this.getMenuNodes_reduce(menuConfig)
    }

    render() {
        let path = this.props.location.pathname;
        // 需要打开菜单项的key
        let openKey = this.openKey;

        return (
            <div className='left-nav'>
                <Link to='/home' className='left-nav-header '>
                    <img src={logo} alt="logo"/>
                    <h1>硅谷后台</h1>
                </Link>
                <Menu
                    mode="inline"
                    theme="dark"
                    selectedKeys={[path]}
                    defaultOpenKeys={[openKey]}
                >
                    {this.menuNodes}
                </Menu>
            </div>
        );
    }
}

/*
* withRouter 高阶组件：
* 包装非路由组件，返回一个新的组件
* 新的组件向非路由组件传递props的三个属性。
* history/location/match
* */
export default withRouter(Index);