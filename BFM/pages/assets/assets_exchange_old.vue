<template>
	<view class="pages">
		<view class="initHeader initHeader--black">
			<view class="initHeader-wrapper">
				<view class="initHeader-back" @click="$tools.switchTab('../assets/assets')"></view>
				<view class="initHeader-title">划转</view>
				<view class="initHeader-record" @click="$tools.jump('../assets/assets_exchange_record')"></view>
			</view>
		</view>
		<view class="main">
			<view class="conversionBox">
				<view class="conversionBox-wrapper">
					<!-- <view class="conversionBox-ellipsis"></view> -->
					<view class="conversionBox-select">
						<view class="conversionBox-select__list">
							<view class="conversionBox-select__list-label">转出：</view>
							<!-- <text class="conversionBox-select__list-data">币币账户</text> -->
						</view>
						<view class="conversionBox-select__list">
							<view class="conversionBox-select__list-label">转入：</view>
							<!-- <text class="conversionBox-select__list-data conversionBox-select__list-data--arrow" @click="$tools.jump('../assets/assets_exchange_select')">法币账户</text> -->
						</view>
					</view>
					<view class="conversionBox-plane">
						<view class="conversionBox-plane__list" :class="conversionType == 0 ? 'conversionBox-plane__list--first' : 'conversionBox-plane__list--last'">
							{{ transferConstant }}
						</view>
						<view
							class="conversionBox-plane__list conversionBox-plane__list--arrow"
							:class="conversionType == 0 ? 'conversionBox-plane__list--last' : 'conversionBox-plane__list--first'"
							@click="$tools.jump('../assets/assets_exchange_select')"
						>
							{{ transferChange }}
						</view>
					</view>
					<view class="conversionBox-button" @click="changeConversionType()"></view>
				</view>
			</view>
			<view class="selectBox" @click="currencyVisible = true">
				<view class="selectBox-wrapper">
					<view class="selectBox-label">选择币种</view>
					<view class="selectBox-data">{{ currencyLabel }}</view>
				</view>
			</view>
			<view class="inputBox">
				<view class="inputBox-title">划转数量</view>
				<view class="inputBox-list">
					<view class="inputBox-list__input"><input type="text" placeholder-class="inputBox-list__placeholder" placeholder="请输入划转的数量" v-model="quantity" /></view>
					<text class="inputBox-list__type">{{ currencyLabel }}</text>
					<text class="inputBox-list__btn" @click="getAll()">全部</text>
				</view>

				<view class="inputBox-result">可用: {{ using }} {{ currencyLabel }}</view>
			</view>
			<view class="initButton"><view class="initButton-btn initButton-btn--golden" @click="transter()">确定</view></view>
		</view>

		<!-- 币种选择 -->
		<w-picker
			:visible.sync="currencyVisible"
			mode="selector"
			ref="currencyPicker"
			default-type="label"
			:options="currencyArray"
			@confirm="onPickerConfirm($event, 'currencyPicker')"
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
			quantity: '',

			transferConstant: '币币账户',
			transferConstantVal: 1,
			transferChange: '',
			transferChangeVal: null,

			currencyVisible: false,
			currencyLabel: '', //币种
			currencyVal: null,
			currencyArray: [],

			conversionType: 0,

			assetsModeList: [],
			walletList: [],

			using: 0
		};
	},
	onShow() {
		this.quantity = '';
		this.init();
	},
	methods: {
		init() {
			this.getAssetsMode();
			this.getCurrencyList();
		},
		getCurrencyList() {
			this.$Ajax(
				'/search/currencyList',
				{
					type: 1
				},
				res => {
					if (res.code == 0) {
						this.currencyArray = res.obj;
						this.currencyArray.forEach(item => {
							item.label = item.name;
							item.value = item.key;
						});
						console.log(JSON.stringify(this.currencyArray));
						this.currencyLabel = this.currencyArray[0].label;
						this.currencyVal = this.currencyArray[0].value;
						this.getAssetsInfo();
					}
				}
			);
		},
		getAssetsMode(assetType) {
			this.$Ajax('/front/financial/getWalletList', {}, res => {
				console.log(JSON.stringify(res));
				if (res.code == 0) {
					this.assetsModeList = res.obj;
					var assetsMode = uni.getStorageSync('assetsMode');
					if (assetsMode == '' || assetsMode == undefined || assetsMode == null) {
						this.assetsModeList.forEach((item, key) => {
							if (item.key == 1) {
								this.assetsModeList.splice(key, 1);
							}
						});

						this.transferChange = this.assetsModeList[0].name;
						this.transferChangeVal = this.assetsModeList[0].key;
					} else {
						this.assetsModeList.forEach(item => {
							if (item.key == assetsMode) {
								this.transferChange = item.name;
								this.transferChangeVal = item.key;
							}
						});
					}
				}
			});
		},
		getAssetsInfo() {
			if (this.conversionType == 0) {
				var assetType = this.transferConstantVal;
			} else {
				var assetType = this.transferChangeVal;
			}

			console.log('assetType ' + assetType + ' currencyVal ' + this.currencyVal);

			this.$Ajax(
				'/front/financial/assetsByCurrency',
				{
					assetType: assetType,
					currencyId: this.currencyVal
				},
				res => {
					if (res.code == 0) {
						console.log(JSON.stringify(res.obj));
						this.walletList = res.obj.wallet;
						console.log('conversionType：' + this.conversionType);
						console.log('assetType：' + assetType);
						if (this.conversionType == 0) {
							this.using = this.walletList.using;
						} else {
							if (assetType == 3) {
								this.using = this.walletList.using;
							} else if (assetType == 4) {
								this.using = this.walletList.using;
							} else if (assetType == 2) {
								this.using = this.walletList.using;
							}
						}
					}
				}
			);
		},
		changeConversionType() {
			if (this.conversionType == 0) {
				this.conversionType = 1;
			} else {
				this.conversionType = 0;
			}
			this.quantity = '';
			this.getAssetsInfo();
		},
		getAll() {
			this.quantity = this.using;
		},
		transter() {
			if (this.conversionType == 0) {
				var fromType = this.transferConstantVal;
				var toType = this.transferChangeVal;
			} else {
				var fromType = this.transferChangeVal;
				var toType = this.transferConstantVal;
			}

			if (this.quantity == '') {
				return this.$tools.toast('请输入划转数量');
			}

			if (this.quantity > this.walletList.using) {
				return this.$tools.toast('当前可用数量不足');
			}

			console.log('fromType' + fromType + ' toType' + toType);

			this.$Ajax(
				'/front/financial/transfer',
				{
					sourceId: fromType,
					targetId: toType,
					currencyId: this.currencyVal,
					quantity: this.quantity
				},
				res => {
					if (res.code == 0) {
						this.$tools.toast('划转成功');
						this.quantity = '';
						this.getAssetsInfo();
					}
				}
			);
		},

		/* 底部选项卡公用 */
		onPickerConfirm(res, type) {
			console.log('当前控制的Picker是：' + type + ';当前值是' + res.obj.value);

			if (type == 'currencyPicker') {
				this.currencyLabel = res.obj.label;
				this.currencyVal = res.obj.value;
				this.getAssetsInfo();
			}
		}
	}
};
</script>

