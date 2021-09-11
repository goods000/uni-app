<template>
	<view class="echartPages">
		<view class="main">
			<view class="initTitle">
				<view class="initTitle-wrapper"><view class="initTitle-label">{{ title }}</view></view>
			</view>
			<view class="dateTabsBox">
				<view class="dateTabsBox-control">
					<view class="dateTabsBox-control__item" :class="{ 'dateTabsBox-control__item--active': dateType == 1 }" @click="changeDateType(1)">1天</view>
					<view class="dateTabsBox-control__item" :class="{ 'dateTabsBox-control__item--active': dateType == 2 }" @click="changeDateType(2)">1周</view>
				</view>
			</view>
			<view class="echartBox">
				<view class="echartBox-wrapper">
					<view @click="echarts.onClick" :id="option.id" :prop="option" :change:prop="echarts.updateEcharts" class="echartBox-plane"></view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	props: {
		title: String,
		currencyName: String,
		dateTabsActive: Number,
		exchange: String,
		contractType: String,
		needData: Array
	},
	data() {
		return {
			dateType: 1,
			/* 图表相关 */
			option: {
				title: {
					show: false
				},
				animation: true,
				tooltip: {
					trigger: 'axis'
				},
				legend: {
					left: 'right'
				},
				dataZoom: [
					{
						type: 'inside',
						realtime: true,
						start: 80,
						end: 100
					}
				],
				grid: {
					left: uni.upx2px(4),
					right: uni.upx2px(4),
					top: uni.upx2px(60),
					bottom: uni.upx2px(15),
					containLabel: true
				},
				xAxis: {
					type: 'category',
					boundaryGap: false,
					data: [],
					axisLabel: {
						show: false
					},
					axisLine: {
						show: true
					},
					axisTick: {
						show: true,
						inside: true
					}
				},
				yAxis: [
					{
						type: 'value',
						axisLabel: {
							fontSize: uni.upx2px(20),
							fontFamily: 'DINPro',
							fontWeight: 500
						},
						min: 0,
						max: 1,
						axisLine: {
							show: true
						},
						axisTick: {
							show: true,
							inside: true
						}
					},
					{
						type: 'value',
						axisLabel: {
							fontSize: uni.upx2px(20),
							fontFamily: 'DINPro',
							fontWeight: 500
						},
						axisLine: {
							show: true
						},
						axisTick: {
							show: true,
							inside: true
						}
					}
				],
				series: [
					{
						name: '开多比例',
						type: 'line',
						stack: '开多比例',
						data: [],
						symbol: 'circle',
						color: '#cb0101',
						yAxisIndex: 0,
						lineStyle: {
							width: uni.upx2px(2)
						}
					},
					{
						name: '报价',
						type: 'line',
						stack: '报价',
						data: [],
						symbol: 'circle',
						color: '#be7b25',
						yAxisIndex: 1,
						lineStyle: {
							width: uni.upx2px(2)
						}
					}
				]
			}
		};
	},
	created() {
		// 设置随机数id
		let t = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
		let len = t.length
		let id = ''
		for (let i = 0; i < 32; i++) {
			id += t.charAt(Math.floor(Math.random() * len))
		}
		this.option.id = id
	},
	watch: {
		needData(newValue, oldValue) {
			let xAxisData = [];
			
			let seriesRadioData = [];
			let seriesPriceData = [];
			
			newValue.forEach((item, index) => {
				xAxisData.push(item.timeString);
				seriesRadioData.push(item.buyRate);
				seriesPriceData.push(item.price);
			});
			
			this.option.xAxis.data = xAxisData;
			this.option.series[0].data = seriesRadioData;
			this.option.series[1].data = seriesPriceData;
		},
		dateType(newValue, oldValue) {
			this.getLongshortKdata();
		}
	},
	mounted() {
		let xAxisData = [];
		
		let seriesRadioData = [];
		let seriesPriceData = [];
		
		this.needData.forEach((item, index) => {
			xAxisData.push(item.timeString);
			seriesRadioData.push(item.buyRate);
			seriesPriceData.push(item.price);
		});
		
		this.option.xAxis.data = xAxisData;
		this.option.series[0].data = seriesRadioData;
		this.option.series[1].data = seriesPriceData;
	},
	methods: {
		getLongshortKdata() {
			this.$Ajax(
				'/front/data/contract/currency/kdata',
				{
					type: this.dateTabsActive, //时间类型[1=5分钟，2=1小时，3=4小时]
					currencyName: this.currencyName,
					exchange: this.exchange, //交易所[综合传all，其他传对应交易所名称]
					contractType: this.contractType, //合约类型[综合传all，其他传对应交易所类型]
					kType: this.dateType //K线时间类型[1=1天/2小时，2=1周/6小时]
				},
				res => {
					// console.log(JSON.stringify(res));
					if (res.code == 0) {
						let xAxisData = [];

						let seriesRadioData = [];
						let seriesPriceData = [];

						res.obj.forEach((item, index) => {
							xAxisData.push(item.timeString);
							seriesRadioData.push(item.buyRate);
							seriesPriceData.push(item.price);
						});

						this.option.xAxis.data = xAxisData;
						this.option.series[0].data = seriesRadioData;
						this.option.series[1].data = seriesPriceData;
					}
				}
			);
		},
		changeDateType(index) {
			if (this.dateType != index) {
				this.dateType = index;
				// this.getLongshortKdata();
			}
		},
		onViewClick(options) {
			console.log(options);
		}
	}
};
</script>

