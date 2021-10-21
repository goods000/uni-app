<template>
	<view class="page">
		<view class="empty-public"></view>
		<view class="header-plate">
			<view class="back-pic" @click="$tools.back(1)">
				<image src="../../static/public/back-icon-white.png" mode=""></image>
			</view>
			<view class="header-title">{{ i18n.index.News_02 }}{{ i18n.global.details }}</view>
			<view class="header-empty"></view>
		</view>
		<view class="main">
			<view class="noticeDetailBox">
				<view class="noticeDetailBox-wrapper">
					<view class="noticeDetailBox-title">{{ noticeContent.title }}</view>
					<view class="noticeDetailBox-date">{{ noticeContent.createTime }}</view>
					<rich-text :nodes="noticeContent.content" class="textImage" style="color:#FFFFFF;font-size: 28upx;font-weight: 300;"></rich-text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				pageId: null,
				noticeContent: [],
			};
		},
		onLoad(option) {
			this.pageId = option.pageId;
		},
		onShow() {
			this.getDetailsContent();
		},
		methods:{
			getDetailsContent() {
				this.$Ajax(
					'/search/getContentInfo',
					{
						id: this.pageId
					},
					res => {
						if (res.code == 0) {
							this.noticeContent = res.obj;
							this.noticeContent.content = this.noticeContent.content.replace(/<img/g, "<img style='width:100%;margin: 15px 0;'");
						}
					}
				);
			}
		}
	}
</script>

<style lang="scss">
	.page{
		color: #FFFFFF;
		.header-plate{
			height: 88rpx;
			display: flex;
			align-items: center;
			justify-content: space-between;
			padding: 0 30rpx;
			.back-pic{
				width: 17rpx;
				height: 31rpx;
				image{
					width: 17rpx;
					height: 31rpx;
				}
			}
			.header-title{
				font-size: 36rpx;
				font-family: PingFang SC-Bold;
				font-weight: bold;
			}
			.header-empty{
				width: 17rpx;
			}
		}
		.main{
			padding: 30rpx;
		}
		.noticeDetailBox {
			position: relative;
			z-index: 1;
			padding: 30upx 0;
			&-wrapper {
				padding: 0 30upx;
			}
			&-title {
				color: #FFFFFF;
				font-size: 42upx;
				margin-bottom: 30upx;
				font-weight: 300;
			}
			&-date {
				color: #999999;
				font-size: 24upx;
				margin-bottom: 30upx;
			}
			&-data {
				font-size: 28upx;
				color: #626266;
				word-break: break-all;
			}
		}
	}
</style>
