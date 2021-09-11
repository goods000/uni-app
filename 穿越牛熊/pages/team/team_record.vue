<template>
	<view class="pages" :data-theme="pageTheme">
		<view class="initHeader" :class="pageTheme == 'light' ? 'initHeader--black' : 'initHeader--white'">
			<view class="initHeader-wrapper">
				<view class="initHeader-back" @click="$tools.back()"></view>
				<view class="initHeader-title">我的邀请</view>
			</view>
		</view>

		<view class="main">
			<view class="tabsBox">
				<view class="tabsBox-control">
					<view class="tabsBox-control__item" :class="{ 'tabsBox-control__item--active': tabsActive == 1 }" @click="changeTabsActive(1)">直推会员</view>
					<view class="tabsBox-control__item" :class="{ 'tabsBox-control__item--active': tabsActive == 2 }" @click="changeTabsActive(2)">间推会员</view>
				</view>
			</view>
			<view class="listBox">
				<view class="listBox-wrapper">
					<view class="listBox-header">
						<view class="listBox-data">账户</view>
						<view class="listBox-data">注册时间</view>
					</view>
					<view class="listBox-body">
						<view class="initNoData" v-if="teamList.length == 0">暂无数据</view>
						<view class="listBox-list" v-for="(item, index) in teamList" :key="index">
							<view class="listBox-data">{{ item.account | conceal(3) }}</view>
							<view class="listBox-data">{{ item.createTime }}</view>
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
			teamList: [],
			tabsActive: 1,

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
			this.getTeamList();
		},
		getTeamList() {
			this.$Ajax(
				'/front/user/myInviteList',
				{
					gen: this.tabsActive,
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
				this.pageNum = 1;
				this.teamList = [];
				this.getTeamList();
			}
		}
	}
};
</script>

<style lang="scss" scoped>
@import '/scss/team_record';
</style>
