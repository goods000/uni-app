<template>
	<view class="pages">
		<view class="initHeader initHeader--bgWhite initHeader--line initHeader--black">
			<view class="initHeader-wrapper">
				<view class="initHeader-back" @click="$tools.back(1)"></view>
				<view class="initHeader-title">合约计算器</view>
				<view class="initHeader-select" @click="currencyVisible = true">{{ currencyLabel }}</view>
			</view>
		</view>

		<view class="main">
			<view class="tabsBox">
				<view class="tabsBox-control">
					<view class="tabsBox-control__item" :class="{ 'tabsBox-control__item--green': tabsActive == 1 }" @click="changeTabsActive(1)">开多</view>
					<view class="tabsBox-control__item" :class="{ 'tabsBox-control__item--red': tabsActive == 2 }" @click="changeTabsActive(2)">开空</view>
				</view>
			</view>
			<view class="initFormBox">
				<view class="initFormBox-wrapper">
					<view class="initFormBox-list initFormBox-list--holder">
						<view class="initFormBox-list__label">杠杆倍数</view>
						<view class="initFormBox-list__data"><input type="text" placeholder-class="initFormBox-placeholder" placeholder="请输入杠杆倍数" v-model="lever" /></view>
					</view>
					<view class="initFormBox-list">
						<view class="initFormBox-list__label">开仓价格</view>
						<view class="initFormBox-list__data">
							<input type="text" placeholder-class="initFormBox-placeholder" placeholder="请输入开仓价格" v-model="openPrice" />
							<view class="initFormBox-list__data-unit">USDT</view>
						</view>
					</view>
					<view class="initFormBox-list">
						<view class="initFormBox-list__label">平仓价格</view>
						<view class="initFormBox-list__data">
							<input type="text" placeholder-class="initFormBox-placeholder" placeholder="请输入平仓价格" v-model="closePrice" />
							<view class="initFormBox-list__data-unit">USDT</view>
						</view>
					</view>
					<view class="initFormBox-list">
						<view class="initFormBox-list__label">开仓数量</view>
						<view class="initFormBox-list__data">
							<input type="text" placeholder-class="initFormBox-placeholder" placeholder="请输入开仓数量" v-model="quantity" />
							<view class="initFormBox-list__data-unit">手</view>
						</view>
					</view>
				</view>
			</view>
			<view class="resultBox">
				<view class="resultBox-wrapper" :class="tabsActive == 1 ? 'resultBox-wrapper--green' : 'resultBox-wrapper--red'">
					<view class="resultBox-list">
						<view class="resultBox-list__label">保证金</view>
						<view class="resultBox-list__data">{{ calculatorList.guarantee }}</view>
					</view>
					<view class="resultBox-list">
						<view class="resultBox-list__label">收益</view>
						<view class="resultBox-list__data">{{ calculatorList.profit }}</view>
					</view>
					<view class="resultBox-list">
						<view class="resultBox-list__label">收益率</view>
						<view class="resultBox-list__data">{{ calculatorList.rate }}</view>
					</view>
				</view>
			</view>
		</view>

		<view class="initFormBox-button"><view class="initFormBox-button__btn" :class="tabsActive == 1 ? 'initFormBox-button__btn--green' : 'initFormBox-button__btn--red'" @click="calculator()">计算</view></view>

		<!-- 杠杆选择 -->
		<w-picker
			:visible.sync="currencyVisible"
			mode="selector"
			ref="currencyPicker"
			default-type="label"
			:options="currencyArray"
			@confirm="onPickerConfirm($event, 'currencyPicker')"
			themeColor="#2989fd"
		></w-picker>
	</view>
</template>

<script>
export default {
	components: {},
	data() {
		return {
			tabsActive: 1, // 交易对 1开多 2开空

			currencyVisible: false,
			currencyLabel: '', //币种
			currencyVal: null,
			currencyArray: [],
			calculatorList: [],

			lever: '',
			openPrice: '',
			closePrice: '',
			quantity: ''
		};
	},
	onShow() {
		this.init();
	},
	methods: {
		init() {
			this.getCurrencyList();
		},
		getCurrencyList() {
			this.$Ajax('/search/allTrade', {}, res => {
				if (res.code == 0) {
					this.currencyArray = res.obj;
					this.currencyArray.forEach(item => {
						item.label = item.tradeCurrencyName + '/' + item.currencyName;
						item.value = item.id;
					});
					// console.log(JSON.stringify(this.currencyArray));
					this.currencyLabel = this.currencyArray[0].label;
					this.currencyVal = this.currencyArray[0].value;
				}
			});
		},
		calculator() {
			if(this.lever == ''){
				return this.$tools.toast('请输入杠杆倍数');
			}
			if(this.openPrice == ''){
				return this.$tools.toast('请输入开仓价格');
			}
			if(this.closePrice == ''){
				return this.$tools.toast('请输入平仓价格');
			}
			if(this.quantity == ''){
				return this.$tools.toast('请输入开仓数量');
			}
			
			this.$Ajax(
				'/front/usdt/calProfit',
				{
					tradeId: this.currencyVal,
					tradeType: this.tabsActive,
					lever: this.lever,
					openPrice: this.openPrice,
					closePrice: this.closePrice,
					quantity: this.quantity
				},
				res => {
					if (res.code == 0) {
						console.log(JSON.stringify(res));
						this.calculatorList = res.obj;
					}
				}
			);
		},
		changeTabsActive(index) {
			this.lever = '';
			this.openPrice = '';
			this.closePrice = '';
			this.quantity = '';
			this.tabsActive = index;
		},

		/* 底部选项卡公用 */
		onPickerConfirm(res, type) {
			console.log('当前控制的Picker是：' + type + ';当前值是' + res.obj.value);

			if (type == 'currencyPicker') {
				this.currencyLabel = res.obj.label;
				this.currencyVal = res.obj.value;
			}
		},
	}
};
</script>

<style lang="scss" scoped>
page,.pages {
	background-color: #f7f8fc;
}

.tabsBox {
	padding: 60upx 0;
	background-color: #ffffff;
	&-control {
		@include flexCenter;
		&__item {
			@include initTransition(0.4);
			background-color: #eef1f6;
			padding: 15upx 45upx;
			border-radius: 8upx;
			font-size: 32upx;
			color: #99999d;
			&--green {
				&.tabsBox-control__item {
					background-color: $globalColor-green;
					color: #ffffff;
				}
			}

			&--red {
				&.tabsBox-control__item {
					background-color: $globalColor-red;
					color: #ffffff;
				}
			}
		}
	}
}

.initFormBox {
	// padding: 0 30upx;
	margin-bottom: 30upx;
	&-wrapper {
		background-color: #f7f8fc;
	}

	&-list {
		padding: 30upx;
		color: #101010;
		border-bottom: 2upx solid #c6d2e4;
		background-color: #ffffff;
		@include flexBetween;

		&__label {
			margin-bottom: 0;
		}

		&__picker {
			width: 100%;
		}

		&__data {
			text-align: right;
			&-unit {
				margin-left: 15upx;
			}
		}

		&--holder {
			margin-bottom: 15upx;

			& + view {
				border-top: 2upx solid #c6d2e4;
			}
		}
	}
}


.resultBox {
	padding: 30upx;
	margin-bottom: 60upx;
	&-wrapper {
		border-radius: 15upx;
		padding: 30upx;
		
		&--green{
			background-color: $globalColor-green;
		}
		
		&--red{
			background-color: $globalColor-red;
		}
		
	}
	&-list {
		@include flexBetween;
		font-size: 28upx;
		color: #ffffff;
		margin: 15upx 0;
	}
}
</style>
