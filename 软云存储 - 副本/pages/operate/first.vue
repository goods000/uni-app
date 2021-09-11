<template>
	<view class="pages">
		<view class="first">
			<view class="firstBox">
				<view class="firstBox-bg">
					<view class="firstBox-bg-image">
						<image src="../../static/operate/icon-logo.png" mode="widthFix"></image>
					</view>
					<view class="firstBox-bg-color"></view>
				</view>
				
				<view class="operateBox">
					<view class="operateBox-title">SOFT CLOUD</view>
					<view class="operateBox-txt">为用户提供深度区块链超级计算与存储的解决方案</view>
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
				isActive : true,
			}
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
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import '@/common/scss/pages/operate/firstPage';
</style>
