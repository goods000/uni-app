<template>
	<view class="pages">
		<view class="initHeader initHeader--bgWhite initHeader--line initHeader--black">
			<view class="initHeader-wrapper">
				<view class="initHeader-back" @click="$tools.back(1)"></view>
				<view class="initHeader-title initHeader-title--center">{{ currencyLabel }}记录</view>
			</view>
		</view>
		<view class="main">
			<view class="tabsBox">
				<view class="tabsBox-control">
					<view class="tabsBox-control__item" :class="{ 'tabsBox-control__item--active': headerTabsActive == 0 }" @click="changeHeaderTabsActive(0)">当前委托</view>
					<view class="tabsBox-control__item" :class="{ 'tabsBox-control__item--active': headerTabsActive == 1 }" @click="changeHeaderTabsActive(1)">历史委托</view>
					<view class="tabsBox-control__item" :class="{ 'tabsBox-control__item--active': headerTabsActive == 2 }" @click="changeHeaderTabsActive(2)">平仓记录</view>
				</view>
			</view>
			<view class="filterBox">
				<view class="filterBox-item" @click="currencyVisible = true">
					<view class="filterBox-item__label">{{ currencyLabel }}</view>
					<view class="filterBox-item__arrow"><image src="../../static/public/icon-triangle-bottom-blue.png" mode="widthFix"></image></view>
				</view>
				<view class="filterBox-item" @click="typeVisible = true">
					<view class="filterBox-item__label">{{ typeLabel }}</view>
					<view class="filterBox-item__arrow"><image src="../../static/public/icon-triangle-bottom-blue.png" mode="widthFix"></image></view>
				</view>
			</view>
			<view class="ticketBox">
				<view class="ticketBox-wrapper" v-if="headerTabsActive == 0 || headerTabsActive == 1">
					<view class="ticketBox-noData" v-if="recordList.length == 0">暂无记录</view>
					<view class="ticketBox-list" v-for="(item, index) in recordList" :key="index" v-else>
						<view class="ticketBox-info">
							<view class="ticketBox-info__type" :class="item.tradeType == 1 || item.tradeType == 4 ? 'ticketBox-info__type--buy' : 'ticketBox-info__type--sell'">
								{{ item.tradeTypeStr }}
							</view>
							<view class="ticketBox-info__content">
								<view class="ticketBox-info__content-label">
									<view>{{ item.tradeName }}</view>
									<view class="ticketBox-info__content-lever">{{ item.lever }}X</view>
								</view>
								<view class="ticketBox-info__content-date">{{ item.createTime }}</view>
							</view>
							<view class="ticketBox-info__button" v-if="headerTabsActive == 0"><view class="ticketBox-info__button-btn" @click="cancelOrder(item.id)">撤单</view></view>
						</view>
						<view class="ticketBox-itemBox">
							<view class="ticketBox-itemBox__wrapper">
								<view class="ticketBox-itemBox__item">
									<view class="ticketBox-itemBox__item-label">委托量({{ currencyLabel }})</view>
									<view class="ticketBox-itemBox__item-data">{{ item.pubQuantity }}</view>
								</view>
								<view class="ticketBox-itemBox__item">
									<view class="ticketBox-itemBox__item-label">委托价({{ item.currencyName }})</view>
									<view class="ticketBox-itemBox__item-data">{{ item.pubPrice }}</view>
								</view>
								<view class="ticketBox-itemBox__item">
									<view class="ticketBox-itemBox__item-label">保证金({{ item.currencyName }})</view>
									<view class="ticketBox-itemBox__item-data">{{ item.guarantee }}</view>
								</view>
								<view class="ticketBox-itemBox__item">
									<view class="ticketBox-itemBox__item-label">成交量({{ currencyLabel }})</view>
									<view class="ticketBox-itemBox__item-data">{{ item.status == 0 || item.status == 2 ? 0 : item.pubQuantity }}</view>
								</view>
								<view class="ticketBox-itemBox__item">
									<view class="ticketBox-itemBox__item-label">成交价({{ item.currencyName }})</view>
									<view class="ticketBox-itemBox__item-data">{{ item.status == 0 || item.status == 2 ? 0 : item.tradePrice }}</view>
								</view>
								<view class="ticketBox-itemBox__item">
									<view class="ticketBox-itemBox__item-label">手续费({{ item.currencyName }})</view>
									<view class="ticketBox-itemBox__item-data">{{ item.charge }}</view>
								</view>
							</view>
						</view>
					</view>
				</view>
				<view class="ticketBox-wrapper" v-if="headerTabsActive == 2">
					<view class="ticketBox-noData" v-if="cleanList.length == 0">暂无记录</view>
					<view class="ticketBox-list" v-for="(item, index) in cleanList" :key="index" v-else>
						<view class="ticketBox-info">
							<view class="ticketBox-info__type" :class="item.tradeType == 1 || item.tradeType == 4 ? 'ticketBox-info__type--buy' : 'ticketBox-info__type--sell'">
								{{ item.tradeTypeStr }}
							</view>
							<view class="ticketBox-info__content">
								<view class="ticketBox-info__content-label">
									<view>{{ item.tradeName }}</view>
									<view class="ticketBox-info__content-lever">{{ item.lever }}X</view>
								</view>
								<view class="ticketBox-info__content-date">{{ item.createTime }}</view>
							</view>
						</view>
						<view class="ticketBox-itemBox">
							<view class="ticketBox-itemBox__wrapper">
								<view class="ticketBox-itemBox__item">
									<view class="ticketBox-itemBox__item-label">开仓价格</view>
									<view class="ticketBox-itemBox__item-data">{{ item.openPrice | number(4) }}</view>
								</view>
								<view class="ticketBox-itemBox__item">
									<view class="ticketBox-itemBox__item-label">平仓价格</view>
									<view class="ticketBox-itemBox__item-data">{{ item.closePrice | number(4) }}</view>
								</view> 
								<view class="ticketBox-itemBox__item">
									<view class="ticketBox-itemBox__item-label">收益(USDT)</view>
									<view class="ticketBox-itemBox__item-data">{{ item.profit | number(4) }}</view>
								</view>
								<view class="ticketBox-itemBox__item">
									<view class="ticketBox-itemBox__item-label">平仓手续费</view>
									<view class="ticketBox-itemBox__item-data">{{ item.closeCharge | number(4) }}</view>
								</view>
								<view class="ticketBox-itemBox__item">
									<view class="ticketBox-itemBox__item-label">平仓数量</view>
									<view class="ticketBox-itemBox__item-data">{{ item.closeQuantity | number(4) }}</view>
								</view>
								<view class="ticketBox-itemBox__item">
									<view class="ticketBox-itemBox__item-label">收益率</view>
									<view class="ticketBox-itemBox__item-data">{{ item.profitRate }}%</view>
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<!-- 委托方式选择 -->
		<w-picker
			:visible.sync="currencyVisible"
			mode="selector"
			ref="currencyPicker"
			default-type="label"
			:options="currencyArray"
			@confirm="onPickerConfirm($event, 'currencyPicker')"
			@cancel="onPickerCancel"
			themeColor="#2989fd"
		></w-picker>
		<!-- 委托方式选择 -->
		<w-picker
			:visible.sync="typeVisible"
			mode="selector"
			ref="typePicker"
			default-type="label"
			:options="typeArray"
			@confirm="onPickerConfirm($event, 'typePicker')"
			@cancel="onPickerCancel"
			themeColor="#2989fd"
		></w-picker>
	</view>
