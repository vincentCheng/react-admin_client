/*
* react-redux 库的主模块
*
* 1、react-redux向外暴露了2个API
*   a/Provider组件类
*   b/connect函数
* 2、Provider组件
*   接收store属性，通过context让所有容器组件都可以看到store，从而通过store读取/更新状态
* 3、connect函数
*   接收2个参数：mapStateToProps和mapDispatchToProps
*   mapStateToProps是一个函数，向UI组件传递一般属性
*   mapDispatchToProps是一个函数或者对象，向UI组件传递函数属性
*   connect()执行的返回值为一个高阶组件，包装UI组件，返回一个新的容器组件
*   容器组件会向UI传入前面指定的一般/函数类型属性
*
* */

import React from "react";
import PropTypes from "prop-types";

/**
 * 向所有容器组件提供store的组件类
 */
export class Provider extends React.Component {

    static propTypes = {
        store: PropTypes.object.isRequired
    };

    /**
     * 这两个要声明，子组件才能通过 this.context 获得store
     * @type {{store: *}}
     */
    static childContextTypes = {store: PropTypes.object};

    /**
     * 向所有子组件提供包含要传递数据的context对象
     * @return {{store: Object}}
     */
    getChildContext() {
        return {store: this.props.store}
    }

    render() {
        // 返回渲染 Provider 标签的所有子节点
        return this.props.children
    }
}

/*
* connect 高阶函数：接收 mapStateToProps 和 mapDispatchToProps 两个参数，返回一个高阶组件函数。
* 高阶组件：接收一个UI组件，返回一个容器组件。
* */
export function connect(mapStateToProps, mapDispatchToProps) {
    // 返回高阶组件函数
    return UIComponent => {
        return class ContainerComponent extends React.Component {

            // 声明接收的context数据的名称和类型
            static contextTypes = {
                store: PropTypes.object
            };

            constructor(props, context) {
                super(props);
                console.log('ContainerComponent constructor()', context.store);

                // 得到store
                const {store} = context;
                // 得到包含所有一般属性的对象
                const stateProps = mapStateToProps(store.getState());

                // 不能这样使用，会警告：
                //index.js:1375 Warning: Can't call setState on a component that is not yet mounted.
                // this.setState({...stateProps});

                this.state = {...stateProps};

                if ('function' === typeof mapDispatchToProps) {
                    // 得到包含所有函数属性的对象
                    // Counter.jsx中的要使用函数 mapDispatchToProps()
                    this.dispatchProps = mapDispatchToProps(store.dispatch);
                } else {
                    this.dispatchProps = Object.keys(mapDispatchToProps).reduce((pre, key) => {
                        const actionCreator = mapDispatchToProps[key];

                        // 参数透传
                        // 形参中的 ...args 是“收集所有的参数，形成数组”
                        // 第二个 ...args 是“展开数组，形成形参”
                        pre[key] = (...args) => {
                            store.dispatch(actionCreator(...args))
                        };
                        return pre;
                    }, {});
                }

                // 绑定监听
                store.subscribe(() => { // store 内部的状态数据发生了改变
                    // 更新容器组件 ==> UI组件更新
                    this.setState({...mapStateToProps(store.getState())});
                });
            }

            render() {
                // 返回UI组件的标签
                return <UIComponent {...this.state} {...this.dispatchProps}/>
            }
        }
    }
}