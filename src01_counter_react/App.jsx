/*根组件*/

import React, {Component} from 'react';

class App extends Component {

    constructor(props) {
        super(props);

        this.numberRef = React.createRef();
    }

    // state = {
    //     count: 0
    // };

    /**
     *
     */
    increment = () => {
        let number = this.numberRef.current.value * 1;
        this.setState(state => ({count: state.count + number}));
    };

    /**
     *
     */
    decrement = () => {
        let number = this.numberRef.current.value * 1;
        this.setState(state => ({count: state.count - number}));
    };

    /**
     * 奇数
     */
    incrementIfOdd = () => {
        let number = this.numberRef.current.value * 1;
        if (this.state.count % 2 === 1) this.setState(state => ({count: state.count + number}));
    };

    /**
     * 一秒之后更新
     */
    incrementAsync = () => {
        let number = this.numberRef.current.value * 1;
        setTimeout(()=>{
            this.setState(state => ({count: state.count + number}));
        }, 1000)
    };

    render() {
        const count = this.state.count;

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