</template>

<script>
import vPicker from '@/components/w-picker/w-picker.vue';
export default {
	components: {
		vPicker
	},
	data() {
		return {
			headerTabsActive: 0,
			usdtType: 0,

			typeVisible: false, //类型1市价 2限价
			typeLabel: '',
			typeVal: null,
			typeArray: [
				{
					label: '合约交易',
					value: 0
				},
				{
					label: '保险合约',
					value: 1
				}
			],
			currencyVisible: false, //类型1市价 2限价
			currencyLabel: '',
			currencyVal: null,
			currencyArray: [],
			
			recordList: [],
			cleanList: [],
			pageNum: 1,
			pageSize: 20
		};
	},
	onReachBottom() {
		if (this.pageNum >= this.pages) {
			return this.$tools.toast('到底了');
		}
		this.pageNum++;
		this.getRecord();
	},
	onLoad(hash) {
		this.usdtType = hash.value1;

		// Picker默认值
		this.typeLabel = this.typeArray[0].label;
		this.typeVal = this.typeArray[0].value;
	},
	onShow() {
		this.init();
	},
	methods: {
		init() {
			this.pageNum = 1;
			this.recordList = [];
			this.cleanList = [];
			this.getCurrencyList();
		},
		getCurrencyList() {
			this.$Ajax('/search/allTrade', {}, res => {
				if (res.code == 0) {
					this.currencyArray = res.obj;
					this.currencyArray.forEach(item => {
						item.label = item.tradeCurrencyName;
						item.value = item.id;
					});
					this.currencyLabel = this.currencyArray[0].label;
					this.currencyVal = this.currencyArray[0].value;
					this.getRecord();
				}
			});
		},
		getRecord() {
			this.recordList = [];
			this.cleanList = [];
			if (this.headerTabsActive == 0) {
				this.getNowEntrustList();
			} else if (this.headerTabsActive == 1){
				this.getHistoryList();
			} else if (this.headerTabsActive == 2){
				this.getCleanList();
			}
		},
		getNowEntrustList() {
			this.$Ajax(
				'/front/usdt/tradeList',
				{
					tradeId: this.currencyVal,
					usdtType: this.usdtType,
					tradeType: this.typeVal,
					status: 0,
					pageNum: this.pageNum,
					pageSize: this.pageSize,
				},
				res => {
					if (res.code == 0) {
						this.pages = res.obj.pages;
						var data = res.obj.list;
						this.recordList = this.recordList.concat(data);
						console.log('recordList---' + JSON.stringify(this.recordList));
					}
				}
			);
		},
		getHistoryList() {
			this.$Ajax(
				'/front/usdt/historyList',
				{
					tradeId: this.currencyVal,
					usdtType: this.usdtType,
					tradeType: this.typeVal,
					pageNum: this.pageNum,
					pageSize: this.pageSize
				},
				res => {
					if (res.code == 0) {
						this.pages = res.obj.pages;
						var data = res.obj.list;
						this.recordList = this.recordList.concat(data);
						console.log('recordList---' + JSON.stringify(this.recordList));
					}
				}
			);
		},
		getCleanList() {
			this.$Ajax(
				'/front/usdt/getHistory',
				{
					tradeId: this.currencyVal,
					usdtType: this.usdtType,
					tradeType: this.typeVal,
					pageNum: this.pageNum,
					pageSize: this.pageSize
				},
				res => {
					if (res.code == 0) {
						this.pages = res.obj.pages;
						var data = res.obj.list;
						this.cleanList = this.cleanList.concat(data);
						console.log('cleanList---' + JSON.stringify(this.cleanList));
					}
				}
			);
		},
		changeHeaderTabsActive(index) {
			if(this.headerTabsActive != index){
				this.headerTabsActive = index;
				this.recordList = [];
				this.cleanList = [];
				this.getRecord();
			}
		},
		/* 底部选项卡公用 */
		onPickerConfirm(res, type) {
			console.log('当前控制的Picker是：' + type + ';当前值是' + res.obj.value);
			this.recordList = [];
			this.cleanList = [];
			if (type == 'typePicker') {
				this.typeLabel = res.obj.label;
				this.typeVal = res.obj.value;
				this.getRecord();
			}else if(type == 'currencyPicker'){
				this.currencyLabel = res.obj.label;
				this.currencyVal = res.obj.value;
				this.getRecord();
			}
		},
		onPickerCancel() {},
		
		// 撤单
		cancelOrder(id) {
			this.$Ajax(
				'/front/usdt/cancel',
				{
					id: id
				},
				res => {
					if (res.code == 0) {
						this.$tools.toast('撤单成功');
						this.getRecord();
					}
				}
			);
		},
	}
};
</script>

