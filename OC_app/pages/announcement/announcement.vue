<template>
	<view class="pages">
		<!-- <view class="initHeader initHeader--line initHeader--fixed initHeader--black">
			<view class="initHeader-wrapper">
				<view class="initHeader-back" @click="$tools.back(1)"></view>
				<view class="initHeader-title">公告</view>
			</view>
		</view> -->
		<view class="header_bar header_bg header_border">
			<view class="header">
				<view class="header-back" @click="$tools.back(1)"></view>
				<view class="header-title">公告</view>
			</view> 
		</view> 
		
		<view class="main">
			<view class="announcement">
				<view class="announcement-wrapper">
					<view class="initNoData" v-if="noticeList.length == 0">暂无数据</view>
					<view
						class="announcement-item announcement-item"
						@click="$tools.jump('../announcement/announcement_details', item.id)"
						v-for="(item, index) in noticeList"
						:key="index"
					>
						<view class="announcement-item__content">
							<view class="announcement-item__title">{{ item.title }}</view>
							<view class="announcement-item__date">{{ item.createTime }}</view>
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
			pages: 1, //总页数
			pageNum: 1, //当前页数
			pageSize: 20, //请求记录
			isBottom: false,

			userId: ''
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
					pageSize: this.pageSize,
					type: 0  //类型【0交易所 1矿池】
				},
				res => {
						console.log(JSON.stringify(res));
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
@import '@/common/scss/pages/announcement/announcement';
page{background: #FFFFFF;}
</style>
