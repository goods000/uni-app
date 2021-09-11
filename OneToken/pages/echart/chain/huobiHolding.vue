<template>
	<view class="echartPages">
		<view class="main">
			<view class="dateTabsBox">
				<view class="dateTabsBox-control">
					<view class="dateTabsBox-control__item" :class="{ 'dateTabsBox-control__item--active': dateType == 1 }" @click="changeDateType(1)">5M</view>
					<view class="dateTabsBox-control__item" :class="{ 'dateTabsBox-control__item--active': dateType == 2 }" @click="changeDateType(2)">1H</view>
					<view class="dateTabsBox-control__item" :class="{ 'dateTabsBox-control__item--active': dateType == 3 }" @click="changeDateType(3)">4H</view>
					<view class="dateTabsBox-control__item" :class="{ 'dateTabsBox-control__item--active': dateType == 4 }" @click="changeDateType(4)">1D</view>
				</view>
			</view>
			<view class="echartBox">
				<view class="echartBox-wrapper">
					<view @click="echarts.onClick" :prop="option" :change:prop="echarts.updateEcharts" id="huobiHoldingEcharts" class="echartBox-plane"></view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	props: {
		currencyName: String
	},
	data() {
		return {
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
				yAxis: {
					type: 'value',
					axisLabel: {
						fontSize: uni.upx2px(24),
						fontFamily: 'DINPro',
						fontWeight: 600,
						formatter: function(value, index) {
							let needData = value;
							needData = (needData / 100000000).toFixed(2) + ' 亿';
							return needData;
						}
					},
					axisLine: {
						show: true
					},
					axisTick: {
						show: true,
						inside: true
					}
				},
				series: [
					{
						name: 'Huobi',
						type: 'line',
						stack: 'Huobi',
						data: [],
						symbol: 'circle',
						color: '#cb0101',
						lineStyle: {
							width: uni.upx2px(2)
						}
					}
				]
			},
			dateType: 4
		};
	},
	watch: {
		currencyName(newValue, oldValue) {
			this.getNetworkHoldingData();
		}
	},
	mounted() {
		this.init();
	},
	methods: {
		init() {
			this.getNetworkHoldingData();
		},
		getNetworkHoldingData() {
			this.$Ajax(
				'/front/data/exchange/hold/data',
				{
					currencyName: this.currencyName,
					type: this.dateType
				},
				res => {
					// console.log(JSON.stringify(res));
					if (res.code == 0) {
						let xAxisData = [];
						let seriesHBData = [];

						res.obj.huobiPosition.forEach((item, index) => {
							xAxisData.push(item.timeString);
							seriesHBData.push(item.allAmount);
						});

						this.option.xAxis.data = xAxisData;
						this.option.series[0].data = seriesHBData;
					}
				}
			);
		},
		changeDateType(index) {
			if (this.dateType != index) {
				this.dateType = index;
				this.getNetworkHoldingData();
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
	mounted() {
		if (typeof window.echarts === 'function') {
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
			myChart = echarts.init(document.getElementById('huobiHoldingEcharts'))
			// 观测更新的数据在 view 层可以直接访问到
			myChart.setOption(this.option)
		},
		updateEcharts(newValue, oldValue, ownerInstance, instance) {
			// 监听 service 层数据变更
			// myChart.clear();
			setTimeout(()=>{
				myChart.clear();
				myChart.setOption(newValue, true, true)
			},200)
			// myChart.setOption(newValue)
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
