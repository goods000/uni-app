<template>
	<view class="pages">
		
		<!-- <web-view src="https://github.com/OC-OFFICIAL/OC"></web-view> -->
		<view class="content"><web-view :webview-styles="webviewStyles" src="https://github.com/OC-OFFICIAL/OC"></web-view></view>
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

