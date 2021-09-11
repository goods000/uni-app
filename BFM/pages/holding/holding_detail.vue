<template>
	<view class="pages">
		<view class="initHeader initHeader--white">
			<view class="initHeader-wrapper">
				<view class="initHeader-back" @click="$tools.back(1)"></view>
				<view class="initHeader-title">生息详情</view>
			</view>
		</view>
		
		<view class="bgBox"><image src="../../static/holding/img-bg-style-02.jpg" mode="widthFix"></image></view>
		
		<view class="orderBox">
			<view class="orderBox-wrapper">
				<view class="orderBox-info">
					<view class="orderBox-info__label">持币总量(BK)</view>
					<view class="orderBox-info__data">1054.3724</view>
				</view>
				<view class="orderBox-itemBox">
					<view class="orderBox-itemBox__item">
						<view class="orderBox-itemBox__item-label">累计收益(BK)</view>
						<view class="orderBox-itemBox__item-data">1000</view>
					</view>
					<view class="orderBox-itemBox__item">
						<view class="orderBox-itemBox__item-label">存入数量(BK)</view>
						<view class="orderBox-itemBox__item-data">1000</view>
					</view>
				</view>
			</view>
		</view>
		<view class="listBox">
			<view class="listBox-wrapper">
				<view class="listBox-list">
					<view class="listBox-list__label">存入数量</view>
					<view class="listBox-list__data">1000 BK</view>
				</view>
				<view class="listBox-list">
					<view class="listBox-list__label">存入时间</view>
					<view class="listBox-list__data">2020-10-03 12:36:28</view>
				</view>
				<view class="listBox-list">
					<view class="listBox-list__label">产品类别</view>
					<view class="listBox-list__data">持币生息3天</view>
				</view>
				<view class="listBox-list">
					<view class="listBox-list__label">利率</view>
					<view class="listBox-list__data">60%</view>
				</view>
				<view class="listBox-list">
					<view class="listBox-list__label">投资期限</view>
					<view class="listBox-list__data">3天</view>
				</view>
				<view class="listBox-list">
					<view class="listBox-list__label">起息时间</view>
					<view class="listBox-list__data">2020-11.10 15:15</view>
				</view>
				<view class="listBox-list">
					<view class="listBox-list__label">回款时间</view>
					<view class="listBox-list__data">2020-11.10 15:15</view>
				</view>
			</view>
		</view>
		<!--  v-if="orderDetail.status == 0 || orderDetail.status == 1" -->
		<view class="initButton">
			<view class="initButton-btn initButton-btn--style" @click="openPopup('tradePopup')">取出</view>
		</view>
		
		<!-- 交易密码验证 -->
		<uni-popup ref="tradePopup" type="center" :animation="true" @change="changePopup">
			<view class="initPopup">
				<view class="initPopup-wrapper">
					<view class="initPopup-title">取出持币</view>
					<view class="initPopup-desc">持币提前退出将扣除已产生收益。</view>
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
						<view class="initPopup-buttonBox__btn initPopup-buttonBox__btn--confirm" @click="buyMiner()">确定</view>
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
			id: 0,
			orderDetail: [],
			statusList: ['产币中', '已到期', '已提现'],
			cost: 0,
			sixPsd: '',
			focusStatus: false,
			tradePwd: ''
		};
	},
	watch: {
		sixPsd() {
			if (this.sixPsd.length == 6) {
				this.takeOut();
			}
		}
	},
	onLoad(hash) {
		this.id = hash.value1;
	},
	onShow() {
		// this.init();
	},
	methods: {
		init() {
			this.getOrderDetail();
		},
		// 挖矿更多详情
		getOrderDetail() {
			this.$Ajax(
				'/front/investment/orderDetail',
				{
					id: this.id
				},
				res => {
					console.log('orderDetail' + JSON.stringify(res));
					if (res.code == 0) {
						this.orderDetail = res.obj;
					}
				}
			);
		},
		checkStatus() {
			this.$Ajax(
				'/front/investment/checkCashOutStatus',
				{
					id: this.id
				},
				res => {
					console.log('当前订单状态' + JSON.stringify(res));
					this.cost = res.obj.cost;
					this.openPopup('keyboardPopup');
				}
			);
		},
		takeOut() {
			this.$Ajax(
				'/front/investment/cashOut',
				{
					id: this.id,
					trainPassword: this.sixPsd
				},
				res => {
					if (res.code == 0) {
						this.$tools.toast('提现成功');
						this.hidePopup('keyboardPopup');
						this.sixPsd = '';
						this.getOrderDetail();
					}
				}
			);
		},
		openPopup(e) {
			this.$refs[e].open();
		},
		hidePopup(e) {
			this.$refs[e].close();
		},
		changePopup(e) {
			console.log('popup ' + e.type + ' 状态', e.show);
			if (!e.show) {
				// this.tradePwd = '';
			}
		}
	}
};
</script>

<style lang="scss" scoped>
.bgBox {
	width: 100%;
	overflow: hidden;
	height: 100%;
	position: absolute;
	left: 0;
	top: 0;
	z-index: 0;
	@include fullImage;
}	
	
.orderBox {
	position: relative;
	z-index: 1;
	padding: 0 30upx;
	margin-bottom: 30upx;
	&-wrapper {
		background-color: #142224;
		padding: 60upx 0;
		border-radius: 15upx;
	}

	&-info {
		// @include flexCenter;
		margin-bottom: 60upx;
		text-align: center;
		&__label {
			color: #ffffff;
			font-size: 28upx;
			margin-bottom: 15upx;
		}

		&__data {
			color: $globalColor-style;
			font-size: 56upx;
			font-weight: bold;
		}
	}

	&-itemBox {
		@include flexCenter;
		&__item {
			@include flexCenterColumn;
			flex: 1;
			
			&-label {
				color: #666666;
				font-size: 24upx;
				margin-bottom: 15upx;
			}
			
			&-data {
				font-size: 36upx;
				color: #FFFFFF;
				font-weight: bold;
			}
		}
	}
}

.listBox {
	padding: 0 30upx;
	position: relative;
	z-index: 1;
	&-wrapper {
		background-color: #142224;
		padding: 30upx 0;
		border-radius: 15upx;
	}
	&-list {
		@include flexBetween;
		padding: 30upx;
		&__label {
			font-size: 28upx;
			color: #999999;
		}
		&__data {
			font-size: 28rpx;
			color: #ffffff;
		}
	}
}

.initButton {
	padding: 0 30upx;
	margin-top: 60upx;
	position: relative;
	z-index: 1;
}
</style>
