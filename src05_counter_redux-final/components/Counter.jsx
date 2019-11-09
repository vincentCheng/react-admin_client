import React, {Component} from 'react';
import PropTypes from "prop-types";
import {connect} from "react-redux";

import {increment, decrement, incrementAsync} from "../redux/actions";

/**
 * 这里叫做UI组件，显示数据。
 * 代码中没有任何redux相关代码
 *
 * 容器组件是包含在UI组件外面的，就像Form.create()()。
 */
class Counter extends Component {

    constructor(props) {
        super(props);

        this.numberRef = React.createRef();
    }

    // 假设接收到这些属性，就不需要store了。
    static propTypes = {
        count: PropTypes.number.isRequired,
        increment: PropTypes.func.isRequired,
        decrement: PropTypes.func.isRequired,
        incrementAsync: PropTypes.func.isRequired,
    };

    /**
     *
     */
    increment = () => {
        let number = this.numberRef.current.value * 1;
        this.props.increment(number);
        // this.props.store.dispatch(increment(number))
        // this.setState(state => ({count: state.count + number}));
        // this.props.store.dispatch({type: 'INCREMENT', data: number})
    };

    /**
     *
     */
    decrement = () => {
        let number = this.numberRef.current.value * 1;
        this.props.decrement(number);
        // this.props.store.dispatch(decrement(number))
        // this.setState(state => ({count: state.count - number}));
        // this.props.store.dispatch({type: 'DECREMENT', data: number})
    };

    /**
     * 奇数
     */
    incrementIfOdd = () => {
        let number = this.numberRef.current.value * 1;
        if (this.props.count % 2 === 1) this.props.increment(number);
        // if (this.props.count % 2 === 1) this.setState(state => ({count: state.count + number}));
        // if (this.props.store.getState().count % 2 === 1) this.setState(state => ({count: state.count + number}));
        // if (this.state.count % 2 === 1) this.setState(state => ({count: state.count + number}));
    };

    /**
     * 一秒之后更新
     */
    incrementAsync = () => {
        let number = this.numberRef.current.value * 1;
        this.props.incrementAsync(number);
        // setTimeout(() => {
        //     this.props.increment(number);
        //     // this.setState(state => ({count: state.count + number}));
        // }, 1000)
    };

    render() {
        // const count = this.props.store.getState();
        const {count} = this.props;

        return (
            <div>
                <p>click {count} times</p>
                <div>
                    <select ref={this.numberRef}>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                    </select>
                    <button onClick={this.increment}>+</button>
                    <button onClick={this.decrement}>-</button>
                    <button onClick={this.incrementIfOdd}>increment if odd</button>
                    <button onClick={this.incrementAsync}>increment async</button>
                </div>
            </div>
        )
    }
}

// export default Counter;

function mapDispatchToProps(dispatch) {
    return {
        increment: number => dispatch(increment(number)),
        decrement: number => dispatch(decrement(number)),
    }
}

export default connect(
    state => ({count: state.count}), // 这里的state是reduer返回的总的对象： {count, user}
    // 映射函数属性 在 this.props.increment 中使用
    // 最终还是会生成mapDispatchToProps中的语法：
    // mapDispatchToProps,
    {increment, decrement, incrementAsync} // 这是简化的写法
)(Counter);