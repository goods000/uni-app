<template>
	<view class="page">
		<view class="bgBox">
			<!-- <view class="bgBox-wrapper"> -->
				<image src="@/static/gif/firstPage.gif" mode="widthFix"></image>
			<!-- </view> -->
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				timer: null
			};
		},
		onShow(){
			this.timeToIndex();
		},
		methods:{
			timeToIndex(){
				let that = this;
				that.timer = setTimeout(function(){
					clearTimeout(that.timer);
					uni.switchTab({
						url: "../index/index"
					})
				},3500)
				
			}
		}
	}
</script>

<style lang="scss" scoped>
	.bgBox {
		@include fullImage;
		@include flexCenterColumn;
		width: 100%;
		position: absolute;
		top: 50%;
		transform: translateY(-50%);
		left: 0;
	}
</style>
