<template>
	<view class="pages" :data-theme="pageTheme">
		<view class="initHeader initHeader--fixed" :class="pageTheme == 'light' ? 'initHeader--black' : 'initHeader--white'">
			<view class="initHeader-wrapper">
				<view class="initHeader-back" @click="$tools.back(1)"></view>
				<view class="initHeader-title initHeader-title--center">下单记录</view>
				<view class="initHeader-right"><view class="initHeader-button initHeader-button--filter" @click="openPopup('filterPopup')"></view></view>
			</view>
		</view>
		<view class="main">
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
					<view class="listBox-body">
						<view class="initNoData" v-if="recordList.length == 0">暂无数据</view>
						<view class="listBox-list" v-for="(item, index) in recordList" :key="index">
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

		<uni-popup ref="filterPopup" type="top" :animation="true" @change="changePopup">
			<view class="filterBox">
				<view class="filterBox-wrapper">
					<view class="filterBox-title">筛选</view>
					<view class="filterBox-body">
						<view class="filterBox-plane">
							<view class="filterBox-label">交易时间</view>
							<view class="filterBox-itemBox">
								<view class="filterBox-itemBox__item" :class="{ 'filterBox-itemBox__item--active': filterDateType == 1 }" @click="changeFilterDateType(1)">
									当天
								</view>
								<view class="filterBox-itemBox__item" :class="{ 'filterBox-itemBox__item--active': filterDateType == 2 }" @click="changeFilterDateType(2)">
									本周
								</view>
								<view class="filterBox-itemBox__item" :class="{ 'filterBox-itemBox__item--active': filterDateType == 3 }" @click="changeFilterDateType(3)">
									本月
								</view>
								<view class="filterBox-itemBox__item" :class="{ 'filterBox-itemBox__item--active': filterDateType == 4 }" @click="changeFilterDateType(4)">
									所有
								</view>
							</view>
						</view>
						<view class="filterBox-plane">
							<view class="filterBox-label">自定义时间</view>
							<view class="filterBox-datePicker">
								<view class="filterBox-datePicker__data" @click="dateVisible = true">{{ formDateValue }}</view>
								<view class="filterBox-datePicker__label">至</view>
								<view class="filterBox-datePicker__data" @click="dateVisible = true">{{ toDateValue }}</view>
							</view>
						</view>

						<view class="filterBox-btn" @click="filterData()">确定</view>
					</view>
				</view>
			</view>
		</uni-popup>

		<w-picker
			:visible.sync="dateVisible"
			mode="range"
			:value="rangeVal"
			:current="true"
			@confirm="onPickerConfirm($event, 'datePicker')"
			ref="datePicker"
		></w-picker>
	</view>
</template>

<script>
export default {
	data() {
		return {
			currencyList: [],
			recordList: [],

			tabsActive: 0, //币种选择
			filterDateType: 1, //时间筛选

			formDateValue: '---',
			toDateValue: '---',
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
				console.log(JSON.stringify(res));
				if (res.code == 0) {
					this.currencyList = res.obj;
					this.getOrderRecord();
				}
			});
		},
		getOrderRecord() {
			this.$Ajax(
				'/front/order/user/list',
				{
					pageNum: this.pageNum,
					pageSize: this.pageSize,
					timeType: this.filterDateType != null ? this.filterDateType : '',
					currencyName: this.tabsActive == 0 ? '' : this.currencyList[this.tabsActive - 1],
					startDate: this.filterDateType == null ? this.formDateValue : '',
					endDate: this.filterDateType == null ? this.toDateValue : ''
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
		filterData(){
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
			console.log('当前控制的Picker是：' + type + ';当前值是' + res);
			console.log(res.obj);
			if (type == 'datePicker') {
				// this.dateLabel = res.obj.label;
				// this.dateVal = res.obj.value;
				this.filterDateType = null;
				this.formDateValue = res.obj.fyear + '-' + res.obj.fmonth + '-' + res.obj.fday;
				this.toDateValue = res.obj.tyear + '-' + res.obj.tmonth + '-' + res.obj.tday;
			}
		}
	}
};
</script>

<style lang="scss" scoped>
@import '/scss/quantification_orderRecord';
</style>
