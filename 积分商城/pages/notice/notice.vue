<template>
	<view class="pages bg_header">
		<view class="initHeader initHeader--line initHeader--white">
			<view class="initHeader-wrapper">
				<view class="initHeader-back" @click="$tools.back(1)"></view>
				<view class="initHeader-title">公告</view>
			</view>
		</view>
		<view class="main">
			<view class="noticeBox">
				<view class="noticeBox-wrapper">
					<view class="initNoData" v-if="noticeList.length == 0">暂无数据</view>
					<view class="noticeBox-item" @click="$tools.jump('../notice/notice_detail', item.id)" v-for="(item, index) in noticeList" :key="index">
						<view class="noticeBox-item__content">
							<view class="noticeBox-item__title">{{ item.title }}</view>
							<view class="noticeBox-item__date">{{ item.createTime }}</view>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			noticeList: [],

			// 分页
			pages: 1, //总页数
			pageNum: 1, //当前页数
			pageSize: 20 //请求记录
		};
	},
	onShow() {
		this.init();
	},
	onReachBottom() {
		if (this.pageNum >= this.pages) {
			return this.$tools.toast('到底啦');
		} else {
			this.pageNum++;
			this.getNoticeList();
		}
	},
	methods: {
		init() {
			this.noticeList = [];
			this.getNoticeList();
		},
		getNoticeList() {
			this.$Ajax(
				'/search/getContent',
				{
					pageNum: this.pageNum,
					pageSize: this.pageSize
				},
				res => {
					if (res.code == 0) {
						this.pages = res.obj.pages;
						this.noticeList = this.noticeList.concat(res.obj.list);
					}
				}
			);
		}
	}
};
</script>

<style lang="scss" scoped>
@import '@/common/scss/pages/notice/notice';
</style>
