import React, {Component} from 'react';
import {Card, Form, Input, Cascader, Upload, Button, Icon} from "antd";
import {LinkButton} from "../../components/link-button";
import {reqCategorys} from "../../api";

const {Item} = Form;
const {TextArea} = Input;
const options1 = [
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
        options: null,
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

        // 得到二级分类列表
        let subCategories = await this.getCategorys(targetOption.value);
        // todo 这里如果是一级列表，那么要点击两次。很麻烦，需要优化。
        targetOption.loading = false;

        if (subCategories && subCategories.length > 0) {
            this.initOptions(subCategories, targetOption);
        } else { // 当前页面中的分类不是二级分类
            targetOption.isLeaf = true;
        }
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
     * @param categorys 异步获取的数据
     * @param parentOptions 如果这个有值，表示需要给二级列表设置数据
     */
    initOptions = (categorys, parentOptions) => {
        let options = categorys.map(item => ({
            label: item.name,
            value: item._id,
            isLeaf: item.parentId * 1 !== 0
        }));

        if (!parentOptions) {
            this.setState({options});
            return
        }

        parentOptions.children = options;
    };

    /**
     * 异步获取一级/二级分类列表
     */
    getCategorys = async (parentId = 0) => {
        let result = await reqCategorys(parentId);

        if (result.status === 0 || result.status === 200) {
            let tempResult = result.data.data;
            if (0 === parentId * 1) this.initOptions(tempResult); // 如果是一级分类列表
            else return tempResult; // 如果是二级列表
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