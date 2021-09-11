<template>
	<view class="pages" v-cloak>
		<view class="initHeader initHeader--fixed initHeader--line initHeader--bgWhite initHeader--black">
			<view class="initHeader-wrapper">
				<view class="initHeader-back" @click="clearBack()"></view>
				<view class="initHeader-title">{{ statusList[pageStatus] }}</view>
			</view>
		</view>
		<view class="main">
			<view class="orderDetails">
				<view class="orderDetails-wrapper">
					<view class="orderDetails-subTitle">
						<text>订单号 {{ (detailsList.record || {}).memo }}</text>
						<view class="orderDetails-icon orderDetails-icon--copy" @click="$tools.copy((detailsList.record || {}).remark)">
							<image src="../../static/public/icon-copy-grey.png" mode="widthFix"></image>
						</view>
					</view>
					<view class="orderDetails-listBox">
						<view class="orderDetails-listBox__list">
							<view class="orderDetails-listBox__list-label">{{ isBuyer ? '卖家' : '买家' }}实名信息</view>
							<view class="orderDetails-listBox__list-data" @click="showPopup('phonePopup')">
								<text>{{ isBuyer ? (detailsList.sellInfo || {}).name : (detailsList.buyInfo || {}).name }}</text>
								<view class="orderDetails-icon orderDetails-icon--tel"><image src="../../static/public/icon-tel-blue.png" mode="widthFix"></image></view>
							</view>
						</view>
						<view class="orderDetails-listBox__list">
							<view class="orderDetails-listBox__list-label">总金额（CNY）</view>
							<view class="orderDetails-listBox__list-data">
								<text>{{ (detailsList.record || {}).money }}</text>
							</view>
						</view>
						<view class="orderDetails-listBox__list">
							<view class="orderDetails-listBox__list-label">数量</view>
							<view class="orderDetails-listBox__list-data">
								<text>{{ (detailsList.record || {}).quantity }}</text>
							</view>
						</view>
						<view class="orderDetails-listBox__list">
							<view class="orderDetails-listBox__list-label">单价（CNY）</view>
							<view class="orderDetails-listBox__list-data">
								<text>{{ (detailsList.record || {}).price }}</text>
							</view>
						</view>
						<view class="orderDetails-listBox__list">
							<view class="orderDetails-listBox__list-label">下单时间</view>
							<view class="orderDetails-listBox__list-data">
								<text>{{ (detailsList.record || {}).createTime }}</text>
							</view>
						</view>
					</view>
					<view class="v-block" v-if="(pageStatus == 1 && isBuyer) || (pageStatus == 2 && !isBuyer) || pageStatus == 3">
						<view class="orderDetails-subTitle">
							<text>{{ (detailsList.record || {}).type == 1 ? '收款' : '付款' }}信息</text>
						</view>
						<view class="orderDetails-payment" @click="startModal()" v-if="pageStatus != 2 && pageStatus != 3">
							<view class="orderDetails-payment__data">{{ selectPayment }}</view>
							<view class="orderDetails-payment__arrow"><image src="../../static/public/icon-arrow-right-grey.png" mode="widthFix" /></view>
						</view>
						<view class="orderDetails-payment" v-if="(!isBuyer && isPublishUser && pageStatus == 2) || pageStatus == 3">
							<view class="orderDetails-payment__data">{{ selectPayment }}</view>
							<view class="orderDetails-payment__arrow"><image src="../../static/public/icon-arrow-right-grey.png" mode="widthFix" /></view>
						</view>
						<view class="orderDetails-listBox">
							<view class="v-block" v-if="selectPaymentCurrency == 1">
								<view class="orderDetails-listBox__list">
									<view class="orderDetails-listBox__list-label">真实姓名</view>
									<view class="orderDetails-listBox__list-data">
										<text>{{ (detailsList.yhk || {}).name }}</text>
									</view>
								</view>
								<view class="orderDetails-listBox__list">
									<view class="orderDetails-listBox__list-label">银行卡号</view>
									<view class="orderDetails-listBox__list-data">
										<text>{{ (detailsList.yhk || {}).no }}</text>
									</view>
								</view>
							</view>
							<view class="v-block" v-if="selectPaymentCurrency == 2">
								<view class="orderDetails-listBox__list">
									<view class="orderDetails-listBox__list-label">支付宝姓名</view>
									<view class="orderDetails-listBox__list-data">
										<text>{{ (detailsList.zfb || {}).name }}</text>
										<view class="orderDetails-icon orderDetails-icon--copy" @click="$tools.copy((detailsList.zfb || {}).name)">
											<image src="../../static/public/icon-copy-grey.png" mode="widthFix"></image>
										</view>
									</view>
								</view>
								<view class="orderDetails-listBox__list">
									<view class="orderDetails-listBox__list-label">支付宝账号</view>
									<view class="orderDetails-listBox__list-data">
										<text>{{ (detailsList.zfb || {}).no }}</text>
										<view class="orderDetails-icon orderDetails-icon--copy" @click="$tools.copy((detailsList.zfb || {}).no)">
											<image src="../../static/public/icon-copy-grey.png" mode="widthFix"></image>
										</view>
									</view>
								</view>
								<view class="orderDetails-listBox__list">
									<view class="orderDetails-listBox__list-label">支付宝{{ (detailsList.record || {}).type == 1 ? '收款' : '付款' }}码</view>
									<view class="orderDetails-listBox__list-data" @click="showPaymentPopup((detailsList.zfb || {}).pic)">
										<view class="orderDetails-icon orderDetails-icon--qrcord">
											<image src="../../static/public/icon-qrcode-black.png" mode="widthFix"></image>
										</view>
									</view>
								</view>
							</view>
							<view class="v-block" v-if="selectPaymentCurrency == 3">
								<view class="orderDetails-listBox__list">
									<view class="orderDetails-listBox__list-label">微信姓名</view>
									<view class="orderDetails-listBox__list-data">
										<text>{{ (detailsList.wx || {}).name }}</text>
										<view class="orderDetails-icon orderDetails-icon--copy" @click="$tools.copy((detailsList.wx || {}).name)">
											<image src="../../static/public/icon-copy-grey.png" mode="widthFix"></image>
										</view>
									</view>
								</view>
								<view class="orderDetails-listBox__list">
									<view class="orderDetails-listBox__list-label">微信账号</view>
									<view class="orderDetails-listBox__list-data">
										<text>{{ (detailsList.wx || {}).no }}</text>
										<view class="orderDetails-icon orderDetails-icon--copy" @click="$tools.copy((detailsList.wx || {}).no)">
											<image src="../../static/public/icon-copy-grey.png" mode="widthFix"></image>
										</view>
									</view>
								</view>
								<view class="orderDetails-listBox__list">
									<view class="orderDetails-listBox__list-label">微信{{ (detailsList.record || {}).type == 1 ? '收款' : '付款' }}码</view>
									<view class="orderDetails-listBox__list-data" @click="showPaymentPopup((detailsList.wx || {}).pic)">
										<view class="orderDetails-icon orderDetails-icon--qrcord">
											<image src="../../static/public/icon-qrcode-black.png" mode="widthFix"></image>
										</view>
									</view>
								</view>
							</view>
						</view>
					</view>
					<view class="orderDetails-tips" v-if="pageStatus == 1 && isBuyer">
						<view class="orderDetails-tips__title">交易提醒</view>
						<view class="orderDetails-tips__data">
							如果买家未向您转账付款，请务必在付款倒计时结束前点击“我要申诉”按钮，否则订单将自动确认{{
								(detailsList.record || {}).type == 0 ? '收款' : '付款'
							}}，财产可能损失
						</view>
					</view>

					<view class="orderDetails-tips" v-if="pageStatus == 3 && isBuyer">
						<view class="orderDetails-tips__title">交易提醒</view>
						<view class="orderDetails-tips__data">交易已完成，{{ (detailsList.record || {}).currencyName }}已发放至您的账户</view>
					</view>

					<view class="orderDetails-button">
						<!-- 买家支付-->
						<view class="orderDetails-button__btn orderDetails-button__btn--blue" @click="payOrder()" v-if="pageStatus == 1 && isBuyer">我已付款</view>

						<!-- 卖家审核-->
						<view class="orderDetails-button__btn orderDetails-button__btn--blue" @click="showPopup('confirmPopup')" v-if="pageStatus == 2 && !isBuyer">确认收款</view>

						<!-- 卖家确认接单 -->
						<view class="orderDetails-button__btn orderDetails-button__btn--blue" @click="enterOrder()" v-if="pageStatus == 0 && isPublishUser">确认接单</view>

						<!-- 卖家取消接单 -->
						<view class="orderDetails-button__btn orderDetails-button__btn--grey" @click="closeOrder()" v-if="pageStatus == 0">取消</view>

						<!-- 申诉 -->
						<view
							class="orderDetails-button__btn orderDetails-button__btn--grey"
							@click="$tools.jump('../transaction/transaction_order_appeal', recordId)"
							v-if="pageStatus == 2"
						>
							申诉
						</view>
					</view>
					<view class="orderDetails-link orderDetails-link--grey">
						<view class="orderDetails-link__text" v-if="pageStatus == 0 || (pageStatus == 1 && isBuyer)">{{ endTimeStr }}后自动取消</view>
						<!-- <view class="orderDetails-link__text" v-if="pageStatus != 0">{{ endTime }}s后自动取消</view> -->
						<!-- <view v-if="pageStatus == 2 && isBuyer">我要申诉</view> -->
					</view>
				</view>
			</view>
		</view>
		
		<uni-popup ref="phonePopup" type="center" :animation="true" @change="changePopup">
			<view class="popupBox">
				<view class="popupBox-wrapper">
					<view class="popupBox-content">
						<view class="popupBox-info">即将向该号码呼出</view>
						<view class="popupBox-data">{{ isBuyer ? (detailsList.sellInfo || {}).phone : (detailsList.buyInfo || {}).phone }}</view>
						<view class="popupBox-button">
							<view
								class="popupBox-button__btn popupBox-button__btn--blue"
								@click.stop="callPhoneFunc(isBuyer ? (detailsList.sellInfo || {}).phone : (detailsList.buyInfo || {}).phone)"
							>
								立即呼出
							</view>
						</view>
					</view>
				</view>
			</view>
		</uni-popup>
		
		<uni-popup ref="photoPopup" type="center" :animation="true" @change="changePopup">
			<view class="popupBox">
				<view class="popupBox-wrapper">
					<view class="popupBox-photo">
						<image :src="popupImg" mode="widthFix" id="cutImage"></image>
					</view>
				</view>
			</view>
		</uni-popup>
		
		<!-- 确定放币吗 -->
		<uni-popup ref="confirmPopup" type="center" :animation="true" @change="changePopup">
			<view class="confirmBox">
				<view class="confirmBox-wrapper">
					<view class="confirmBox-title">确认收款吗</view>
					<view class="confirmBox-buttonBox">
						<view class="confirmBox-buttonBox__btn confirmBox-buttonBox__btn--cancel" @click="hidePopup('confirmPopup')">取消</view>
						<view class="confirmBox-buttonBox__btn confirmBox-buttonBox__btn--confirm" @click="gatherOrder()">确定</view>
					</view>
				</view>
			</view>
		</uni-popup>

		<!-- 模态框 -->
		<view class="modalBox">
			<view class="modalBox-mask" v-show="modelShow" @click="closeModal()" @touchmove.stop.prevent></view>
			<view class="modalBox-wrapper" :animation="animationData" id="modalBox">
				<view class="modalBox-title">选择支付方式</view>
				<view class="modalBox-listBox">
					<view
						class="modalBox-listBox__list"
						:class="{ 'modalBox-listBox__list--active': item.payType == selectPaymentCurrency }"
						v-for="(item, index) in paymentList"
						:key="index"
						@click="selectCurrency(index)"
					>
						{{ item.payTypeStr }}
					</view>
				</view>
			</view>
		</view>

		<!-- <view class="refreshBox">
			<view class="refreshBox-btn" @click="refresh()">
				<image src="../../static/assets/icon-currency-demo.png" mode="widthFix"></image>
			</view>
		</view> -->
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
			recordId: '',

			initHeaderTabsActive: 0,

			status: 0,
			statusList: ['待接单', '待支付', '待收款', '已完成', '已取消', '申诉中', '申诉成功', '申诉失败'],
			// 0待接单 1待支付 2待收款 3完成 4取消 5申诉 6申诉成功 7申诉失败
			phoneShow: false,
			paymentPopupShow: false,
			paymentId: '17646461787',

			detailsList: [],
			popupImg: '',

			isBuyer: true, //true为买家，false卖家
			pageStatus: 0,
			payType: 0,
			endTime: 0,
			endTimer: '',
			endTimeStr: '',
			endTimeOpen: false,
			isPublishUser: 0,
			userId: '',

			selectPayment: '',
			selectPaymentCurrency: 0,
			paymentList: [],

			animationData: {},
			modelShow: false,

			maskClass: {
				position: 'fixed',
				bottom: 0,
				top: 0,
				left: 0,
				right: 0,
				zIndex: 8,
				backgroundColor: 'rgba(0, 0, 0, 0.4)'
			},
			phoneMode: [],
			phoneTrans: false,
			currencyName:'',
		};
	},
	onLoad(hash) {
		var animation = uni.createAnimation({
			duration: 500,
			timingFunction: 'ease-in-out'
		});
		this.animation = animation;
		this.recordId = hash.value1;
		this.userId = uni.getStorageSync('userId');
	},
	onHide() {
		clearInterval(this.endTimer);
	},
	onShow() {
		this.init();

		this.countDownTime();
	},
	methods: {
		init() {
			this.getOrderDetails();
		},
		clearBack() {
			clearInterval(this.endTimer);
			this.$tools.back();
		},
		getOrderDetails() {
			let that = this;
			this.paymentList = [];
			this.$Ajax(
				'/front/otc/getRecord',
				{
					recordId: this.recordId
				},
				res => {
					console.log(JSON.stringify(res));
					if (res.code == 0) {
						this.detailsList = res.obj;
						this.isBuyer = this.detailsList.record.typeShow == 0;
						console.log("this.isBuyer",this.isBuyer);
						this.pageStatus = this.detailsList.record.status;
						// this.payType = this.detailsList.record.payType;
						this.endTime = res.obj.time;
						var minute = Number(((this.endTime / 60) % 60).toFixed(0));
						var second = this.endTime % 60;
						if (minute <= 0) {
							that.endTimeStr = second + '秒';
						} else {
							that.endTimeStr = minute + '分' + second + '秒';
						}
						console.log(this.endTime);
						this.endTimeOpen = true;
						console.log(this.userId);
						this.isBuyer = res.obj.record.buyUserId == this.userId;
						// this.isPublishUserID = res.obj.record.type == 1 ? res.obj.record.buyUserId : res.obj.record.sellUserId;
						this.isPublishUser = res.obj.order.userId == this.userId;
						if (res.obj.yhk) {
							console.log('进入');
							var data = res.obj.yhk;
							data.payTypeStr = '银联';
							this.paymentList.push(data);
						}
						if (res.obj.zfb) {
							var data = res.obj.zfb;
							data.payTypeStr = '支付宝';
							this.paymentList.push(data);
						}
						if (res.obj.wx) {
							var data = res.obj.wx;
							data.payTypeStr = '微信';
							this.paymentList.push(data);
						}
						this.selectPayment = this.paymentList[0].payTypeStr;
						this.selectPaymentCurrency = this.paymentList[0].payType;
						console.log(this.paymentList);
						// this.payType
						// this.paymentList =

						// this.popupImg = this.detailsList.payInfo.pic;
						// this.isPublishUser = this.detailsList.isPublishUser == 1;
						console.log('是否发布者: ' + this.isPublishUser + ' -- 是否买家: ' + this.isBuyer + ' -- 当前页面状态: ' + this.pageStatus);
					}
				}
			);
		},
		payOrder() {
			this.$Ajax(
				'/front/otc/pay',
				{
					recordId: this.recordId
				},
				res => {
					console.log(JSON.stringify(res));
					if (res.code == 0) {
						this.$tools.toast('请等待卖家审核收款');
						this.getOrderDetails();
					}
				}
			);
		},
		gatherOrder() {
			this.$Ajax(
				'/front/otc/gathering',
				{
					recordId: this.recordId
				},
				res => {
					console.log(JSON.stringify(res));
					if (res.code == 0) {
						this.$tools.toast('确定收款成功');
						this.hidePopup('confirmPopup');
						this.getOrderDetails();
					}
				}
			);
		},
		enterOrder() {
			this.$Ajax(
				'/front/otc/take',
				{
					recordId: this.recordId
				},
				res => {
					console.log(JSON.stringify(res));
					if (res.code == 0) {
						this.$tools.toast('确认成功');
						this.getOrderDetails();
					}
				}
			);
		},
		closeOrder() {
			this.$Ajax(
				'/front/otc/cancelRecord',
				{
					recordId: this.recordId
				},
				res => {
					console.log(JSON.stringify(res));
					if (res.code == 0) {
						this.$tools.toast('取消成功');
						this.getOrderDetails();
					}
				}
			);
		},
		callPhoneFunc(phone) {
			uni.makePhoneCall({
				phoneNumber: phone //仅为示例
			});
		},
		changePopup(e) {
			console.log('popup ' + e.type + ' 状态', e.show);
		},
		showPopup(e) {
			this.$refs[e].open();
		},
		hidePopup(e) {
			this.$refs[e].close();
		},
		showPaymentPopup(pic) {
			this.popupImg = pic;
			console.log(this.popupImg);
			this.showPopup('photoPopup');
		},
		hidePaymentPopup() {
			this.paymentPopupShow = false;
		},
		countDownTime() {
			let that = this;
			this.endTimer = setInterval(function() {
				that.endTime = that.endTime - 1;
				var minute = Number(((that.endTime / 60) % 60).toFixed(0));
				var second = that.endTime % 60;
				if (minute <= 0) {
					that.endTimeStr = second + '秒';
				} else {
					that.endTimeStr = minute + '分' + second + '秒';
				}
				if (that.endTime < 0) {
					clearInterval(that.endTimer);
					that.getOrderDetails();
				}
			}, 1000);
		},
		/* 模态框动画 */
		startModal(price, id) {
			this.aniSiderInTop();
			this.modelShow = true;
		},
		closeModal() {
			this.aniSiderInTopClose();
			this.modelShow = false;
		},
		aniSiderInTop() {
			this.animation.translateY(0).step();
			this.animationData = this.animation.export();
		},
		aniSiderInTopClose() {
			uni.createSelectorQuery()
				.select('#modalBox')
				.fields(
					{
						size: true
					},
					data => {
						var viewHeight = data.height;
						this.animation.translateY(viewHeight + 400).step();
						this.animationData = this.animation.export();
					}
				)
				.exec();
		},
		/* End */
		selectCurrency(index) {
			this.selectPayment = this.paymentList[index].payTypeStr;
			this.selectPaymentCurrency = this.paymentList[index].payType;
			this.closeModal();
		},
		refresh() {
			clearInterval(this.endtimer);
			this.init();
		}
	}
};
</script>

