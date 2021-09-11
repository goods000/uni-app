<template>
	<view class="pages" :data-theme="pageTheme">
		<!-- <view class="highStyleBg"></view> -->

		<view class="initHeader initHeader--fixed" :class="pageTheme == 'light' ? 'initHeader--black' : 'initHeader--white'">
			<view class="initHeader-wrapper">
				<view class="initHeader-back" @click="$tools.back(1)"></view>
				<view class="initHeader-title initHeader-title--center">利润统计</view>
				<!-- <view class="initHeader-right"><view class="initHeader-button initHeader-button--filter" @click="openPopup('filterPopup')"></view></view> -->
			</view>
		</view>

		<view class="main">
			<view class="planeBox">
				<view class="planeBox-wrapper">
					<view class="planeBox-itemBox">
						<view class="planeBox-itemBox__item">
							<view class="planeBox-itemBox__item-data">{{ totalProfit.todayProfit | number(6) }}</view>
							<view class="planeBox-itemBox__item-label">今日量化盈利(USDT)</view>
						</view>
						<view class="planeBox-itemBox__item" @click="$tools.jump('../quantification/quantification_dayReward')">
							<view class="planeBox-itemBox__item-data planeBox-itemBox__item-data--arrow">{{ totalProfit.totalProfit | number(6) }}</view>
							<view class="planeBox-itemBox__item-label">累计量化盈利(USDT)</view>
						</view>
					</view>
				</view>
			</view>

			<view class="filterBox">
				<view class="filterBox-wrapper">
					<view class="filterBox-title">利润统计明细</view>
					<view class="filterBox-date" @click="dateVisible = true">{{ dateValue }}</view>
				</view>
			</view>

			<view class="initScrollTabsBox">
				<scroll-view class="initScrollTabsBox-control" :scroll-x="true">
					<view class="initScrollTabsBox-control__tabs" :class="{ 'initScrollTabsBox-control__tabs--active': tabsActive == 0 }" @click="changeTabsActive(0)">所有</view>
					<view
						class="initScrollTabsBox-control__tabs"
						:class="{ 'initScrollTabsBox-control__tabs--active': tabsActive == index + 1 }"
						v-for="(item, index) in currencyList"
						:key="index"
						@click="changeTabsActive(index + 1)"
					>
						{{ item }}
					</view>
				</scroll-view>
			</view>

			<view class="listBox">
				<view class="listBox-wrapper">
					<!-- <view class="listBox-title">
						<view class="listBox-title__label">利润统计明细</view>
						<view class="listBox-title__filter" @click="dateVisible = true">{{ dateValue }}</view>
					</view> -->

					<view class="listBox-body">
						<view class="initNoData" v-if="recordList.length == 0">暂无数据</view>
						<view
							class="listBox-list"
							v-for="(item, index) in recordList"
							:key="index"
							@click="$tools.jump('../quantification/quantification_rewardRecord_detail', item.id)"
						>
							<view class="listBox-list__header">
								<view class="listBox-list__icon"><image :src="item.bourseLogo" mode="widthFix"></image></view>
								<view class="listBox-list__info">
									<view class="listBox-list__row">
										<text class="listBox-list__type">结单量 {{ (item.closeMoney / item.closePrice) | number(8) }}</text>
										<text class="listBox-list__currencyName">{{ item.quotaCurrency }}</text>
									</view>
									<view class="listBox-list__row">
										<text class="listBox-list__label">结单: {{ item.createTime }}</text>
										<text class="listBox-list__label">手续费: {{ item.charge | number(6) }}</text>
									</view>
								</view>
							</view>

							<view class="listBox-itemBox">
								<view class="listBox-itemBox__wrapper">
									<view class="listBox-itemBox__item">
										<view
											class="listBox-itemBox__item-data"
											:class="[{ 'listBox-itemBox__item-data--green': item.rate > 0 }, { 'listBox-itemBox__item-data--red': item.rate < 0 }]"
										>
											{{ item.profit | number(6) }}
										</view>
										<view class="listBox-itemBox__item-label">结单收益</view>
									</view>
									<view class="listBox-itemBox__item">
										<view class="listBox-itemBox__item-data">{{ item.openPrice | number(6) }}</view>
										<view class="listBox-itemBox__item-label">建仓均价</view>
									</view>
									<view class="listBox-itemBox__item">
										<view class="listBox-itemBox__item-data">{{ item.closePrice | number(6) }}</view>
										<view class="listBox-itemBox__item-label">平仓均价</view>
									</view>
									<view class="listBox-itemBox__item">
										<view
											class="listBox-itemBox__item-data"
											:class="[{ 'listBox-itemBox__item-data--green': item.rate > 0 }, { 'listBox-itemBox__item-data--red': item.rate < 0 }]"
										>
											{{ (item.rate * 100) | number(2) }}%
										</view>
										<view class="listBox-itemBox__item-label">结单收益率</view>
									</view>
									<view class="listBox-itemBox__item">
										<view class="listBox-itemBox__item-data">{{ item.openMoney | number(6) }}</view>
										<view class="listBox-itemBox__item-label">建仓总额</view>
									</view>
									<view class="listBox-itemBox__item">
										<view class="listBox-itemBox__item-data">{{ item.closeMoney | number(6) }}</view>
										<view class="listBox-itemBox__item-label">平仓总额</view>
									</view>
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>

		<w-picker :visible.sync="dateVisible" mode="range" :value="rangeVal" :current="true" @confirm="onPickerConfirm($event, 'datePicker')" ref="datePicker"></w-picker>
	</view>
