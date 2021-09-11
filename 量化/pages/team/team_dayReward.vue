<template>
	<view class="pages" :data-theme="pageTheme">
		<view class="initHeader initHeader--line initHeader--fixed" :class="pageTheme == 'light' ? 'initHeader--black' : 'initHeader--white'">
			<view class="initHeader-wrapper">
				<view class="initHeader-back" @click="$tools.back(1)"></view>
				<view class="initHeader-title">每日收益记录</view>
			</view>
		</view>

		<view class="main">
			<view class="listBox">
				<view class="listBox-wrapper">
					<view class="listBox-body">
						<view class="initNoData" v-if="rewardList.length == 0">暂无数据</view>
						<view class="listBox-list" v-for="(item, index) in rewardList" :key="index">
							<view class="listBox-data">
								<view class="listBox-date">{{ item.date }}</view>
							</view>
							<view class="listBox-data">
								<view class="listBox-price">+{{ item.dayReward }}</view>
								<view class="listBox-label">总收益 {{ item.totalReward }}</view>
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
			rewardList: [],

			// 分页
			pages: 1,
			pageNum: 1,
			pageSize: 20
		};
	},
	onShow() {
		this.$setStatusBarStyle();
		this.init();
	},
	onReachBottom() {
		if (this.pageNum >= this.pages) {
			return this.$tools.toast('到底了');
		} else {
			this.pageNum++;
			this.getTeamList();
		}
	},
	methods: {
		init() {
			this.pageNum = 1;
			this.rewardList = [];
			this.getTeamList();
		},
		getTeamList() {
			this.$Ajax(
				'/front/user/daily/reward/list',
				{
					pageNum: this.pageNum,
					pageSize: this.pageSize
				},
				res => {
					console.log(JSON.stringify(res));
					if (res.code == 0) {
						this.pages = res.obj.pages;
						this.rewardList = this.rewardList.concat(res.obj.list);
					}
				}
			);
		}
	}
};
</script>

<style lang="scss" scoped>
@import '/scss/team_dayReward';
</style>
