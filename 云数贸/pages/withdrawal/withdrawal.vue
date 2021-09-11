<template>
	<view class="contentBg">
		<view class="header_bar header_bg">
			<view class="header">
				<view class="header-back" @click="$tools.back(1)"></view>
				<view class="header-title">提现</view>
				<view class="header-right" @click="$tools.jump('./withdrawalRecord')">
					<image src="../../static/public/icon-record.png" mode="widthFix"></image>
				</view>
			</view> 
		</view> 
		
		<view class="mb-border">
			<view class="orderBox">
				<view class="tipsBox">
					<view class="tipsBox-title">
						<view class="tipsBox-title__label">银联信息</view>
					</view>
				</view>
				<view class="orderBox-list">
					<view class="orderBox-list-item">
						<view class="orderBox-list-item-title">户名：</view>
						<view class="orderBox-list-item-news">{{ name }}</view>
					</view>
					<view class="orderBox-list-item">
						<view class="orderBox-list-item-title">银行卡账号：</view>
						<view class="orderBox-list-item-news">{{ no }}</view>
					</view>
				</view>
			</view>
		</view>
		
		<view class="content">
			<view class="content-warpper">
				<view class="content-warpper-title">提现金额</view>
				<view class="content-warpper-input">
					<input type="text" placeholder="请输入提现金额" placeholder-class="inputColor" v-model="num"
					@blur="blurInput(1)" @focus="focusInput(1)"/>
					<view class="content-warpper-code" @click="allNum()">全部</view>
				</view>
			</view>
			<view class="content-using">*可用数量：{{ assetList.commission }} </view>
			<view class="content-warpper">
				<view class="content-warpper-title">交易密码</view>
				<view class="content-warpper-input">
					<input  type="password" placeholder="请输入您的交易密码" placeholder-class="inputColor" v-model="tradePwd"
					@blur="blurInput(2)" @focus="focusInput(2)"/>
				</view>
			</view>
		</view>
		
		<view class="orderBtn">
			<view class="orderBtn-btn" @click="config()">提现</view>
		</view>
		
	</view>
</template>

<script>
	export default {
			data(){
				return{
					id:'',
					num:'',
					tradePwd:'',
					address:'',
					assetList : {}, //可用数量
					bankInfo:[],
					name:'暂无',
					no:'暂无',
				}
			},
			onShow() {
				this.init();
			},
			methods: {
				init(){
					this.getBank();
					this.getStatistics();
				},
				focusInput(index) {
					this.isFocus = index;
				},
				blurInput(index) {
					this.isFocus = null;
				},
				//全部
				allNum() {
					this.num = this.assetList.commission;
				},
				// 获取银行卡信息
				getBank() {
					this.$Ajax('/front/mine/getBank', {}, res => {
						if (res.code == 0) {
							this.bankInfo = res.obj;
							this.bankInfo.forEach((item,index) => {
								this.name = item.name;
								this.no = item.no;
								this.id = item.id;
							})
						}
					});
				},
				// 获取资产
				getStatistics() {
					this.$Ajax('/front/mine/getStatistics', {}, res => {
						if (res.code == 0) {
							this.assetList = res.obj;
						}
					});
				},
				config() {
					if (this.num == '') {
						return this.$tools.toast('请输入提现金额');
					}
					if (this.tradePwd == '') {
						return this.$tools.toast('请输入您的交易密码');
					}
					this.$Ajax('/front/mine/withdrawal',
						{
							bankId: this.id,
							num: this.num,
							payPwd: this.tradePwd,
						},
						res => {
							console.log(JSON.stringify(res.data));
							if (res.code == 0) {
								this.num = '';
								this.tradePwd = '';
								this.$tools.toast(res.msg);
							}
						}
					);
				}
			},
		}
	</script>

<style lang="scss" scoped>
	@import '@/common/scss/pages/safety/safety';
	@import '@/common/scss/pages/order/orderDetails';
	.content-flex{
		border-bottom: 16upx solid $globalColor-bgStyle;
	}
</style>
