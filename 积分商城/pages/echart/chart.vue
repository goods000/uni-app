<template>
	<view class="echartPages">
		<view class="profitBox-assets">
			<view class="profitBox-assets__item">
				<view class="profitBox-charts">
					<view class="main">
						<view class="echartBox">
							<canvas canvas-id="canvaLineA" id="canvaLineA" class="charts" disable-scroll=true @touchstart="touchLineA"
							 @touchmove="moveLineA" @touchend="touchEndLineA"></canvas>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import uCharts from '@/components/u-charts/u-charts.js';
	import webUrl from '@/common/js/url.js'
	var _self;
	var canvaLineA = null;
	export default {
		data() {
			return {
				cWidth: '',
				cHeight: '',
				pixelRatio: 1,
				serverData: '',
				ProfitRecord: '',
				webUrl: webUrl.webUrl,
				chartData: '',
				categories: [],
				series: [],
			};
		},
		props: {
			showChartRam: Number,
		},
		mounted() {
			_self = this;
			this.cWidth = uni.upx2px(750);
			this.cHeight = uni.upx2px(325);

			this.getServerData();
		},
		watch: {
			showChartRam(newValue) {
				this.getServerData();
			}
		},
		methods: {
			getServerData() {
				let LineA = {
					// categories: ['03/06', '03/07', '03/08', '03/09', '03/10', '03/11','03/12', '03/13','03/14', '03/15','03/16', '03/17','03/18', '03/19','03/20', '03/21'],
					categories: [],
					series: [{
						name: '',
						data: [],
						// data: [2.5, 1.68, 3.01, 3.79, 0.68, 1.5, 2.37, 1.68, 3.01, 3.79, 0.68, 1.5, 2.37],
						type: 'line',
						style: 'straight', //这里的类型改成曲线 curve  默认是 straight直线
						"disableLegend": false,
						color: '#F5D279'
					}]
				};
				// _self.showLineA('canvaLineA', LineA);
				this.$Ajax('/front/mine/getTPDPriceList', {}, res => {
					if (res.code == 0) {
						// let LineA = {categories:[],series:[]};
						res.obj.forEach((item, index) => {
							let createTime = item.createTime.substr(5, 5);
							// console.log(createTime);
							LineA.categories.push(createTime);
							// LineA.categories.push(item.createTime);
							LineA.series[0].data.push(item.money);
						});
						// console.log(LineA)
						// let list = Object.values(LineA); // list 转换成功的数据
						// console.log(list)
						_self.showLineA("canvaLineA", LineA);
					}
				});
			},
			showLineA(canvasId, chartData) {
				canvaLineA = new uCharts({
					$this: _self,
					canvasId: canvasId,
					type: 'area',
					fontSize: 10,
					legend: {
						show: false
					},
					dataLabel: true,
					dataPointShape: true, //折线图拐点
					background: '#040100',
					pixelRatio: 1,
					categories: chartData.categories,
					series: chartData.series,
					animation: true,
					enableScroll: true, //开启图表拖拽功能
					xAxis: {
						type: 'dash',
						gridColor: '#A5A5A5',
						gridType: 'dash',
						dashLength: 0,
						disabled: false,
						disableGrid: true,
						data: [{
							axisLine: true, //坐标轴轴线是否显示
							calibration: true, //坐标轴刻度线
							axisLineColor: '#A5A5A5', //坐标轴轴线颜色
						}],
						itemCount: 5, //x轴单屏显示数据的数量，默认为5个
						scrollShow: true, //新增是否显示滚动条，默认false
						scrollAlign: 'right', //滚动条初始位置
						scrollBackgroundColor: '#000000', //默认为 #EFEBEF
						scrollColor: '#000000', //默认为 #A6A6A6
					},
					yAxis: {
						gridType: 'dash',
						gridColor: '#1E1E1E',
						dashLength: 0,
						splitNumber: 5,
						disabled: false, //不绘制Y轴
						disableGrid: false, //不绘制Y轴网格
						data: [{
							// position: 'left',
							axisLine: false, //坐标轴轴线是否显示
							calibration: false, //坐标轴刻度线
							axisLineColor: '#A5A5A5', //坐标轴轴线颜色
						}],
						format: (val) => {
							return val.toFixed(2)
						}
					},
					width: _self.cWidth * _self.pixelRatio,
					height: _self.cHeight * _self.pixelRatio,
					extra: {
						lineStyle: 'straight',
						area: {
							type: 'straight',
							opacity: 0.2,
							addLine: true,
							gradient: true,
							width: 1
						}
					}
				});
			},
			touchLineA(e) {
				canvaLineA.scrollStart(e);
			},
			moveLineA(e) {
				canvaLineA.scroll(e);
			},
			touchEndLineA(e) {
				canvaLineA.scrollEnd(e);
				//下面是toolTip事件，如果滚动后不需要显示，可不填写
				canvaLineA.showToolTip(e, {
					format: function(item, category) {
						return category + ' ' + item.name + ':' + item.data
					}
				});
			},
		},
	};
</script>


<style lang="scss" scoped>
	// @import '@/common/scss/pages/profit/profit';
	.main {
		/*样式的width和height一定要与定义的cWidth和cHeight相对应*/
		width: 100%;
		height: 100%;

		.echartBox {
			flex: 1;
			width: 100%;

			// height: 400px;
			canvas {
				width: 100%;
				// height: 100%;
			}
		}
	}
</style>
