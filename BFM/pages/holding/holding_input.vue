<template>
	<view class="pages">
		<view class="initHeader initHeader--white">
			<view class="initHeader-wrapper">
				<view class="initHeader-back" @click="$tools.back(1)"></view>
				<view class="initHeader-title">存入</view>
			</view>
		</view>
		<view class="formBox">
			<view class="formBox-wrapper">
				<view class="formBox-list">
					<view class="formBox-list__label">存入数量</view>
					<view class="formBox-list__input">
						<input type="text" placeholder-class="formBox-list__input-placeholder" placeholder="请输入存入数量" v-model="quantity" />
						<text class="formBox-list__input-type">BK</text>
						<text class="formBox-list__input-btn" @click="all()">全部</text>
					</view>
					<view class="formBox-list__note">可用数量 1780.00</view>
				</view>
				<!-- <view class="numBox_wrapper-title"></view>
				<view class="numBox_wrapper-text">
					<view class="numBox_wrapper-text-tips"></view>
					
					<view class="numBox_wrapper-text-right">
						<view class="numBox_wrapper-text-right-usdt">USDT</view>
						<view class="numBox_wrapper-text-right-full" @click="all">全部</view>
					</view>
				</view>
				<view class="numBox_wrapper-boot">可用数量 {{ this.walletUsing | number(2) }}USDT</view> -->
			</view>
		</view>
		<view class="sortBox">
			<view class="sortBox-wrapper">
				<view class="sortBox-title">选择类型</view>
				<view class="sortBox-itemBox">
					<view
						class="sortBox-itemBox__item"
						:class="{ 'sortBox-itemBox__item--active': sortAcitve == index }"
						@click="changeSortActive(index, item.id)"
						v-for="(item, index) in holdingList"
						:key="index"
					>
						<view class="sortBox-itemBox__item-type">{{ item.rate * 100 }}%</view>
						<view class="sortBox-itemBox__item-content">
							<view class="sortBox-itemBox__item-title">持币时间：{{ item.days }}天</view>
							<view class="sortBox-itemBox__item-rate">
								年化率
								<text class="sortBox-itemBox__item-rate--highlight">{{ item.rate * 100 }}%</text>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="initButton"><view class="initButton-btn initButton-btn--style" @click="openPopup('tradePopup')">存入</view></view>

		<!-- 交易密码验证 -->
		<uni-popup ref="tradePopup" type="center" :animation="true" @change="changePopup">
			<view class="initPopup">
				<view class="initPopup-wrapper">
					<view class="initPopup-title">交易密码</view>
					<!-- <view class="initPopup-desc">持币提前退出将扣除已产生收益。</view> -->
					<view class="initPopup-listBox">
						<view class="initPopup-listBox__list">
							<view class="initPopup-listBox__list-input">
								<input type="password" placeholder-class="initPopup-listBox__list-placeholder" placeholder="请输入交易密码" v-model="tradePwd" />
							</view>
						</view>
						<!-- <view class="initPopup-listBox__note">当前可用：<text class="initPopup-listBox__note--highlight">{{ bgfUsing }}BGF</text></view> -->
					</view>
					<view class="initPopup-buttonBox">
						<view class="initPopup-buttonBox__btn initPopup-buttonBox__btn--cancel" @click="hidePopup('tradePopup')">取消</view>
						<view class="initPopup-buttonBox__btn initPopup-buttonBox__btn--confirm" @click="buyHolding()">确定</view>
					</view>
				</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
