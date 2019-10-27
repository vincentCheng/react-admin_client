import React, {Component} from 'react';
import {Card, Table, Button, Icon, message, Modal} from "antd";
import {categoryTitle} from "../../config";
import {LinkButton} from "../../components/link-button";
import "./category.less";
import {reqCategories, reqAddCategory} from "../../api";
import AddForm from "./add-form";
import UpdateForm from "./update-form";

class Category extends Component {

    constructor(props) {
        super(props);
        this.parentId = 0;
        this.parentName = '';
        this.state = {
            data: undefined, // 一级分类列表
            subData: undefined, // 二级分类列表
            dataLength: 0,
            flagLoading: false,
            parentId: this.parentId,
            parentName: this.parentName,
            visibleAdd: false,
            visibleUpdate: false
        }
    }

    /**
     * 初始化数据
     * 1、这里的
     * <LinkButton onClick={this.showSubData(data)}>查看子分类</LinkButton>
     * 中的click方法不能这样写，这样渲染的时候就会调用。正确方法如下：
     * <LinkButton onClick={(text, record, index)=>{)}}>查看子分类</LinkButton>
     * 视频这里已经和官网不同了，要参考官网。
     */
    initColumns = () =>
        this.columns = [
            {
                title: '分类名称',
                dataIndex: 'name',
            },
            {
                title: '操作',
                key: 'action',
                dataIndex: 'action',
                width: 300,
                align: 'center',
                render: (text, record, index) => ( // 例如这里：每一行都代表一个“一级分类对象”，那么这里会将这个对象当做形参。
                    <span>
                        <LinkButton onClick={this.showModalUpdate}>修改分类</LinkButton>
                        {
                            this.state.parentId === 0
                                ? <LinkButton onClick={() => {
                                    this.showSubData(record);
                                }}>查看子分类</LinkButton>
                                : null
                        }
                    </span>
                ),
            },
        ];

    /**
     * 初始化extra
     */
    initExtra = () => this.extra = <Button type='primary' onClick={this.showModalAdd}><Icon type='plus'/>添加</Button>;

    /**
     * title的显示
     */
    getTitle = () =>
        this.title = 0 === this.state.parentId ? "一级分类列表" : (
            <span>
                <LinkButton onClick={() => {
                    this.getCategories()
                }}>一级分类列表</LinkButton>
                <Icon type='arrow-right'/>
                &nbsp;
                <span>{this.state.parentName}</span>
            </span>
        );

    /**
     * 获取一/二级分类列表
     */
    getCategories = async (id = 0, name = '') => {
        let flagLoading = true;
        let parentId = id;
        let parentName = name;

        this.setState({flagLoading});
        let result = await reqCategories(parentId);

        // console.log('getCategories', result);

        if (200 !== result.status) {
            // console.log(result);
            message.error('获取分类列表失败');
            flagLoading = false;
            this.setState({flagLoading});
            return false;
        }

        let {data} = result.data;
        let dataLength = data.length;

        flagLoading = false;

        this.setState({data, dataLength, flagLoading, parentId, parentName});
    };

    /**
     * 展示二级分类列表
     * @param subData 这个是一级分类对象
     */
    showSubData = async subData => {
        let data = subData;
        // console.log('showSubData', data);
        let result = await this.getCategories(data._id, data.name);

        /**
         * 目前setState是异步的
         * 后面会遇到同步的
         *
         * todo: 这里为什么是先更新状态，再去获取数据呢?
         * todo: 根据实验得出结果，如果先得到数据再更新状态，不会立刻显示的。视频中有提到。
         * todo: 回去看视频《49_尚硅谷_React全栈项目_Category组件_异步显示二级分类列表》。这里的代码是
         *
         * this.setState({parentId: data._id})
         * console.log(this.state.parentId)
         * this.getCategories()
         *
         * 这里的setState不是实时的。例如原来的parentId===0，那么设置之后还是0。
         */
        // this.setState({parentId: data._id, parentName: data.name}, () => this.getCategories(data._id))
    };

    /**
     * 添加分类
     *
     */
    showModalAdd = () => {
        this.setState({
            visibleAdd: true,
        });
    };

    handleOkAdd = e => {
        console.log(e);
        this.setState({
            visibleAdd: false,
        });
    };

    handleCancelAdd = e => {
        console.log(e);
        this.setState({
            visibleAdd: false,
        });
    };

    /**
     * 修改分类
     *
     */
    showModalUpdate = () => {
        this.setState({
            visibleUpdate: true,
        });
    };

    handleOkUpdate = e => {
        console.log(e);
        this.setState({
            visibleUpdate: false,
        });
    };

    handleCancelUpdate = e => {
        console.log(e);
        this.setState({
            visibleUpdate: false,
        });
    };

    UNSAFE_componentWillMount() {
        this.initColumns();
        this.initExtra();
        this.getTitle();
    }

    componentDidMount() {
        this.getCategories();
    }

    render() {

        const {data, dataLength, flagLoading} = this.state;

        /**
         * 这里的Card没有设定宽度能够自动100%
         * rowKey = '_id' 表示指定服务器返回的数据中"_id"作为key
         */
        return (
            <div>
                <Card title={this.title} extra={this.extra}>
                    <Table
                        loading={{spinning: flagLoading, delay: 300, tip: '玩命加载中!'}}
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
                <Modal
                    title="添加分类"
                    visible={this.state.visibleAdd}
                    onOk={this.handleOkAdd}
                    onCancel={this.handleCancelAdd}
                >
                    <AddForm/>
                </Modal>
                <Modal
                    title="修改分类"
                    visible={this.state.visibleUpdate}
                    onOk={this.handleOkUpdate}
                    onCancel={this.handleCancelUpdate}
                >
                    <UpdateForm/>
                </Modal>
            </div>
        );
    }
}

export default Category;