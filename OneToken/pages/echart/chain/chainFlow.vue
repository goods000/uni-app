<template>
	<view class="echartPages">
		<view class="main">
			<view class="echartBox">
				<view class="echartBox-wrapper">
					<view @click="echarts.onClick" :prop="option" :change:prop="echarts.updateEcharts" id="chainFlowEcharts" class="echartBox-plane"></view>
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
					// data: ['流入', '流出']
				},
				grid: {
					left: uni.upx2px(4),
					right: uni.upx2px(4),
					top: uni.upx2px(60),
					bottom: uni.upx2px(0),
					containLabel: true
				},
				xAxis: {
					show: false,
					type: 'category',
					boundaryGap: false,
					data: []
				},
				yAxis: {
					type: 'value',
					axisLabel: {
						fontSize: uni.upx2px(24),
						fontFamily: 'DINPro',
						fontWeight: 300
					}
				},
				series: [
					{
						name: '流入',
						type: 'line',
						stack: '总量',
						data: [],
						color: '#cb0101',
						symbol: 'circle',
						lineStyle: {
							width: uni.upx2px(2)
						}
					},
					{
						name: '流出',
						type: 'line',
						stack: '总量',
						data: [],
						color: '#be7b25',
						symbol: 'circle',
						lineStyle: {
							width: uni.upx2px(2)
						}
					}
				]
			}
		};
	},
	mounted() {
		console.log(this.flowData);
		if (this.flowData != undefined) {
		}
	},
	watch: {
		flowData(newValue, oldValue) {
			let xAxisData = [];
			let seriesFlowInData = [];
			let seriesFlowOutData = [];
			newValue.forEach((item, index) => {
				xAxisData.push(item.timeString);
				seriesFlowInData.push(item.inAmount);
				seriesFlowOutData.push(item.outAmount);
			});

			this.option.xAxis.data = xAxisData;
			this.option.series[0].data = seriesFlowInData;
			this.option.series[1].data = seriesFlowOutData;
		}
	},
	watch: {
		currencyName(newValue, oldValue) {
			this.getDayFlowData();
		}
	},
	mounted() {
		this.init();
	},
	methods: {
		init() {
			this.getDayFlowData();
		},
		getDayFlowData() {
			this.$Ajax(
				'/front/data/chain/24h/line',
				{
					currencyName: this.currencyName
				},
				res => {
					console.log('24小时数据：' + JSON.stringify(res));
					if (res.code == 0) {
						let xAxisData = [];
						let seriesFlowInData = [];
						let seriesFlowOutData = [];

						res.obj.exchangeHisLine.forEach((item, index) => {
							xAxisData.push(item.timeString);
							seriesFlowInData.push(item.inAmount);
							seriesFlowOutData.push(item.outAmount);
						});

						this.option.xAxis.data = xAxisData;
						this.option.series[0].data = seriesFlowInData;
						this.option.series[1].data = seriesFlowOutData;
					}
				}
			);
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
			myChart = echarts.init(document.getElementById('chainFlowEcharts'))
			// 观测更新的数据在 view 层可以直接访问到
			myChart.setOption(this.option)
		},
		updateEcharts(newValue, oldValue, ownerInstance, instance) {
			// 监听 service 层数据变更
			setTimeout(()=>{
				myChart.clear();
				myChart.resize();
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
.echartBox {
	width: 100%;
	&-wrapper {
		width: 100%;
		// background-color: #ffffff;
		// padding: 30upx;
		// border-radius: 20upx;
	}
	&-plane {
		width: 100%;
		height: 360upx;
	}
}
</style>
