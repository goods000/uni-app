<template>
	<view class="pages">
		<view class="initHeader initHeader--black">
			<view class="initHeader-wrapper">
				<view class="initHeader-back" @click="$tools.back(1)"></view>
				<view class="initHeader-title">转账</view>
				<view class="initHeader-record" @click="$tools.jump('../assets/assets_transfer_record')"></view>
			</view>
		</view>
		<view class="main">
			<view class="infoBox">
				<view class="selectBox" @click="currencyVisible = true">
					<view class="selectBox-wrapper">
						<view class="selectBox-label">选择币种</view>
						<view class="selectBox-data">{{ currencyLabel }}</view>
					</view>
				</view>
			</view>

			<view class="formBox">
				<view class="formBox-wrapper">
					<view class="formBox-list">
						<view class="formBox-list__label">接收地址</view>
						<view class="formBox-list__input">
							<input type="text" placeholder-class="formBox-placeholder" placeholder="输入对方的钱包地址" v-model="address" />
							<view class="formBox-list__scan" @click="scanCode()"><image src="../../static/public/icon-scan-green.png" mode="widthFix"></image></view>
						</view>
					</view>

					<view class="formBox-list">
						<view class="formBox-list__label">数量</view>
						<view class="formBox-list__input">
							<input type="number" placeholder-class="formBox-placeholder" placeholder="请输入转出数量" v-model="quantity" />
							<text class="formBox-list__input-type">{{ currencyLabel }}</text>
							<text class="formBox-list__input-btn" @click="allNum()">全部</text>
						</view>
						<view class="formBox-list__note">可用数量 {{ using | number(4) }} {{ currencyLabel }}</view>
					</view>

					<view class="formBox-list">
						<view class="formBox-list__label">交易密码</view>
						<view class="formBox-list__input">
							<input type="password" placeholder-class="formBox-placeholder" placeholder="请输入您的交易密码" v-model="tradePsw" />
						</view>
					</view>

					<view class="formBox-info">
						<view class="formBox-info__list">
							<view class="formBox-info__list-label">手续费</view>
							<view class="formBox-info__list-data">{{ feeData | number(4) }} {{ currencyLabel }}</view>
						</view>
					</view>

					<view class="initButton"><view class="initButton-btn initButton-btn--style" @click="confirmOrder()">确定</view></view>
				</view>
			</view>
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
			typeActive: 3,
			address: '', //充值地址
			quantity: '', //提币数量
			tradePsw: '', //交易密码
			feeRate: 0,
			feeData: 0,
			percentage: 0, //0是固定数量,1是百分比计算数量
			using: '', //可提数量

			currencyVisible: false,
			currencyLabel: '', //币种
			currencyVal: null,
			currencyArray: [],
			currencyInfoList: [],

			walletInfo: [],

			canTrade: 1
		};
	},
	watch: {
		quantity() {
			// if (this.quantity == '') {
			// 	this.feeData = 0;
			// } else {
			// 	//0是固定数量,1是百分比计算数量
			// 	if (this.percentage == 1) {
			// 		this.feeData = this.quantity * this.feeRate;
			// 	} else {
			// 		this.feeData = this.feeRate;
			// 	}
			// }
		}
	},
	onShow() {
		this.init();
	},
	methods: {
		init() {
			this.getCurrencyList();
		},
		//获取币种
		getCurrencyList() {
			this.$Ajax('/front/transfer/currency/list', {}, res => {
				console.log(JSON.stringify(res));
				if (res.code == 0) {
					this.currencyArray = res.obj;
					console.log(JSON.stringify(this.currencyArray));
					this.currencyArray.forEach(item => {
						item.label = item.currencyName;
						item.value = item.currencyId;
					});
					// console.log(JSON.stringify(this.currencyArray));
					this.currencyLabel = this.currencyArray[0].label;
					this.currencyVal = this.currencyArray[0].value;
					// this.getCurrencyInfo();
					this.getUsing();
					this.getFeeData();
				}
			});
		},
		getUsing() {
			this.$Ajax(
				'/front/financial/currency/wallet',
				{
					currencyName: this.currencyLabel
				},
				res => {
					console.log(JSON.stringify(res.obj));
					if (res.code == 0) {
						this.using = res.obj.using;
					}
				}
			);
		},
		getFeeData() {
			this.$Ajax(
				'/front/transfer/tx/fee',
				{
					currencyId: this.currencyVal
				},
				res => {
					console.log(JSON.stringify(res));
					if (res.code == 0) {
						this.feeData = res.obj;
					}
				}
			);
		},
		confirmOrder() {
			if (this.address == '') {
				return this.$tools.toast('接收地址不能为空');
			}
			if (this.quantity == '') {
				return this.$tools.toast('转账数量不能为空');
			}
			if (this.tradePsw == '') {
				return this.$tools.toast('交易密码不能为空');
			}

			this.$Ajax(
				'/front/transfer/do/tx',
				{
					address: this.address,
					currencyId: this.currencyVal,
					quantity: this.quantity,
					tradePwd: this.tradePsw
				},
				res => {
					console.log(JSON.stringify(res));
					if (res.code == 0) {
						// this.canTrade = 1;
						this.address = '';
						this.quantity = '';
						this.tradePsw = '';
						this.getUsing();
						this.$tools.toast('转账成功');
					}
				}
			);
		},
		changeTypeActive(index) {
			this.typeActive = index;
		},
		//提币全部
		allNum() {
			this.quantity = this.using;
		},

		//扫一扫
		scanCode() {
			uni.scanCode({
				onlyFromCamera: true,
				success: res => {
					// console.log('条码类型：' + res.scanType);
					// console.log('条码内容：' + res.result);
					let msg = res.result;
					this.address = msg;
				}
			});
		},

		/* 底部选项卡公用 */
		onPickerConfirm(res, type) {
			console.log('当前控制的Picker是：' + type + ';当前值是' + res.obj.value);
			if (type == 'currencyPicker') {
				this.currencyLabel = res.obj.label;
				this.currencyVal = res.obj.value;
				// this.getCurrencyInfo();
				this.getUsing();
				// this.getFeeData();1
			}
		}
	}
};
</script>

