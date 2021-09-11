<template>
	<view class="pages">
		<view class="header_bar header_bg">
			<view class="header">
				<view class="header-back" @click="$tools.back(1)"></view>
				<view class="header-title" v-if="type == 1">{{ i18n.aboutUs.list_01 }}</view>
				<view class="header-title" v-if="type == 2">{{ i18n.aboutUs.list_02 }}</view>
				<view class="header-title" v-if="type == 3">{{ i18n.aboutUs.list_03 }}</view>
				<view class="header-title" v-if="type == 4">{{ i18n.aboutUs.list_04 }}</view>
			</view> 
		</view> 
		<view class="main">
			<view class="noticeDetailBox">
				<view class="initNoData" v-if="contentList.length == 0">{{ i18n.global.noData }}</view>
				<view class="noticeDetailBox-wrapper" v-else>
					<!-- <view class="noticeDetailBox-title">{{ newsTitle }}</view> -->
					<!-- <view class="noticeDetailBox-date">{{ newsDate }}</view> -->
					<view class="noticeDetailBox-link" v-if="type == 3" v-html="newsContent" @click="openSource()">{{ newsContent }}</view>
					<rich-text :nodes="newsContent" class="textImage" v-else style="color:#333333;font-size: 28upx;font-weight: 300;word-break: break-all;"></rich-text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			headerTitle: '',
			type: '',
			newsTitle: '',
			newsDate: '',
			newsContent: '',
			contentList:[],
		};
	},
	computed: {
		i18n() {
			return this.$t('message');
		}
	},
	onLoad(option) {
		this.type = option.value1;
		this.headerTitle = option.value2;
	},
	onShow() {
		this.init();
	},
	methods: {
		init() {
			this.getDetailsContent();
		},
		// 跳转合作平台
		openSource(){
			plus.runtime.openURL(this.newsContent, function(res) {  
				console.log(res);  
			});  
		},
		getDetailsContent() {
			this.$Ajax(
				'/search/indexContent',
				{
					num: 1,
					type: this.type
				},
				res => {
					if (res.code == 0) {
						res.obj.contentList.forEach((item,index) => {
							this.contentList = item;
							this.newsTitle = item.title;
							this.newsDate = item.createTime;
							this.newsContent = item.content.replace(/<img/g, "<img style='width:100%;margin: 15px 0;'");
						})
					}
				}
			);
		}
	}
};
</script>

<style lang="scss" scoped>
@import '@/common/scss/pages/information/information_details';
page{
	background: #FFFFFF;
}
.noticeDetailBox{
	background: #FFFFFF;
}
.noticeDetailBox-link{
	color: $globalColor-blue;
}
</style>
