<template>
	<view class="pages" :data-theme="pageTheme">
		<view class="initHeader initHeader--line" :class="pageTheme == 'light' ? 'initHeader--black' : 'initHeader--white'">
			<view class="initHeader-wrapper">
				<view class="initHeader-back" @click="$tools.back(1)"></view>
				<view class="initHeader-title">详情</view>
			</view>
		</view>
		<view class="main">
			<view class="noticeDetailBox">
				<view class="noticeDetailBox-wrapper">
					<view class="noticeDetailBox-title">{{ noticeContent.title }}</view>
					<view class="noticeDetailBox-date">{{ noticeContent.createTime }}</view>
					<rich-text class="noticeDetailBox-data" :nodes="noticeContent.content"></rich-text>
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
			noticeContent: []
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
				'/search/getContentInfo',
				{
					id: this.pageId
				},
				res => {
					console.log(JSON.stringify(res));
					if (res.code == 0) {
						this.noticeContent = res.obj;
						this.noticeContent.content = this.noticeContent.content.replace(/<img/g, "<img style='width:100%;margin: 15px 0;'");
					}
				}
			);
		}
	}
};
</script>

<style lang="scss" scoped>
@import '/scss/notice_detail';
</style>
