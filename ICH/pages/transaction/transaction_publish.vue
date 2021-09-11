<template>
	<view class="pages">
		<view class="initHeader initHeader--line initHeader--black">
			<view class="initHeader-wrapper">
				<view class="initHeader-back" @click="$tools.back()"></view>
				<view class="initHeader-title">发布广告</view>
				<view class="initHeader-record" @click="$tools.jump('../transaction/transaction_publish_record')"></view>
			</view>
		</view>
		<view class="main">
			<view class="tabsBox">
				<view class="tabsBox-control">
					<view class="tabsBox-control__item" :class="{ 'tabsBox-control__item--active': type == 0 }" @click="changeHeaderTabs(0)">我要买</view>
					<view class="tabsBox-control__item" :class="{ 'tabsBox-control__item--active': type == 1 }" @click="changeHeaderTabs(1)">我要卖</view>
				</view>
			</view>
			<view class="initFormBox">
				<view class="initFormBox-wrapper">
					<view class="initFormBox-list">
						<view class="initFormBox-list__picker">
							<view class="initFormBox-list__picker-label">选择交易币种</view>
							<view class="initFormBox-list__picker-data">{{ currencyName }}</view>
						</view>
					</view>
					<view class="initFormBox-list">
						<view class="initFormBox-list__label">价格</view>
						<view class="initFormBox-list__data">
							<input type="text" placeholder-class="initFormBox-placeholder" placeholder="请输入价格" v-model="price" />
							<view class="initFormBox-list__data-unit">CNY</view>
						</view>
					</view>
					<view class="initFormBox-list initFormBox-list--holder">
						<view class="initFormBox-list__label">交易数量</view>
						<view class="initFormBox-list__data">
							<input type="text" placeholder-class="initFormBox-placeholder" placeholder="请输入数量" v-model="quantity" />
							<!-- <view class="initFormBox-list__data-unit"></view> -->
						</view>
					</view>
					<view class="initFormBox-list">
						<view class="initFormBox-list__label">单笔最小成交额</view>
						<view class="initFormBox-list__data">
							<input type="text" placeholder-class="initFormBox-placeholder" placeholder="请输入单笔最小成交额" v-model="min" />
							<!-- <view class="initFormBox-list__data-unit">CNY</view> -->
						</view>
					</view>
					<view class="initFormBox-list initFormBox-list--holder">
						<view class="initFormBox-list__label">单笔最大成交额</view>
						<view class="initFormBox-list__data">
							<input type="text" placeholder-class="initFormBox-placeholder" placeholder="请输入单笔最大成交额" v-model="max" />
							<!-- <view class="initFormBox-list__data-unit">CNY</view> -->
						</view>
					</view>
					<!-- <view class="initFormBox-subTitle">收款方式</view> -->
					<view class="initFormBox-list initFormBox-list--holder">
						<view class="paymentBox">
							<view class="paymentBox-title">收款方式</view>
							<view class="paymentBox-wrapper">
								<view class="paymentBox-noData" v-if="paymentList.length == 0">未设置收款方式</view>
								<view
									class="paymentBox-item"
									:class="item.checked == 1 ? 'paymentBox-item--active' : ''"
									v-for="(item, index) in paymentList"
									:key="index"
									@click="selectPayment(index)"
									v-else
								>
									<view class="paymentBox-item__icon paymentBox-item__icon--wechat">
										<image :src="item.checked == 1 ? item.imgUrlActive : item.imgUrl" mode="widthFix"></image>
									</view>
									<view class="paymentBox-item__data" v-if="item.payType == 1">银联</view>
									<view class="paymentBox-item__data" v-if="item.payType == 2">支付宝</view>
									<view class="paymentBox-item__data" v-if="item.payType == 3">微信</view>
								</view>
							</view>
						</view>
					</view>
					<!-- <view class="initFormBox-subTitle">安全验证</view>
					<view class="initFormBox-list">
						<view class="initFormBox-list__label">验证码</view>
						<view class="initFormBox-list__label">向手机号+86 {{ phone | conceal(3) }}发送验证码</view>
						<view class="initFormBox-list__data">
							<input type="text" placeholder-class="initFormBox-placeholder" placeholder="请输入验证码" v-model="code" />
							<view class="initFormBox-list__data-code" @click="sendCode()">{{ remain }}</view>
						</view>
					</view> -->
					<view class="initFormBox-list initFormBox-list--holder">
						<view class="initFormBox-list__label">交易密码</view>
						<view class="initFormBox-list__data">
							<input type="password" placeholder-class="initFormBox-placeholder" placeholder="请输入交易密码" v-model="tradePassword" />
						</view>
					</view>

					<view class="initFormBox-message">
						<view class="initFormBox-message__title">注意事项</view>
						<view class="initFormBox-message__list">1.请务必收到货款后，再确认收款</view>
						<view class="initFormBox-message__list">2.请核实款项来源及转账备注，以免银行卡被银行冻结</view>
					</view>

					<view class="initFormBox-button"><view class="initFormBox-button__btn initFormBox-button__btn--blue" @click="publish()">立即发布</view></view>
				</view>
			</view>
		</view>
		<!-- <mpvue-picker ref="mpvuePicker" @onConfirm="onConfirm" themeColor="#27aae1" :pickerValueArray="pickerValueArray"></mpvue-picker> -->
	</view>
