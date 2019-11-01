import React, {Component} from 'react';
import {Card, Select, Input, Button, Icon, Table} from "antd";
import {LinkButton} from "../../components/link-button";
import {reqProducts} from "../../api";
import {pageSize} from "../../config";

const Option = Select.Option;

class ProductHome extends Component {

    state = {
        total: 0, // 商品总数
        products: [], // 商品的数组
        loading: false
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

    /**
     * 获取指定页码的数据
     */
    getProducts = async (pageNum) => {
        this.setState({loading: true});
        let result = await reqProducts(pageNum, 3)
        this.setState({loading:false});
        let {status, data} = result

        // console.log('result', result);

        if (0 === status || 200 === status) {
            let {total, list} = data.data;
            this.setState({total, products: list})
        }
    };

    UNSAFE_componentWillMount() {
        this.initColumns()
    }

    componentDidMount() {
        this.getProducts(1)
    }

    render() {
        let {products, total, loading} = this.state;

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
                    loading={loading}
                    bordered
                    rowKey='_id'
                    dataSource={products}
                    columns={this.columns}
                    pagination={{defaultPageSize: pageSize, showQuickJumper: true, total, onChange: this.getProducts}}
                />
            </Card>
        );
    }
}

export default ProductHome;