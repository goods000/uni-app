<template>
	<view class="pages">
		<view class="">
			<view class="initHeader initHeader--bgStyle initHeader--white">
				<view class="initHeader-wrapper">
					<view class="initHeader-back" @click="$tools.back(1)"></view>
					<view class="initHeader-title">安全中心</view>
				</view>
			</view>
			
			<view class="safetytopBg">
				<image src="../../static/safety/icon-safetytopBg.png" mode="widthFix"></image>
			</view>
			
			
			<view class="listBox">
				<view class="listBox-wrapper">
					<view class="listBox-list" @click="$tools.jump('../safety/editLoginPwd')">
						<view class="listBox-list__label">修改登录密码</view>
					</view>
					<view class="listBox-list" @click="$tools.jump('../safety/editTradePwd')">
						<view class="listBox-list__label">修改交易密码</view>
					</view>
					<view class="listBox-list" @click="$tools.jump('../safety/realName')">
						<view class="listBox-list__label">实名认证</view>
						<view class="listBox-list__status listBox-list__status--no" :class="{'listBox-list__status--yes' : authInfo.authStatus == 2 }">{{authInfo.authStatusStr}}</view>
						<!-- <view class="listBox-list__status listBox-list__status--no"></view> -->
					</view>
				</view>
			</view>
					
			<view class="initBtn" @click="logout()">
				安全退出
			</view>
			
		</view> 
	</view>
</template>

<script>
	export default {
			data(){
				return{
					authInfo:{}
				}
			},
			onShow() {
				this.init();
			},
			methods: {
				init(){
					this.getAuthInfo();
				},
				getAuthInfo() {
					this.$Ajax('/front/user/authInfo', {}, res => {
						if (res.code == 0) {
							// console.log(JSON.stringify(res.obj))
							this.authInfo = res.obj.auth;
						}
					});
				},
				// 退出登录
				logout() {
					uni.removeStorageSync('addressuId');
					let that = this;
					this.$Ajax('/front/logout', {}, res => {
						uni.removeStorage({
							key: 'token',
							success() {
								that.$tools.toastJump('安全退出成功', '../operate/login');
							}
						});
					});
				},
			},
		}
	</script>

<style lang="scss" scoped>
@import '@/common/scss/pages/user/user';
page,.pages{
	background: #111111;height: 100vh;
}
.safetytopBg{
	margin: 168upx auto;
	image{
		width: 298upx;
		margin: auto;
	}
}
.listBox{
	&-wrapper{
		border-bottom: none !important;
	}
	&-list{
		border-bottom: 1px solid #413E3C !important;
		position: relative;
		padding: 30upx 0;
		margin-top: 25upx;
		&__status{
			font-size: 24upx;
			font-family: PingFang SC, PingFang SC-Medium;
			font-weight: 500;
			position: absolute;
			right: 8%;
			&--no{
				color: #FF5050;
			}
			&--yes{
				color: $globalColor-style;
				font-size: 24upx;
				font-family: PingFang SC, PingFang SC-Medium;
				font-weight: 500;
			}
		}
	}
}
.initBtn{
	margin-top: 234upx;
}
</style>