</template>

<script>
// import mpvuePicker from '../../components/mpvue-picker/mpvuePicker.vue';
import weburl from '@/components/url.js';
export default {
	// components: {
	// 	mpvuePicker
	// },
	data() {
		return {
			type: 0, //0买 1卖

			paymentActive: 0,
			paymentList: [],

			paymentActiveList: { yhk: false, zfb: false, wx: false },

			remain: '验证码',
			isSend: true,
			time: 60,
			timer: null,

			ischecked: false,

			price: '',
			quantity: '',
			code: '',
			min: '',
			max: '',
			tradePassword: '',

			usdPrice: 0,
			otcList: [],
			pickerValueArray: [],
			currencyId: '',
			currencyName: '',
			ratio: 0,

			tabsIndex: 0
		};
	},
	onLoad(hash) {
		this.phone = uni.getStorageSync('gobalUser');
		this.init();
	},
	methods: {
		init() {
			this.getOTCList();
			this.getPayList();
			// this.getRatio();
		},
		getOTCList() {
			this.$Ajax('/front/otc/init', {}, res => {
				if (res.code == 0) {
					this.pickerValueArray = res.obj;
					this.pickerValueArray.forEach((item, index) => {
						item.label = item.currencyName;
					});
					this.currencyId = this.pickerValueArray[0].id;
					this.currencyName = this.pickerValueArray[0].currencyName;
				}
			});
		},
		getPayList() {
			let that = this;

			this.$Ajax('/front/otc/publishPay', {}, res => {
				if (res.code == 0) {
					this.paymentList = res.obj;
					this.paymentList.forEach((item, index) => {
						that.$set(item, 'checked', false);
						if (item.payType == 3) {
							item.imgUrl = '../../static/payment/icon-wechat.png';
							item.imgUrlActive = '../../static/payment/icon-wechat-active.png';
						} else if (item.payType == 2) {
							item.imgUrl = '../../static/payment/icon-alipay.png';
							item.imgUrlActive = '../../static/payment/icon-alipay-active.png';
						} else if (item.payType == 1) {
							item.imgUrl = '../../static/payment/icon-unionpay.png';
							item.imgUrlActive = '../../static/payment/icon-unionpay-active.png';
						}
					});
				}
			});
			// this.$Ajax('/front/user/getPayList', {}, res => {
			// 	if (res.code == 0) {
			// 		this.paymentList = res.obj.list;
			// 		this.paymentList.forEach((item, index) => {
			// 			that.$set(item, 'checked', false);
			// 			if (item.payType == 3) {
			// 				item.imgUrl = '../../static/payment/icon-wechat.png';
			// 				item.imgUrlActive = '../../static/payment/icon-wechat-active.png';
			// 			} else if (item.payType == 2) {
			// 				item.imgUrl = '../../static/payment/icon-alipay.png';
			// 				item.imgUrlActive = '../../static/payment/icon-alipay-active.png';
			// 			} else if (item.payType == 1) {
			// 				item.imgUrl = '../../static/payment/icon-unionpay.png';
			// 				item.imgUrlActive = '../../static/payment/icon-unionpay-active.png';
			// 			}
			// 		});
			// 	}
			// });
		},
		getRatio() {
			this.$Ajax('/search/get/exchange/ratio', {}, res => {
				if (res.code == 0) {
					console.log(JSON.stringify(res));
					this.ratio = res.obj;
				}
			});
		},
		sendCode() {
			if (!this.isSend) {
				return false;
			}
			uni.showLoading({
				title: '发送中',
				mask: true
			});

			this.$Ajax('/ajax/sendMyCode', {}, res => {
				this.isSend = false;
				this.remain = this.time + 's后可重发';
				this.timer = setInterval(() => {
					this.time--;
					this.remain = this.time + 's后可重发';
					if (this.time == 0) {
						clearInterval(this.timer);
						this.remain = '重新获取';
						(this.isSend = true), (this.time = 60);
					}
				}, 1000);
			});
			uni.hideLoading();
		},
		publish() {
			let that = this;

			if (this.min == '') {
				return this.$tools.toast('请输入最低限量');
			}

			if (this.max == '') {
				return this.$tools.toast('请输入最高限量');
			}

			if (Number(this.max) < Number(this.min)) {
				return this.$tools.toast('最高限量不能小于最低限量');
			}

			if (Number(this.quantity) < Number(this.min)) {
				return this.$tools.toast('最小限量不能大于需求数量');
			}

			if (Number(this.max) > Number(this.quantity)) {
				return this.$tools.toast('最大限量不能大于需求数量');
			}

			// if (Number(this.max) > Number(this.quantity)) {
			// 	return this.$tools.toast('最高限量不能超过总数');
			// }

			uni.showLoading({
				title: '发布中',
				mask: true
			});

			this.$Ajax(
				'/front/otc/publish',
				{
					configId: that.currencyId,
					price: that.price,
					quantity: that.quantity,
					min: that.min,
					max: that.max,
					type: that.type,
					tradePassword: that.tradePassword,
					remark: '',
					wx: that.paymentActiveList.wx ? '1' : '0',
					zfb: that.paymentActiveList.zfb ? '1' : '0',
					yhk: that.paymentActiveList.yhk ? '1' : '0'
				},
				res => {
					console.log(JSON.stringify(res));
					if (res.code == 0) {
						uni.hideLoading();
						that.$tools.toastJump('发布成功', '../transaction/transaction');
					}
				},
				fail => {
					uni.hideLoading();
				}
			);
		},
		selectPayment(index) {
			this.paymentList[index].checked = !this.paymentList[index].checked;

			if (this.paymentList[index].payType == 3) {
				if (this.paymentList[index].checked) {
					this.paymentActiveList.wx = true;
				} else {
					this.paymentActiveList.wx = false;
				}
			}
			if (this.paymentList[index].payType == 2) {
				if (this.paymentList[index].checked) {
					this.paymentActiveList.zfb = true;
				} else {
					this.paymentActiveList.zfb = false;
				}
			}
			if (this.paymentList[index].payType == 1) {
				if (this.paymentList[index].checked) {
					this.paymentActiveList.yhk = true;
				} else {
					this.paymentActiveList.yhk = false;
				}
			}

			console.log('微信' + this.paymentActiveList.wx + '---' + '支付宝' + this.paymentActiveList.zfb + '---' + '银联' + this.paymentActiveList.yhk);
		},
		checkboxChange() {
			this.ischecked = !this.ischecked;
		},
		showPicker() {
			this.$refs.mpvuePicker.show();
		},
		onConfirm(e) {
			this.currencyId = this.pickerValueArray[e.index].id;
			this.currencyName = this.pickerValueArray[e.index].currencyName;
		},
		changeHeaderTabs(index) {
			this.type = index;
		}
	},
	watch: {
		price() {
			this.usdPrice = this.quantity * this.price * 7;
		},
		quantity() {
			this.usdPrice = this.quantity * this.price * 7;
		}
	}
};
</script>

