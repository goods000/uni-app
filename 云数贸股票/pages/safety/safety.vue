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
				<view class="safety-wrapper-item" @click="$tools.jump('./editPassword')">
					<view class="safety-wrapper-item__title">登录密码</view>
					<view class="safety-wrapper-item__operate">
						<view class="safety-wrapper-item__operate--edit">去修改</view>
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
			}
		},
		onShow() {
			this.init();
		},
		methods: {
			init(){
				this.getUserList();
			},
			getUserList() {
				this.$Ajax('/front/user/baseInfo', {}, res => {
					if (res.code == 0) {
						this.userList = res.obj;
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
	page,.pages{
		background: #EDEDF2;
		height: 100vh;
	}
</style>
