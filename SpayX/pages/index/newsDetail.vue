<template>
	<view class="page">
		<view class="empty-public"></view>
		<view class="header-plate">
			<view class="back-pic" @click="$tools.back(1)">
				<image src="../../static/public/back-icon-white.png" mode=""></image>
			</view>
			<view class="header-title">{{ i18n.index.News_01 }}{{ i18n.global.details }}</view>
			<view class="header-empty"></view>
		</view>
		<view class="main">
			<view class="noticeDetailBox">
				<view class="noticeDetailBox-wrapper">
					<view class="noticeDetailBox-title">{{ newsTitle }}</view>
					<view class="noticeDetailBox-date">{{ newsDate }}</view>
					<rich-text :nodes="newsContent" class="textImage" style="color:#FFFFFF;font-size: 28upx;font-weight: 300;"></rich-text>
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
				newsTitle: '',
				newsDate: '',
				newsContent: ''
			};
		},
		onLoad(option) {
			this.pageId = option.pageId;
		},
		computed: {
			i18n() {
				return this.$t('message');
			},
		},
		onShow() {
			this.getDetailsContent();
		},
		methods:{
			getDetailsContent() {
				this.$Ajax(
					'/front/info/important/detail',
					{
						id: this.pageId
					},
					res => {
						if (res.code == 0) {
							this.newsTitle = res.obj.title;
							this.newsDate = res.obj.createTime;
							this.newsContent = res.obj.content.replace(/<img/g, "<img style='width:100%;margin: 15px 0;'");
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
	}
</style>
