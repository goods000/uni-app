<template>
	<view class="pages">
		<view class="initHeader initHeader--black">
			<view class="initHeader-wrapper"><view class="initHeader-back" @click="$tools.back(1)"></view></view>
		</view>

		<view class="main">
			<view class="tabsBox">
				<view class="tabsBox-control">
					<view class="tabsBox-control__item" :class="{ 'tabsBox-control__item--active': tabsActive == 1 }" @click="changeTabsActive(1)">资金账户</view>
					<view class="tabsBox-control__item" :class="{ 'tabsBox-control__item--active': tabsActive == 2 }" @click="changeTabsActive(2)">佣金账户</view>
				</view>
				<view class="tabsBox-wrapper">
					<view class="frameBox">
						<view class="frameBox-wrapper">
							<view class="frameBox-plane" v-for="(item, index) in assetsList" :key="index" v-if="tabsActive == 1 || tabsActive == 2 && item.currencyName == 'ONU'">
								<view class="frameBox-header">
									<view class="frameBox-icon"><image :src="item.pic" mode="widthFix"></image></view>
									<view class="frameBox-label">{{ item.currencyName }}</view>
									<view class="frameBox-price">{{ tabsActive == 1 ? item.using : item.reward | number(6) }}</view>
								</view>
								<view class="frameBox-itemBox">
									<view class="frameBox-itemBox__item">
										<view class="frameBox-itemBox__item-label">可用</view>
										<view class="frameBox-itemBox__item-data">{{ tabsActive == 1 ? item.using : item.reward | number(6) }}</view>
									</view>
									<view class="frameBox-itemBox__item" v-if="tabsActive == 1">
										<view class="frameBox-itemBox__item-label">冻结</view>
										<view class="frameBox-itemBox__item-data">{{ item.freeze | number(6) }}</view>
									</view>
									<view class="frameBox-itemBox__item frameBox-itemBox__item--alignRight">
										<view class="frameBox-itemBox__item-label">折合(BTC)</view>
										<view class="frameBox-itemBox__item-data">{{ ((tabsActive == 1 ? item.using : item.reward) / btcPrice) | number(6) }}</view>
									</view>
								</view>
								<view class="fancyBox">
									<view class="fancyBox-wrapper">
										<view class="fancyBox-item" @click="$tools.jump('../assets/assets_recharge')" v-if="tabsActive == 1 && item.currencyName == 'USDT'">
											<view class="fancyBox-item__label">充币</view>
										</view>
										<view class="fancyBox-item" @click="$tools.jump('../assets/assets_withdraw')" v-if="tabsActive == 1 && item.currencyName == 'USDT'">
											<view class="fancyBox-item__label">提币</view>
										</view>
										<view class="fancyBox-item" @click="$tools.jump('../assets/assets_exchange')" v-if="tabsActive == 1">
											<view class="fancyBox-item__label">闪兑</view>
										</view>
										<view class="fancyBox-item" @click="$tools.jump('../assets/assets_transfer')" v-if="tabsActive == 2">
											<view class="fancyBox-item__label">划转</view>
										</view>
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
						<view class="initTitle-wrapper">
							<view class="initTitle-label">{{ tabsActive == 1 ? '财务明细' : '佣金明细' }}</view>
						</view>
					</view>
					<view class="filterBox">
						<view class="filterBox-wrapper">
							<view class="filterBox-button">
								<view
									class="filterBox-button__btn"
									:class="{ 'filterBox-button__btn--active': typeActive == item.currencyId }"
									v-for="(item, index) in assetsList"
									:key="index"
									@click="changeTypeActive(item.currencyId)"
									v-if="tabsActive == 1 || tabsActive == 2 && item.currencyName != 'USDT'"
								>
									{{ item.currencyName }}
								</view>
							</view>
						</view>
					</view>

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
								<view class="listBox-list__itemBox-label">折合(BTC)</view>
								<view class="listBox-list__itemBox-data">{{ (item.money * item.price / btcPrice) | number(8) }}</view>
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
		},
		getAssetsTotal() {
			// 获取总资产
			this.$Ajax('/front/financial/assets/total', {}, res => {
				console.log(JSON.stringify(res));
				if (res.code == 0) {
					this.btcPrice = res.obj.btcPrice;
					this.assetsList = res.obj.assets;
					this.typeActive = this.assetsList[0].currencyId;
					this.getLog();
				}
			});
		},

		getLog() {
			this.$Ajax(
				'/front/financial/getLog',
				{
					currencyId: this.typeActive,
					pageNum: this.pageNum,
					pageSize: this.pageSize,
					parentType: this.tabsActive //类型[1资金账户，2佣金账户]
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
				this.typeActive = this.assetsList[0].currencyId;
				this.logList = [];
				this.pageNum = 1;
				this.getLog();
			}
		},
		changeTypeActive(index) {
			if (this.typeActive != index) {
				this.typeActive = index;
				this.logList = [];
				this.pageNum = 1;
				this.getLog();
			}
		}
	}
};
</script>

<style lang="scss" scoped>
@import '/scss/assets';
</style>
