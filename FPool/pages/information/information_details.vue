<template>
	<view class="pages">
		<view class="header_bar header_bg">
			<view class="header">
				<view class="header-back" @click="$tools.back(1)"></view>
				<view class="header-title">{{ i18n.global.details }}</view>
			</view> 
		</view> 
		<view class="main">
			<view class="noticeDetailBox">
				<view class="noticeDetailBox-wrapper">
					<view class="noticeDetailBox-title">{{ newsTitle }}</view>
					<view class="noticeDetailBox-date">{{ newsDate }}</view>
					<rich-text :nodes="newsContent" class="textImage" style="color:#333333;font-size: 28upx;font-weight: 300;"></rich-text>
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
	computed: {
		i18n() {
			return this.$t('message');
		}
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
				'/search/important/detail',
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
};
</script>

<style lang="scss" scoped>
@import '@/common/scss/pages/information/information_details';
</style>
