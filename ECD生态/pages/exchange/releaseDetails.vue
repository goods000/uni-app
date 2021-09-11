<template>
	<view class="pages">
		<view class="header_bar header_fixed header_bg">
			<view class="header">
				<view class="header-back" @click="$tools.back(1)"></view>
				<view class="header-title">交易详情</view>
			</view> 
		</view> 
		<view class="record">
			<view class="recordBox">
				<view class="recordBox-list">
					<view class="recordBox-list-header">
						<view class="recordBox-list-header-title">{{ order.typeStr == '买' ? '收取' : '提供' }}{{ order.currencyName }}</view>
						<view class="recordBox-list-header-price yellow">{{order.quantity}}{{order.currencyName}}</view>
					</view>
					<view class="recordBox-list-item">
						<view class="recordBox-list-item-title">单价</view>
						<view class="recordBox-list-item-status">{{order.price | number(2)}}CNY/{{order.quantity}}{{order.currencyName}}</view>
					</view>
					<view class="recordBox-list-item">
						<view class="recordBox-list-item-title">剩余数量</view>
						<view class="recordBox-list-item-status">{{order.residue}} {{order.currencyName}}</view>
					</view>
					<view class="recordBox-list-item">
						<view class="recordBox-list-item-title">发布时间</view>
						<view class="recordBox-list-item-status">{{order.createTime}}</view>
					</view>
					<!-- <view class="recordBox-list-item">
						<view class="recordBox-list-item-title">进行中的订单</view>
						<view class="recordBox-list-item-status">{{order.success}} 笔</view>
					</view> -->
					<view class="recordBox-list-item">
						<view class="recordBox-list-item-title">支付方式</view>
						<view class="recordBox-waysList">
							<image src="../../static/public/icon-bank-show.png" mode="widthFix" v-if="order.yhk == 1"></image>
							<image src="../../static/public/icon-alipay-show.png" mode="widthFix" v-if="order.zfb == 1"></image>
							<image src="../../static/public/icon-wechat-show.png" mode="widthFix" v-if="order.wx == 1"></image>
						</view>
					</view>
				</view>
			</view>
		</view>
		
		<view class="fixedBox">
			<view class="fixedBox-wrapper">
				<view class="initButton">
					<view class="initButton-btn initButton-btn--disable" v-if="order.cancel ==0">撤销{{ order.typeStr }}单</view>
					<view class="initButton-btn initButton-btn--style" v-else  @click="deleteOrder()">撤销{{ order.typeStr }}单</view>
				</view>
			</view>
		</view>
		
		<uni-popup ref="tipsPopup" type="center" :animation="true" @change="changePopup">
			<view class="initPopup">
				<view class="initPopup-wrapper">
					<view class="initPopup-headerTitle">注 意</view>
					<view class="initPopup-body">
						<view class="initPopup-listBox">
							<view class="initPopup-listBox__list">
								<view class="initPopup-listBox__list-title">撤销当前理财将会导致您损失部分收益</view>
								<view class="initPopup-listBox__list-title">确定撤销吗？</view>
							</view>
						</view>
					</view>
					<view class="initPopup-buttonBox">
						<view class="initPopup-buttonBox__btn initPopup-buttonBox__btn--cancel" @click="hidePopup('tipsPopup')">取消</view>
						<view class="initPopup-buttonBox__btn initPopup-buttonBox__btn--confirm">确定</view>
					</view>
				</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				// 页数
				pageSize: 20,
				pageNum: 1,
				pages: 0,
				selectType:'',
				order: {currency_id:1,currencyName:'CNDT 7天理财',createTime:'2122-2-23 23:23',quantity:12,statusStr:'EDD',num:'-452.332'}
				,
			}
		},
		onLoad(option) {
			this.orderId = option.value1;
		},
		onShow() {
			this.getToDetail();
		},
		methods:{
			getToDetail() {
				this.$Ajax('/front/otc/toDetail', {
					orderId: this.orderId,
				}, res => {
						if (res.code == 0) {
							this.order = res.obj.order;
						}
					}
				);
			},
			deleteOrder() {
				this.$Ajax('/front/otc/cancelOrder',{
						orderId: this.orderId
					},
					res => {
						if (res.code == 0) {
							this.$tools.toastBack('撤销成功',1);
						}
					}
				);
			},
			/* 弹出框公用 */
			openPopup(e, item) {
				this.popupInfo = item;
				this.$refs[e].open();
			},
			hidePopup(e) {
				this.$refs[e].close();
			},
			changePopup(e) {
				console.log('popup ' + e.type + ' 状态', e.show);
				if (e.show) {
					uni.hideTabBar();
				} else {
					uni.showTabBar();
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import '/scss/recordDetails';
	.yellow{
		color: $globalColor-style !important;
		font-weight: bold;
	}
	.record .recordBox-list-item{
		align-items: flex-start;
		.yellow{
			color: $globalColor-style;
			font-weight: bold;
		}
	}
</style>