<style lang="scss" scoped>
.main {
	padding: 30upx;
}

.selectBox {
	// padding: 0 30upx;
	margin-bottom: 30upx;
	border-bottom: 1upx solid $globalColor-style;
	&-wrapper {
		@include flexBetween;
		padding: 15upx 0;
		font-size: 32upx;
	}

	&-label {
		color: #ffffff;
	}

	&-data {
		@include flexRight;
		color: #ffffff;
		background-image: url(../../static/public/icon-arrow-right-grey.png);
		background-size: 14upx 26upx;
		background-position: right center;
		background-repeat: no-repeat;
		padding-right: 30upx;
	}
}

.conversionBox {
	// padding: 0 30upx;
	margin-bottom: 60upx;

	&-wrapper {
		border: 2upx solid #333333;
		display: flex;
		justify-content: stretch;
		border-radius: 30upx;
		overflow: hidden;
		position: relative;
	}

	&-select {
		flex: 1;

		&__list {
			@include flexLeft;
			padding: 30upx;
			font-size: 32upx;
			border-bottom: 2upx solid #333333;
			background-color: #18181b;
			flex: 1;

			&:last-child {
				border-bottom: 0;
			}

			&-label {
				color: #99999d;
			}

			&-data {
				flex: 1;
				color: #ffffff;
				&--arrow {
					background: url(../../static/public/icon-arrow-right-grey.png) no-repeat;
					background-position: right center;
					background-size: 14upx 26upx;
					background-repeat: no-repeat;
				}
			}
		}
	}

	&-plane {
		position: absolute;
		left: 120upx;
		top: 0;
		flex: 1;
		height: 100%;
		width: calc(450upx);
		&__wrapper {
			position: relative;
			height: 100%;
			width: 100%;
		}
		&__list {
			@include flexLeft;
			@include initTransition(0.2);
			height: 50%;
			width: 100%;
			color: #ffffff;
			position: absolute;
			left: 0;
			padding-right: 60upx;
			font-size: 32upx;

			&--first {
				top: 0;
			}
			&--last {
				top: 50%;
			}

			&--arrow {
				background: url(../../static/public/icon-arrow-right-grey.png) no-repeat;
				background-position: calc(100% - 30upx) center;
				background-size: 14upx 26upx;
				background-repeat: no-repeat;
			}
		}
	}

	&-button {
		flex-basis: 120upx;
		// background: url('../../static/public/icon-conversion-white.png') no-repeat;
		// background-position: center;
		// background-size: 32upx 42upx;
		// background-color: rgba(41, 124, 246, 0.3);
		border-left: 2upx solid #333333;
		position: relative;
		@include initGradBg;
		
		&::after{
			content: '';
			display: inline-block;
			width: 32upx;
			height: 42upx;
			position: absolute;
			left: 50%;
			top: 50%;
			transform: translate(-50%,-50%);
			background: url('../../static/public/icon-conversion-white.png') no-repeat;
			background-position: center;
			background-size: 32upx 42upx;
		}
	}
}

