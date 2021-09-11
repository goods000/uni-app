<template>
	<view class="pages">
		<view class="initHeader initHeader--line initHeader--fixed initHeader--black">
			<view class="initHeader-wrapper">
				<view class="initHeader-back" @click="$tools.back(1)"></view>
				<view class="initHeader-title">公告</view>
			</view>
		</view>
		<view class="main">
			<view class="announcement">
				<view class="announcement-wrapper">
					<view
						class="announcement-item announcement-item"
						@click="$tools.jump('../announcement/announcement_details', item.id, userId)"
						v-for="(item, index) in noticeList"
						:key="index"
					>
						
						<view class="announcement-item__content">
							<view class="announcement-item__title">{{ item.title }}</view>
							<view class="announcement-item__date">{{ item.createTime }}</view>
						</view>
						<view class="announcement-item__arrow"></view>
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
			newsPagesTotal: 1, //总页数
			newsPageNum: 1, //当前页数
			newsPageSize: 20, //请求记录
			isBottom: false,

			userId: ''
		};
	},
	onShow() {
		this.noticeList = [];
		this.init();
	},
	onReachBottom() {
		if (this.newsPageNum >= this.newsPagesTotal) {
			return this.$tools.toast('到底啦');
		} else {
			this.newsPageNum++;
			this.getNoticeList();
		}
	},
	methods: {
		init() {
			this.getNoticeList();
		},
		getNoticeList() {
			let that = this;
			uni.showLoading({
				title: '数据加载中',
				mask: true
			});

			this.$Ajax(
				'/search/getContent',
				{
					pageNum: this.newsPageNum,
					pageSize: this.newsPageSize
				},
				res => {
					if (res.code == 0) {
						// console.log(JSON.stringify(res));
						that.newsPagesTotal += 1;
						var data = res.obj.list;
						// data = JSON.parse(data);
						that.noticeList = that.noticeList.concat(data);
					}
				}
			);

			setTimeout(function() {
				uni.hideLoading();
			}, 100);
		}
	}
};
</script>

<style lang="scss" scoped>
@import '@/common/scss/pages/announcement';
</style>
