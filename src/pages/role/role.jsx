import React, {Component} from 'react';
import {Card, Button, Table} from 'antd';
import {PAGE_SIZE} from "../../config";
import {reqRoles} from "../../api";

class Role extends Component {
    constructor(props) {
        super(props);

        this.state = {
            roles: [], // 所有角色的列表
            role: {}, // 选中的role
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
            },
            {
                title: '授权时间',
                dataIndex: 'auth_time',
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

    UNSAFE_componentWillMount() {
        this.initColumn();
    }

    componentDidMount() {
        this.getRoles();
    }

    render() {
        const {roles, role} = this.state;

        const title = (<span>
            <Button type='primary'>创建角色</Button>
            &nbsp;&nbsp;&nbsp;
            <Button type='primary' disabled={!role._id}>设置角色权限</Button>
        </span>);

        return (
            <Card title={title}>
                <Table
                    bordered
                    rowKey='_id'
                    dataSource={roles}
                    columns={this.columns}
                    pagination={{defaultPageSize: PAGE_SIZE}}
                    rowSelection={{type: 'radio', selectedRowKeys: [role._id]}}
                    onRow={this.onRow}
                />
            </Card>
        );
    }
}

export default Role;