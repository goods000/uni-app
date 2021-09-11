<template>
	<view class="pages">
		<view class="initHeader initHeader--line initHeader--fixed initHeader--black">
			<view class="initHeader-wrapper">
				<view class="initHeader-back" @click="$tools.back(1)"></view>
				<view class="initHeader-title">公告详情</view>
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
			noticeContent: []
		};
	},
	onLoad(hash) {
		this.pageId = hash.value1;
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
						this.noticeContent = res.obj;
						this.noticeContent.content = this.noticeContent.content.replace(/<img/g,"<img style='width:100%;margin: 15px 0;'");
					}
				}
			);
		}
	}
};
</script>

<style lang="scss" scoped>
.newsBox {
	position: relative;
	z-index: 1;
	padding: 30upx 0;
	&-wrapper {
		padding: 0 30upx;
	}
	&-title {
		color: $globalColor-fontStyle;
		font-size: 42upx;
		margin-bottom: 30upx;
		font-weight: bold;
	}
	&-date {
		color: #999999;
		font-size: 24upx;
		margin-bottom: 30upx;
	}
	&-data {
		font-size: 28upx;
		color: #626266;
		word-break: break-all;
	}
}
</style>
