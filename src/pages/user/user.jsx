import React, {Component} from 'react';
import {Card, Button, Table, Modal, message} from 'antd';
import {LinkButton} from "../../components/link-button";
import {formateDate} from "../../utils/dateUtils";
import {reqUsers, reqUserDelete, reqAddOrUpdateUser} from "../../api";
import {PAGE_SIZE} from "../../config";
import AddForm from "./add-form";

class User extends Component {

    constructor(props) {
        super(props)

        this.user = null; // 保存用来修改的

        this.state = {
            users: [],
            roles: [],
            roleNames: [],
            loading: false,
            isShow: false,
        }
    }

    /*
 初始化
  */
    initColumns = () => {
        this.columns = [
            {
                title: '用户名',
                dataIndex: 'username',
            },
            {
                title: '邮箱',
                dataIndex: 'email',
            },
            {
                title: '电话',
                dataIndex: 'phone',
            },
            {
                title: '注册时间',
                dataIndex: 'create_time',
                render: formateDate
            },
            {
                title: '所属角色',
                dataIndex: 'role_id',
                render: role_id => (
                    <span>{this.roleNames[role_id]}</span>
                )
            },
            {
                title: '操作',
                render: user => (
                    <span>
                        <LinkButton onClick={() => {
                            this.user = user;
                            this.setState({isShow: true});
                        }}>修改</LinkButton>
                        <LinkButton onClick={() => this.deleteUser(user)}>删除</LinkButton>
                    </span>
                )
            },
        ]
    }

    /**
     * 获取所有用户
     */
    getUsers = async () => {
        const result = await reqUsers();
        if (result.status === 200 && result.data.status === 0) {
            message.success('获取用户列表成功');
            // console.log(result);
            const {users, roles} = result.data.data;
            this.initRoleNames(roles);
            this.setState({users, roles});
        } else {
            message.error(result.data.msg);
        }
    };

    deleteUser = user => {
        Modal.confirm(
            {
                title: `删除用户${user.username}吗?`,
                okText: '确定',
                okType: 'danger',
                okButtonProps: {
                    disabled: false,
                },
                cancelText: '取消',
                onOk: async () => {
                    const result = await reqUserDelete(user._id)
                    if (result.status === 200 && result.data.status === 0) {
                        message.success('删除成功')
                        this.getUsers();
                    }
                    else message.error('删除失败')
                },
            }
        )
    };

    /**
     * 根据role生成id和name的对象
     * 不使用map，map是生成新的数组。
     */
    initRoleNames = roles => {
        this.roleNames = roles.reduce((pre, role) => {
            pre[role._id] = role.name;
            return pre;
        }, {})
    };

    /**
     * 添加用户
     */
    addOrUpdateUser = async () => {
        const user = this.form.getFieldsValue();
        // 如果是修改
        if (this.user && this.user._id) user._id = this.user._id;
        const result = await reqAddOrUpdateUser(user);

        if (result.status === 200 && result.data.status === 0) {
            message.success(this._id ? '修改' : '添加' + '用户成功');
            this.setState({isShow: false});
            this.form.resetFields();
            this.user = null;
            this.getUsers();
        } else {
            message.error(result.data.msg);
        }
    };

    /*
    响应点击取消: 隐藏确定框
     */
    handleCancel = () => {
        // 隐藏确认框
        this.setState({
            isShow: false
        });
        this.user = null;
        // 清除输入数据
        this.form.resetFields();
    };

    UNSAFE_componentWillMount() {
        this.initColumns();
    }

    componentDidMount() {
        this.getUsers();
    }

    render() {
        const {users, roles, loading, isShow} = this.state;

        const title = <Button type='primary' onClick={() => this.setState({isShow: true})}>添加用户</Button>

        return (
            <Card title={title}>
                <Table
                    bordered
                    rowKey='_id'
                    loading={loading}
                    dataSource={users}
                    columns={this.columns}
                    pagination={{defaultPageSize: PAGE_SIZE, showQuickJumper: true}}
                />

                <Modal
                    title={this.user ? '修改用户' : '添加用户'}
                    visible={isShow}
                    onOk={this.addOrUpdateUser}
                    onCancel={this.handleCancel}
                >
                    <AddForm user={this.user} roles={roles} setForm={(form) => this.form = form}/>
                </Modal>
            </Card>
        );
    }
}

export default User;