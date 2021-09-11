<template>
	<view class="echartPages">
		<view class="main">
			<view class="echartBox">
				<view class="echartBox-wrapper">
					<view @click="echarts.onClick" :prop="option" :change:prop="echarts.updateEcharts" id="dayIncomeEcharts" class="echartBox-plane"></view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	props: {
		traderId: String
	},
	data() {
		return {
			/* 图表相关 */
			option: {
				title: {
					show: true,
					text: '日交易笔数',
					textStyle: {
						fontSize: uni.upx2px(32),
						fontFamily: 'DINPro',
						fontWeight: 700
					}
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
					top: uni.upx2px(75),
					bottom: uni.upx2px(0),
					containLabel: true
				},
				xAxis: {
					type: 'category',
					boundaryGap: true,
					axisLabel: {
						fontSize: uni.upx2px(18),
						fontFamily: 'DINPro',
						fontWeight: 300
					},
					data: []
				},
				yAxis: {
					type: 'value',
					axisLabel: {
						fontSize: uni.upx2px(18),
						fontFamily: 'DINPro',
						fontWeight: 300
					}
				},
				series: [
					{
						name: '买入',
						stack: '买入',
						data: [],
						type: 'bar',
						color: '#cc000e'
					},
					{
						name: '卖出',
						stack: '卖出',
						data: [],
						type: 'bar',
						color: '#e2b54e'
					}
				]
			}
		};
	},
	watch: {
		traderId(newValue, oldValue) {
			this.getUserDailyProfit();
		}
	},
	mounted() {
		this.init();
	},
	methods: {
		init() {
			this.getUserDailyProfit();
		},
		//总收益图表
		getUserDailyProfit() {
			this.$Ajax(
				'/front/trader/daily/trade/count',
				{
					traderId: this.traderId
				},
				res => {
					// console.log('月收益' + JSON.stringify(res));
					if (res.code == 0) {
						let xAxisData = [];
						let seriesData = [];
						this.option.xAxis.data = res.obj.categories;
						this.option.series[0].data = res.obj.series[0].data;
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
			myChart = echarts.init(document.getElementById('dayIncomeEcharts'))
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
		height: 400upx;
	}
}
</style>