<style lang="scss" scoped>
.tabsBox {
	height: 140upx;
	padding: 30upx;
	border-bottom: 1upx solid #f7f8fc;
	&-control {
		@include flexLeft;
		align-items: flex-end;
		height: 100%;
		&__item {
			color: #c6c7d2;
			font-size: 32upx;
			margin-right: 15upx;
			@include initTransition(0.2);
			&--active {
				color: #101010;
				font-size: 52upx;
			}
		}
	}
}	
	
.filterBox {
	width: 100%;
	@include flexCenter;
	border-bottom: 12upx solid #f7f8fc;
	&-item {
		flex: 1;
		padding: 30upx 0;
		font-size: 28upx;
		color: #101010;
		text-align: center;
		position: relative;
		@include flexCenter;

		&:after {
			content: '';
			display: inline-block;
			width: 2upx;
			height: 50%;
			position: absolute;
			right: -1upx;
			top: 50%;
			transform: translateY(-50%);
			background-color: #c6d2e4;
		}

		&:last-child {
			&:after {
				display: none;
			}
		}

		&__label {
			margin-right: 30upx;
		}

		&__arrow {
			width: 30upx;
			@include fullImage;
		}
	}
}
// 记录总样式
.ticketBox {
	padding: 0 30upx;
	&-noData {
		padding: 30upx 0;
		font-size: 32upx;
		color: #999999;
	}
	&-list {
		padding: 30upx 0;
		border-bottom: 1upx solid #c6d2e4;
	}
	&-info {
		@include flexLeft;
		margin-bottom: 15upx;
		&__type {
			color: #ffffff;
			font-size: 24upx;
			padding: 15upx;
			border-radius: 8upx;
			margin-right: 15upx;
			font-weight: bold;
			&--buy{
				background-color: $globalColor-green;
			}
			&--sell{
				background-color: $globalColor-red;
			}
		}
		&__content {
			flex: 1;
			&-label {
				font-size: 28upx;
				color: #101010;
				@include flexLeft;
			}
			&-date {
				font-size: 24upx;
				color: #999b9e;
			}
			&-lever{
				color: $globalColor-blue;
				background-color: #ccdcf6;
				font-size: 24upx;
				padding: 5upx 10upx;
				border-radius: 15upx;
				margin-left: 15upx;
			}
		}

		&__button {
			margin-left: 15upx;
			&-btn {
				color: $globalColor-blue;
				padding: 10upx 15upx;
				font-size: 28upx;
				border: 1upx solid $globalColor-blue;
				border-radius: 15upx;
			}
		}
	}

	&-itemBox {
		&__wrapper {
			@include flexCenter;
			flex-wrap: wrap;
			align-items: stretch;
		}
		&__item {
			// @include justifiedLayout;
			&:nth-child(3n+1){
				text-align: left;
			}
			&:nth-child(3n+2){
				text-align: center;
			}
			&:nth-child(3n+3){
				text-align: right;
			}
			width: 33.33%;
			padding: 15upx;
			&-label {
				color: #99999d;
				font-size: 24upx;
			}
			&-data {
				color: #101010;
				font-size: 28upx;
			}
		}
	}

	&-button {
		@include flexCenter;
		@include calcMargin(15);
		&__btn {
			@include flexCenter;
			flex: 1;
			background-color: #eef1f6;
			padding: 15upx 0;
			border-radius: 30upx;
			font-size: 32upx;
			margin: 15upx;
			color: #ffffff;

			&--blue {
				background-color: $globalColor-blue;
				box-shadow: 2px 2px 20upx rgba(58, 121, 222, 0.5);
			}

			&--green {
				background-color: #00b8ae;
				box-shadow: 2px 2px 20upx rgba(0, 184, 174, 0.5);
			}
		}
	}
}
</style>
