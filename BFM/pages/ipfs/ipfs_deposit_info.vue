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

			<view class="stepInfoBox">
				<view class="stepInfoBox-wrapper">
					<view class="stepInfoBox-title">买入流程</view>
					<view class="stepInfoBox-progressBox">
						<view class="stepInfoBox-progressBox__item">
							<view class="stepInfoBox-progressBox__item-data">T日</view>
							<view class="stepInfoBox-progressBox__item-label">购买提交</view>
						</view>
						<view class="stepInfoBox-progressBox__item">
							<view class="stepInfoBox-progressBox__item-data">T+1日</view>
							<view class="stepInfoBox-progressBox__item-label">套餐生效</view>
						</view>
						<view class="stepInfoBox-progressBox__item">
							<view class="stepInfoBox-progressBox__item-data">T+(套餐期限/+1)日</view>
							<view class="stepInfoBox-progressBox__item-label">套餐结算</view>
						</view>
					</view>
					<view class="stepInfoBox-listBox">
						<view class="stepInfoBox-listBox__list">
							<view class="stepInfoBox-listBox__list-label">
								T日：购买日，以每日24:00为界限，24:00 (不含)之前为T日，24:00(含)及之后为T+1日。套餐生效时间已实际支付成功为准。
							</view>
						</view>
						<view class="stepInfoBox-listBox__list">
							<view class="stepInfoBox-listBox__list-label">套餐结算：套餐生效日后，到达定存期限后将一次性结算收益（含本金及利息同时返还）</view>
						</view>
					</view>
				</view>
			</view>
			<view class="initButton"><view class="initButton-btn initButton-btn--style" @click="$tools.jump('../ipfs/ipfs_deposit_buy', orderId)">购买</view></view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			orderInfo: [],
			orderId: 0
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
			this.getOrderDetail();
		},
		getOrderDetail() {
			this.$Ajax(
				'/front/coin/getFixedDepositList',
				{
					id: this.orderId
				},
				res => {
					console.log('算力信息' + JSON.stringify(res));
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
@import '@/common/scss/pages/ipfs/ipfs_deposit_info';
</style>
