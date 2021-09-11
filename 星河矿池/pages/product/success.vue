<template>
	<view class="pages pagesBg">
		<view class="header_bar header_border">
			<view class="header">
				<view class="header-back" @click="$tools.back(1)"></view>
				<view class="header-title">购买成功</view>
			</view> 
		</view> 
		
		<view class="success">
			<view class="success-wrapper">
				<view class="success-image">
					<image src="../../static/product/icon-product-success.png" mode="widthFix"></image>
				</view>
				<view class="success-status">购买成功</view>
				<view class="success-title">您已成功购买 {{ num }} 份{{name}}， </view>
				<view class="success-title">请前往“我的-购买记录”查看。</view>
			</view>
		</view>
		
	</view>
</template>

<script>
	export default {
			data(){
				return{
					num:'',
				}
			},
			onLoad(hash) {
				this.num = hash.value1;
				this.name = hash.value2;
				this.remarks = hash.value3;
			},
			onShow() {
			},
			methods: {
				
			},
		}
	</script>

<style lang="scss" scoped>
	@import '@/common/scss/pages/product/product';
	.pagesBg{
		height: 100vh;
		background-color: $globalColor-white;
	}
</style>
