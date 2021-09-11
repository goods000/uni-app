<template>
	<view class="pages" :data-theme="pageTheme">
		<view class="initHeader initHeader--fixed" :class="pageTheme == 'light' ? 'initHeader--black' : 'initHeader--white'">
			<view class="initHeader-wrapper">
				<view class="initHeader-back" @click="$tools.back(1)"></view>
				<view class="initHeader-title initHeader-title--center">下单记录</view>
			</view>
		</view>
		<view class="main">
			<view class="listBox">
				<view class="listBox-wrapper">
					<view class="listBox-body">
						<view class="initNoData" v-if="orderInfoList.length == 0">暂无数据</view>
						<view class="listBox-list" v-for="(item, index) in orderInfoList" :key="index">
							<view class="listBox-list__header">
								<view class="listBox-list__icon"><image :src="item.bourseLogo" mode="widthFix"></image></view>
								<view class="listBox-list__info">
									<view class="listBox-list__row">
										<text class="listBox-list__type" :class="item.type == 0 ? 'listBox-list__type--green' : 'listBox-list__type--red'">{{ item.type == 0 ? '买' : '卖' }}</text>
										<text class="listBox-list__quantity"> x {{ item.quantity | number(8) }}</text>
										<text class="listBox-list__currencyName">{{ item.quotaCurrency }}</text>
									</view>
									<view class="listBox-list__row">
										<text class="listBox-list__label">成交: {{ item.createTime }}</text>
										<text class="listBox-list__label">挂单: {{ item.createTime }}</text>
									</view>
								</view>
							</view>

							<view class="listBox-itemBox">
								<view class="listBox-itemBox__wrapper">
									<view class="listBox-itemBox__item">
										<view class="listBox-itemBox__item-data">{{ item.money | number(2) }}</view>
										<view class="listBox-itemBox__item-label">折合(USDT)</view>
									</view>
									<view class="listBox-itemBox__item">
										<view class="listBox-itemBox__item-data">{{ item.price | number(6) }}</view>
										<view class="listBox-itemBox__item-label">单价(USDT)</view>
									</view>
									<view class="listBox-itemBox__item">
										<view class="listBox-itemBox__item-data listBox-itemBox__item-data--style">
											{{ item.type == 1 ? '平仓' : item.first == 1 ? '开仓' : '补仓' }}
										</view>
										<view class="listBox-itemBox__item-label">策略</view>
									</view>
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
			orderInfoList: [],

			orderId: null
		};
	},
	onLoad(hash){
		this.orderId = hash.value1;
	},
	onShow() {
		this.$setStatusBarStyle();
		this.init();
	},
	methods: {
		init(){
			this.getOrderDetail();
		},
		getOrderDetail() {
			this.$Ajax('/front/order/profit/list', {
				id: this.orderId
			}, res => {
				console.log(JSON.stringify(res));
				if (res.code == 0) {
					this.orderInfoList = res.obj;
				}
			});
		}
	}
};
</script>

<style lang="scss" scoped>
@import '/scss/quantification_rewardRecord_detail';
</style>
