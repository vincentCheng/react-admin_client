import React, {Component} from 'react';
import {Card, Form, Input, Cascader, Upload, Button, Icon} from "antd";
import {LinkButton} from "../../components/link-button";

const {Item} = Form;
const {TextArea} = Input;

class ProductAddUpdate extends Component {
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
        return (
            <Card title={title}>
                <Form {...formItemLayout}>
                    <Item label='商品名称'>
                        <Input placeholder='请输入商品名称'/>
                    </Item>
                    <Item label='商品描述'>
                        <TextArea placeholder="请输入商品描述" autoSize={{minRows: 3, maxRows: 5}}/>
                    </Item>
                    <Item label='商品价格'>
                        <Input type='number' placeholder="请输入商品价格" addonAfter='元' />
                    </Item>
                </Form>
            </Card>
        );
    }
}

export default Form.create()(ProductAddUpdate);