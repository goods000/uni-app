<template>
	<view class="pages" :data-theme="pageTheme">
		<view class="initHeader initHeader--white">
			<view class="initHeader-wrapper">
				<view class="initHeader-back" @click="$tools.back(1)"></view>
				<view class="initHeader-centerTabs">
					<view class="initHeader-centerTabs__wrapper">
						<view class="initHeader-centerTabs__item initHeader-centerTabs__item--subStyle" :class="{ 'initHeader-centerTabs__item--active': tabsActive == 1 }" @click="changeTabsActive(1)">日榜</view>
						<view class="initHeader-centerTabs__item initHeader-centerTabs__item--subStyle" :class="{ 'initHeader-centerTabs__item--active': tabsActive == 2 }" @click="changeTabsActive(2)">24H最高</view>
						<view class="initHeader-centerTabs__item initHeader-centerTabs__item--subStyle" :class="{ 'initHeader-centerTabs__item--active': tabsActive == 3 }" @click="changeTabsActive(3)">总榜</view>
					</view>
				</view>
			</view>
		</view>

		<!-- 背景 -->
		<view class="initBg"><image :src="'../../static/ranking/img-bg-' + pageTheme + '.jpg'" mode="widthFix"></image></view>

		<view class="main">
			<view class="headerInfo">
				<view class="headerInfo-wrapper">
					<view class="headerInfo-icon"><image src="../../static/ranking/icon-ranking-label.png" mode="widthFix"></image></view>
				</view>
			</view>

			<view class="rankingListBox">
				<view class="rankingListBox-wrapper">
					<view class="rankingListBox-header">
						<view class="rankingListBox-data">排名</view>
						<view class="rankingListBox-data rankingListBox-data--flex4">用户昵称</view>
						<view class="rankingListBox-data">盈利(U)</view>
					</view>
					<view class="rankingListBox-body">
						<view class="initNoData" v-if="rankList.length == 0">暂无数据</view>
						<view class="rankingListBox-list" v-for="(item, index) in rankList" :key="index">
							<view class="rankingListBox-data rankingNumBox">
								<view class="rankingNumBox-img" v-if="index < 3">
									<image :src="'../../static/ranking/icon-ranking-0' + (index + 1) + '.png'" mode="widthFix"></image>
								</view>
								<view class="rankingNumBox-data" v-if="index >= 3">{{ index < 9 ? '0' + (index + 1) : index + 1 }}</view>
							</view>
							<view class="rankingListBox-data rankingListBox-data--flex4 userInfoBox">
								<view class="userInfoBox-wrapper">
									<view class="userInfoBox-avatar"><image :src="item.pic" mode="scaleToFill"></image></view>
									<view class="userInfoBox-name">{{ item.name }}</view>
								</view>
							</view>
							<view class="rankingListBox-data rankingListBox-data--style">{{ item.profit | number(2) }}</view>
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
			tabsActive: 1,

			rankList: [],

			hasNextPage: true,
			pages: 1,
			pageNum: 1,
			pageSize: 20
		};
	},
	onShow() {
		this.init();
	},
	onReachBottom() {
		if (!this.hasNextPage) {
			return this.$tools.toast('到底啦');
		} else {
			this.pageNum++;
			this.getRankingList();
		}
	},
	methods: {
		init() {
			this.rankList = [];
			this.pageNum = 1;
			this.getRankingList();
		},
		getRankingList() {
			this.$Ajax(
				'/front/profit/rank/list',
				{
					type: this.tabsActive,
					pageNum: this.pageNum,
					pageSize: this.pageSize
				},
				res => {
					console.log(JSON.stringify(res));
					if (res.code == 0) {
						this.hasNextPage = res.obj.hasNextPage;
						this.pages = res.obj.pages
						this.rankList = this.rankList.concat(res.obj.list);
					}
				}
			);
		},
		changeTabsActive(index) {
			if (this.tabsActive != index) {
				this.tabsActive = index;
				this.rankList = [];
				this.pageNum = 1;
				this.getRankingList();
			}
		}
	}
};
</script>

<style lang="scss" scoped>
@import '/scss/ranking';
</style>
