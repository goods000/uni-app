<template>
	<view class="pages">
		<view class="">
			<view class="header_bar header_bg header_border">
				<view class="header">
					<view class="header-back" @click="$tools.back(1)"></view>
					<view class="header-title">商家申请</view>
				</view> 
			</view> 
			<view class="" v-if="status == null">
				<view class="businessOrder-list flex">
					<view class="businessOrder-list-label">商家姓名</view>
					<view class="businessOrder-list-title">
						<input type="text" placeholder="请输入您的姓名" v-model="username"/>
					</view>
				</view>
				<view class="businessOrder-list flex">
					<view class="businessOrder-list-label">收款方式绑定</view>
					<view class="businessOrder-list-title" v-if="paymentList == ''">
						<input type="text" placeholder="暂未绑定" disabled/>
						<text class="type" @click="$tools.jump('../payment/addPayment')">前往绑定</text>
					</view>
					<view class="businessOrder-list-title" v-else>
						<input type="text" placeholder="已绑定" disabled/>
						<text class="type" @click="$tools.jump('../payment/payment')">已绑定</text>
					</view>
				</view>
				<view class="businessOrder-list flex">
					<view class="businessOrder-list-label">保证金</view>
					<view class="businessOrder-list-title">
						<input type="text" :value="money" disabled/>
						<text>USDT</text>
					</view>
				</view>
				
				<view class="businessOrder-list">
					<view class="businessOrder-list-label">钱包密码</view>
					<view class="businessOrder-list-title">
						<input type="password" placeholder="请输入钱包密码" v-model="password"/>
					</view>
				</view>
				<view class="mt"></view>
				<view class="formBox">
					<view class="initBtn" @click="submit()">提交申请</view>
				</view>
			</view>
			
			<view class="statusBox" v-if="status == 3">
				<image src="../../static/business/icon-businessApply-02.png" mode="widthFix"></image>
				<view class="statusBox-title">商家申请失败 <br> 请重新提交申请~</view>
				<view class="initBtn" @click="status = null">重新申请</view>
			</view>
			<view class="statusBox" v-if="status == 2">
				<image src="../../static/business/icon-businessApply-03.png" mode="widthFix"></image>
				<view class="statusBox-title">商家申请成功</view>
			</view>
			<view class="statusBox" v-if="status == 1">
				<image src="../../static/business/icon-businessApply-01.png" mode="widthFix"></image>
				<view class="statusBox-title">商家申请审核中</view>
			</view>
			
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				username:'',
				money:'',
				password:'',
				paymentList:[],
				status:null,
				fee:'',
			}
		},
		onShow() {
			this.init();
		},
		methods: {
			init() {
				this.getOtcStoreApply();
				this.getPayList();
				this.getCashDeposit();
			},
			// 申请状态
			getOtcStoreApply() {
				let that = this;
				this.$Ajax('/front/user/getOtcStoreApply', {}, res => {
					console.log(JSON.stringify(res));
					if (res.code == 0) {
						this.status = res.obj.status;
					}
				});
			},
			// 获取支付
			getPayList() {
				let that = this;
				this.$Ajax('/front/otc/publishPay', {}, res => {
					if (res.code == 0) {
						this.paymentList = res.obj;
					}
				});
			},
			// 获取保证金
			getCashDeposit() {
				this.$Ajax('/front/user/getCashDeposit', {}, res => {
					if (res.code == 0) {
						this.money = res.obj;
					}
				});
			},
			submit(){
				let that =this;
				if(that.username == ''){
					return that.$tools.toast('请输入您的姓名');
				}
				if(that.paymentList == ''){
					return that.$tools.toast('请前往绑定收款方式');
				}
				if(that.password == ''){
					return that.$tools.toast('请输入钱包密码');
				}
				that.$Ajax('/front/user/otcStoreApply', {
					name: that.username,
					money: that.money,
					pwd: that.password,
				}, res => {
					if (res.code == 0) {
						that.username ='',
						that.password ='',
						that.status = res.obj.status,
						that.$tools.toast(res.msg);
					}
				});
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import '@/common/scss/pages/setting/setting';
	@import '@/common/scss/pages/business/businessOrder';
	page{background: #FFFFFF;}
	.businessOrder{
		&-list{
			&-title{
				input{
					text-align: right;
				}
				text{
					margin-left: 35upx;
				}
			}
		}
	}
	.release_tabs{
		background: $globalColor-white;
		padding:  20upx 94upx 0;
		margin-bottom: 12upx;
		&-list{
			@include flexBetween;
			// padding: 0 94upx;
			&-txt{
				margin-right: 68upx;
				color: #999999;
				font-size: 28upx;
				padding-bottom: 12upx;
				border-bottom:2px solid transparent;
			}
			.active{
				color: $globalColor-style;
				border-bottom:2px solid $globalColor-style;
			}
		}
	}
	.formBox{
		margin: 12upx 0 0;
		&-input{
			textarea{
				height: 120upx;
				border-bottom: 1px solid #F5F5F5;
			}
			&-ways{
				@include flexBetween;
				border-bottom: 1px solid #F5F5F5;
				padding-bottom: 38upx;
				&-txt{
					width: 32.33%;
					border: 1px solid #DDDDDD;
					border-radius: 8upx;
					padding: 22upx 0;
					@include flexCenter;
					image{
						width: 32upx;
						height: 32upx;
						margin-right: 12upx;
					}
					text{
						color: #DDDDDD;
						font-size: 26upx;
					}
				}
				&-txtNo{
					color: #999999;
					font-size: 28upx;
					margin:10upx 0;
				}
				.active{
					color: $globalColor-style;
					border:1px solid $globalColor-style;
					text{
						color: $globalColor-style;
					}
				}
			}
		}
		&-tips{
			padding-bottom: 12%;
		}
	}
	.flex{
		// justify-content: flex-start;
		input{
			text-align: left;
			justify-content: flex-start;
		}
		.businessOrder-list-title{
			width: 65%;
			display: flex;
			justify-content: space-between;
			align-items: center;
		}
		.type{
			background: url(../../static/public/icon-arrow-right-grey.png) no-repeat;
			background-size: 18upx 22upx;
			background-repeat: no-repeat;
			background-position: center right 0upx;
			color: $globalColor-style;
			font-size: 28upx;
			white-space: nowrap;
			padding-right: 40upx;
		}
	}
	.statusBox{
		
		image{
			width: 30%;
			margin: 20% auto 2%;
		}
		&-title{
			color:#999999;
			font-size: 28upx;
			text-align: center;
			margin-bottom: 25%;
		}
	}
</style>
