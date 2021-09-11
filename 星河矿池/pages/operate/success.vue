<template>
	<view class="pages">
		<view class="operateBox">
			<view class="header_bar">
				<view class="header">
					<view class="header-goBack" @click="$tools.back(1)"></view>
					<view class="header-title">创建成功</view>
				</view> 
			</view> 
			
			<view class="success">
				<view class="success-image">
					<image src="../../static/operate/icon-success.png" mode="widthFix"></image>
				</view>
				<view class="success-title">创建地址成功</view>
				<view class="success-wrapper">
					<view class="success-wrapper__tips">请妥善保管您的助记词</view>
					<view class="success-wrapper__tips">请勿丢失或泄露给他人，以免造成财产损失</view>
				</view>
			</view>
			
			
			<view class="operateBox-bottomBox">
				<view class="operateBox-btn">
					<view class="operateBox-btn-chioce" @click="$tools.jump('./login')">确定</view>
				</view>
			</view>
			
			
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
			}
		},
		onShow() {
			
		},
		methods: {
			
		}
	}
</script>

<style lang="scss" scoped>
	@import '@/common/scss/pages/operate/register';
</style>
