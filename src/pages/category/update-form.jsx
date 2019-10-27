import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Form, Select, Input} from "antd";

const {Option} = Select;
const {Item} = Form;

class UpdateForm extends Component {
    render() {
        const {getFieldDecorator} = this.props.form;
        return (
            <Form>
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

UpdateForm.propTypes = {};

export default Form.create({name: 'category-update-form'})(UpdateForm);