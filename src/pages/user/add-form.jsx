import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {Form, Input, Select} from "antd";

const Item = Form.Item;
const Option = Select.Option;

class AddForm extends PureComponent {

    static propTypes = {
        setForm: PropTypes.func.isRequired, // 用来传递form对象的函数
        roles: PropTypes.array.isRequired,
        user: PropTypes.object,
    }

    /**
     * 验证密码
     */
    validatePwd = (rule, value, callback) => {
        if (!value) callback("必须输入密码");
        else {
            let length = value.length;
            if (4 > length) callback("密码不能小于4位");
            else if (length > 12) callback("密码不能超过12位");
            else callback();
        }
        // callback() // 没有传参表示验证通过
        // callback("xxx") // 有传参表示验证失败
    };

    /**
     * 获取当前用户的角色
     */
    getRole = () => {
        const {roles, user} = this.props;
        if (!user) return '';
        let result = roles.find(role=>(role._id === user.role_id));
        return result.name;
    };

    UNSAFE_componentWillMount() {
        this.props.setForm(this.props.form);
    }

    render() {
        const {getFieldDecorator} = this.props.form;
        const {roles} = this.props;
        const user = this.props.user || {};
        const initValueRole = this.getRole() || '';

        // 指定item布局的宽度比例
        const formItemLayout = {
            labelCol: {span: 4}, // 左侧label的宽度
            wrapperCol: {span: 20}, // 右侧的宽度
        };

        return (
            <Form {...formItemLayout}>
                <Item label='用户名'>
                    {
                        getFieldDecorator('username', {
                            initialValue: user.username,
                            rules: [
                                {required: true, message: '必须输入用户名'}
                            ]
                        })(
                            <Input placeholder='请输入用户名'/>
                        )
                    }
                </Item>
                {
                    user._id ? null : ( // 更新就不显示密码
                        <Item label='密码'>
                            {
                                getFieldDecorator('password', {
                                    initialValue: '',
                                    rules: [
                                        {required: true},
                                        {validator: this.validatePwd}
                                    ]
                                })(
                                    <Input placeholder='请输入密码'/>
                                )
                            }
                        </Item>
                    )
                }
                <Item label='手机号'>
                    {
                        getFieldDecorator('phone', {
                            initialValue: user.phone,
                            rules: [
                                {pattern: /^1[3456789]\d{9}$/, message: '请输入正确的手机号'}
                            ]
                        })(
                            <Input placeholder='请输入手机号'/>
                        )
                    }
                </Item>
                <Item label='邮箱'>
                    {
                        getFieldDecorator('email', {
                            initialValue: user.email,
                            rules: [
                                {type: 'email', message: '请输入正确的邮箱'}
                            ]
                        })(
                            <Input placeholder='请输入邮箱'/>
                        )
                    }
                </Item>
                <Item label='选择角色'>
                    {
                        getFieldDecorator('role_id', {
                            initialValue: initValueRole,
                            rules: []
                        })(
                            <Select placeholder='请选择角色'>
                                {roles.map(role => (<Option value={role._id} key={role._id}>{role.name}</Option>))}
                            </Select>,
                        )
                    }
                </Item>
            </Form>
        );
    }
}

export default Form.create()(AddForm)