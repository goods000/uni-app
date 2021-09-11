<template>
	<view class="pages">
		<view class="initHeader initHeader--fixed initHeader--black">
			<view class="initHeader-wrapper">
				<view class="initHeader-back" @click="$tools.back(1)"></view>
				<view class="initHeader-title">申请经纪人</view>
			</view>
		</view>
		<view class="itemBox">
			<view class="itemBox-wrapper">
				<view class="itemBox-item">
					<view class="itemBox-item__label">直推合约交易量(USDT)</view>
					<view class="itemBox-item__data">{{ teamInfo.ownContractP | number(4) }}</view>
				</view>
				<view class="itemBox-item">
					<view class="itemBox-item__label">团队合约交易量(USDT)</view>
					<view class="itemBox-item__data">{{ teamInfo.teamContractP | number(4) }}</view>
				</view>
			</view>
		</view>

		<view class="levelBox">
			<view class="levelBox-wrapper">
				<view class="levelBox-title">经纪人等级</view>
				<view class="levelBox-desc">
					分享经济时代来临,全民都是经纪人。最高返佣
					<text class="levelBox-desc--highlight">5USDT</text>
					/万
				</view>
				<view class="levelBox-listBox">
					<view
						class="levelBox-list"
						:class="{ 'levelBox-list--active': levelType == index }"
						v-for="(item, index) in levelList"
						:key="index"
						@click="changeLevelType(index, item.id)"
					>
						<view class="levelBox-list__header">
							<view class="levelBox-list__level">
								<image :src="'../../static/agent/icon-level-' + (index + 1) + (levelType == index ? '-active' : '') + '.png'" mode="widthFix"></image>
							</view>
						</view>
						<view class="levelBox-list__itemBox">
							<view class="levelBox-list__itemBox-item">
								<view class="levelBox-list__itemBox-label">直推人数</view>
								<view class="levelBox-list__itemBox-data">{{ item.directCount }}</view>
							</view>
							<view class="levelBox-list__itemBox-item">
								<view class="levelBox-list__itemBox-label">直推合约(USDT)</view>
								<view class="levelBox-list__itemBox-data">{{ item.ownContractP }}</view>
							</view>
							<view class="levelBox-list__itemBox-item">
								<view class="levelBox-list__itemBox-label">团队合约(USDT)</view>
								<view class="levelBox-list__itemBox-data">{{ item.teamContractP }}</view>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="initButton initButton--absolute"><view class="initButton-btn initButton-btn--style" @click="applyLevel()">立即申请</view></view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			teamInfo: [],
			levelType: 0,
			levelList: [],
			configId: 0
		};
	},
	onShow() {
		this.init();
	},
	methods: {
		init() {
			this.getAgentTeamInfo();
			this.getLevelList();
		},
		getAgentTeamInfo(){
			this.$Ajax('/front/agent/team/info', {}, res => {
				console.log(JSON.stringify(res));
				if (res.code == 0) {
					this.teamInfo = res.obj;
				}
			});
		},
		getLevelList() {
			this.$Ajax('/front/agent/config/list', {}, res => {
				console.log(JSON.stringify(res));
				if (res.code == 0) {
					this.levelList = res.obj.reverse();
					this.configId = this.levelList[0].id;
				}
			});
		},
		applyLevel() {
			this.$Ajax(
				'/front/agent/user/apply',
				{
					configId: this.configId
				},
				res => {
					console.log(JSON.stringify(res));
					if (res.code == 0) {
						this.$tools.toast('申请成功');
					}
				}
			);
		},
		changeLevelType(index, configId) {
			if (this.levelType != index) {
				this.levelType = index;
				this.configId = configId;
			}
		}
	}
};
</script>

<style lang="scss" scoped>
@import '/scss/agent_apply';
</style>
