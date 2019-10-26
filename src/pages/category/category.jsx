import React, {Component} from 'react';
import {Card, Table, Button, Icon, message} from "antd";
import {categoryTitle} from "../../config";
import {LinkButton} from "../../components/link-button";
import "./category.less";
import {reqCategories, reqAddCategory} from "../../api";

class Category extends Component {

    constructor(props) {
        super(props);
        this.columns = null;
        this.state = {
            data: undefined,
            dataLength: 0,
            flagLoading: false
        }
    }

    /**
     * 初始化数据
     */
    initColumns = () => {
        this.columns = [
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
                        <LinkButton onClick={this.updateCategory}>修改分类</LinkButton>
                        <LinkButton>查看子分类</LinkButton>
                    </span>
                ),
                align: 'center'
            },
        ];
    };

    /**
     * 获取分类列表
     */
    getCategories = async (id) => {
        let flagLoading = false;

        flagLoading = true;
        this.setState({flagLoading});
        let result = await reqCategories(id);

        if (200 !== result.status) {
            console.log(result);
            message.error('获取分类列表失败');
            flagLoading = false;
            this.setState({flagLoading});
            return;
        }

        let {data} = result.data;
        let dataLength = data.length;

        flagLoading = false;
        this.setState({data, dataLength, flagLoading});
    };

    /**
     * 添加分类
     */
    addCategory = async () => {
        // let result = await reqAddCategory()
    };

    /**
     * 修改分类
     */
    updateCategory = () => {

    };

    UNSAFE_componentWillMount() {
        this.initColumns();
    }

    componentDidMount() {
        this.getCategories();
    }

    render() {
        const extra = (
            <Button type='primary' onClick={this.addCategory}>
                <Icon type='plus'/>
                添加
            </Button>
        );

        const {data, dataLength, flagLoading} = this.state;

        /**
         * 这里的Card没有设定宽度能够自动100%
         * rowKey = '_id' 表示指定服务器返回的数据中"_id"作为key
         */
        return (
            <Card title={categoryTitle} extra={extra}>
                <Table
                    loading={{spinning:flagLoading, delay:300, tip:'玩命加载中!'}}
                    bordered
                    rowKey='_id'
                    pagination={{
                        defaultCurrent: 1,
                        total: dataLength,
                        pageSize: 10,
                        showQuickJumper: {goButton: (<span>页</span>)}
                    }}
                    dataSource={data}
                    columns={this.columns}/>
            </Card>
        );
    }
}

export default Category;