<style lang="scss" scoped>
.orderDetails {
	// background-color: #ffffff;
	padding: 0 30upx;
	// padding-bottom: 120upx;
	&-subTitle {
		@include flexLeft;
		padding: 30upx 0;
		font-size: 26upx;
		color: #101010;
		font-weight: bold;
		border-bottom: 2upx solid #f1f1f1;
	}

	&-listBox {
		font-size: 26upx;
		padding: 15upx 0;
		&__list {
			@include flexBetween;
			padding: 15upx 0;
			&-label {
				color: #999999;
			}
			&-data {
				color: #101010;
				@include flexRight;
			}
		}
	}

	&-icon {
		@include fullImage;
		width: 26upx;
		margin-left: 15upx;
	}

	&-tips {
		font-size: 22upx;
		padding: 60upx 0 30upx;
		&__title {
			color: #101010;
			margin-bottom: 10upx;
		}
		&__data {
			color: #999999;
		}
	}

	&-button {
		@include flexCenterColumn;
		// padding: 0 30upx;
		&__btn {
			flex: 1;
			padding: 20upx 0;
			border-radius: 10upx;
			color: #FFFFFF;
			width: 100%;
			font-size: 28upx;
			@include flexCenter;

			&:first-child {
				margin-top: 120upx;
			}

			& + .orderDetails-button__btn {
				margin-top: 30upx;
			}

			&--green {
				background-color: $globalColor-green;
			}

			&--blue {
				background-color: $globalColor-blue;
			}

			&--grey {
				background-color: #f9f9f9;
				color: #333333;
			}
		}
	}

	&-link {
		color: #cccccc;
		font-size: 32upx;
		padding: 15upx 0;
		text-align: center;
	}

	&-payment {
		@include flexBetween;
		font-size: 28upx;
		color: #101010;
		padding: 15upx 0;
		&__arrow {
			width: 14upx;
			@include fullImage;
		}
	}
}

