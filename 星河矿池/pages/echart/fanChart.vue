<template>
	<view class="echartPages">
		<view class="main">
			<view class="echartBox">
				<canvas canvas-id="canvasRing" id="canvasRing" class="charts"></canvas>
			</view>
		</view>
	</view>
</template>

<script>
	import uCharts from '@/components/u-charts/u-charts.js';
	var _self;
	var canvaRing = null;

	export default {
		data() {
			return {
				cWidth: '',
				cHeight: '',
				pixelRatio: 1,
				serverData: '',
			}
		},
		mounted() {
			_self = this;
			this.cWidth = uni.upx2px(350);
			this.cHeight = uni.upx2px(300);
			// this.getServerData();
			this.showRing('canvasRing')
		},
		methods: {
			// 这是官网给的调接口渲染数据的代码，我写的没有后台数据，自己写的固定的数据  就注销了
			// getServerData() {
			// 	uni.request({
			// 		url: 'https://www.ucharts.cn/data.json',
			// 		data: {},
			// 		success: function(res) {
			// 			console.log(res.data.data)
			// 			let Ring = {
			// 				series: []
			// 			};
			// 			//这里我后台返回的是数组，所以用等于，如果您后台返回的是单条数据，需要push进去
			// 			Ring.series = res.data.data.Ring.series;
			// 			_self.showRing("canvasRing", Ring);
			// 		},
			// 		fail: () => {
			// 			_self.tips = "网络错误，小程序端请检查合法域名";
			// 		},
			// 	});
			// },
			showRing(canvasId) {
				var chartData = {
					series: [{
						"name": "一班",
						"data": 50
					}, {
						"name": "二班",
						"data": 30
					}, {
						"name": "三班",
						"data": 20
					}, {
						"name": "四班",
						"data": 18
					}]
				};
				canvaRing = new uCharts({
					$this: _self,
					canvasId: canvasId,
					type: 'ring',
					fontSize: 11,
					padding:[5,5,5,5],
					legend:{
					  show:false,
					},
					extra: {
						pie: {
							offsetAngle: 5,
							ringWidth: 15,
							labelWidth: 15
						}
					},
					background: '#fff', // 中间圆的背景颜色
					pixelRatio: _self.pixelRatio,
					series: chartData.series,
					animation: true, // 动画  画个圆的那种
					width: _self.cWidth- uni.upx2px(100),
					height: _self.cHeight,
					disablePieStroke: true,
					dataLabel: false, //  图上红圈圈出来的线  true 显示
				});
			},
			// touchPie(e,id) {
			//   canvasObj[id].showToolTip(e, {
			//       format: function(item) {
			//           return item.name + ':' + item.data
			//       }
			//   });
			// },
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
			height: 600upx;
		}
		canvas{
			width: 100%;
			// width: calc(100% - 60upx);
		}
	}
</style>
