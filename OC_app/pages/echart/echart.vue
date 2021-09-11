
<template>
	<view class="echartBox">
		<canvas canvas-id="canvasRing" id="canvasRing" class="canvas"></canvas>
	</view>
</template>
 
<script>
	import uCharts from '@/components/u-charts/u-charts.js';
	var _self;
	var canvasRing = {};
	export default {
		props: {
		   typeList: Object,
		},
		data() {
			return {
				cWidth3:'',//圆弧进度图
				cHeight3:'',//圆弧进度图
				arcbarWidth:'',//圆弧进度图，进度条宽度,此设置可使各端宽度一致
				pixelRatio:1,
				total:'',
				stock:'',
			}
		},
		props:['typeList'],
		mounted() {
			_self = this;
			this.cWidth3=uni.upx2px(260);//这里要与样式的宽高对应
			this.cHeight3=uni.upx2px(260);//这里要与样式的宽高对应
			this.arcbarWidth=uni.upx2px(28);
			// console.log("进来了")
			this.initData();
			// this.time = setTimeout(this.initData, 1000);
			// console.log("time",this.time)
		},
		created() {
			if(this.t != null){
				clearTimeout(this.t)
			}
		},
		methods: {
			initData(){
				_self = this;
				this.typeList.forEach((item,index) => {
					let Arcbar1 =  {
						//图表数据
						series: [{
							// data: item.exchangeQuantity == 0 ? undefined : item.exchangeQuantity/item.quantity, //数据显示
							data: item.exchangeQuantity/item.quantity, //数据显示
							color: "#1779f6",
							name: "",
							legendShape: "circle",
							pointShape: "circle",
							show: true,
							type: "arcbar",
						}],
					};
					console.log(Arcbar1.series[0].data);
					// console.log(item.exchangeQuantity);
					// console.log("this.typeList：",JSON.stringify(this.typeList));
					_self.showArcbar("canvasRing",Arcbar1);
				})
			},
			showArcbar(canvasId,chartData){
				canvasRing=new uCharts({
					$this:_self,
					canvasId: canvasId,
					type: 'arcbar',
					fontSize:10,
					legend:{show:false},
					background:'#fff',
					pixelRatio:_self.pixelRatio,
					series: chartData.series,
					animation: false,
					width: _self.cWidth3*_self.pixelRatio,
					height: _self.cHeight3*_self.pixelRatio,
					dataLabel: true,
					// title: {
					// 	name: '当前总量',//这里我自动计算了，您可以直接给任意字符串
					// 	color: '#333333',
					// 	fontSize: 12*_self.pixelRatio
					// },
					// subtitle: {
					// 	name: '222',//这里您可以直接给任意字符串
					// 	color: '#1779f6',
					// 	fontSize: 18*_self.pixelRatio
					// },
					extra: {
						arcbar:{
							type:'circle',//整圆类型进度条图
							width: _self.arcbarWidth*_self.pixelRatio,//圆弧的宽度
							startAngle:1.5,//整圆类型只需配置起始角度即可
							backgroundColor: '#EFD09A', //环形图的剩余百分比颜色
						}
					}
				});
			}
		}
	}
</script>
 
<style lang="scss">
	.echartBox{
		width: 260upx;
		height: 260upx;
		overflow: hidden;
	}
	.canvas {
		width: 260upx;
		height: 260upx;
		// position: absolute;
		// top: 50%;
		// left: 50%;
		// transform: translate(-50%, -50%);
		// width: 244upx;
		// height: 244upx;
	}
</style>