<template>
	<view class="pages">
		<view class="initHeader initHeader--fixed initHeader--white">
			<view class="initHeader-wrapper">
				<view class="initHeader-back" @click="$tools.back(1)"></view>
				<view class="initHeader-title">FIL定存</view>
			</view>
		</view>
		<view class="main">
			<view class="infoBox">
				<view class="infoBox-wrapper">
					<view class="infoBox-header">
						<view class="infoBox-logo"><image src="../../static/ipfs/icon-coin-logo.png" mode="widthFix"></image></view>
						<view class="infoBox-content">
							<view class="infoBox-name">{{ orderInfo.fixedName }}</view>
							<view class="infoBox-desc">一次性结算100%兑付</view>
						</view>
					</view>
					<view class="infoBox-itemBox">
						<view class="infoBox-itemBox__item">
							<view class="infoBox-itemBox__item-label">套餐收益比率</view>
							<view class="infoBox-itemBox__item-data infoBox-itemBox__item-data--style">{{ orderInfo.fixedRate }}%</view>
						</view>
						<view class="infoBox-itemBox__item">
							<view class="infoBox-itemBox__item-label">产品期限</view>
							<view class="infoBox-itemBox__item-data">{{ orderInfo.fixedDays }}天</view>
						</view>
					</view>
					<view class="infoBox-note">{{ orderInfo.fixedMul }}FIL起购 定期产品</view>
				</view>
			</view>

			<view class="recordBox">
				<view class="recordBox-wrapper">
					<view class="recordBox-listBox">
						<view class="recordBox-listBox__list">
							<view class="recordBox-listBox__list-label">定存数量：</view>
							<view class="recordBox-listBox__list-data recordBox-listBox__list-data--style">{{ orderInfo.fixedMul }}</view>
						</view>
						<view class="recordBox-listBox__list">
							<view class="recordBox-listBox__list-label">存币类型：</view>
							<view class="recordBox-listBox__list-data">{{ orderInfo.currencyName }}</view>
						</view>
						<view class="recordBox-listBox__list">
							<view class="recordBox-listBox__list-label">购买时间：</view>
							<view class="recordBox-listBox__list-data">{{ orderInfo.createTime }}</view>
						</view>
						<view class="recordBox-listBox__list">
							<view class="recordBox-listBox__list-label">已锁时间：</view>
							<view class="recordBox-listBox__list-data">{{ orderInfo.lockedDays }}天</view>
						</view>
						<view class="recordBox-listBox__list">
							<view class="recordBox-listBox__list-label">当前状态：</view>
							<view class="recordBox-listBox__list-data">{{ statusList[orderInfo.fixedStatus] }}</view>
						</view>
						<view class="recordBox-listBox__list">
							<view class="recordBox-listBox__list-label">订单编号：</view>
							<view class="recordBox-listBox__list-data">{{ orderInfo.orderId }}</view>
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
			orderInfo: [],
			statusList: ['锁仓中','已结算'],
			orderId: ''
		};
	},
	computed: {
		i18n() {
			return this.$t('message');
		}
	},
	onLoad(hash) {
		this.orderId = hash.value1;
	},
	onShow() {
		this.init();
	},
	methods: {
		init() {
			this.getOrderInfo();
		},
		getOrderInfo() {
			this.$Ajax(
				'/front/coin/getFixedUserList',
				{
					id: this.orderId
				},
				res => {
					console.log('定存详情' + JSON.stringify(res));
					if (res.code == 0) {
						this.orderInfo = res.obj.list[0];
					}
				}
			);
		}
	}
};
</script>

<style lang="scss" scoped>
@import '@/common/scss/pages/ipfs/ipfs_deposit_detail';
</style>
