import React, {Component, createRef} from 'react';
import {Card, Button, Table, Modal, message} from 'antd';
import {PAGE_SIZE} from "../../config";
import {reqRoles, reqAddRoles, reqUpdateRole} from "../../api";
import AddForm from "../role/add-form";
import AuthForm from "../role/auth-form";
import {formateDate} from "../../utils/dateUtils";
import {userOptions} from "../../utils/storageUtils";

class Role extends Component {
    constructor(props) {
        super(props);

        this.authForm = createRef();
        this.state = {
            roles: [], // 所有角色的列表
            role: {}, // 选中的role
            isShowAdd: false,
            isShowAuth: false
        };
    }

    /**
     * 初始化列
     */
    initColumn = () => {
        this.columns = [
            {
                title: '角色名称',
                dataIndex: 'name',
            },
            {
                title: '创建时间',
                dataIndex: 'create_time',
                render: create_time => formateDate(create_time)
            },
            {
                title: '授权时间',
                dataIndex: 'auth_time',
                render: formateDate
            },
            {
                title: '授权人',
                dataIndex: 'auth_name',
            }
        ]
    };

    /**
     * 获取角色列表
     */
    getRoles = async () => {
        const result = await reqRoles();
        if (result.status === 200 && result.data.status === 0)
            this.setState({roles: result.data.data});
    };

    /**
     * 点击行
     * @param record 点击当前行的所有属性
     */
    onRow = record => {
        return {
            // 点击当前行的回调函数，将当前行信息传入“选中角色”中.
            onClick: event => this.setState({role: record})
        };
    };

    /**
     * 创建角色
     */
    addRole = () => {
        this.form.validateFields(async (err, values) => {
            if (err) {
                message.error(err);
                return null;
            }
            // 收集输入数据
            const {name} = values;

            // 清除model的缓存
            this.form.resetFields();

            // 请求添加
            const result = await reqAddRoles(name);

            // 根据结果提示/更新列表显示
            if (result.status === 200 && result.data.status === 0) {
                message.success('创建角色成功')
                // await this.getRoles(); // 这里不用再获取了

                // let {roles} = this.state; // react 中建议不要这样更新state中的数据

                // 建议使用这种方法
                // let roles = [...this.state.roles];
                // roles.push(result.data.data);
                // this.setState({roles});

                // 最推荐的方法
                // 基于原本状态更新
                this.setState(state => ({
                    roles: [...state.roles, result.data.data]
                }))
            } else {
                message.error('创建角色失败')
            }

            this.setState({isShowAdd: false});
        })
    };

    /**
     * 更新角色
     */
    updateRole = async () => {
        // 这个role已经包含了所有的数据
        const {role} = this.state;
        role.menus = this.authForm.current.getMenus();

        const result = await reqUpdateRole(role);

        if (result.status === 200 && result.data.status === 0) {
            // 如果当前更新的是自己角色的权限，强制退出
            if (role._id === userOptions.getUser().data.role_id) {
                userOptions.removeUser();
                this.props.history.replace('login');
            } else {
                message.success('更新角色权限成功')
                // 这里记得重新获取
                // this.getRoles();

                // 还有另一个方法
                // 这里虽然更新了roles，但是还是能够更新role，role是roles的浅拷贝。
                this.setState(state => ({
                    roles: [...state.roles, result.data.data]
                }))
            }
        } else {
            message.error(result.data.msg)
        }
    };

    UNSAFE_componentWillMount() {
        this.initColumn();
    }

    componentDidMount() {
        this.getRoles();
    }

    render() {
        const {roles, role, isShowAdd, isShowAuth} = this.state;

        const title = (<span>
            <Button type='primary' onClick={() => this.setState({isShowAdd: true})}>创建角色</Button>
            &nbsp;&nbsp;&nbsp;
            <Button type='primary' onClick={() => this.setState({isShowAuth: true})}
                    disabled={!role._id}>设置角色权限</Button>
        </span>);

        return (
            <Card title={title}>
                <Table
                    bordered
                    rowKey='_id'
                    dataSource={roles}
                    columns={this.columns}
                    pagination={{defaultPageSize: PAGE_SIZE}}
                    rowSelection={{
                        type: 'radio',
                        selectedRowKeys: [role._id],
                        onSelect: role => this.setState({role})
                    }}
                    onRow={this.onRow}
                />
                <Modal
                    title="添加角色"
                    visible={isShowAdd}
                    onOk={this.addRole}
                    onCancel={() => {
                        this.setState({isShowAdd: false});
                        this.form.resetFields();
                    }}
                >
                    <AddForm
                        setForm={form => this.form = form}
                    />
                </Modal>
                <Modal
                    title="设置角色权限"
                    visible={isShowAuth}
                    onOk={() => {
                        this.updateRole();
                        this.setState({isShowAuth: false});
                    }}
                    onCancel={() => {
                        this.setState({isShowAuth: false});
                    }}
                >
                    <AuthForm
                        role={role}
                        ref={this.authForm}
                    />
                </Modal>
            </Card>
        );
    }
}

export default Role;