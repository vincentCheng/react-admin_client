import React, {Component} from 'react';
import "./login.less";
import logo from "./images/logo.png"; // jsx中，需要这样引入图片。
import {Form, Icon, Input, Button} from 'antd';
import {reqLogin} from "../../api";

/**
 * 登陆的路由组件，一级路由。
 */
class Login extends Component {

    /**
     *
     */
    handleSubmit = (event) => {
        // 阻止事件的默认行为
        event.preventDefault()

        this.props.form.validateFields(async (err, values) => {
            if (!err) { // 验证通过
                // console.log('Received values of form: ', values);
                let {username, password} = values
                /**
                 * 这是ajax的方法
                 */
                // reqLogin(username, password)
                //     .then(response => {
                //         console.log('成功了', response);
                //     })
                //     .catch(err => {
                //         console.log(err);
                //     })

                /**
                 * 这是async/await方法
                 *
                 * async，写在await修饰的函数所在函数的左侧。
                 * 也就是当前箭头函数的左侧。
                 *
                 * 试验：
                 * 1、将api/index.js中的“login”改为“login2”，就会出现404错误。但是仍然打印“请求成功了”
                 * 2、故意输错密码，出现“请求出错了”提示。
                 */
                await reqLogin(username, password)
                // try {
                //     let respose = await reqLogin(username, password)
                //     console.log('请求成功了', respose);
                // }catch (e) {
                //     console.log('请求出错了', e);
                // }
            }
        });

        // 获取表单项的输入数据
        // 返回的是一个对象（用名称做标识的是对象，用数字做下标的是数组）
        // const values = this.props.form.getFieldsValue()
        // console.log(values);
    };

    /**
     * 验证密码
     */
    validatePwd = (rule, value, callback) => {
        if (!value) callback("请输入密码")
        else {
            let length = value.length
            if (4 > length) callback("密码不能小于4位")
            else if (length > 12) callback("密码不能超过12位")
            else callback()
        }
        // callback() // 没有传参表示验证通过
        // callback("xxx") // 有传参表示验证失败
    };

    render() {
        /**
         * getFieldDecorator 是一个高阶函数，用来包装Input
         * getFieldDecorator()()
         */
        const {getFieldDecorator} = this.props.form;
        return (
            <div className="login">
                <header className="login-header">
                    <img src={logo} alt="logo"/>
                    <h1>React项目：后台管理系统</h1>
                </header>
                <section className="login-content">
                    <h2>用户登录</h2>
                    <Form onSubmit={this.handleSubmit} className="login-form">
                        <Form.Item>
                            {
                                /*
                                * 用户名/密码验证规则：
                                * 1、必须输入
                                * 2、必须大于4位
                                * 3、必须小于12位
                                * 4、必须是英文、数字或下划线组成
                                *
                                * /^[a-zA-Z0-9_]+$/ 后面有一个“+”号，就能匹配多个字符。
                                * 匹配规则里面没有空格，如果有就会报错。
                                * */
                                getFieldDecorator('username', {
                                    initialValue: 'admin',
                                    rules: [
                                        {required: true, message: '请输入用户名!'},
                                        {max: 12, message: '用户名必须最多12位!'},
                                        {min: 4, message: '用户名必须最少4位!'},
                                        {pattern: /^[a-zA-Z0-9_]+$/, message: '用户名必须是英文、数字或下划线，而且不能包含空格!'},
                                    ]
                                })(
                                    <Input
                                        prefix={<Icon type="user" style={{color: 'rgba(0,0,0,.25)'}}/>}
                                        placeholder="用户名"
                                    />
                                )}
                        </Form.Item>
                        <Form.Item>
                            {getFieldDecorator('password', {
                                initialValue: 'admin',
                                rules: [
                                    {validator: this.validatePwd}
                                ]
                            })(
                                <Input
                                    prefix={<Icon type="lock" style={{color: 'rgba(0,0,0,.25)'}}/>}
                                    type="password"
                                    placeholder="密码"
                                />
                            )}
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit" className="login-form-button">
                                登 录
                            </Button>
                        </Form.Item>
                    </Form>
                </section>
            </div>
        );
    }
}

/**
 * 1、高阶函数特征：
 *      a、接收函数类型的参数
 *      b、返回的是函数
 *      c、例如：
 *                  setTimeout()/setInterval()
 *                  Promise: Promise(()=>{}).then(value=>{}, result=>{})
 *                  数组遍历等: forEach()/filter()/map()/reduce()/find()
 *                  函数对象的bind()
 *                  Form.create()()/getFieldDecorator()()
 *  d、高阶函数更加动态和具有扩展性
 *
 * 2、高阶组件的特征：
 *      a、本质是一个函数
 *      b、接收一个组件（被包装），返回一个新的组件（包装组件），向包装组件中传入特定属性。
 *      c、扩展组件功能，比如这里就给Login组件返回form属性。
 *      d、高阶组件也是高阶函数，接收一个组件函数，返回一个新的组件函数。
 *
 * 这里的功能：
 * 包装Form组件，生成新的组件。
 * 向Login组件传递一个form对象，也就是 this.props.form 这里面有验证功能等。
 *
 * @type {ConnectedComponentClass<Login, Omit<FormComponentProps<any>, keyof WrappedFormInternalProps>>}
 */
const WrapLogin = Form.create()(Login)

export default WrapLogin;
// export default Login;

/**
 * async 和 await
 * 1、作用：
 *
 */