<style lang="scss" scoped>
.main {
	padding: 30upx;
}

.infoBox {
	// border-bottom: 16upx solid #ededf2;
	// border-bottom: 1upx dashed #666666;
	margin-bottom: 30upx;
}

.selectBox {
	// padding: 30upx 0;
	&-wrapper {
		@include flexBetween;
		padding-bottom: 30upx;
		border-bottom: 1upx dashed #666666;
		font-size: 32upx;
	}

	&-label {
		color: $globalColor-fontStyle;
		font-weight: bold;
		font-size: 28upx;
	}

	&-data {
		@include flexRight;
		color: $globalColor-fontStyle;
		font-size: 32upx;
		font-weight: bold;
		background-image: url(../../static/public/icon-arrow-bottom-grey.png);
		background-size: 26upx 14upx;
		background-position: right center;
		background-repeat: no-repeat;
		padding-right: 45upx;
	}
}

.filterBox {
	margin-top: 30upx;
	&-title {
		color: $globalColor-fontStyle;
		font-size: 28upx;
		font-weight: bold;
		margin-bottom: 15upx;
	}
	&-button {
		@include flexLeft;
		@include calcMargin(4);
		&__btn {
			@include initTransition(0.4);
			font-size: 24upx;
			border-radius: 8upx;
			padding: 8upx 15px;
			color: $globalColor-style;
			border: 1upx solid $globalColor-style;
			// background-color: #FFFFFF;
			margin: 0 8upx;

			&--active {
				@include initButtonGrad;
				color: $globalColor-fontStyle;
				border: 1upx solid transparent;
			}
		}
	}
}

.formBox {
	font-size: 28upx;
	&-list {
		margin-bottom: 60upx;
		color: $globalColor-fontStyle;
		&__input {
			@include flexCenter;
			padding: 15upx 0;
			border-bottom: 2upx solid $globalColor-style;
			font-size: 28upx;

			input {
				font-size: inherit;
				flex: 1;
				text-align: left;
			}
			&-type {
				padding: 0 15upx;
				border-right: 2upx solid #e1e1e1;
				color: $globalColor-fontStyle;
			}
			&-btn {
				color: $globalColor-style;
				padding-left: 15upx;
			}
			&-code {
				color: $globalColor-style;
			}
		}

		&__scan {
			width: 32upx;
			@include fullImage;
		}

		&__label {
			color: $globalColor-fontStyle;
		}

		&__note {
			font-size: 24upx;
			color: #acb1b0;
			margin-top: 15upx;
		}
	}
	&-info {
		margin-bottom: 60upx;
		&__list {
			@include flexBetween;
			margin-bottom: 15upx;
			color: $globalColor-fontStyle;

			&:last-child {
				margin-bottom: 0;
			}
		}
	}
	&-placeholder {
		color: rgba(172, 177, 176, 0.5);
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
