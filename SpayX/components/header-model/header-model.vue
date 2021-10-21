<template>
	<view class="navigate header-model">
		<view class="back" @click="back">
			<image src="../../static/public/back.png" mode=""></image>	
		</view>
		<view class="title">
			{{title}}
		</view>
	</view>
</template>

<script>
	export default {
		name:'header-model',
		props: {
		    title: { //标题
		       
		        default: ''
		    },
		},
		data() {
			return {
				
			};
		},
		methods: {
			back() {
				uni.navigateBack({
					delta:1
				})
			},
		}
	}
</script>

<style lang="less">
	@black:#2F3033;
	@orange:#FF6200;
	.navigate {
		width: 100%;	
		height: 92upx;
		display: flex;
		justify-content: space-between;
		align-items: center;
		background: #fff;
		position: fixed;
		z-index: 998;
		box-sizing: border-box;
		.back {
			position: absolute;
			top:0;
			left: 0;
			z-index: 998;
			height: 92upx;
			box-sizing: border-box;
			display: flex;
			align-items: center;
			font-size: 36upx;
			color:@black;
			font-weight: 600;
			padding-left: 28upx;
			image {
				width: 48upx;
				height: 48upx;
			}
		}
		.title {
			width: 100%;
			height: 92upx;
			font-size: 32upx;
			line-height: 92upx;
			text-align: center;
		}
	}
</style>