</template>

<script>
export default {
	data() {
		return {
			currencyList: [],
			recordList: [],
			totalProfit: [],

			tabsActive: 0, //币种选择

			dateValue: '',
			formDateValue: '',
			toDateValue: '',
			rangeVal: [],

			/* 页数控制 */
			pageNum: 1,
			pageSize: 20,
			pages: 0,

			dateVisible: false,
			dateLabel: '',
			dateVal: 6
		};
	},
	onReachBottom() {
		if (this.pageNum >= this.pages) {
			return this.$tools.toast('到底啦');
		} else {
			this.pageNum++;
			this.getOrderRecord();
		}
	},
	onShow() {
		this.$setStatusBarStyle();
		// let date = new Date();
		// let y = date.getFullYear();
		// let m = date.getMonth() + 1;
		// let d = date.getDate();
		// this.rangeVal[0] = y + "-" + m + "-" + d;
		// this.rangeVal[1] = y + "-" + m + "-" + d;

		this.init();
	},
	methods: {
		init() {
			this.pageNum = 1;
			this.recordList = [];
			this.getCurrencyList();
		},
		getCurrencyList() {
			this.$Ajax('/front/bourse/quota/currency', {}, res => {
				// console.log(JSON.stringify(res));
				if (res.code == 0) {
					this.currencyList = res.obj;
					this.getTotalProfit();
					this.getOrderRecord();
				}
			});
		},
		getTotalProfit() {
			this.$Ajax(
				'/front/profit/total/statistic',
				{
					currencyName: this.tabsActive == 0 ? '' : this.currencyList[this.tabsActive - 1]
				},
				res => {
					console.log(JSON.stringify(res));
					if (res.code == 0) {
						this.totalProfit = res.obj;
					}
				}
			);
		},
		getOrderRecord() {
			this.$Ajax(
				'/front/profit/user/list',
				{
					pageNum: this.pageNum,
					pageSize: this.pageSize,
					currencyName: this.tabsActive == 0 ? '' : this.currencyList[this.tabsActive - 1],
					startDate: this.formDateValue != '' ? this.formDateValue : '',
					endDate: this.toDateValue != '' ? this.toDateValue : ''
				},
				res => {
					console.log(JSON.stringify(res));
					if (res.code == 0) {
						this.pages = res.obj.pages;
						this.recordList = this.recordList.concat(res.obj.list);
					}
				}
			);
		},
		filterData() {
			this.hidePopup('filterPopup');
			this.pageNum = 1;
			this.recordList = [];
			this.getOrderRecord();
		},
		changeTabsActive(index) {
			if (this.tabsActive != index) {
				this.pageNum = 1;
				this.recordList = [];
				this.tabsActive = index;
				this.getTotalProfit();
				this.getOrderRecord();
			}
		},
		changeFilterDateType(index) {
			if (this.filterDateType != index) {
				this.filterDateType = index;
				this.formDateValue = '---';
				this.toDateValue = '---';
			}
		},

		/* 弹出框公用 */
		openPopup(e) {
			this.$refs[e].open();
		},
		hidePopup(e) {
			this.$refs[e].close();
		},
		changePopup(e) {
			console.log('popup ' + e.type + ' 状态', e.show);
			if (!e.show) {
			}
		},

		/* 底部选项卡公用 */
		onPickerConfirm(res, type) {
			if (type == 'datePicker') {
				this.dateValue = res.obj.fyear + '.' + res.obj.fmonth + '.' + res.obj.fday + '-' + res.obj.tyear + '.' + res.obj.tmonth + '.' + res.obj.tday;
				this.formDateValue = res.obj.fyear + '-' + res.obj.fmonth + '-' + res.obj.fday;
				this.toDateValue = res.obj.tyear + '-' + res.obj.tmonth + '-' + res.obj.tday;
				this.init();
			}
		}
	}
};
</script>

<style lang="scss" scoped>
@import '/scss/quantification_rewardRecord';
</style>
