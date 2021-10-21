<template>
	<view class="pages">
		<view class="firstPages">
			<view class="firstBox">
				<image src="../../static/operate/icon-operate-topBg.png" mode="widthFix" class="firstBox-topImg"></image>
				<view class="firstBox-wrapper">
					<view class="firstBox-wrapper-title">数字资产·赋能实体</view>
					<view class="firstBox-wrapper-txt">DIGITAL ASSETS · ENABLED ENTITIES</view>
				</view>
				<view class="operateBox">
					<image src="../../static/operate/icon-operate-title.png" mode="widthFix" class="operateBox-topImg"></image>
					<!-- <view class="operateBox-title">无缝链接,数字资产尽在掌握</view> -->
					<view class="operateBox-btn">
						<view class="operateBox-btn-register" @click="$tools.jump('../operate/login')">账号登录</view>
						<view class="operateBox-btn-login" @click="$tools.jump('../operate/register')">用户注册</view>
					</view>
					<view class="operateBox-agreement">
						<label :class="[isActive ? 'checkbox-active' : '']" @click="agreement()">
							<view class="checkbox" ></view>
						</label>
						<view class="operateBox-agreement-title">我已阅读并同意</view>
						<view class="operateBox-agreement-name">《用户协议》</view>
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
				timer: null,
				isActive : true,
			};
		},
		onShow() {
		},
		methods: {
			agreement(){
				if(!this.isActive){
					this.isActive = true;
				}else{
					this.isActive = false;
				}
			},
		}
	};
</script>

<style lang="scss" scoped>
	@import '@/common/scss/pages/operate/firstPage';
</style>
