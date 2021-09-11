<template>
	<view class="pages">
		<view class="initHeader initHeader--black">
			<view class="initHeader-wrapper">
				<view class="initHeader-back" @click="$tools.switchTab('../assets/assets')"></view>
				<view class="initHeader-title">闪兑</view>
				<view class="initHeader-record" @click="$tools.jump('../assets/assets_exchange_record')"></view>
			</view>
		</view>
		<view class="main">
			<view class="conversionBox">
				<view class="conversionBox-wrapper">
					<view class="conversionBox-select">
						<view class="conversionBox-select__list">
							<view class="conversionBox-select__list-label">转出：</view>
						</view>
						<view class="conversionBox-select__list">
							<view class="conversionBox-select__list-label">转入：</view>
						</view>
					</view>
					<view class="conversionBox-plane">
						<view class="conversionBox-plane__list" :class="conversionType == 0 ? 'conversionBox-plane__list--first' : 'conversionBox-plane__list--last'">
							{{ transferConstant }}
						</view>
						<view class="conversionBox-plane__list" :class="conversionType == 0 ? 'conversionBox-plane__list--last' : 'conversionBox-plane__list--first'">
							{{ transferChange }}
						</view>
					</view>
					<view class="conversionBox-button" @click="changeConversionType()"></view>
				</view>
			</view>
			<view class="inputBox">
				<view class="inputBox-title">划转数量</view>
				<view class="inputBox-list">
					<view class="inputBox-list__input"><input type="text" placeholder-class="inputBox-list__placeholder" placeholder="请输入划转的数量" v-model="quantity" /></view>
					<text class="inputBox-list__type">{{ conversionType == 0 ? 'USDT' : 'BK' }}</text>
					<text class="inputBox-list__btn" @click="getAll()">全部</text>
				</view>
				<view class="inputBox-result">可用: {{ using }} {{ conversionType == 0 ? 'USDT' : 'BK' }}</view>

				<view class="inputBox-title">交易密码</view>
				<view class="inputBox-list">
					<view class="inputBox-list__input">
						<input type="password" placeholder-class="inputBox-list__placeholder" placeholder="请输入您的交易密码" v-model="tradePwd" />
					</view>
				</view>
			</view>
			<view class="initButton"><view class="initButton-btn initButton-btn--style" @click="transter()">确定</view></view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			quantity: '',
			tradePwd: '',

			transferConstant: 'USDT',
			transferConstantVal: 1,
			transferChange: 'BK',
			transferChangeVal: 2,

			currencyVisible: false,
			currencyLabel: '', //币种
			currencyVal: null,
			currencyArray: [],

			conversionType: 0,
			typeActive: 0,

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
			this.getUsing();
			// this.getCurrencyList();
		},
		getCurrencyList() {
			this.$Ajax('/front/wallet/support/currency', {}, res => {
				console.log(JSON.stringify(res));
				if (res.code == 0) {
					if (res.obj.length == 0) {
						return false;
					}
					this.currencyArray = res.obj;
					this.currencyArray.forEach(item => {
						item.label = item.currencyName;
						item.value = item.currencyId;
					});
					console.log(JSON.stringify(this.currencyArray));
					this.currencyLabel = this.currencyArray[0].label;
					this.currencyVal = this.currencyArray[0].value;
					this.getUsing();
				}
			});
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
		getUsing() {
			let currencyLabel = 'USDT';
			
			if(this.conversionType == 0){
				currencyLabel = 'USDT';
			}else if(this.conversionType == 1){
				currencyLabel = 'BK';
			}
			
			this.$Ajax(
				'/front/financial/currency/wallet',
				{
					currencyName: currencyLabel
				},
				res => {
					console.log(JSON.stringify(res.obj));
					if (res.code == 0) {
						this.using = res.obj.using;
					}
				}
			);
		},
		changeTypeActive(index) {
			this.typeActive = index;
			this.getUsing();
		},
		changeConversionType() {
			if (this.conversionType == 0) {
				this.conversionType = 1;
			} else {
				this.conversionType = 0;
			}
			this.quantity = '';
			this.tradePwd = '';
			this.getUsing();
		},
		getAll() {
			this.quantity = this.using;
		},
		transter() {
			let fromName = 'USDT';
			let toName = 'BK';
			
			if(this.conversionType == 0){
				fromName = 'USDT';
				toName = 'BK';
			}else{
				fromName = 'BK';
				toName = 'USDT';
			}
			
			console.log('fromName: ' + fromName + '--- toName: ' + toName);
			
			if (this.quantity == '') {
				return this.$tools.toast('请输入划转数量');
			}

			if (this.tradePwd == '') {
				return this.$tools.toast('请输入您的交易密码');
			}

			this.$Ajax(
				'/front/exchange/action/do',
				{
					fromName: fromName,
					toName: toName,
					quantity: this.quantity,
					tradePwd: this.tradePwd
				},
				res => {
					if (res.code == 0) {
						this.$tools.toast('划转成功');
						this.quantity = '';
						this.tradePwd = '';
						this.getUsing();
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
				this.getUsing();
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
	border-bottom: 1upx solid #c6d2e4;
	&-wrapper {
		@include flexBetween;
		padding: 15upx 0;
		font-size: 32upx;
	}

	&-label {
		color: #101010;
	}

	&-data {
		@include flexRight;
		color: #101010;
		background-image: url(../../static/public/icon-arrow-right-grey.png);
		background-size: 14upx 26upx;
		background-position: right center;
		background-repeat: no-repeat;
		padding-right: 30upx;
	}
}

.conversionBox {
	margin-bottom: 30upx;

	&-wrapper {
		border: 2upx solid #cccccc;
		display: flex;
		justify-content: stretch;
		border-radius: 15upx;
		overflow: hidden;
		position: relative;
		background-color: #eef1f6;
	}

	&-select {
		flex: 1;

		&__list {
			@include flexLeft;
			padding: 30upx;
			font-size: 32upx;
			border-bottom: 2upx solid #cccccc;
			flex: 1;

			&:last-child {
				border-bottom: 0;
			}

			&-label {
				color: #99999d;
			}

			&-data {
				flex: 1;
				color: #101010;
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
		width: calc(480upx);
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
			color: #101010;
			position: absolute;
			left: 0;
			padding-right: 30upx;
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
		flex-basis: 90upx;
		position: relative;
		background-color: #24cb98;
		border-radius: 15upx;

		&::after {
			content: '';
			display: inline-block;
			width: 32upx;
			height: 42upx;
			position: absolute;
			left: 50%;
			top: 50%;
			transform: translate(-50%, -50%);
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
		font-size: 28upx;
		color: $globalColor-fontStyle;
		font-weight: bold;
	}

	&-list {
		@include flexLeft;
		border-bottom: 1upx solid $globalColor-style;
		font-size: 28upx;
		margin-bottom: 15upx;
		padding: 15upx 0;
		color: $globalColor-fontStyle;

		&__input {
			text-align: left;
			flex: 1;
			font-size: 28upx;

			input {
				font-size: inherit;
				width: 100%;
			}
		}

		&__placeholder {
			color: #999999;
			font-size: 28upx;
		}

		&__type {
			padding: 0 15upx;
			border-right: 2upx solid #cccccc;
			color: $globalColor-fontStyle;
		}

		&__btn {
			color: $globalColor-style;
			font-weight: bold;
			padding: 0 15upx;
		}
	}

	&-result {
		color: #999999;
		font-size: 24upx;
		margin-bottom: 30upx;
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
