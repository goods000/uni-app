<template>
	<view class="pages" :data-theme="pageTheme">
		<view class="highStyleBg"></view>

		<view class="initHeader initHeader--white">
			<view class="initHeader-wrapper">
				<view class="initHeader-back" @click="$tools.back(1)"></view>
				<view class="initHeader-title">我的社区</view>
			</view>
		</view>

		<view class="main">
			<view class="planeBox">
				<view class="planeBox-wrapper">
					<view class="planeBox-level" v-if="teamHeaderInfo.levelPic != null"><image :src="teamHeaderInfo.levelPic" mode="widthFix"></image></view>
					<view class="planeBox-header">
						<view class="planeBox-info" @click="$tools.jump('../team/team_dayReward')">
							<view class="planeBox-info__label">总收益(USDT)</view>
							<view class="planeBox-info__data">{{ teamHeaderInfo.total | number(4) }}</view>
						</view>
					</view>
					<view class="planeBox-bottom">
						<view class="planeBox-dataBox">
							<view class="planeBox-dataBox__item" @click="$tools.jump('../team/team_teamReward', 1)">
								<view class="planeBox-dataBox__item-data">{{ teamHeaderInfo.dynamic1 | number(4) }}</view>
								<view class="planeBox-dataBox__item-label">分享收益</view>
							</view>
							<view class="planeBox-dataBox__item" @click="$tools.jump('../team/team_teamReward', 2)">
								<view class="planeBox-dataBox__item-data">{{ teamHeaderInfo.dynamic2 | number(4) }}</view>
								<view class="planeBox-dataBox__item-label">间接收益</view>
							</view>
						</view>
					</view>
					<view class="planeBox-bottom">
						<view class="planeBox-dataBox">
							<view class="planeBox-dataBox__item">
								<view class="planeBox-dataBox__item-num">{{ teamHeaderInfo.maxAchievement | number(4) }}</view>
								<view class="planeBox-dataBox__item-label">大区业绩</view>
							</view>
							<view class="planeBox-dataBox__item">
								<view class="planeBox-dataBox__item-num">{{ teamHeaderInfo.minAchievement | number(4) }}</view>
								<view class="planeBox-dataBox__item-label">小区业绩</view>
							</view>
						</view>
					</view>
					<view class="planeBox-buttonBox">
						<view class="planeBox-buttonBox__btn" @click="$tools.jump('../team/team_buyLevel')">购买等级</view>
						<view class="planeBox-buttonBox__btn" @click="$tools.jump('../team/team_record')">我的邀请</view>
					</view>
				</view>
			</view>

			<view class="listBox">
				<view class="listBox-wrapper">
					<view class="listBox-title initTitle"><view class="initTitle-label">团队收益明细</view></view>
					<view class="listBox-content">
						<view class="initNoData" v-if="teamRewardList.length == 0">暂无数据</view>
						<view class="listBox-list" v-for="(item, index) in teamRewardList" :key="index">
							<view class="listBox-list__title">+{{ item.reward }}</view>
							<view class="listBox-itemBox">
								<view class="listBox-itemBox__item">
									<view class="listBox-itemBox__item-label">交易账户</view>
									<view class="listBox-itemBox__item-data">{{ item.provideAccount | conceal(3) }}</view>
								</view>
								<view class="listBox-itemBox__item">
									<view class="listBox-itemBox__item-label">时间</view>
									<view class="listBox-itemBox__item-data">{{ item.createTime }}</view>
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
			tabsActive: 1,

			teamHeaderInfo: [],
			teamRewardList: [],

			pages: 1,
			pageNum: 1,
			pageSize: 20
		};
	},
	onShow() {
		this.$setStatusBarStyle();
		this.init();
	},
	methods: {
		init() {
			this.teamRewardList = [];
			this.pageNum = 1;
			this.getTeamHeaderInfo();
			this.getRewardList();
		},
		getTeamHeaderInfo() {
			this.$Ajax('/front/user/get/total/profit', {}, res => {
				console.log(JSON.stringify(res));
				if (res.code == 0) {
					this.teamHeaderInfo = res.obj;
				}
			});
		},
		getRewardList() {
			this.$Ajax(
				'/front/user/team/reward/list',
				{
					pageNum: this.pageNum,
					pageSize: this.pageSize
				},
				res => {
					console.log(JSON.stringify(res));
					if (res.code == 0) {
						this.pages = res.obj.pages;
						this.teamRewardList = this.teamRewardList.concat(res.obj.list);
					}
				}
			);
		},

		changeTabsActive(index) {
			if (this.tabsActive != index) {
				this.tabsActive = index;
				this.teamRewardList = [];
				this.pageNum = 1;
				this.getRewardList();
			}
		}
	}
};
</script>

<style lang="scss" scoped>
@import '/scss/team';
</style>
