import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Form, Select, Input} from "antd";

const {Option} = Select;
const {Item} = Form;

class AddForm extends Component {
    render() {
        const {getFieldDecorator} = this.props.form;
        return (
            <Form>
                <Item>
                    <span>所属分类:</span>
                    {
                        getFieldDecorator('parentId', {
                            initialValue: '0'
                        })(
                            < Select defaultValue='0'>
                                <Option value='0'>一级分类</Option>
                                <Option value='1'>电脑</Option>
                                <Option value='2'>图书</Option>
                            </Select>
                        )
                    }
                </Item>

                <Item>
                    <span>分类名称:</span>
                    {
                        getFieldDecorator('categoryName', {
                            initialValue: ''
                        })(
                            <Input placeholder='请输入分类名称'/>
                        )
                    }
                </Item>
            </Form>
        );
    }
}

AddForm.propTypes = {};

export default Form.create({name: 'category-add-form'})(AddForm);