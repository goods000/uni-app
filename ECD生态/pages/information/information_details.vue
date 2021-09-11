<template>
	<view class="page">
		<view class="header_bar header_fixed header_bg header_border">
			<view class="header">
				<view class="header-back" @click="$tools.back(1)"></view>
				<view class="header-title">资讯详情</view>
			</view> 
		</view> 
		<view class="main">
			<view class="noticeDetailBox">
				<view class="noticeDetailBox-wrapper">
					<view class="noticeDetailBox-title">{{ newsTitle }}</view>
					<view class="noticeDetailBox-date">{{ newsDate }}</view>
					<rich-text :nodes="newsContent" class="textImage" style="color:#333333;font-size: 28upx;font-weight: 300;"></rich-text>
					<image :src="path" mode="widthFix" style="width: 100%;margin: 15px 0;"></image>
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
			newsContent: '',
			path: '',
		};
	},
	onLoad(option) {
		this.pageId = option.value1;
	},
	onShow() {
		this.init();
	},
	methods: {
		init() {
			this.getDetailsContent();
		},
		getDetailsContent() {
			this.$Ajax(
				'/search/getHoteInfoDetail',
				{
					id: this.pageId
				},
				res => {
					if (res.code == 0) {
						this.newsTitle = res.obj.title;
						this.newsDate = res.obj.createTime;
						this.path = res.obj.path;
						this.newsContent = res.obj.content.replace(/<img/g, "<img style='width:100%;margin: 15px 0;'");
					}
				}
			);
		}
	}
};
</script>

<style lang="scss" scoped>
@import '/scss/information_details';
</style>
