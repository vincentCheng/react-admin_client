import React, {Component} from 'react';
import {Card, Form, Input, Cascader, Upload, Button, Icon} from "antd";
import {LinkButton} from "../../components/link-button";
import {reqCategorys} from "../../api";

const {Item} = Form;
const {TextArea} = Input;
const options = [
    {
        value: 'zhejiang',
        label: 'Zhejiang',
        isLeaf: false,
    },
    {
        value: 'jiangsu',
        label: 'Jiangsu',
        isLeaf: false,
    },
];

class ProductAddUpdate extends Component {

    state = {
        options,
    };

    /**
     * 验证价格的函数
     */
    validatorPrice = (rule, value, callback) => {
        if (value * 1 > 0) { // 将value变成数字
            callback();// 验证通过
        } else {
            callback('商品价格必须大于0'); // 验证不通过
        }
    };

    /**
     * 级联中的加载数据
     * @param selectedOptions
     */
    loadData = async selectedOptions => {
        let targetOption = selectedOptions[selectedOptions.length - 1];
        targetOption.loading = true;

        let result = await this.getCategorys(targetOption.value);
        targetOption.loading = false;
        console.log(result);

        // todo 这里遇到的问题是不知道怎么设置二级列表
        if (!result) {
            targetOption.children = [
                {label: '无', value: -1, isLeaf: true}
            ]
        }
        else if (result.status * 1 === 200 || result.status * 1 === 0) {
            // console.log(result);
            // targetOption.children=result.data.data.map(item=>{
            //     let tempresult;
            //
            //     item._id
            //
            //     return
            // })
        }

        // load options lazily
        // setTimeout(() => {
        //     targetOption.loading = false;
        //     targetOption.children = [
        //         {
        //             label: `${targetOption.label} Dynamic 1`,
        //             value: 'dynamic1',
        //             isLeaf: true
        //         },
        //         {
        //             label: `${targetOption.label} Dynamic 2`,
        //             value: 'dynamic2',
        //             isLeaf: true
        //         },
        //     ];
        //     this.setState({
        //         options: [...this.state.options],
        //     });
        // }, 1000);
    };

    /**
     * 提交的回调函数
     */
    submit = () => {
        // 表单验证通过才发送请求。
        this.props.form.validateFields((error, values) => {
            if (!error) alert('ajax')
        })
    };

    /**
     * 根据categorys生成options数组
     * 更新状态
     */
    initOptions = categorys => {
        let options = categorys.map(item => ({
            label: item.name,
            value: item._id,
            isLeaf: item.parentId * 1 !== 0
        }));

        this.setState({options});
    };

    /**
     * 异步获取一级/二级分类列表
     */
    getCategorys = async parentId => {
        let result = await reqCategorys(parentId);

        if (result.status === 0 || result.status === 200) {
            this.initOptions(result.data.data)
        }
    };

    componentDidMount() {
        this.getCategorys();
    }

    render() {
        const title = (
            <span>
                <LinkButton onClick={() => this.props.history.goBack()}>
                    {/*这里的icon大小，是使用fontsize控制的*/}
                    <Icon type='arrow-left' style={{fontSize: 20}}/>
                </LinkButton>
                <span>添加商品</span>
            </span>
        );
        // 指定item布局的宽度比例
        const formItemLayout = {
            labelCol: {span: 2}, // 左侧label的宽度
            wrapperCol: {span: 8}, // 右侧的宽度
        };
        const {getFieldDecorator} = this.props.form;
        return (
            <Card title={title}>
                <Form {...formItemLayout}>
                    <Item label='商品名称'>
                        {
                            getFieldDecorator('name', {
                                initialValue: '',
                                rules: [{required: true, message: '必须输入商品名称'}],
                            })(<Input placeholder='请输入商品名称'/>)
                        }
                    </Item>
                    <Item label='商品描述'>
                        {
                            getFieldDecorator('desc', {
                                initialValue: '',
                                rules: [{required: true, message: '必须输入商品描述'}],
                            })(<TextArea placeholder="请输入商品描述" autoSize={{minRows: 3, maxRows: 5}}/>)
                        }
                    </Item>
                    <Item label='商品价格'>
                        {
                            getFieldDecorator('price', {
                                initialValue: 0,
                                rules: [{required: true, message: '必须输入商品价格'}, {validator: this.validatorPrice}],
                            })(<Input type='number' placeholder="请输入商品价格" addonAfter='元'/>)
                        }
                    </Item>
                    <Item label='商品分类'>
                        <Cascader
                            options={this.state.options}
                            loadData={this.loadData}
                            placeholder='请选择商品分类'
                        />
                    </Item>
                    <Item label='商品图片'>
                        商品图片
                    </Item>
                    <Item label='商品详情'>
                        商品详情
                    </Item>
                    <Item>
                        {/*这里不用onsubmit，那么就不会提交表单。如果使用onsubmit那么需要阻止默认行为。*/}
                        <Button type='primary' onClick={this.submit}>提交</Button>
                    </Item>
                </Form>
            </Card>
        );
    }
}

export default Form.create()(ProductAddUpdate);