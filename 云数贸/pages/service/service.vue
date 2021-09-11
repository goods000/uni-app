<template>
	<view class="pages contentBg">
		<view class="header_bar header_bg header_border">
			<view class="header">
				<view class="header-back" @click="$tools.back(1)"></view>
				<view class="header-title">联系客服</view>
			</view> 
		</view> 
		
		<view class="contentCode">
			<view class="contentCode-title">扫码加群</view>
			<view class="contentCode-image">
				<image v-if="img != ''" :src="img" mode="widthFix"></image>
			</view>
		</view>
		
	</view>
</template>

<script>
	export default {
			data(){
				return{
					img:'',
				}
			},
			onShow() {
				this.init();
			},
			methods: {
				init(){
					this.getQrcode();
				},
				// 获取群二维码
				getQrcode() {
					this.$Ajax('/front/mine/getWechatGroup', {}, res => {
						if (res.code == 0) {
							this.img = res.obj;
						}
					});
				},
				
			},
		}
	</script>

<style lang="scss" scoped>
	@import '@/common/scss/pages/index/index';
</style>
