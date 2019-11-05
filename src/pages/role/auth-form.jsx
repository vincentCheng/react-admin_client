import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Form, Input, Tree} from "antd";
import {menuConfig} from "../../config/menuConfig";

const Item = Form.Item;
const {TreeNode} = Tree;

class AuthForm extends Component {
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

    render() {
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