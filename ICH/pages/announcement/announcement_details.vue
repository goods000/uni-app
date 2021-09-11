<template>
	<view class="pages">
		<view class="initHeader initHeader--line initHeader--fixed initHeader--bgWhite initHeader--black">
			<view class="initHeader-wrapper">
				<view class="initHeader-back" @click="$tools.back(1)"></view>
				<view class="initHeader-title">资讯详情</view>
			</view>
		</view>
		<view class="main">
			<view class="newsBox">
				<view class="newsBox-wrapper">
					<view class="newsBox-title">{{ noticeContent.title }}</view>
					<view class="newsBox-date">{{ noticeContent.createTime }}</view>
					<rich-text :nodes="noticeContent.content" class="textImage" style="color:#626266;line-height: 1.8;font-size: 28upx;"></rich-text>
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
				userId: null,
				noticeContent: [],
			};
		},
		onLoad(option) {
			this.pageId = option.value1;
			this.userId = option.value2;
		},
		onShow(){
			this.init();
		},
		methods:{
			init(){
				this.getDetailsContent();
			},
			getDetailsContent(){
				this.$Ajax('/search/getContentInfo', {
					id: this.pageId,
					userId: this.userId
				}, res => {
					if (res.code == 0) {
						this.noticeContent = res.obj.content;
					}
				});
			},
		}
	}
</script>

<style lang="scss" scoped>

.newsBox{
	position: relative;
	z-index: 1;
	padding: 30upx 0;
	&-wrapper{
		padding: 0 30upx;
	}
	&-title{
		color: #101010;
		font-size: 42upx;
		margin-bottom: 30upx;
		font-weight: bold;
	}
	&-date{
		color: #999999;
		font-size: 24upx;
		margin-bottom: 30upx;
	}
	&-data{
		font-size: 28upx;
		color: #626266;
		word-break: break-all;
	}
}
</style>
