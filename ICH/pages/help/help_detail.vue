<template>
	<view class="pages">
		<view class="initHeader initHeader--line initHeader--fixed initHeader--bgWhite initHeader--black">
			<view class="initHeader-wrapper">
				<view class="initHeader-back" @click="$tools.back(1)"></view>
				<view class="initHeader-title">资讯详情</view>
			</view>
		</view>
		<view class="main">
			<view class="detailBox">
				<view class="detailBox-wrapper">
					<view class="detailBox-title">{{ detailContent.title }}</view>
					<view class="detailBox-date">{{ detailContent.createTime }}</view>
					<rich-text :nodes="detailContent.content" class="textImage" style="color:#626266;line-height: 1.8;font-size: 28upx;"></rich-text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			detailId: null,
			detailContent: []
		};
	},
	onLoad(option) {
		this.detailId = option.value1;
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
				'/search/help/helpDetail',
				{
					helpId: this.detailId
				},
				res => {
					if (res.code == 0) {
						this.detailContent = res.obj;
						console.log(JSON.stringify(this.detailContent));
					}
				}
			);
		}
	}
};
</script>

<style lang="scss" scoped>
.detailBox {
	position: relative;
	z-index: 1;
	padding: 30upx 0;
	&-wrapper {
		padding: 0 30upx;
	}
	&-title {
		color: #101010;
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