[v-cloak] {
	display: none;
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

.refreshBox {
	position: fixed;
	bottom: 30upx;
	right: 30upx;
	&-btn {
		width: 100upx;
		height: 100upx;
		@include fullImage;
	}
}


.popupBox {
	
	&-content{
		padding: 60upx 120upx;
		background-color: #ffffff;
		border-radius: 10upx;
		text-align: center;
	}

	&-info {
		font-size: 24upx;
		color: #333333;
		margin-bottom: 15upx;
	}

	&-data {
		font-size: 54upx;
		color: #333333;
		margin-bottom: 15upx;
	}
	
	&-photo{
		width: 600upx;
		@include fullImage;
	}

	&-button {
		@include flexCenter;
		// padding: 0 30upx;
		&__btn {
			flex: 1;
			padding: 15upx 0;
			border-radius: 10upx;
			color: #ffffff;
			font-size: 24upx;
			
			@include flexCenter;

			&--blue {
				background-color: $globalColor-blue;
			}
		}
	}
}


// 中间弹出模块样式
.confirmBox {
	&-wrapper {
		border-radius: 15upx;
		padding: 60upx 30upx 30upx;
		background-color: #FFFFFF;
		width: 600upx;
	}

	&-title {
		font-size: 32upx;
		color: #101010;
		font-weight: bold;
		margin-bottom: 30upx;
		text-align: center;
	}

	&-buttonBox {
		@include flexCenter;
		@include calcMargin(15);
		&__btn {
			@include flexCenter;
			flex: 1;
			color: #99999d;
			background-color: #eef1f6;
			padding: 15upx 0;
			border-radius: 15upx;
			font-size: 32upx;
			margin: 15upx;

			&--cancel {
				// border: 1upx solid $globalColor-blue;
				color: #101010;
			}

			&--confirm {
				background-color: $globalColor-blue;
				border: 1upx solid $globalColor-blue;
				color: #ffffff;
			}
		}
	}
}
</style>
