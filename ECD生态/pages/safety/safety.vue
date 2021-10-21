<template>
	<view class="page">
		<view class="setting">
			<view class="header_bg header_border header_bar">
				<view class="header">
					<view class="header-back" @click="$tools.back(1)"></view>
					<view class="header-title">安全中心</view>
				</view> 
			</view> 
			
			<view class="listBox">
				<view class="listBox-wrapper">
					<view class="listBox-list"  @click="$tools.jump('./realName')">
						<view class="listBox-list__label">实名认证</view>
					</view>
				</view>
				<view class="listBox-wrapper">	
					<view class="listBox-list"  @click="$tools.jump('./editPassword')">
						<view class="listBox-list__label">登录密码</view>
					</view>
					<view class="listBox-list"  @click="$tools.jump('./editPayPassword')">
						<view class="listBox-list__label">交易密码</view>
					</view>
				</view>
				<view class="listBox-wrapper">	
					<view class="listBox-list" @click="$tools.jump('../payment/payment')">
						<view class="listBox-list__label">收款信息</view>
					</view>
				</view>
				<view class="listBox-wrapper">		
					<view class="listBox-list listBox-list--no"> 
						<view class="listBox-list__label">{{ baseInfo.authType == 1 ? '邮箱号' : '手机号' }}</view>
						<view class="listBox-list__phone">{{ baseInfo.authType == 1 ? email : phone }}</view>
						<!-- <view class="listBox-list__phone">{{ baseInfo.account.substring(0,3) + "****" + baseInfo.account.substring(7) }}</view> -->
					</view>
				</view>
			</view>
			
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				baseInfo:{},
				phone:'',
				email:'',
			}
		},
		onShow() {
			this.init();
		},
		methods: {
			init(){
				this.getBaseInfo();
			},
			getBaseInfo() {
				this.$Ajax('/front/user/baseInfo', {}, res => {
					if (res.code == 0) {
						this.baseInfo = res.obj;
						if(res.obj.phone != null){
							this.phone = res.obj.phone.substring(0,3) + "****" + res.obj.phone.substring(7)
						}
						if(res.obj.email != null){
							this.email = res.obj.email.substring(0,3) + "****" + res.obj.email.substring(7);
						}
					}
				});
			},
		}
	}
</script>

<style lang="scss" scoped>
	@import '../user/scss/user';
	.initBtn{margin-top: 30%};
	.listBox{
		&-list{
			margin-left: 30upx;
			padding-left: 0px;
		}
	}
</style>