<style lang="scss" scoped>
.tabsBox {
	&-control {
		border-bottom: 12upx solid #f7f8fc;
		@include flexCenter;
		&__item {
			text-align: center;
			flex: 1;
			padding: 30upx 0;
			border-bottom: 4upx solid transparent;
			font-size: 28upx;
			color: #99999d;
			position: relative;
			@include initTransition(0.4);

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

			&--active {
				color: $globalColor-blue;
				border-bottom: 4upx solid $globalColor-blue;
			}
		}
	}
}
.initFormBox {
	// padding: 0 30upx;
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
	&-button {
		margin-top: 120upx;
	}

	&-matter {
		padding: 30upx 0;
	}

	&-message {
		padding: 30upx;
		background-color: #ffffff;
		&__title {
			color: #101010;
			font-size: 32upx;
		}

		&__list {
			color: #99999d;
			font-size: 28upx;
		}
	}
}
.paymentBox {
	width: 100%;
	// padding: 30upx;
	// margin-bottom: 30upx;
	&-title {
		font-size: 32upx;
		margin-bottom: 30upx;
	}

	&-wrapper {
		@include flexLeft;
		@include calcMargin(15);
	}

	&-noData {
		font-size: 32upx;
		color: #99999d;
		margin: 0 15upx;
	}

	&-item {
		max-width: calc((100% - 60upx) / 3);
		flex: 1;
		background-color: #ffffff;
		padding: 30upx 0;
		border-radius: 10upx;
		margin: 0 15upx;
		position: relative;
		font-size: 32upx;
		@include flexCenter;
		border: 4upx dashed #99999d;

		&--active {
			border: 4upx solid $globalColor-blue;
			// &:after {
			// 	content: '';
			// 	background-image: url('../../static/payment/icon-payment-active.png');
			// 	background-size: 37upx 32upx;
			// 	bottom: 0;
			// 	right: 0;
			// 	width: 100%;
			// 	height: 100%;
			// 	z-index: 1;
			// 	position: absolute;
			// 	background-repeat: no-repeat;
			// 	background-position: 100% 100%;
			// 	border-radius: 10upx;
			// 	box-sizing: border-box;
			// }
		}

		&__icon {
			margin-right: 15upx;
			&--wechat,
			&--alipay {
				width: 40upx;
			}
			&--unionpay {
				width: 45upx;
			}
			@include fullImage;
		}
	}
}
</style>
