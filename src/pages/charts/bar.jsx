import React, { Component } from 'react';
import { Card, Button } from "antd";
import ReactEcharts from "echarts-for-react";

class Bar extends Component {

	state = {
		sales: [5, 20, 36, 10, 10, 20], // 销量
		stores: [4, 30, 200, 5, 8, 20] // 库存
	}

	updata = () => {
		this.setState(state => ({
			stores: state.stores.map(store => (store + 10))
		}));
	}

	/**
	 *返回柱状图的配置对象
	 *
	 * @memberof Bar
	 */
	getOption = (sales, stores) => {
		// 指定图表的配置项和数据
		const option = {
			title: {
				text: 'ECharts 入门示例'
			},
			tooltip: {},
			legend: {
				data: ['销量', '库存']
			},
			xAxis: {
				data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"]
			},
			yAxis: {},
			series: [{
				name: '销量',
				type: 'bar',
				data: sales
			}, {
				name: '库存',
				type: 'bar',
				data: stores
			}]
		};
		return option;
	}

	render() {
		const { sales, stores } = this.state

		return (
			<div>
				<Card>
					<Button type='primary' onClick={this.updata}>更新</Button>
				</Card>
				<Card title='柱状图一'>
					<ReactEcharts option={this.getOption(sales, stores)} />
				</Card>
			</div>
		);
	}
}

export default Bar;