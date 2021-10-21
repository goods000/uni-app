<template>
	<view class="page">
		<view class="empty-public"></view>
		<view class="header-plate">
			<view class="back-pic" @click="$tools.back(1)">
				<image src="../../static/public/back-icon-white.png" mode=""></image>
			</view>
			<view class="header-title">{{ i18n.index.News_02 }}</view>
			<view class="header-empty"></view>
		</view>
		<view class="news-list">
			<view class="news-item" @click="noticeDetail(item.id,langType)" v-for="(item,index) in noticeList" :key="index" v-if="item.status == 1">
				<view class="item-left">
					<view class="left-title">{{item.title}}</view>
					<view class="left-time">{{item.createTime}}</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				pageNum:1,
				pageSize:20,
				pages:1,
				noticeList:[],
			};
		},
		onShow() {
			this.noticeList = [];
			this.langType = uni.getStorageSync('initLanguage')== 'en' ? '1' : '0';
			this.getNoticeList();
		},
		onReachBottom() {
			if (this.pageNum >= this.pages) {
				return this.$tools.toast(this.i18n.global.atLast);
			} else {
				this.pageNum++;
				this.getNoticeList();
			}
		},
		methods:{
			getNoticeList() {
				this.$Ajax(
					'/search/indexContent',
					{
						num: this.pageNum,
						type: this.langType
					},
					res => {
						if (res.code == 0) {
							this.pages = res.obj.pages;
							this.noticeList = this.noticeList.concat(res.obj.contentList);
						}
					}
				);
			},
			noticeDetail(id){
				uni.navigateTo({
					url:'./noticeDetail?pageId=' + id
				})
			},
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
		.news-list{
			padding: 0 30rpx;
			.news-item{
				background: #040D32;
				box-shadow: -4rpx -4rpx 14rpx 14rpx rgba(3, 101, 179, 0.3) inset;
				padding: 30rpx;
				margin-top: 20rpx;
				.item-left{
					.left-title{
						font-size: 32rpx;
						font-family: PingFang SC-Bold;
						font-weight: 500;
						color: #FFFFFF;
						text-overflow: -o-ellipsis-lastline;
						overflow: hidden;
						text-overflow: ellipsis;
						display: -webkit-box;
						-webkit-line-clamp: 2;
						line-clamp: 2;
						-webkit-box-orient: vertical;
					}
					.left-time{
						font-size: 24rpx;
						font-family: DIN;
						font-weight: 400;
						color: rgba(255,255,255,.33);
					}
				}
			}
		}
	}
</style>
