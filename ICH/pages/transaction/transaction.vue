<template>
	<view class="pages">
		<view class="initHeader initHeader--line initHeader--black">
			<view class="initHeader-wrapper">
				<view class="initHeader-back" @click="$tools.switchTab('../index/index')"></view>
				<view class="initHeader-title">OTC</view>
				<view class="initHeader-record" @click="$tools.jump('../transaction/transaction_record')"></view>
			</view>
		</view>
		<!-- <view class="initHeader initHeader--bgBlue initHeader--white">
			<view class="initHeader-wrapper">
				<view class="initHeader-left">
					<view class="initHeader-tabs">
						<view class="initHeader-tabs__wrapper">
							<view class="initHeader-tabs__item" :class="{ 'initHeader-tabs__item--active': initHeaderTabsActive == 0 }" @click="changeHeaderTabsActive(0)">
								购买
							</view>
							<view class="initHeader-tabs__item" :class="{ 'initHeader-tabs__item--active': initHeaderTabsActive == 1 }" @click="changeHeaderTabsActive(1)">
								出售
							</view>
						</view>
					</view>
				</view>
				<view class="initHeader-right">
					<view class="initHeader-button initHeader-button--add" @click="$tools.jump('../transaction/transaction_publish')"></view>
					<view class="initHeader-button initHeader-button--record" @click="$tools.jump('../transaction/transaction_record')"></view>
				</view>
			</view>
		</view> -->
		<view class="main">
			<view class="tabsBox">
				<view class="tabsBox-control">
					<view class="tabsBox-control__item" :class="{ 'tabsBox-control__item--active': initHeaderTabsActive == 0 }" @click="changeTabsActive(0)">我要买</view>
					<view class="tabsBox-control__item" :class="{ 'tabsBox-control__item--active': initHeaderTabsActive == 1 }" @click="changeTabsActive(1)">我要卖</view>
				</view>
			</view>
			<!-- <view class="scrollTabs">
				<view class="scrollTabs-wrapper">
					<view
						class="scrollTabs-item"
						v-for="(item, index) in otcList"
						:key="index"
						:class="{ 'scrollTabs-item--active': scrollTabsActive == index }"
						@click="changeScrollTabsActive(index)"
					>
						{{ item.currencyName }}
					</view>
				</view>
			</view> -->
			<!-- 购买 -->
			<view class="ticketBox">
				<view class="ticketBox-wrapper">
					<view :class="{ initNoData: orderList.length == 0 }" v-if="orderList.length == 0"></view>
					<view class="ticketBox-list" v-for="(item, index) in orderList" :key="index" v-else>
						<view class="ticketBox-left">
							<view class="ticketBox-user">
								<view class="ticketBox-user__avatar"><image :src="item.pic" mode="widthFix"></image></view>
								<view class="ticketBox-user__name">{{ item.otcName }}</view>
							</view>
							<view class="ticketBox-title">{{ item.phone }}</view>
							<view class="ticketBox-info">数量：{{ item.quantity - item.tradeQuantity }} {{ item.currencyName }}</view>
							<view class="ticketBox-info">限量：{{ item.min }} - {{ item.max }}</view>
							<view class="ticketBox-payment">
								<view class="ticketBox-payment__icon ticketBox-payment__icon--wechat" v-show="item.wx == 1">
									<image src="../../static/payment/icon-wechat-active.png" mode="widthFix"></image>
								</view>
								<view class="ticketBox-payment__icon ticketBox-payment__icon--alipay" v-show="item.zfb == 1">
									<image src="../../static/payment/icon-alipay-active.png" mode="widthFix"></image>
								</view>
								<view class="ticketBox-payment__icon ticketBox-payment__icon--unionpay" v-show="item.yhk == 1">
									<image src="../../static/payment/icon-unionpay-active.png" mode="widthFix"></image>
								</view>
							</view>
						</view>
						<view class="ticketBox-right">
							<view class="ticketBox-quantity">{{ item.success }}单 | 成交率 99%</view>
							<view class="ticketBox-subTitle">单价</view>
							<view class="ticketBox-price" :class="initHeaderTabsActive == 0 ? 'ticketBox-price--green' : 'ticketBox-price--red'">{{ item.price }}</view>
							<view class="ticketBox-button">
								<view
									class="ticketBox-button__btn ticketBox-button__btn--blue"
									v-if="initHeaderTabsActive == 0"
									@click="startModal(item.type, item.quantity, item.price, item.min, item.max, item.id, item.currencyName)"
								>
									购买
								</view>
								<view
									class="ticketBox-button__btn ticketBox-button__btn--green"
									v-if="initHeaderTabsActive == 1"
									@click="startModal(item.type, item.quantity, item.price, item.min, item.max, item.id, item.currencyName)"
								>
									出售
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>

		<!-- 操作栏 -->
		<view class="modalBox">
			<view class="modalBox-mask" @click="closeModal()" v-show="modalShow" @touchmove.stop.prevent></view>
			<view class="modalBox-wrapper" :animation="animationData">
				<view class="modalBox-info">
					<view class="modalBox-info__title">{{ initHeaderTabsActive == 0 ? '购买' : '出售' }} {{ modalValue.currencyName }}</view>
					<view class="modalBox-info__price">
						单价
						<text>￥{{ modalValue.price }}</text>
					</view>
				</view>
				<view class="modalBox-form">
					<!-- <view class="modalBox-form__tabs">
						<view class="modalBox-form__tabs-item" :class="{ 'modalBox-form__tabs-item--active': modalTabsActive == 0 }" @click="changeModalTabsActive(0)">
							按金额{{ initHeaderTabsActive == 0 ? '购买' : '出售' }}
						</view>
						<view class="modalBox-form__tabs-item" :class="{ 'modalBox-form__tabs-item--active': modalTabsActive == 1 }" @click="changeModalTabsActive(1)">
							按数量{{ initHeaderTabsActive == 0 ? '购买' : '出售' }}
						</view>
					</view> -->
					<view class="modalBox-form__list">
						<view class="modalBox-form__input">
							<input
								type="text"
								placeholder-class="modalBox-form__placeholder"
								:placeholder="(initHeaderTabsActive == 0 ? '购买' : '出售') + '数量(USDT)'"
								v-model="needQuantity"
							/>
						</view>
						<!-- <view class="modalBox-form__type">HBA</view> -->
						<view class="modalBox-form__btn" @click="modalSelectAll()">全部</view>
					</view>
					<view class="modalBox-form__msg">限额{{ modalValue.min }} - {{ modalValue.max }}</view>
				</view>
				<view class="modalBox-priceBox">
					<view class="modalBox-priceBox__list">
						<view class="modalBox-priceBox__list-label">交易数量</view>
						<view class="modalBox-priceBox__list-data">{{ modalValue.quantity }} USDT</view>
					</view>
					<view class="modalBox-priceBox__list">
						<view class="modalBox-priceBox__list-label">实付款</view>
						<view class="modalBox-priceBox__list-data">￥{{ totalQuantity }}</view>
					</view>
				</view>
				<view class="modalBox-buttonBox">
					<view class="modalBox-buttonBox__btn modalBox-buttonBox__btn--close" @click="closeModal()">{{ remain }}</view>
					<view class="modalBox-buttonBox__btn" :class="initHeaderTabsActive == 0 ? 'modalBox-buttonBox__btn--blue' : 'modalBox-buttonBox__btn--green'" @click="getTicket()">
						下单
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
var _self;
export default {
	data() {
		return {
			initHeaderTabsActive: 0,
			scrollTabsActive: 0,
			pageTotal: 1,
			pageNum: 1,
			pageSize: 20,
			pages: 1,
			otcList: [],
			// orderType: 0,
			otcTradeId: 0,
			orderList: [],
			quantity: '',

			// 模态框
			modalShow: false,
			animationData: {},
			modalTabsActive: 0,
			modalValue: [],

			// 计时器
			remain: '60s后自动取消',
			isSend: true,
			time: 60,
			timer: null,
			needQuantity: '',
			totalQuantity: 0,

			buyTotal: 0,
			tradeNum: 0,
			todayPrice: 0,
			lastPrice: 0
		};
	},
	onLoad() {
		_self = this;
		var animation = uni.createAnimation({
			duration: 500,
			timingFunction: 'ease-in-out'
		});

		this.animation = animation;
	},
	onShow() {
		this.init();
	},
	onReachBottom() {
		if (this.pageNum >= this.pages) {
			return false;
		}
		// this.pageNum++;
		this.pageSize += 20;
		// console.log(JSON.stringify(this.pageSize));
		this.init();
	},
	methods: {
		init() {
			this.getOTCList();

			// 延迟请求数据
			
			// setTimeout(function() {
				
			// }, 1000);
		},
		getOTCList() {
			// 获取数据
			this.$Ajax('/front/otc/init', {}, res => {
				if (res.code == 0) {
					console.log(JSON.stringify(res.obj));
					this.otcTradeId = res.obj[0].id;
					// this.otcList = res.obj;
					this.getOrderList();
				}
			});
		},
		getOrderList(type) {
			// if (type == 0) {
			// 	var needType = 1;
			// } else {
			// 	var needType = 0;
			// }
			uni.showLoading({
				title: '列表拉取中',
				mask: true
			});

			this.$Ajax(
				'/front/otc/getOrderList',
				{
					configId: this.otcTradeId,
					sort: this.initHeaderTabsActive == 0 ? 1 : 0,
					type: this.initHeaderTabsActive,
					pageNum: this.pageNum,
					pageSize: this.pageSize
				},
				res => {
					// console.log(JSON.stringify(res));
					if (res.code == 0) {
						this.pages = res.obj.pageInfo.pages;
						this.orderList = res.obj.pageInfo.list;
						uni.hideLoading();
						// console.log(JSON.stringify(this.orderList));
					}
				}
			);

			// uni.hideLoading();
		},
		changeTabsActive(index) {
			this.initHeaderTabsActive = index;
			this.getOrderList(this.initHeaderTabsActive);
		},
		changeScrollTabsActive(index) {
			this.scrollTabsActive = index;
			this.getOrderList(this.initHeaderTabsActive);
		},
		changeModalTabsActive(index) {
			this.modalTabsActive = index;
		},

		startModal(type, quantity, price, min, max, id, currencyName) {
			let that = this;
			this.modalValue.type = type;
			this.modalValue.quantity = quantity;
			this.modalValue.price = price;
			this.modalValue.min = min;
			this.modalValue.max = max;
			this.modalValue.id = id;
			this.modalValue.currencyName = currencyName;

			console.log(this.modalValue);

			this.timer = setInterval(() => {
				this.time--;
				this.remain = this.time + 's后自动取消';
				if (this.time == 0) {
					that.isSend = true;
					that.time = 60;
					that.remain = '60s后自动取消';
					that.closeModal();
					clearInterval(that.timer);
				}
			}, 1000);

			this.modalShow = true;
			this.aniSiderInTop();
		},
		closeModal() {
			this.time = 60;
			this.remain = '60s后自动取消';
			clearInterval(this.timer);
			this.aniSiderInTopClose();
			this.needQuantity = '';
			this.modalShow = false;
		},
		aniSiderInTop() {
			// 先旋转同时放大，然后平移
			// this.animation.rotate(45).scale(2, 2).step()
			this.animation.translateY(0).step();
			this.animationData = this.animation.export();
		},
		aniSiderInTopClose() {
			// 先旋转同时放大，然后平移
			// this.animation.rotate(45).scale(2, 2).step()
			this.animation.translateY(600).step();
			this.animationData = this.animation.export();
		},
		modalSelectAll() {
			this.needQuantity = this.modalValue.quantity;
		},
		getTicket() {
			this.$Ajax(
				'/front/otc/trade',
				{
					orderId: this.modalValue.id,
					quantity: this.needQuantity
				},
				res => {
					// console.log(JSON.stringify(res));
					if (res.code == 0) {
						this.$tools.toast('接单成功');
						this.closeModal();
					}
				}
			);
		}
	},
	watch: {
		needQuantity() {
			this.totalQuantity = this.needQuantity * this.modalValue.price;
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

.scrollTabs {
	overflow: hidden;
	&-wrapper {
		@include flexLeft;
		overflow: auto;
		padding: 0 15upx;
		border-bottom: 1upx solid #c6d2e4;
	}

	&-item {
		font-size: 28upx;
		font-weight: bold;
		color: #999999;
		white-space: nowrap;
		padding: 30upx 15upx;
		position: relative;
		box-sizing: border-box;
		@include initTransition(0.4);

		&:after {
			content: '';
			display: inline-block;
			width: 40upx;
			height: 4upx;
			background-color: $globalColor-style;
			position: absolute;
			left: 50%;
			bottom: 0;
			transform: translateX(-50%);
			@include initTransition(0.4);
		}

		&--active {
			color: $globalColor-blue;
			&:after {
				background-color: $globalColor-blue;
			}
		}
	}
}

.infoBox {
	padding: 30upx;
	border-bottom: 10upx solid #fcfcfc;
	background-color: #ffffff;
	&-wrapper {
		@include flexCenter;
	}

	&-item {
		flex: 1;
		color: #333333;
		@include justifiedLayout;

		&--long {
			flex: 2;
		}

		&__title {
			font-size: 24upx;
		}
		&__data {
			font-size: 28upx;
			font-weight: bold;
		}
	}
}

.ticketBox {
	// padding: 30upx;
	&-left {
		flex: 1;
		padding-right: 30upx;
	}

	&-right {
		text-align: right;
	}

	&-list {
		@include flexBetween;
		// background-color: #1a1b30;
		font-size: 28upx;
		padding: 30upx;
		// border-radius: 15upx;
		// margin-bottom: 30upx;
		border-bottom: 1upx solid #c6d2e4;
		// @include clearLastBorder;
	}

	&-user {
		@include flexLeft;
		color: #101010;
		&__avatar {
			width: 60upx;
			height: 60upx;
			border-radius: 50%;
			overflow: hidden;
			@include fullImage;
			margin-right: 10upx;
		}
	}

	&-quantity {
		text-align: right;
		color: #99999d;
		font-size: 24upx;
		margin-bottom: 10upx;
	}

	&-title {
		font-size: 30upx;
		font-weight: bold;
		margin-bottom: 10upx;
	}

	&-subTitle {
		color: #78849a;
		font-size: 24upx;
		margin-bottom: 5upx;
	}

	&-info {
		color: #78849a;
		font-size: 24upx;
		margin-bottom: 10upx;
	}

	&-price {
		font-size: 36upx;
		margin-bottom: 10upx;
		font-weight: bold;
		&--green {
			color: $globalColor-blue;
		}
		&--red {
			color: $globalColor-blue;
		}
	}

	&-payment {
		margin-top: 20upx;
		@include flexLeft;
		&__icon {
			@include fullImage;
			&--wechat,
			&--alipay {
				width: 36upx;
				margin-right: 10upx;
			}
			&--unionpay {
				width: 48upx;
			}
		}
	}

	&-button {
		@include flexRight;
		&__btn {
			font-size: 26upx;
			color: #ffffff;
			padding: 10upx 30upx;
			border-radius: 10upx;
			&--blue {
				background-color: $globalColor-blue;
			}
			&--green {
				background-color: #00b8ae;
			}
		}
	}
}

.modalBox {
	width: 100%;
	z-index: 999;
	position: relative;
	&-mask {
		position: fixed;
		height: 100%;
		width: 100%;
		background-color: rgba(0, 0, 0, 0.8);
		left: 0;
		top: 0;
		z-index: 1;
	}

	&-wrapper {
		position: fixed;
		bottom: 0;
		left: 0;
		background-color: #ffffff;
		color: #101010;
		z-index: 999;
		width: 100%;
		box-sizing: border-box;
		transform: translateY(100%);
		border-top-left-radius: 20upx;
		border-top-right-radius: 20upx;
	}

	&-info {
		color: #101010;
		border-bottom: 2upx solid #c6d2e4;
		padding: 30upx;
		&__title {
			font-size: 40upx;
			margin-bottom: 15upx;
		}

		&__price {
			font-size: 28upx;
			text {
				color: $globalColor-blue;
			}
		}
	}

	&-form {
		// margin-bottom: 60upx;
		padding: 30upx;

		// &__tabs {
		// 	@include flexLeft;
		// 	font-size: 28upx;
		// 	margin-bottom: 30upx;
		// 	&-item {
		// 		color: #99999d;
		// 		position: relative;
		// 		margin-right: 30upx;
		// 		padding: 15upx 0;
		// 		@include initTransition(0.4);

		// 		&:after {
		// 			content: '';
		// 			display: inline-block;
		// 			width: 40upx;
		// 			height: 4upx;
		// 			background-color: ttransparent;
		// 			position: absolute;
		// 			left: 50%;
		// 			bottom: 0;
		// 			transform: translateX(-50%);
		// 			@include initTransition(0.4);
		// 		}

		// 		&--active {
		// 			color: $globalColor-blue;

		// 			&:after {
		// 				background-color: $globalColor-blue;
		// 			}
		// 		}
		// 	}
		// }

		&__list {
			@include flexBetween;
			align-items: stretch;
			border: 2upx solid #768298;
			font-size: 28upx;
			border-radius: 15upx;
			margin-bottom: 15upx;
			overflow: hidden;
		}
		&__input {
			flex: 1;
			padding: 30upx;
			input {
				font-size: inherit;
			}
		}
		&__type {
			border-right: 2upx solid #78849a;
			padding: 0 30upx;
		}
		&__btn {
			@include flexCenter;
			background-color: $globalColor-blue;
			margin-left: 30upx;
			padding: 0 30upx;
			color: #ffffff;
		}
		&__msg {
			color: #99999d;
			font-size: 24upx;
		}
	}

	&-priceBox {
		// margin-bottom: 30upx;
		padding: 30upx;
		&__info {
			color: #78849a;
			font-size: 28upx;
		}
		&__list {
			@include flexBetween;
			margin-bottom: 15upx;
			font-size: 32upx;
			color: #101010;
			@include clearLastMargin();
			font-weight: bold;

			// &-label{

			// }
			// &-data {
			// 	color: $globalColor-blue;
			// 	font-size: 36upx;
			// }
		}
	}

	&-buttonBox {
		@include flexBetween;
		// @include calcMargin(20);
		padding: 30upx;

		&__btn {
			flex: 1;
			padding: 30upx 0;
			color: #ffffff;
			font-size: 28upx;
			@include flexCenter;
			border-radius: 15upx;
			margin: 20upx;
			&--close {
				background-color: #78849a;
				box-shadow: 2px 2px 20upx  rgba(120, 132, 154, 0.5);
			}
			&--blue {
				background-color: $globalColor-blue;
				box-shadow: 2px 2px 20upx  rgba(58, 121, 222, 0.5);
			}
			&--green {
				background-color: #00b8ae;
				box-shadow: 2px 2px 20upx  rgba(0, 184, 174, 0.5);
			}
		}
	}

	&-close {
		color: rgba(255, 255, 255, 0.4);
	}

	&-pattern {
		display: flex;
		width: calc(100% + 30upx);
		margin-left: -15upx;

		// margin-bottom: 60upx;
		&__item {
			width: 33.33%;
			padding: 0 10upx;
			position: relative;
			font-size: 0;

			.itemImg {
				border-radius: 20upx;
				width: 100%;
				display: block;
			}

			// .qrImg {
			// 	position: absolute;
			// 	width: 40upx;
			// 	right: 20upx;
			// 	bottom: 20upx;
			// }
		}

		&__content {
			position: absolute;
			bottom: 4%;
			// 外边的10upx + 内边的%4
			left: calc(10upx + 4%);
			width: calc((100% - 8%) - 20upx);
			border-radius: 10upx;
			font-size: 18upx;
			display: flex;
			align-items: center;
			justify-content: space-between;
			box-sizing: border-box;
			padding: 15upx;

			background-color: #ffffff;
			&-left {
				display: flex;
				align-items: flex-start;
				// padding: 0 30upx;
				flex-direction: column;
				justify-content: center;
			}

			&-title {
				// 兼容
				font-size: 0;
			}

			&-text {
				font-size: 16upx;
				color: #000000;
			}

			&-number {
				font-size: 18upx;
				color: #81bec2;
				margin-left: 4upx;
			}

			&-info {
				font-size: 14upx;
				color: #999999;
			}

			&-qrcode {
				width: 40upx;
			}
		}
	}

	&-button {
		background-color: #7d7b7e;
		color: #fff;
		padding: 25upx 0;
		text-align: center;
		font-size: 28upx;
		border-radius: 12upx;
	}
}

.canvasBox-canvas {
	padding: 60upx 30upx 0;
}

.qiun-charts {
	width: 100%;
	height: 320upx;
	background-color: #1a1b30;
}

.charts {
	width: 100%;
	height: 320upx;
	background-color: #1a1b30;
}

.content {
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
}

.echarts {
	width: 100%;
	height: 320upx;
}

.cardBox {
	padding: 60upx 30upx 0;
	&-wrapper {
		@include flexCenter;
		flex-wrap: wrap;
		border-radius: 15upx;
		overflow: hidden;
	}

	&-item {
		width: 50%;
		// flex: 1;
		padding: 15upx 0;
		color: #ffffff;
		text-align: center;
		&--black {
			background-color: #191b30;
		}

		&--gray {
			background-color: #606279;
		}

		&__data {
			font-size: 36upx;
			font-weight: bold;
		}
		&__label {
			font-size: 28upx;
		}
	}
}
</style>
