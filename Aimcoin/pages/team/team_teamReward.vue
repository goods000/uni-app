<template>
	<view class="pages" :data-theme="pageTheme">
		<view class="initHeader initHeader--line initHeader--fixed" :class="pageTheme == 'light' ? 'initHeader--black' : 'initHeader--white'">
			<view class="initHeader-wrapper">
				<view class="initHeader-back" @click="$tools.back(1)"></view>
				<view class="initHeader-title">{{ pageType == 1 ? '一' : '二' }}代收益明细</view>
			</view>
		</view>

		<view class="main">
			<view class="listBox">
				<view class="listBox-wrapper">
					<view class="listBox-body">
						<view class="initNoData" v-if="teamRewardList.length == 0">暂无数据</view>
						<view class="listBox-list" v-for="(item, index) in teamRewardList" :key="index">
							<view class="listBox-data"><view class="listBox-account">{{ item.provideAccount | conceal(3) }}</view></view>
							<view class="listBox-data">
								<view class="listBox-price">+{{ item.reward }}</view>
								<view class="listBox-label">{{ item.createTime }}</view>
							</view>
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
			teamRewardList: [],

			tabsActive: 0,
			pageType: null,

			// 分页
			hasNextPage: true,
			pages: 1,
			pageNum: 1,
			pageSize: 20
		};
	},
	onLoad(option) {
		this.pageType = option.value1;
	},
	onShow() {
		this.$setStatusBarStyle();
		this.init();
	},
	onReachBottom() {
		if (!hasNextPage) {
			return this.$tools.toast('到底了');
		} else {
			this.pageNum++;
			this.getTeamList();
		}
	},
	methods: {
		init() {
			this.pageNum = 1;
			this.teamRewardList = [];
			this.getTeamList();
		},
		getTeamList() {
			this.$Ajax(
				'/front/user/dynamic/reward/list',
				{
					gen: this.pageType,
					pageNum: this.pageNum,
					pageSize: this.pageSize
				},
				res => {
					console.log(JSON.stringify(res));
					if (res.code == 0) {
						this.hasNextPage = res.obj.hasNextPage;
						this.pages = res.obj.pages;
						this.teamRewardList = this.teamRewardList.concat(res.obj.list);
					}
				}
			);
		}
	}
};
</script>

<style lang="scss" scoped>
@import '/scss/team_teamReward';
</style>
