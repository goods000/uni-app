<template>
	<view class="pages">
		<view class="safety">
			<view class="header_bar header_bg header_border">
				<view class="header">
					<view class="header-back" @click="$tools.back(1)"></view>
					<view class="header-title">安全中心</view>
				</view> 
			</view> 
			
			<view class="safety-wrapper">
				<view class="safety-wrapper-item" @click="$tools.jump('./editLoginPwd')">
					<view class="safety-wrapper-item__title">登录密码</view>
					<view class="safety-wrapper-item__operate">
						<!-- <view class="safety-wrapper-item__operate--edit">去修改</view> -->
						<image src="../../static/user/icon-user-next.png" mode="widthFix" class="safety-wrapper-item__operate--image"></image>
					</view>
				</view>
				<view class="safety-wrapper-item" @click="$tools.jump('./editTradePwd',phone)">
					<view class="safety-wrapper-item__title">交易密码</view>
					<view class="safety-wrapper-item__operate">
						<image src="../../static/user/icon-user-next.png" mode="widthFix" class="safety-wrapper-item__operate--image"></image>
					</view>
				</view>
				<view class="safety-wrapper-item" @click="$tools.jump('./editBank',userList.phone)">
					<view class="safety-wrapper-item__title">{{ bankInfo == '' ? '绑定' : '修改'}}银行卡</view>
					<view class="safety-wrapper-item__operate">
						<image src="../../static/user/icon-user-next.png" mode="widthFix" class="safety-wrapper-item__operate--image"></image>
					</view>
				</view>
				<view class="safety-wrapper-item">
					<view class="safety-wrapper-item__title">手机号码</view>
					<view class="safety-wrapper-item__operate">{{ userList.phone }}</view>
				</view>
			</view>
			
		</view>
	</view>
</template>

<script>
	export default {
		data(){
			return{
				userList: [],
				phone:'',
				bankInfo:[],
			}
		},
		onShow() {
			this.init();
		},
		methods: {
			init(){
				this.getBank();
				this.getUserList();
			},
			// 获取银行卡信息
			getBank() {
				this.$Ajax('/front/mine/getBank', {}, res => {
					if (res.code == 0) {
						this.bankInfo = res.obj;
						this.bankInfo.forEach((item,index) => {
							this.name = item.name;
							this.bank_address = item.bankAddress;
							this.no = item.no;
							this.bank_name = item.bankName;
						})
					}
				});
			},
			getUserList() {
				this.$Ajax('/front/user/baseInfo', {}, res => {
					if (res.code == 0) {
						this.userList = res.obj;
						this.phone = this.userList.phone;
						if(this.userList.phone != null){
							this.userList.phone = this.userList.phone.substring(0,3) + "****" + this.userList.phone.substring(7);
							// console.log(this.userList.phone)
						}
					}
				});
			},
		},
	}
</script>

<style lang="scss" scoped>
	@import '@/common/scss/pages/safety/safety';
	.safety{
		&-wrapper{
			background-color: $globalColor-bgColor;
			&-item{
				border-bottom: 20upx solid $globalColor-bgStyle;
				margin-bottom: 0;
				&:nth-child(1){
					margin-left: 30upx;
					padding: 30upx 30upx 30upx 0;
					border-bottom: 1px solid $globalColor-border;
				}
			}
		}
	}
</style>
