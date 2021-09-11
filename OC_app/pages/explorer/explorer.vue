<template>
	<view class="pages">
		<!-- <view class="header_bar header_bg header_border">
			<view class="header">
				<view class="header-back" @click="$tools.back(1)"></view>
				<view class="header-title">区块浏览器</view>
			</view> 
		</view> -->

		<view class="content"><web-view :webview-styles="webviewStyles" src="https://ocex.xyz/explorer/index.html"></web-view></view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			webviewStyles: {
				progress: {
					color: '#1779F6'
				}
			},
		};
	},
};
</script>

<style lang="scss" scoped>
.content {
	padding-top: 120px;
}
</style>

