<template>
	<view class="pages">
		<view class="header_bar header_bg">
			<view class="header">
				<view class="header-back" @click="$tools.back(1)"></view>
				<view class="header-title">XZ简介</view>
			</view> 
		</view> 
		<view class="main">
			<image src="../../static/ITO/icon-header-01.png" mode="widthFix" class="main-image"></image>
			<view class="main-title">
				<view class="main-title__word">XZ 项目由新加坡 XZ 基金会发起，基于“NFT+IPFS”的创新 模式，通过 NFT 锚定 XZ 智能药柜等多样化实体智能终端， 广泛采集全球大健康医疗数据并上链 至大健康数据公链，实 现分布式存储同时构建一个链上医疗数据库，结合“大健康+ 大数据+大公链”的概念，最终打造</view>
				<image src="../../static/ITO/icon-ITO-img.png" mode="widthFix"></image>
				<view class="main-title__word">未来 AI 智能医疗体系和</view>
				<view class="main-title__word">数字医药智慧生态。</view>
			</view>
			<image src="../../static/ITO/icon-header-02.png" mode="widthFix" class="main-image"></image>
			<view class="contentBox">
				<view class="contentBox-header">限量闪兑 先兑先得</view>
				<view class="contentBox-wrapper">
					<view class="contentBox-list" v-for="(item,index) in typeList" :key="index">
						<view class="contentBox-list__header">XZ闪兑第{{ item.id }}期</view>
						<view class="contentBox-list__item">
							<view class="contentBox-list__item-box">
								<view class="contentBox-list__title">当前总量</view>
								<view class="contentBox-list__data">{{ item.quantity }}</view>
								<view class="contentBox-list__i">(XZ)</view>
							</view>
							<view class="contentBox-list__item-type">
								<!-- <echart :typeList="item.exchangeQuantity/item.quantity" ></echart> -->
								<!-- <echart :typeList="item" ></echart> -->
								<!-- <echart :typeList="typeList" ></echart> -->
								<view class="echartBox">
									<canvas :canvas-id="'canvasRing' + index" :id="'canvasRing' + index" class="canvas"></canvas>
								</view>
							</view>
						</view>
						<view class="contentBox-list__dataBox">
							<view class="contentBox-list__dataBox-item">已兑：{{ item.exchangeQuantity }}</view>
							<view class="contentBox-list__dataBox-item">剩余：{{ item.quantity - item.exchangeQuantity }}</view>
						</view>
						<view v-if="item.status == 1" class="contentBox-list__btn contentBox-list__btn--active" @click="$tools.jump('../ITO-cash/cash',item.id,item.exchangePrice)">闪兑</view>
						<view v-else class="contentBox-list__btn" @click="$tools.noOpen()">闪兑</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
// import echart from '../echart/echart.vue';
import uCharts from '@/components/u-charts/u-charts.js';
var _self;
var canvasRing = {};
export default {
	// components: {
	// 	echart
	// },
	data() {
		return {
			typeList:[],
			cWidth3:'',//圆弧进度图
			cHeight3:'',//圆弧进度图
			arcbarWidth:'',//圆弧进度图，进度条宽度,此设置可使各端宽度一致
			pixelRatio:1,
		};
	},
	onShow() {
		this.init();
		this.cWidth3=uni.upx2px(260);//这里要与样式的宽高对应
		this.cHeight3=uni.upx2px(260);//这里要与样式的宽高对应
		this.arcbarWidth=uni.upx2px(28);
	},
	methods: {
		init() {
			this.getDetails();
		},
		getDetails() {
			this.$Ajax('/front/user/exchangeRule',{},
				res => {
					// console.log(JSON.stringify(res));
					this.typeList = res.obj;
					this.initData();
				}
			);
		},
		initData(){
			_self = this;
			// console.log("进来了",JSON.stringify(this.typeList))
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
				// console.log(Arcbar1.series);
				_self.showArcbar("canvasRing"+index,Arcbar1,index);
			})
		},
		showArcbar(canvasId,chartData,index){
			// console.log("下标：",index);
			var canvasRing = "canvasRing" + index;
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
};
</script>

<style lang="scss" scoped>
	page,pages{background: #FFFFFF;}
	@import '@/common/scss/pages/ITO/introduction';
	.echartBox{
		width: 260upx;
		height: 260upx;
		overflow: hidden;
	}
	.canvas {
		width: 260upx;
		height: 260upx;
	}
</style>
