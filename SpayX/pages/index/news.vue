<template>
	<view class="page">
		<view class="empty-public"></view>
		<view class="header-plate">
			<view class="back-pic" @click="$tools.back(1)">
				<image src="../../static/public/back-icon-white.png" mode=""></image>
			</view>
			<view class="header-title">{{ i18n.index.News_01 }}</view>
			<view class="header-empty"></view>
		</view>
		<view class="news-list">
			<view class="news-item" @click="newsDetail(item.id)" v-for="(item,index) in newslist" :key="index">
				<view class="item-left">
					<view class="left-title">{{item.title}}</view>
					<view class="left-time">{{item.createTime}}</view>
				</view>
				<view class="item-right">
					<image :src="item.thumbnail" mode=""></image>
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
				newslist:[],
			};
		},
		computed: {
			i18n() {
				return this.$t('message');
			},
		},
		onShow() {
			this.newslist = [];
			this.getNews();
		},
		onReachBottom() {
			if (this.pageNum >= this.pages) {
				return this.$tools.toast(this.i18n.global.atLast);
			} else {
				this.pageNum++;
				this.getNews();
			}
		},
		methods:{
			getNews() {
				this.$Ajax(
					'/front/info/important/list',
					{
						pageNum: this.pageNum,
						pageSize: this.pageSize
					},
					res => {
						// console.log(JSON.stringify(res));
						if (res.code == 0) {
							this.pages = res.obj.pages;
							this.newslist = this.newslist.concat(res.obj.list);
						}
					}
				);
			},
			newsDetail(id){
				uni.navigateTo({
					url:'./newsDetail?pageId=' + id
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
				display: flex;
				align-items: center;
				justify-content: space-between;
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
				.item-right{
					width: 216rpx;
					height: 142rpx;
					image{
						width: 216rpx;
						height: 142rpx;
					}
				}
			}
		}
	}
</style>
