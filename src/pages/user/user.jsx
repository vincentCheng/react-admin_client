import React, {Component} from 'react';
import {Card, Button, Table, Modal, message} from 'antd';
import {LinkButton} from "../../components/link-button";
import {formateDate} from "../../utils/dateUtils";
import {reqUsers} from "../../api";
import {PAGE_SIZE} from "../../config";

class User extends Component {

    constructor(props) {
        super(props)

        this.state = {
            users: [],
            roles: [],
            roleNames: [],
            loading: false,
            isShow: false
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
                render: (user) => (
                    <span>
                        <LinkButton>修改</LinkButton>
                        <LinkButton>删除</LinkButton>
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
    addOrUpdateUser = () => {

    };

    /*
    响应点击取消: 隐藏确定框
     */
    handleCancel = () => {
        // 清除输入数据
        // this.form.resetFields()
        // 隐藏确认框
        this.setState({
            isShow: false
        })
    }

    UNSAFE_componentWillMount() {
        this.initColumns();
    }

    componentDidMount() {
        this.getUsers();
    }

    render() {
        const {users, loading, isShow} = this.state;

        const title = <Button type='primary'>创建用户</Button>

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
                    title="添加用户"
                    visible={isShow}
                    onOk={this.addOrUpdateUser}
                    onCancel={this.handleCancel}
                >
                    添加/更新界面
                </Modal>
            </Card>
        );
    }
}

export default User;