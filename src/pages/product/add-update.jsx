import React, {Component} from 'react';
import {Card, Form, Input, Cascader, Upload, Button, Icon} from "antd";
import {LinkButton} from "../../components/link-button";

const {Item} = Form;
const {TextArea} = Input;

class ProductAddUpdate extends Component {

    /**
     * 验证价格的函数
     */
    validatorPrice = (rule, value, callback) => {
        if (value*1 > 0) { // 将value变成数字
            callback();// 验证通过
        } else {
            callback('商品价格必须大于0'); // 验证不通过
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

    render() {
        const title = (
            <span>
                <LinkButton>
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
                        商品分类
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