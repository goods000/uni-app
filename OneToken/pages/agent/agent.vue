<template>
	<view class="pages">
		<view class="initHeader initHeader--fixed initHeader--black">
			<view class="initHeader-wrapper">
				<view class="initHeader-back" @click="$tools.back(1)"></view>
				<view class="initHeader-title">OneToken经纪人</view>
				<view class="initHeader-right initHeader-right--text" @click="$tools.jump('../team/team')">我的邀请</view>
			</view>
		</view>
		<view class="planeBox">
			<view class="planeBox-wrapper">
				<view class="planeBox-header">
					<view class="planeBox-info">
						<view class="planeBox-info__label">累计返佣(USDT)</view>
						<view class="planeBox-info__data">{{ userInfo.totalReward | number(4) }}</view>
					</view>
				</view>
				<view class="planeBox-body">
					<view class="planeBox-itemBox">
						<view class="planeBox-itemBox__item">
							<view class="planeBox-itemBox__item-label">经纪人级别</view>
							<view class="planeBox-itemBox__item-data">V{{ userInfo.agentLevel }}</view>
						</view>
						<view class="planeBox-itemBox__item">
							<view class="planeBox-itemBox__item-label">直推会员</view>
							<view class="planeBox-itemBox__item-data">{{ userInfo.directCount }}</view>
						</view>
						<view class="planeBox-itemBox__item">
							<view class="planeBox-itemBox__item-label">团队会员</view>
							<view class="planeBox-itemBox__item-data">{{ userInfo.teamCount }}</view>
						</view>
					</view>
				</view>
			</view>
		</view>

		<view class="buttonBox">
			<view class="buttonBox-wrapper">
				<view class="buttonBox-btn" @click="$tools.jump('../agent/agent_apply')">申请经纪人</view>
				<view class="buttonBox-btn" @click="$tools.jump('../invite/invite')">邀请好友</view>
				<view class="buttonBox-btn" @click="$tools.jump('../share/share')">社区海报</view>
			</view>
		</view>

		<view class="listBox">
			<view class="listBox-wrapper">
				<view class="listBox-title initTitle">
					<view class="initTitle-wrapper"><view class="initTitle-label">佣金明细</view></view>
				</view>
				<view class="initNoData" v-if="rewardList.length == 0">暂无数据</view>
				<view class="listBox-list" v-for="(item, index) in rewardList" :key="index">
					<view class="listBox-list__info">
						<view class="listBox-list__title">{{ item.quantity }} USDT</view>
					</view>
					<view class="listBox-list__itemBox">
						<view class="listBox-list__itemBox-item">
							<view class="listBox-list__itemBox-label">交易账户</view>
							<view class="listBox-list__itemBox-data">{{ item.contributeAccount }}</view>
						</view>
						<view class="listBox-list__itemBox-item">
							<view class="listBox-list__itemBox-label">时间</view>
							<view class="listBox-list__itemBox-data">{{ item.createTime }}</view>
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
			userInfo: [],
			rewardList: [],

			pageNum: 1,
			pageSize: 20,
			pages: 1
		};
	},
	onShow() {
		this.init();
	},
	onReachBottom() {
		if (this.pageNum >= this.pages) {
			return this.$tools.toast('到底了');
		} else {
			this.pageNum++;
			this.getRewardList();
		}
	},
	methods: {
		init() {
			this.rewardList = [];
			this.pageNum = 1;
			this.getUserInfo();
			this.getRewardList();
		},
		getUserInfo() {
			this.$Ajax('/front/agent/user/info', {}, res => {
				console.log('用户信息'+JSON.stringify(res));
				if (res.code == 0) {
					this.userInfo = res.obj;
				}
			});
		},
		getRewardList() {
			this.$Ajax(
				'/front/agent/user/reward',
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
@import '/scss/agent';
</style>