.inputBox {
	padding: 30upx 0;
	margin-bottom: 60upx;

	&-title {
		margin-bottom: 15upx;
		font-size: 32upx;
		color: #ffffff;
	}

	&-list {
		@include flexLeft;
		border-bottom: 1upx solid $globalColor-style;
		font-size: 28upx;
		margin-bottom: 15upx;
		padding: 15upx 0;
		color: #ffffff;

		&__placeholder {
			color: #c2c3cf;
			font-size: 32upx;
		}

		&__input {
			text-align: left;
			flex: 1;
			font-size: 32upx;

			input {
				font-size: inherit;
				width: 100%;
			}
		}

		&__type {
			padding: 0 15upx;
			border-right: 2upx solid #cccccc;
			color: #ffffff;
		}

		&__btn {
			color: $globalColor-style;
			font-weight: bold;
			padding: 0 15upx;
		}
	}

	&-result {
		color: #c2c3cf;
		font-size: 24upx;
	}
}

.buttonBox {
	margin-top: 120upx;
	padding: 0 30upx;

	&-btn {
		width: 100%;
		height: 90upx;
		line-height: 90upx;
		background-color: #1e69d3;
		border-radius: 60upx;
		text-align: center;
		font-size: 32upx;
		color: #ffffff;
	}
}

.modalBox {
	// z-index: 999;
	font-size: 28upx;

	&-mask {
		width: 100vh;
		height: 100vh;
		position: fixed;
		left: 0;
		top: 0;
		background-color: rgba(0, 0, 0, 0.4);
		z-index: 9998;
	}
	&-wrapper {
		width: 650upx;
		position: fixed;
		left: 50upx;
		bottom: 0;
		background-color: #25263b;
		z-index: 9999;
		transform: translateY(calc(100% + 90upx));
		background-color: #ffffff;
		margin-bottom: 60upx;
		text-align: center;
		border-radius: 15upx;
		padding: 15upx 0;
	}

	&-title {
		color: #333333;
		font-size: 32upx;
		padding: 30upx 0;
	}

	&-listBox {
		color: #78849a;
		&__list {
			padding: 30upx 0;
			&--active {
				color: #27aae1;
			}
		}
	}
}
</style>
