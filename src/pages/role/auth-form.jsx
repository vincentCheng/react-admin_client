import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {Form, Input, Tree} from "antd";
import {menuConfig} from "../../config/menuConfig";

const Item = Form.Item;
const {TreeNode} = Tree;

class AuthForm extends PureComponent {
    constructor(props) {
        super(props);

        this.treeNodes = null;
        this.state = {checkedKeys: this.props.role.menus};
    }

    /**
     * 点击选择权限
     * 注意这里要 return pre
     */
    getTreeNodes = menuList => {
        if (!menuList) return;
        return menuList.reduce((pre, item) => {
            pre.push(
                <TreeNode title={item.title} key={item.key}>
                    {
                        item.children ? this.getTreeNodes(item.children) : null
                    }
                </TreeNode>
            );
            return pre;
        }, []);
    };

    /**
     * 获取权限列表
     */
    getMenus = () => this.state.checkedKeys;

    onCheck = (checkedKeys, info) => this.setState({checkedKeys});

    UNSAFE_componentWillMount() {
        this.treeNodes = this.getTreeNodes(menuConfig);
    }

    /**
     * 需求：根据新传入的role更新checkedKeys状态。那么使用下面的方法
     * 功能：会在已挂载的组件接收新的 props 之前被调用
     *
     * 如果不这么做，那么打开“设置角色权限界面”，勾选和原来不同的权限，再点击“退出”按钮
     * 那么再次进入当前界面，会保持上一次勾选的权限。
     *
     * 原因：
     * 1、当前节点并没有从DOM中删除。构造函数只会执行一次。
     * 2、每次显示当前界面，所有的勾选权限，都是根据上一次state显示的。
     * 解决方法：
     * 1、使用下面这个生命周期，每次传入props之前，保持checkedKeys是最新的props，也就是nextProps的数据.
     */
    UNSAFE_componentWillReceiveProps(nextProps) {
        this.setState({checkedKeys: nextProps.role.menus});
    }

    render() {
        console.log('auth-form');
        const {checkedKeys} = this.state;
        const {role} = this.props;
        // 指定item布局的宽度比例
        const formItemLayout = {
            labelCol: {span: 4}, // 左侧label的宽度
            wrapperCol: {span: 20}, // 右侧的宽度
        };
        return (
            <Form {...formItemLayout}>
                <Item label='角色名称'>
                    <Input value={role.name} disabled/>
                </Item>

                <Item label='角色权限'>
                    <Tree
                        checkable
                        defaultExpandAll={true}
                        checkedKeys={checkedKeys}
                        onCheck={this.onCheck}
                    >
                        <TreeNode title="平台权限" key="all">
                            {this.treeNodes}
                        </TreeNode>
                    </Tree>
                </Item>
            </Form>
        );
    }
}

AuthForm.propTypes = {role: PropTypes.object.isRequired};

export default AuthForm;