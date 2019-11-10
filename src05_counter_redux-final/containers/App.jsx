import React from 'react'
import { connect } from "react-redux";
import Counter from "../components/Counter";
import { increment, decrement } from "../redux/actions";

/**
 * 容器组件，通过connect包装UI组件产生的组件
 * connect()：高阶函数
 * connect()返回的函数是一个高阶组件，接收一个UI组件，生成一个容器组件
 * 容器组件的责任：向UI组件传入特定的属性
 * z这里向Counter组件传入参数 count/increment/decrement
 */

export default function App() {
	return (
		<div>
			<Counter />
		</div>
	)
};