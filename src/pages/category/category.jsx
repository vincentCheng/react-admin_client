import React, {Component} from 'react';
import {Card, Table, Button, Icon} from "antd";
import {categoryTitle} from "../../config";
import {LinkButton} from "../../components/link-button";
import "./category.less";

class Category extends Component {
    render() {
        const extra = (
            <Button type='primary'>
                <Icon type='plus'/>
                添加
            </Button>
        );
        const dataSource = [
            {
                key: '_id',
                name: '胡彦斌',
                age: 32,
                action: '西湖区湖底公园1号',
            },
        ];

        // 服务器返回的数据
        const data = [
            {
                "parentId": "0",
                "_id": "5db3b39b7afdcd2b78abd8ad",
                "name": "家用电器"
            },
            {
                "parentId": "0",
                "_id": "5db3b3d7b8259f2b780284e0",
                "name": "电脑"
            },
            {
                "parentId": "0",
                "_id": "5db3b3e0b8259f2b780284e1",
                "name": "图书"
            }
        ]

        const columns = [
            {
                title: '分类名称',
                dataIndex: 'name',
            },
            {
                title: '操作',
                dataIndex: 'action',
                key: 'action',
                width: 300,
                render: () => (
                    <span>
                        <LinkButton>修改分类</LinkButton>
                        <LinkButton>查看子分类</LinkButton>
                    </span>
                ),
                align: 'center'
            },
        ];
        /**
         * 这里的Card没有设定宽度能够自动100%
         * rowKey = '_id' 表示指定服务器返回的数据中"_id"作为key
         */
        return (
            <Card title={categoryTitle} extra={extra}>
                <Table
                    bordered
                    rowKey='_id'
                    dataSource={data}
                    columns={columns}/>;
            </Card>
        );
    }
}

export default Category;