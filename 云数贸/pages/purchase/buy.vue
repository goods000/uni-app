<template>
	<view class="pages contentBg">
		<view class="header_bar header_bg header_border">
			<view class="header">
				<view class="header-back" @click="$tools.back(1)"></view>
				<view class="header-title">购买</view>
			</view> 
		</view> 
		<view class="orderBox">
			<view class="tipsBox">
				<view class="tipsBox-title">
					<view class="tipsBox-title__label">选择购买股种</view>
				</view>
			</view>
			<view class="buyBox">
				<view class="buyBox-wrapper">
					<view class="buyBox-list">
						<view class="initNoData" v-if="SharesList.length == 0">暂无数据</view>
						<view class="buyBox-list__item" v-for="(item,index) in SharesList" :key="index"
						@click="changeType(index,item.id,item.remarks)" :class="{'buyBox-list__item--active' : index == changeIndex }">
							<view class="buyBox-list__item-title">{{ item.name }}</view>
							<view class="buyBox-list__item-price">{{ item.newest }}CNY</view>
						</view>
					</view>
				</view>
			</view>
			<view class="tipsBox">
				<view class="tipsBox-title">
					<view class="tipsBox-title__label">购买数量</view>
				</view>
			</view>
			<view class="inputBox">
				<view class="inputBox-wrapper">
					<view class="inputBox-btn" @click="minusBtn()">
						<image src="../../static/public/icon-public-reduce.png" mode="widthFix"></image>
					</view>
					<view class="inputBox-input">
						<input type="text" v-model="quantity" />
					</view>
					<view class="inputBox-btn" @click="plusBtn()">
						<image src="../../static/public/icon-public-plus.png" mode="widthFix"></image>
					</view>
				</view>
			</view>
			<view class="introduceBox">
				<view class="introduceBox-wrapper">
					<view class="introduceBox-title">股种介绍：</view>
					<view class="introduceBox-txt">{{txt}}</view>
				</view>
			</view>
		</view>
		
		
		<view class="orderBtn">
			<view class="orderBtn-btn" @click="config()">立即购买</view>
		</view>
	</view>
</template>

<script>
	export default {
			data(){
				return{
					orderId:'',
					id:'',
					typeList:[
						{title:'YSM原始股',price:'500'},{title:'夏威夷',price:'20'},{title:'中国石油',price:'42'},{title:'YSM工业',price:'24'},{title:'YSM共享',price:'1'},
					],
					SharesList:[],
					quantity:1,
					txt:'暂无介绍，点击股种类型展示介绍',
					changeIndex:0,
					index:0,
				}
			},
			onShow() {
				this.init();
			},
			methods: {
				init(){
					this.getSharesList();// 获取股票列表
				},
				// 获取股票列表
				getSharesList() {
					this.$Ajax('/front/shares/getSharesList', {}, res => {
						if (res.code == 0) {
							this.SharesList = res.obj;
							this.id = this.SharesList[0].id;
							this.txt = this.SharesList[0].remarks;
						}
					});
				},
				changeType(index,id,remarks){
					this.changeIndex = index;
					if (this.changeIndex === index) {
						this.txt = remarks;
					}
					// if (this.changeIndex != index) {
					// 	this.changeIndex = index;
					// }
					this.id = id;
					console.log("this.id",this.id);
					console.log("index：",index);
					console.log("this.changeIndex：",this.changeIndex);
				},
				config(){
					// console.log("this.id：",this.id);
					if (this.id == '') {
						return this.$tools.toast('请选择购买股票类型');
					}
					if (!/^[1-9]\d*$/.test(this.quantity)) {
						return this.$tools.toast('请输入正整数');
					}
					this.$tools.jump('../order/upload',this.quantity,this.id,)
				},
				minusBtn() {
					if (this.quantity > 1) {
						this.quantity--;
					}
				},
				plusBtn() {
					this.quantity++;
				},
			},
		}
	</script>

<style lang="scss" scoped>
	@import '@/common/scss/pages/order/orderDetails';
	.buyBox{
		&-wrapper{
			// padding: 36upx 0upx;
		}
		&-list{
			@include flexLeft;
			flex-wrap: wrap;
			&__item{
				border: 1px solid $globalColor-border;
				width: 28%;
				margin: 0upx 0 30upx 30upx;
				padding: 26upx 20upx;
				&--active{
					background: $globalColor-style;
					border:  1px solid $globalColor-style;
				}
				&-title{
					font-size: 28upx;
					font-family: DINPro;
					font-weight: 500;
					color: $globalColor-white;
				}
				&-price{
					font-size: 32upx;
					font-family: DINPro;
					font-weight: 500;
					color: $globalColor-white;
				}
			}
		}
	}
	.inputBox{
		margin: 0 30upx;
		&-wrapper{
			border: 1px solid $globalColor-border;
			width: 100%;
			@include flexBetween;
			margin-bottom: 40upx;
		}
		&-btn{
			@include flexBetween;
			padding: 30upx;
			background: rgba(255, 46, 46, 0.1);
			width: 92upx;
			height: 92upx;
			image{
				width: 100%;
			}
		}
		&-input{
			width: 100%;
			font-size: 32upx;
			font-family: DINPro;
			font-weight: bold;
			color: $globalColor-white;
			text-align: center;
		}
	}
	.introduceBox{
		&-wrapper{
			border-top: 18upx solid $globalColor-bgStyle;
			padding: 57upx 30upx;
			min-height: 30vh;
		}
		&-title{
			font-size: 32upx;
			font-family: PingFang SC;
			font-weight: bold;
			color: $globalColor-white;
			margin-bottom: 27upx;
		}
		&-txt{
			font-size: 28upx;
			font-family: PingFang SC;
			font-weight: 500;
			color: $globalColor-white;
			line-height: 44upx;
			max-height: 11vh;
			overflow: scroll;
		}
	}
	.orderBtn{
		background: $globalColor-bgColor;
	}
</style>
