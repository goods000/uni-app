<template>
	<view class="echartPages">
		<view class="main">
			<view class="echartBox">
				<view class="echartBox-wrapper">
					<view @click="echarts.onClick" :prop="option" :change:prop="echarts.updateEcharts" id="totalTradeCountEcharts" class="echartBox-plane"></view>
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
					text: '交易总笔数',
					textStyle: {
						fontSize: uni.upx2px(32),
						fontFamily: 'DINPro',
						fontWeight: 700
					}
				},
				animation: true,
				tooltip: {
					trigger: 'item',
					formatter: '{b} - ({d}%)'
				},
				legend: {
					top: 'bottom',
					left: 'center'
				},
				grid: {
					left: uni.upx2px(4),
					right: uni.upx2px(4),
					top: uni.upx2px(75),
					bottom: uni.upx2px(0),
					containLabel: true
				},
				series: [
					{
						type: 'pie',
						data: [],
						width: '80%',
						height: '80%',
						top: 'middle',
						left: 'center',
						emphasis: {
							itemStyle: {
								shadowBlur: 10,
								shadowOffsetX: 0,
								shadowColor: 'rgba(0, 0, 0, 0.5)'
							}
						},
						label: {
							formatter: '{d}%'
							// formatter: '{b} - ({d}%)'
						}
					}
				]
			}
		};
	},
	watch: {
		traderId(newValue, oldValue) {
			this.getUserTradeTotalCount();
		}
	},
	mounted() {
		this.init();
	},
	methods: {
		init() {
			this.getUserTradeTotalCount();
		},
		//交易总笔数
		getUserTradeTotalCount() {
			this.$Ajax(
				'/front/trader/total/count',
				{
					traderId: this.traderId
				},
				res => {
					console.log('交易总笔数' + JSON.stringify(res));
					if (res.code == 0) {
						let seriesData = res.obj.series;
						seriesData.forEach((item)=>{
							item.value = item.data;
						})
						this.option.series[0].data = seriesData;
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
			myChart = echarts.init(document.getElementById('totalTradeCountEcharts'))
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
