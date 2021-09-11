<template>
	<view class="pages" :data-theme="pageTheme">
		<view class="initHeader initHeader--styleBg initHeader--fixed" :class="pageTheme == 'light' ? 'initHeader--black' : 'initHeader--white'">
			<view class="initHeader-wrapper">
				<view class="initHeader-back" @click="$tools.back(1)"></view>
				<view class="initHeader-title">详情</view>
			</view>
		</view>
		<view class="main">
			<view class="noticeDetailBox">
				<view class="noticeDetailBox-wrapper">
					<view class="noticeDetailBox-title">{{ newsTitle }}</view>
					<view class="noticeDetailBox-date">{{ newsDate }}</view>
					<rich-text class="noticeDetailBox-data" :nodes="newsContent"></rich-text>
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
		this.pageId = option.value1;
	},
	onShow() {
		this.$setStatusBarStyle();
		this.init();
	},
	methods: {
		init() {
			this.getDetailsContent();
		},
		getDetailsContent() {
			this.$Ajax(
				'/front/info/important/detail',
				{
					id: this.pageId
				},
				res => {
					if (res.code == 0) {
						this.newsTitle = res.obj.title;
						this.newsDate = res.obj.publishedAt;
						this.newsContent = res.obj.content.replace(/<img/g, "<img style='width:100%;margin: 15px 0;'");
					}
				}
			);
		}
	}
};
</script>

<style lang="scss" scoped>
@import '/scss/information_detail';
</style>
