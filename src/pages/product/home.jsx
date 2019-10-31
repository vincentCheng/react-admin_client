import React, {Component} from 'react';
import {Card, Select, Input, Button, Icon, Table} from "antd";
import {LinkButton} from "../../components/link-button";

const Option = Select.Option;

const dataSource = [
    {
        key: '1',
        name: '胡彦斌',
        age: 32,
        address: '西湖区湖底公园1号',
    },
    {
        key: '2',
        name: '胡彦祖',
        age: 42,
        address: '西湖区湖底公园1号',
    },
];

class ProductHome extends Component {

    state = {
        products: [
            {
                "status": 1, // 这是状态
                "imgs": [
                    ""
                ],
                "_id": "5dbaa20495a4a93234f5eee1",
                "categoryId": "5db3c0b7024cfb10fc2f308f",
                "pCategoryId": "0",
                "name": "商品名称1",
                "desc": "商品描述1",
                "price": 100,
                "detail": "商品详情1",
                "__v": 0
            },
            {
                "status": 1,
                "imgs": [
                    ""
                ],
                "_id": "5dbaa25195a4a93234f5eee2",
                "categoryId": "5db3c0b7024cfb10fc2f308f",
                "pCategoryId": "0",
                "name": "商品名称2",
                "desc": "商品描述2",
                "price": 200,
                "detail": "商品详情2",
                "__v": 0
            }
        ], // 商品的数组
    }

    /**
     * 初始化table的列的数组
     */
    initColumns = () => {
        this.columns = [
            {
                title: '商品名称',
                dataIndex: 'name',
            },
            {
                title: '商品描述',
                dataIndex: 'desc',
            },
            {
                title: '价格',
                dataIndex: 'price', // 价格前面要加“￥”
                render: price => "￥" + price, // 这里的参数是当前行price的数据
            },
            {
                width: 100,
                title: '状态',
                dataIndex: 'status',
                render: status => {
                    return (
                        <span>
                            <span>在售</span>
                            <Button type='primary'>下架</Button>
                        </span>
                    )
                }
            },
            {
                width: 100,
                title: '操作',
                render: product => (
                    <span>
                        <LinkButton>详情</LinkButton>
                        <LinkButton>修改</LinkButton>
                    </span>
                )
            },
        ]
    };

    UNSAFE_componentWillMount() {
        this.initColumns()
    }

    render() {
        let {products, columns} = this.state;

        const title = (
            <div>
                <Select value='1'>
                    <Option value='1' key='1'>按名称搜索</Option>
                    <Option value='2' key='2'>按描述搜索</Option>
                </Select>
                <Input placeholder='关键字' style={{width: 100, margin: '0 15px'}}/>
                <Button type='primary'>搜索</Button>
            </div>
        )
        const extra = (
            <Button type='primary'>
                <Icon type='plus'/>
                添加商品
            </Button>
        )
        return (
            <Card title={title} extra={extra}>
                <Table
                    bordered
                    rowKey='_id'
                    dataSource={products}
                    columns={this.columns}
                />
            </Card>
        );
    }
}

export default ProductHome;