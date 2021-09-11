<template>
	<view class="pages" :data-theme="pageTheme">
		<view class="initHeader initHeader--white">
			<view class="initHeader-wrapper">
				<view class="initHeader-back" @click="$tools.back(1)"></view>
				<view class="initHeader-title">我的钱包</view>
			</view>
		</view>
		
		<view class="highStyleBg"></view>

		<view class="main">
			<view class="tabsBox">
				<view class="tabsBox-control">
					<view class="tabsBox-control__item" :class="{ 'tabsBox-control__item--active': tabsActive == 1 }" @click="changeTabsActive(1)">资金账户</view>
					<view class="tabsBox-control__item" :class="{ 'tabsBox-control__item--active': tabsActive == 2 }" @click="changeTabsActive(2)">点卡账户</view>
					<view class="tabsBox-control__item" :class="{ 'tabsBox-control__item--active': tabsActive == 3 }" @click="changeTabsActive(3)">佣金账户</view>
				</view>
				<view class="tabsBox-wrapper">
					<view class="frameBox">
						<view class="frameBox-wrapper">
							<view class="frameBox-plane">
								<view class="frameBox-header">
									<view class="frameBox-icon"><image :src="walletInfo.icon" mode="scaleToFill"></image></view>
									<view class="frameBox-label">{{ walletInfo.name }}</view>
									<view class="frameBox-price">{{ walletInfo.using | number(6) }}</view>
								</view>
								<view class="frameBox-itemBox">
									<view class="frameBox-itemBox__item">
										<view class="frameBox-itemBox__item-label">可用</view>
										<view class="frameBox-itemBox__item-data">{{ walletInfo.using | number(6) }}</view>
									</view>
									<view class="frameBox-itemBox__item" v-if="tabsActive == 1">
										<view class="frameBox-itemBox__item-label">冻结</view>
										<view class="frameBox-itemBox__item-data">{{ walletInfo.freeze | number(6) }}</view>
									</view>
									<view class="frameBox-itemBox__item frameBox-itemBox__item--alignRight">
										<view class="frameBox-itemBox__item-label">折合(CNY)</view>
										<view class="frameBox-itemBox__item-data">{{ walletInfo.using * walletInfo.usdtPrice | number(6) }}</view>
									</view>
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>

			<view class="listBox">
				<view class="listBox-wrapper">
					<view class="listBox-title initTitle">
						<view class="initTitle-wrapper"><view class="initTitle-label">财务明细</view></view>
					</view>
					
					<view class="listBox-body">
						<view class="initNoData" v-if="logList.length == 0">暂无数据</view>
						<view class="listBox-list" v-for="(item, index) in logList" :key="index">
							<view class="listBox-list__info">
								<view class="listBox-list__title">{{ item.remark }}</view>
								<view class="listBox-list__date">{{ item.createTime }}</view>
							</view>
							<view class="listBox-list__itemBox">
								<view class="listBox-list__itemBox-item">
									<view class="listBox-list__itemBox-label">数量</view>
									<view class="listBox-list__itemBox-data">{{ item.money | number(4) }}</view>
								</view>
								<view class="listBox-list__itemBox-item">
									<view class="listBox-list__itemBox-label">折合(CNY)</view>
									<view class="listBox-list__itemBox-data">{{ item.money * walletInfo.usdtPrice | number(8) }}</view>
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>

		<view class="fixedBox">
			<view class="fixedBox-wrapper">
				<view class="fixedBox-item" @click="$tools.jump('../assets/assets_recharge')" v-show="tabsActive == 1">
					<view class="fixedBox-item__icon"><image :src="'../../static/assets/icon-recharge-' + pageTheme + '.png'" mode="widthFix"></image></view>
					<view class="fixedBox-item__label">充币</view>
				</view>
				<view class="fixedBox-item" @click="$tools.jump('../assets/assets_withdraw')" v-show="tabsActive == 1">
					<view class="fixedBox-item__icon"><image :src="'../../static/assets/icon-withdraw-' + pageTheme + '.png'" mode="widthFix"></image></view>
					<view class="fixedBox-item__label">提币</view>
				</view>
				<view class="fixedBox-item" @click="$tools.jump('../assets/assets_transferInside')" v-show="tabsActive == 3">
					<view class="fixedBox-item__icon"><image :src="'../../static/assets/icon-transferInside-' + pageTheme + '.png'" mode="widthFix"></image></view>
					<view class="fixedBox-item__label">划转</view>
				</view>
				<view class="fixedBox-item" @click="$tools.jump('../assets/assets_exchange')" v-show="tabsActive == 1 || tabsActive == 3">
					<view class="fixedBox-item__icon"><image :src="'../../static/assets/icon-exchange-' + pageTheme + '.png'" mode="widthFix"></image></view>
					<view class="fixedBox-item__label">兑换</view>
				</view>
				<!-- <view class="fixedBox-item" @click="$tools.jump('../assets/assets_transfer',tabsActive)" v-show="tabsActive == 1 || tabsActive == 2">
					<view class="fixedBox-item__icon"><image :src="'../../static/assets/icon-transfer-' + pageTheme + '.png'" mode="widthFix"></image></view>
					<view class="fixedBox-item__label">转账</view>
				</view> -->
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			walletInfo: [],
			assetsList: [],
			logList: [],

			btcPrice: 0, // USDT实时价格
			tabsActive: 1, //类型[1资金账户，2佣金账户]
			typeActive: null,

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
			this.getLog();
		}
	},
	methods: {
		init() {
			this.logList = [];
			this.pageNum = 1;
			this.getAssetsTotal();
			this.getLog();
		},
		getAssetsTotal() {
			this.$Ajax('/front/financial/asset/single', {
				walletType: this.tabsActive //钱包类型[1资金2点卡3奖励]
			}, res => {
				console.log(JSON.stringify(res));
				if (res.code == 0) {
					let using;
					if(this.tabsActive == 1){
						using = res.obj.recharge;
					}else if(this.tabsActive == 2){
						using = res.obj.service;
					}else if(this.tabsActive == 3){
						using = res.obj.reward;
					}
					this.walletInfo = res.obj;
					this.walletInfo.using = using;
				}
			});
		},

		getLog() {
			this.$Ajax(
				'/front/financial/getLog',
				{
					pageNum: this.pageNum,
					pageSize: this.pageSize,
					walletType: this.tabsActive //钱包类型[1资金2点卡3奖励]
				},
				res => {
					console.log(JSON.stringify(res));
					if (res.code == 0) {
						this.pages = res.obj.pages;
						this.logList = this.logList.concat(res.obj.list);
					}
				}
			);
		},

		changeTabsActive(index) {
			if (this.tabsActive != index) {
				this.tabsActive = index;
				this.logList = [];
				this.pageNum = 1;
				this.getAssetsTotal();
				this.getLog();
			}
		},
		changeTypeActive(index) {
			if (this.typeActive != index) {
				this.typeActive = index;
				this.logList = [];
				this.pageNum = 1;
				// this.getLog();
			}
		}
	}
};
</script>

<style lang="scss" scoped>
@import '/scss/assets';
</style>