import uniPopup from '@/components/uni-popup/uni-popup.vue';
export default {
	components: {
		uniPopup
	},
	data() {
		return {
			holdingList: [],

			tradePwd: '',

			id: '',
			quota: '',
			phone: '',
			moneyList: [],
			using: 0,
			popupMoney: 0,
			popupEquivalent: 0,

			sixPsd: '',
			focusStatus: false,

			invesDetail: [],
			walletUsing: 0,

			sortAcitve: 0,
			sortId: 0,
			quantity: ''
		};
	},
	onShow() {
		this.init();
	},
	methods: {
		all() {
			this.quantity = this.walletUsing;
		},
		init() {
			this.getHoldingList();
			this.getAssets();
		},
		getHoldingList() {
			this.$Ajax('/front/deposit/do/selectHoldInterest', {}, res => {
				console.log('持币生息列表：' + JSON.stringify(res));
				if (res.code == 0) {
					this.holdingList = res.obj;
					this.sortId = this.holdingList[0].id;
				}
			});
		},

		// 全部钱包
		getAssets() {
			this.$Ajax(
				'/front/financial/get/assets',
				{
					currencyId: 2
				},
				res => {
					// console.log("数据请求成功")
					console.log('BK的资产：' + JSON.stringify(res));
					if (res.code == 0) {
						// this.walletUsing = res.obj.currencyList[0].using;
						// console.log(this.walletUsing);
					}
				}
			);
		},

		// 存入
		buyHolding() {
			console.log('sortId： ' + this.sortId + '  quantity： ' + this.quantity + '  tradePwd： ' + this.tradePwd);
			
			if (this.tradePwd == '') {
				return this.$tools.toast('请输入交易密码');
			}
			
			this.$Ajax(
				'/front/deposit/do/depositBKT',
				{
					interest: this.sortId,
					amount: this.quantity,
					tradePwd: this.tradePwd
				},
				res => {
					console.log('buyInvestment' + JSON.stringify(res))
					if (res.code == 0) {
						this.hidePopup('tradePopup');
						this.quantity = '';
						this.$tools.toast('购买成功');
					}
				}
			);
		},

		changeSortActive(index, id) {
			this.sortAcitve = index;
			this.sortId = id;
		},
		
		/* 弹出框公用 */
		openPopup(e) {
			if (this.quantity == '') {
				return this.$tools.toast('请输入存入数量');
			}
			this.$refs[e].open();
		},
		hidePopup(e) {
			this.$refs[e].close();
		},
		changePopup(e) {
			console.log('popup ' + e.type + ' 状态', e.show);
			if (!e.show) {
				this.tradePwd = '';
			}
		}
	}
};
</script>

<style lang="scss" scoped>
.formBox {
	&-list {
		padding: 30upx;
		&__label {
			color: #ffffff;
			font-size: 28upx;
			margin-bottom: 15upx;
		}
		&__input {
			@include flexCenter;
			padding: 15upx 0;
			margin-bottom: 15upx;
			border-bottom: 2upx solid $globalColor-style;
			font-size: 32upx;
			color: #ffffff;

			&-placeholder {
				color: #333333;
				font-size: 32upx;
			}

			input {
				flex: 1;
			}

			&-type {
				padding: 0 15upx;
				border-right: 2upx solid #333333;
				color: #cccccc;
				font-size: 28upx;
			}
			&-btn {
				color: $globalColor-style;
				font-size: 28upx;
				font-weight: bold;
				padding: 0 15upx;
			}
		}
		&__note {
			color: #666666;
			font-size: 24upx;
		}
	}
}

.sortBox {
	&-wrapper {
		padding: 0 30upx;
	}

	&-title {
		color: #ffffff;
		font-size: 28rpx;
	}
	&-itemBox {
		@include flexLeft;
		@include calcMargin(15);
		flex-wrap: wrap;
		padding: 30upx 0;

		&__item {
			@include initTransition(0.4);
			@include flexCenter;
			width: calc(50% - 30upx);
			margin: 15upx;
			padding: 15px 0;
			background-color: #142224;
			// border: 1upx solid transparent;
			border-radius: 15upx;
			border: 2upx solid transparent;

			&--active {
				border: 2upx solid $globalColor-style;
			}

			&-type {
				@include flexCenterColumn;
				color: $globalColor-style;
				border-radius: 50%;
				background-color: #040408;
				height: 80upx;
				width: 80upx;
				font-size: 26upx;
				font-weight: bold;
				margin-right: 8upx;
			}

			&-title {
				font-size: 26upx;
				color: #ffffff;
				margin-bottom: 15rpx;
			}

			&-rate {
				font-size: 24upx;
				color: #999999;

				&--highlight {
					color: $globalColor-style;
					margin-left: 8upx;
				}
			}
		}
	}
}

.initButton {
	padding: 0 30upx;
	margin-top: 60upx;
}
</style>
