
<template>
	<view>
		<view class="qiun-columns">
			<view class="canvasBox">
				<canvas canvas-id="canvasRing" id="canvasRing" class="canvas"></canvas>
			</view>
		</view>
	</view>
</template>
 
<script>
	import uCharts from '@/components/u-charts/u-charts.js';
	var _self;
	var canvasRing = {};
	export default {
		props: {
		   SharesFales: Object,
		},
		data() {
			return {
				cWidth3:'',//圆弧进度图
				cHeight3:'',//圆弧进度图
				arcbarWidth:'',//圆弧进度图，进度条宽度,此设置可使各端宽度一致
				pixelRatio:1,
				shares_total:'',
				shares_stock:'',
			}
		},
		props:['SharesFales'],
		mounted() {
			_self = this;
			this.cWidth3=uni.upx2px(190);//这里要与样式的宽高对应
			this.cHeight3=uni.upx2px(220);//这里要与样式的宽高对应
			this.arcbarWidth=uni.upx2px(10);
			// console.log("进来了")
			this.time = setTimeout(this.initData, 1000);
			console.log("time",this.time)
		},
		created() {
			if(this.t != null){
				clearTimeout(this.t)
			}
		},
		watch:{
			SharesFales(){
				this.initData();
			},
			shares_total(){
				if(this.shares_total >= 10000 && this.shares_total <= 10000000){
					this.shares_total = ((this.shares_total/10000).toFixed(0))+ '万';
					// console.log("this.shares_total_1：",this.shares_total);
				}else if(this.shares_total > 10000000){
					// this.shares_total = ((this.shares_total/100000000).toFixed(0))+ '亿';
					let total = Number(this.shares_total.toString().match(/^\d+(?:\.\d{0,2})?/))/100000000;
					this.shares_total = (Math.floor(total * 100) / 100)+ '亿';
					// console.log("this.shares_total_2：",this.shares_total);
				}else{
					this.shares_total = this.shares_total;
					// console.log("this.shares_total_3：",this.shares_total);
				}
			},
			shares_stock(){
				if(this.shares_stock >= 10000 && this.shares_stock <= 10000000){
					this.shares_stock = ((this.shares_stock/10000).toFixed(0))+ '万';
					// console.log("this.shares_stock_1：",this.shares_stock);
				}else if(this.shares_stock > 10000000){
					let stock = Number(this.shares_stock.toString().match(/^\d+(?:\.\d{0,2})?/))/100000000;
					this.shares_stock = (Math.floor(stock * 100) / 100)+ '亿';
					// console.log("this.shares_stock_2：",this.shares_stock);
				}else{
					this.shares_stock = this.shares_stock;
					// console.log("this.shares_stock_3：",this.shares_stock);
				} 
			},
		},
		methods: {
			initData(){
				_self = this;
				let Arcbar1 = {
					//图表数据
					series: [{
						data: (((this.SharesFales.shares_stock*1+this.SharesFales.shares_fales*1)/this.SharesFales.shares_total)).toFixed(1), //数据显示
						color: "#2537D8",
						name: this.shares_stock + '/' + (this.shares_total)
					}],
				}
				this.shares_total = this.SharesFales.shares_total;
				this.shares_stock = (this.SharesFales.shares_stock*1+this.SharesFales.shares_fales*1);
				// console.log("shares_total：",this.shares_total);
				console.log("shares_stock：",this.shares_stock);
				_self.showArcbar("canvasRing",Arcbar1,this.SharesFales);
			},
			showArcbar(canvasId,chartData,SharesFales){
				canvasRing=new uCharts({
					$this:_self,
					canvasId: canvasId,
					type: 'arcbar',
					fontSize:10,
					legend:{show:false},
					background:'#999999',
					pixelRatio:_self.pixelRatio,
					series: chartData.series,
					animation: true,
					width: _self.cWidth3*_self.pixelRatio,
					height: _self.cHeight3*_self.pixelRatio,
					dataLabel: true,
					title: {
						name: (((this.SharesFales.shares_stock*1+this.SharesFales.shares_fales*1)/this.SharesFales.shares_total)*100).toFixed(1)+'%',//这里我自动计算了，您可以直接给任意字符串
						color: chartData.series[0].color,
						fontSize: 18*_self.pixelRatio
					},
					subtitle: {
						name: chartData.series[0].name,//这里您可以直接给任意字符串
						color: '#666666',
						fontSize: 10*_self.pixelRatio
					},
					extra: {
						arcbar:{
							type:'circle',//整圆类型进度条图
							width: _self.arcbarWidth*_self.pixelRatio,//圆弧的宽度
							startAngle:0.5//整圆类型只需配置起始角度即可
						}
					}
				});
				
			}
		}
	}
</script>
 
<style lang="scss">
	.qiun-columns {
		width: 250upx;
		height: 170upx;
	}
 
	.canvasBox {
		width: 250upx;
		height: 170upx;
		position: relative;
 
		.canvas {
			position: absolute;
			top: 50%;
			left: 50%;
			transform: translate(-50%, -50%);
			width: 200upx;
			height: 200upx;
		}
 
	}
 
</style>