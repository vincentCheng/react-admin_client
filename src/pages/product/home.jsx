import React, {Component} from 'react';
import {Card, Select, Input, Button, Icon, Table} from "antd";
import {LinkButton} from "../../components/link-button";
import {reqProducts, reqSearchProducts} from "../../api";
import {PAGE_SIZE} from "../../config";

const Option = Select.Option;

class ProductHome extends Component {

    state = {
        total: 0, // 商品总数
        products: [], // 商品的数组
        loading: false,
        searchName: '', // 搜索的关键字
        searchType: 'productName', // 根据哪个字段搜索
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
                        <LinkButton onClick={()=>this.props.history.push('/product/detail', product)}>详情</LinkButton>
                        <LinkButton>修改</LinkButton>
                    </span>
                )
            },
        ]
    };

    /**
     * 获取指定页码的数据
     */
    getProducts = async (pageNum = 1) => {
        let {searchName, searchType} = this.state;

        this.setState({loading: true});

        // 如果搜索关键字有值，说明需要搜索分页，否则就是一般分页
        let result = searchName ? await reqSearchProducts({
            pageNum,
            pageSize: PAGE_SIZE,
            searchName,
            searchType
        }) : await reqProducts(pageNum, PAGE_SIZE)

        this.setState({loading: false});

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
        let {products, total, loading, searchType, searchName} = this.state;

        const title = (
            <div>
                <Select value={searchType} onChange={value => this.setState({searchType: value})}>
                    <Option value='productName' key='productName'>按名称搜索</Option>
                    <Option value='productDesc' key='productDesc'>按描述搜索</Option>
                </Select>
                <Input placeholder='关键字' style={{width: 100, margin: '0 15px'}} value={searchName}
                       onChange={e => this.setState({searchName: e.target.value})}/>
                <Button type='primary' onClick={()=>{this.getProducts()}}>搜索</Button>
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
                    pagination={{defaultPageSize: PAGE_SIZE, showQuickJumper: true, total, onChange: this.getProducts}}
                />
            </Card>
        );
    }
}

export default ProductHome;