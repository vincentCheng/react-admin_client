import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Form, Input} from "antd";

const Item = Form.Item

class AddForm extends Component {
    constructor(props) {
        super(props);

        this.state = {};
    }

    static propTypes = {
        setForm: PropTypes.func.isRequired, // 用来传递form对象的函数
    }

    componentWillMount () {
        this.props.setForm(this.props.form)
    }

    render() {
        const { getFieldDecorator } = this.props.form

        // 指定item布局的宽度比例
        const formItemLayout = {
            labelCol: {span: 4}, // 左侧label的宽度
            wrapperCol: {span: 20}, // 右侧的宽度
        };

        return (
            <Form {...formItemLayout}>
                <Item label='角色名称'>
                    {
                        getFieldDecorator('name', {
                            initialValue: '',
                            rules: [
                                {required: true, message: '必须输入角色名'}
                            ]
                        })(
                            <Input placeholder='请输入角色名'/>
                        )
                    }
                </Item>
            </Form>
        );
    }
}

export default Form.create()(AddForm)