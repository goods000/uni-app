<template>
	<view class="pages">
		<view class="initHeader initHeader--white">
			<view class="initHeader-wrapper">
				<view class="initHeader-back" @click="$tools.back()"></view>
				<view class="initHeader-title">我的团队</view>
			</view>
		</view>

		<view class="bgBox"><image src="../../static/team/img-bg.jpg" mode="widthFix"></image></view>
		<view class="main">
			<view class="itemBox">
				<view class="itemBox-wrapper">
					<view class="itemBox-item">
						<view class="itemBox-item__data">{{ teamInfo.teamMoney }}</view>
						<view class="itemBox-item__label">团队业绩</view>
					</view>
					<view class="itemBox-item">
						<view class="itemBox-item__data itemBox-item__data--level"><image :src="'../../static/team/icon-level-' + teamInfo.teamLevel + '.png'" mode="widthFix"></image></view>
						<view class="itemBox-item__label">我的等级</view>
					</view>
					<view class="itemBox-item">
						<view class="itemBox-item__data">{{ teamInfo.directValid }}</view>
						<view class="itemBox-item__label">有效直推</view>
					</view>
				</view>
			</view>

			<view class="tabsBox">
				<view class="tabsBox-control">
					<view class="tabsBox-control__item" :class="{ 'tabsBox-control__item--active': tabsActive == 0 }" @click="changeTabsActive(0)">我的好友</view>
					<view class="tabsBox-control__item" :class="{ 'tabsBox-control__item--active': tabsActive == 1 }" @click="changeTabsActive(1)">团队业绩</view>
				</view>
				<view class="tabsBox-wrapper">
					<view class="tabsBox-content" v-if="tabsActive == 0">
						<view class="listBox">
							<view class="listBox-wrapper">
								<view class="listBox-header">
									<view class="listBox-data">用户名</view>
									<view class="listBox-data">等级</view>
									<view class="listBox-data">团队业绩</view>
								</view>
								<view class="listBox-body">
									<view class="initNoData" v-if="teamList.length == 0">暂无数据</view>
									<view class="listBox-list" v-for="(item, index) in teamList" :key="index">
										<view class="listBox-data">{{ item.account }}</view>
										<view class="listBox-data">{{ item.teamLevel }}</view>
										<view class="listBox-data">{{ item.money }}</view>
									</view>
								</view>
							</view>
						</view>
					</view>
					<view class="tabsBox-content" v-if="tabsActive == 1">
						<view class="infoBox">
							<view class="infoBox-wrapper">
								<view class="infoBox-list">
									<view class="infoBox-list__label">团队有效账户</view>
									<view class="infoBox-list__data">{{ teamInfo.teamValie }}人</view>
								</view>
								<view class="infoBox-list">
									<view class="infoBox-list__label">直推普通会员</view>
									<view class="infoBox-list__data">{{ teamInfo.noneStar }}人</view>
								</view>
								<view class="infoBox-list">
									<view class="infoBox-list__label">直推一星</view>
									<view class="infoBox-list__data">{{ teamInfo.oneStar }}人</view>
								</view>
								<view class="infoBox-list">
									<view class="infoBox-list__label">直推二星</view>
									<view class="infoBox-list__data">{{ teamInfo.twoStar }}人</view>
								</view>
								<view class="infoBox-list">
									<view class="infoBox-list__label">直推三星</view>
									<view class="infoBox-list__data">{{ teamInfo.threeStar }}人</view>
								</view>
								<view class="infoBox-list">
									<view class="infoBox-list__label">直推四星</view>
									<view class="infoBox-list__data">{{ teamInfo.fourStar }}人</view>
								</view>
								<view class="infoBox-list">
									<view class="infoBox-list__label">直推五星</view>
									<view class="infoBox-list__data">{{ teamInfo.fiveStar }}人</view>
								</view>
								<view class="infoBox-list">
									<view class="infoBox-list__label">全球合伙人</view>
									<view class="infoBox-list__data">{{ teamInfo.sixStar }}人</view>
								</view>
								<view class="infoBox-list">
									<view class="infoBox-list__label">节点合伙人</view>
									<view class="infoBox-list__data">{{ teamInfo.nodeCount }}人</view>
								</view>
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
			teamInfo: [],
			teamList: [],
			tabsActive: 0,

			// 分页
			pages: 1,
			pageNum: 1,
			pageSize: 20
		};
	},
	onShow() {
		this.init();
	},
	methods: {
		init() {
			this.getTeamInfo();
			this.getTeamList();
			// this.twoTeamList = [];
			// this.threeTeamList = [];
			//
			// this.getOneTeamList();
			// this.getTwoTeamList();
			// this.getThreeTeamList();
		},

		getTeamInfo() {
			this.$Ajax('/front/team/index/info', {}, res => {
				console.log(JSON.stringify(res));
				if (res.code == 0) {
					this.teamInfo = res.obj;
				}
			});
		},

		getTeamList() {
			this.$Ajax(
				'/front/team/direct/list',
				{
					pageNum: this.pageNum,
					pageSize: this.pageSize
				},
				res => {
					console.log(JSON.stringify(res));
					if (res.code == 0) {
						this.pages = res.obj.pages;
						this.teamList = this.teamList.concat(res.obj.list);
					}
				}
			);
		},

		changeTabsActive(index) {
			if (this.tabsActive != index) {
				this.tabsActive = index;
			}
		}
	}
};
</script>

<style lang="scss" scoped>
@import '@/common/scss/pages/team';
</style>
