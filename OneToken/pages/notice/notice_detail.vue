<template>
	<view class="pages">
		<view class="initHeader initHeader--styleBg initHeader--fixed initHeader--black">
			<view class="initHeader-wrapper">
				<view class="initHeader-back" @click="$tools.back(1)"></view>
				<view class="initHeader-title">详情</view>
			</view>
		</view>
		<view class="main">
			<view class="noticeDetailBox">
				<view class="noticeDetailBox-wrapper">
					<view class="noticeDetailBox-title">{{ noticeTitle }}</view>
					<view class="noticeDetailBox-date">{{ noticeDate }}</view>
					<rich-text :nodes="noticeContent" class="textImage" style="color:#666666;font-size: 28upx;"></rich-text>
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
			noticeTitle: '',
			noticeDate: '',
			noticeContent: []
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
				'/search/getContentInfo',
				{
					id: this.pageId
				},
				res => {
					console.log(JSON.stringify(res));
					if (res.code == 0) {
						this.noticeTitle = res.obj.content.title;
						this.noticeDate = res.obj.content.createTime;
						this.noticeContent = res.obj.content.content;
						this.noticeContent = this.noticeContent.replace(/<img/g, "<img style='width:100%;margin: 15px 0;'");
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
