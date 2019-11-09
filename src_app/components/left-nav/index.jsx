import React, {Component} from 'react';
import {Link, withRouter} from "react-router-dom";
import {Menu, Icon} from 'antd';
import {connect} from "react-redux";

import logo from "../../assets/images/logo.png";
import './index.less';
import {menuConfig} from "../../config/menuConfig";
import {userOptions} from "../../utils/storageUtils";
import {setHeadTitle} from "../../redux/actions";

const {SubMenu} = Menu;

class Index extends Component {

    /**
     * 权限验证
     */
    hasAuth = item => {
        const {data} = userOptions.getUser();
        const {menus} = data.role;
        const {username} = data;

        /*
        * 1、如果是admin
        * 2、如果是公开项
        * 3、如果当前项的key在menus中存在
        * 4、如果有children，并且children中的key在menus中，那么当前项就有权限。
        * */
        return ('admin' === username)
            || (item.isPublic)
            || (menus.indexOf(item.key) >= 0)
            || (item.children && (item.children.find(child => menus.indexOf(child.key) >= 0)));
    };

    /**
     * 根据当前账号的角色权限，过滤menuConfig
     * 这个方法作废
     */
    initMenuConfig = menuConfig => {
        const {data} = userOptions.getUser();
        const {menus} = data.role;
        return menuConfig.reduce((pre, item) => {
            if (item.children) {
                let result = this.initMenuConfig(item.children);
                if (result.length > 0) { // 如果当前child有需要的项
                    // 连父类一起写入
                    // 注意这里一定要“深拷贝”
                    let tempItem = JSON.parse(JSON.stringify(item));
                    tempItem.children = result;
                    pre.push(tempItem);
                }
            }
            else {
                // 如果没有child，如果是公开页，并且不能和menus中的重名。比如“/home”
                // 或者menus中有这个页面。
                if ((item.isPublic && menus.indexOf(item.key) === -1)
                    || menus.find(menu => menu === item.key)) pre.push(item)
            }

            return pre;
        }, []);
    };

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
        let {pathname} = this.props.location;
        let path = pathname.indexOf('/product') === 0 ? '/product' : pathname;

        return menuList.reduce((pre, item) => {
            if (!item.children) {
                if (this.hasAuth(item)) {
                    // 如果当前的key等于路由地址，或者路由地址中包含有当前key
                    if (path === item.key || path.indexOf(item.key) === 0)
                        // 更新redux中的headTitle状态.
                        this.props.setHeadTitle(item.title);

                    pre.push((
                        <Menu.Item key={item.key}>
                            <Link to={item.key} onClick={()=>{this.props.setHeadTitle(item.title)}}>
                                <Icon type={item.icon}/>
                                <span>{item.title}</span>
                            </Link>
                        </Menu.Item>
                    ))
                }
            }
            else { // 如果有children，那么递归遍历
                if(this.hasAuth(item)){
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
            }
            return pre;
        }, [])
    };

    /**
     * 在第一次render()之前执行一次
     * 为第一个render()同步准备数据
     */
    UNSAFE_componentWillMount() {
        this.menuNodes = this.getMenuNodes_reduce(menuConfig);

        // const {username} = userOptions.getUser().data;
        //
        // if ('admin' === username) {
        //     this.menuNodes = this.getMenuNodes_reduce(menuConfig);
        // }
        // else {
        //     const tempMenuConfig = this.initMenuConfig(menuConfig);
        //     // 在这里先计算，并且记录要打开的子选项
        //     this.menuNodes = this.getMenuNodes_reduce(tempMenuConfig);
        // }
    }

    render() {
        let {pathname} = this.props.location;
        let path = pathname.indexOf('/product') === 0 ? '/product' : pathname; //说明当前请求的是商品管理或者子路由
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
// export default withRouter(Index);
export default connect(
    state => ({}),
    {setHeadTitle} // 这个是在 this.props.setHeadTitle 中读取。
)(withRouter(Index));