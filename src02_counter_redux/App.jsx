import React, {Component} from 'react';
import PropTypes from "prop-types";
import {increment, decrement} from "./redux/actions";

class App extends Component {

    constructor(props) {
        super(props);

        this.numberRef = React.createRef();
    }

    static propTypes = {
        store: PropTypes.object.isRequired
    };

    /**
     *
     */
    increment = () => {
        let number = this.numberRef.current.value * 1;
        this.props.store.dispatch(increment(number))
        // this.setState(state => ({count: state.count + number}));
        // this.props.store.dispatch({type: 'INCREMENT', data: number})
    };

    /**
     *
     */
    decrement = () => {
        let number = this.numberRef.current.value * 1;
        this.props.store.dispatch(decrement(number))
        // this.setState(state => ({count: state.count - number}));
        // this.props.store.dispatch({type: 'DECREMENT', data: number})
    };

    /**
     * 奇数
     */
    incrementIfOdd = () => {
        let number = this.numberRef.current.value * 1;
        if (this.props.store.getState().count % 2 === 1) this.setState(state => ({count: state.count + number}));
        // if (this.state.count % 2 === 1) this.setState(state => ({count: state.count + number}));
    };

    /**
     * 一秒之后更新
     */
    incrementAsync = () => {
        let number = this.numberRef.current.value * 1;
        setTimeout(() => {
            this.setState(state => ({count: state.count + number}));
        }, 1000)
    };

    render() {
        const count = this.props.store.getState();

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

export default App;