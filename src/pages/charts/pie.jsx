import React, { Component } from 'react';
import { Card, Button } from "antd";
import ReactEcharts from "echarts-for-react";

class Pie extends Component {

	constructor(props) {
		super(props)

		this.names = ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"];
	}

	state = {
		sales: [5, 20, 36, 10, 10, 20], // 销量
		stores: [4, 30, 200, 5, 8, 20] // 库存
	}

	updata = () => {
		this.setState(state => ({
			stores: state.stores.map(store => (store + 10))
		}));
	}

	getOptions = data => {
		let option2Data = data.map((v, index) => ({ value: v, name: this.names[index] }));
		option2Data = option2Data.sort(function (a, b) { return a.value - b.value; });

		return {
			backgroundColor: '#2c343c',

			title: {
				text: 'Customized Pie',
				left: 'center',
				top: 20,
				textStyle: {
					color: '#ccc'
				}
			},

			tooltip: {
				trigger: 'item',
				formatter: "{a} <br/>{b} : {c} ({d}%)"
			},

			visualMap: {
				show: false,
				min: 80,
				max: 600,
				inRange: {
					colorLightness: [0, 1]
				}
			},
			series: [
				{
					name: '访问来源',
					type: 'pie',
					radius: '55%',
					center: ['50%', '50%'],
					data: option2Data,
					roseType: 'radius',
					label: {
						normal: {
							textStyle: {
								color: 'rgba(255, 255, 255, 0.3)'
							}
						}
					},
					labelLine: {
						normal: {
							lineStyle: {
								color: 'rgba(255, 255, 255, 0.3)'
							},
							smooth: 0.2,
							length: 10,
							length2: 20
						}
					},
					itemStyle: {
						normal: {
							color: '#c23531',
							shadowBlur: 200,
							shadowColor: 'rgba(0, 0, 0, 0.5)'
						}
					},

					animationType: 'scale',
					animationEasing: 'elasticOut',
					animationDelay: function (idx) {
						return Math.random() * 200;
					}
				}
			]
		};
	}

	render() {
		const { sales, stores } = this.state

		return (
			<div>
				<Card>
					<Button type='primary' onClick={this.updata}>更新</Button>
				</Card>
				<Card title='销量'>
					<ReactEcharts option={this.getOptions(sales)} />
				</Card>
				<Card title='库存'>
					<ReactEcharts option={this.getOptions(stores)} />
				</Card>
			</div>
		);
	}
}

export default Pie;