<script module="echarts" lang="renderjs">
let myChart
export default {
	data() {
		return {
			timeoutId: null,
			myChart: null
		}
	},
	mounted() {
		if (typeof window.echarts === 'object') {
			this.initEcharts()
		} else {
			// 动态引入较大类库避免影响页面展示
			const script = document.createElement('script')
			// view 层的页面运行在 www 根目录，其相对路径相对于 www 计算

			// #ifdef APP-PLUS
			script.src = 'static/js/echarts.js';
			// #endif
			// #ifdef H5
			script.src = '/static/js/echarts.js';
			// #endif

			// script.src = 'static/echarts.js'
			script.onload = this.initEcharts.bind(this)
			document.head.appendChild(script)
		}
	},
	methods: {
		initEcharts() {
			this.myChart = echarts.init(document.getElementById(this.option.id));
			this.updateEcharts(this.option);
		},
		updateEcharts(newValue) {
			let that = this;
			if (this.myChart) {
				this.myChart.showLoading()
				// 因App端，回调函数无法从renderjs外传递，故在此自定义设置相关回调函数
				if (newValue) {
					// newValue.tooltip.formatter = function formatter(value) {
					// 	let needData = value;
					// 	needData = (needData * 100).toFixed(2) + '%';
					// 	return needData;
					// }
					
					// newValue.series[0].tooltip.formatter = function formatter(value) {
					// 	let needData = value;
					// 	needData = (needData * 100).toFixed(2) + '%';
					// 	return needData;
					// }
					
					newValue.yAxis[0].axisLabel.formatter = function formatter(value) {
						let needData = value;
						needData = (needData * 100).toFixed(2) + '%';
						return needData;
					}
					
					newValue.yAxis[1].min = function(value) {
						let needData = value.min - 100;
						needData = needData.toFixed(0);
						return needData;
					}
				}
				// 设置新的option
				this.myChart.clear();
				this.myChart.setOption(newValue, true, true);
				this.myChart.hideLoading()
			}
			// else{
			// 	this.myChart.clear();
			// 	this.myChart.setOption(newValue, true, true)
			// }
			
			// setTimeout(()=>{
			// 	this.myChart.setOption(newData, true, true)
			// },500)
		},
		yAxisAxisLabelFormatter() {
			return params => {
				let result = ''
				for (let i in params) {
					result += params[i].data
				}
				return result
			}
		},
		onClick(event, ownerInstance) {
			// 调用 service 层的方法
			ownerInstance.callMethod('onViewClick', {
				test: 'test'
			})
		}
	}
}
</script>

<style lang="scss" scoped>
.main {
	padding: 0 30upx;
}

.dateTabsBox {
	width: 100%;
	margin-bottom: 30upx;
	&-control {
		@include flexLeft;
		&__item {
			color: $globalColor-fontStyle;
			font-size: 28upx;
			font-weight: 300;
			position: relative;
			margin-right: 30upx;

			&:last-child {
				margin-right: 0;
			}

			&::after {
				content: '';
				@include initTransition(0.4);
				display: inline-block;
				width: 24upx;
				height: 4upx;
				background-color: transparent;
				position: absolute;
				z-index: 1;
				bottom: -12upx;
				left: 50%;
				transform: translateX(-50%);
			}

			&--active {
				&::after {
					background-color: $globalColor-style;
				}
			}
		}
	}
}

.echartBox {
	&-wrapper {
		background-color: #ffffff;
		padding: 30upx;
		border-radius: 20upx;
	}
	&-plane {
		width: 100%;
		height: 360upx;
	}
}
</style>
