<template>
	<view class="pages">
		<view class="initHeader initHeader--white">
			<view class="initHeader-wrapper">
				<view class="initHeader-back" @click="$tools.back(1)"></view>
				<view class="initHeader-title">算力购买</view>
			</view>
		</view>
		<view class="bgBox"><image src="../../static/ipfs/img-bg-style-3.png" mode="widthFix"></image></view>
		<view class="main">
			<view class="planeBox">
				<view class="planeBox-wrapper">
					<view class="planeBox-info">
						<view class="planeBox-icon"><image src="../../static/ipfs/icon-buy-demo.png" mode="widthFix"></image></view>
						<view class="planeBox-content">
							<view class="planeBox-title">IPFS云算力</view>
							<view class="planeBox-desc">IPFS CLOUD WORK FORCE</view>
							<view class="planeBox-itemBox">
								<view class="planeBox-itemBox__item">
									<view class="planeBox-itemBox__item-label">当前状态</view>
									<view class="planeBox-itemBox__item-data">{{ statusList[orderInfo.cloudStatus] }}</view>
								</view>
							</view>
						</view>
					</view>
					<view class="planeBox-listBox">
						<view class="planeBox-listBox__list">
							<view class="planeBox-listBox__list-label">购买单价/T</view>
							<view class="planeBox-listBox__list-data">{{ orderInfo.cloudAmount / orderInfo.cloudMul }}{{ orderInfo.currencyName }}/1T</view>
						</view>
						<view class="planeBox-listBox__list">
							<view class="planeBox-listBox__list-label">购买数量</view>
							<view class="planeBox-listBox__list-data">{{ orderInfo.cloudMul }}T</view>
						</view>
						<view class="planeBox-listBox__list">
							<view class="planeBox-listBox__list-label">合约天数(剩余)</view>
							<view class="planeBox-listBox__list-data">{{ orderInfo.surplusDays }}天</view>
						</view>
						<view class="planeBox-listBox__list">
							<view class="planeBox-listBox__list-label">封装天数</view>
							<view class="planeBox-listBox__list-data">{{ orderInfo.pottingDays }}天</view>
						</view>
						<view class="planeBox-listBox__list">
							<view class="planeBox-listBox__list-label">交易金额</view>
							<view class="planeBox-listBox__list-data">
								<text class="planeBox-listBox__list-data--highlight">{{ orderInfo.cloudAmount }}</text>
								{{ orderInfo.currencyName }}
							</view>
						</view>
						<view class="planeBox-listBox__list">
							<view class="planeBox-listBox__list-label">购买时间</view>
							<view class="planeBox-listBox__list-data">{{ orderInfo.createTime }}</view>
						</view>
						<view class="planeBox-listBox__list">
							<view class="planeBox-listBox__list-label">订单编号</view>
							<view class="planeBox-listBox__list-data">{{ orderInfo.orderId }}</view>
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
			statusList: ['收益中','已结算','封装中'],
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
				'/front/coin/getCloudUserList',
				{
					id: this.orderId
				},
				res => {
					console.log('算力详情' + JSON.stringify(res));
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
@import '@/common/scss/pages/ipfs/ipfs_calcPower_detail';
</style>
