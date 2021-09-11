<template>
	<view class="pages">
		<view class="header_bar header_bg header_border header_fixed">
			<view class="header">
				<view class="header-wrapper">
					<view class="header-item" :class="{'header-item--active' : tabsActive == 0}" @click="changeTabs(0)">我要收取</view>
					<view class="header-item" :class="{'header-item--active' : tabsActive == 1}" @click="changeTabs(1)">我要提供</view>
				</view>
				<view class="header-right" @click="$tools.jump('./exchangeRecord')">
					<image src="../../static/public/icon-records.png" mode="widthFix"></image>
				</view>
			</view>
		</view> 
		
		<view class="exchange">
			<view class="exchange-wrapper">
				<view class="initNoData" v-if="orderList.length == 0"></view>
				<view class="exchange-list" v-for="(item,index) in orderList" :key="index">
				<!-- <view class="exchange-list"> -->
					<view class="exchange-list__header">
						<view class="exchange-list__header-news">
							<image :src="item.pic" mode="" class="exchange-list__header-image"></image>
							<view class="exchange-list__header-box">
								<view class="exchange-list__header-title">{{ item.userName }}</view>
								<view class="exchange-list__header-tips">成交 {{ item.success }} 笔<text></text>交易上限 {{ item.max }}{{item.currencyName}}</view>
							</view>
						</view>
						<view class="exchange-list__header-time">{{item.createTime}}</view>
					</view>
					<view class="exchange-list__operate">
						<view class="exchange-list__operate-item">
							<view class="exchange-list__operate-title">剩余数量({{item.currencyName}})</view>
							<view class="exchange-list__operate-num">{{ item.quantity - item.tradeQuantity  | number(2) }}</view>
						</view>
						<view class="exchange-list__operate-item">
							<view class="exchange-list__operate-title">支付方式</view>
							<view class="exchange-list__operate-ways">
								<image src="../../static/public/icon-bank-show.png" mode="widthFix" v-show="item.yhk == 1"></image>
								<image src="../../static/public/icon-alipay-show.png" mode="widthFix" v-show="item.zfb == 1"></image>
								<image src="../../static/public/icon-wechat-show.png" mode="widthFix" v-show="item.wx == 1"></image>
							</view>
						</view>
						<view class="exchange-list__operate-item">
							<view class="exchange-list__operate-unit">单价</view>
							<view class="exchange-list__operate-price">￥{{ item.price | number(2) }}</view>
							<view class="exchange-list__operate-btn" @click="startModal(item.type, item.price, item.id, item.currencyName, item.yhk, item.zfb, item.wx)">{{tabsActive == 0 ? '收取' : '提供'}}</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		
		<!-- 购买出售弹框 -->
		<uni-popup ref="buyPopup" type="bottom" :animation="true">
			<view class="initPopup">
				<view class="initBox">
					<view class="initTilte">
						<view class="initTilte-title">{{tabsActive == 0 ? '收取' : '提供'}}</view><view class="initTilte-tips">{{modalValue.currencyName}}</view>
						<view class="initTilte-close" @click="colsePopup()">
							<image src="../../static/public/icon-close.png" mode="widthFix"></image>
						</view>
					</view>
					<view class="initBox-priceBox">
						<view class="initBox-priceBox__price">
							单价：<text>{{ modalValue.price  }}CNY/1{{modalValue.currencyName}}</text>
						</view>
						<view class="initBox-priceBox__ways">
							<image src="../../static/public/icon-bank-show.png" mode="widthFix" v-show="modalValue.yhk == 1"></image>
							<image src="../../static/public/icon-alipay-show.png" mode="widthFix" v-show="modalValue.zfb == 1"></image>
							<image src="../../static/public/icon-wechat-show.png" mode="widthFix" v-show="modalValue.wx == 1"></image>
						</view>
					</view>
					<view class="initBox-inputItem">
						<view class="safety-list">
							<view class="safety-list-title">{{tabsActive == 0 ? '收取' : '提供'}}数量</view>
							<view class="safety-list-input">
								<input type="text" :placeholder="'请输入'+ (tabsActive == 0 ? '收取' : '提供') +'数量'" placeholder-style="color:#999999" v-model="num" />
								<view class="safety-list-input__fixedBox">{{modalValue.currencyName}}</view>
							</view>
							<view class="initBox-inputItem__balance" v-if="tabsActive == 1">
								<view class="initBox-inputItem__balance-title">*可用数量：</view>
								<view class="initBox-inputItem__balance-title">{{ asset.using | number(4) }}</view>
							</view>
						</view>
						<view class="initBox-inputItem__item" v-if="tabsActive == 0">
							<view class="initBox-inputItem__item-title">支付总额</view>
							<view class="initBox-inputItem__item-style">{{ orderCoin | number(2) }}CNY</view>
						</view>
						<view class="initBox-inputItem__item" v-if="tabsActive == 1">
							<view class="initBox-inputItem__item-title">折合</view>
							<view class="initBox-inputItem__item-style">{{ orderCNY | number(2) }}CNY</view>
						</view>
					</view>
					
					<view class="initBtn" @click="submit()">{{tabsActive == 0 ? '收取' : '提供'}}</view>
					
				</view>
			</view>
		</uni-popup>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				tabsActive: 0,
				// 页数
				pageSize: 20,
				pageNum: 1,
				pages: 0,
				orderList: [],
				tabTitle: 0,
				num:'',
				otcTradeId:'',
				modalValue: [],
				exchangePrice:'',
				orderCoin:'---',
				orderCNY:'---',
				asset:{},
				nextActive:'',
				// status_2:0,
				// status_3:0,
			}
		},
		onReachBottom() {
			if (this.pageNum >= this.pages) {
				return this.$tools.toast('到底啦');
			} else {
				this.pageNum++;
				this.getOrderList();
			}
		},
		onShow() {
			this.tabsActive = 0;
			this.orderList = [];
			this.getOTCList();
		},
		watch: {
			num(newValue, oldValue) {
				console.log(newValue);
				if(newValue == ''){
					this.orderCoin = '---';
					this.orderCNY = '---';
					return
				}
				if(this.tabsActive == 0){
					this.orderCoin = newValue * this.modalValue.price;
					this.orderCNY = newValue;
				}else if(this.tabsActive == 1){
					this.orderCoin = newValue;
					this.orderCNY = newValue * this.modalValue.price;
				}
			},
		},
		methods:{
			getOTCList() {
				// this.otcTradeId = 1;
				// this.getOrderList();
				// this.getassetsByCurrency();
				// 获取数据
				this.$Ajax('/front/otc/init', {}, res => {
					if (res.code == 0) {
						this.currencyId = res.obj[0].currencyId;
						this.otcTradeId = res.obj[0].id;
						this.exchangePrice = res.obj[0].otcPrice;
						this.getOrderList();
						this.getassetsByCurrency();
					}
				});
			},
			getOrderList() {
				uni.showLoading({
					title: '列表拉取中',
					mask: true
				});
				this.$Ajax('/front/otc/getOrderList', {
						configId: this.otcTradeId,
						sort: this.tabsActive == 0 ? 1 : 0,
						type: this.tabsActive,
						pageNum: this.pageNum,
						pageSize: this.pageSize
					},
					res => {
						if (res.code == 0) {
							this.pages = res.obj.pageInfo.pages;
							this.orderList = res.obj.pageInfo.list;
							uni.hideLoading();
						}
					}
				);
			},
			submit(){
				if(this.nextActive == 0){
					return this.$tools.toast('请先绑定需要绑定的收款方式');
				}
				if (this.num == '') {
					return this.$tools.toast('请输入'+ (this.tabsActive == 0 ? '收取' : '提供') +'数量');
				}
				if (!/^[1-9]\d*$/.test(this.num)) {
					return this.$tools.toast('请输入整数数量');
				}
				let that = this;
				this.$Ajax('/front/otc/trade',{
						orderId: this.modalValue.id,
						quantity: this.num,
					},
					res => {
						console.log(JSON.stringify(res));
						if (res.code == 0) {
							this.$tools.toast(res.msg);
							this.hidePopup('buyPopup');
							this.num = '';
							this.$tools.jump('./confirmOrder', res.obj);
						}
					}
				);
			},
			startModal(type, price, id, currencyName, yhk, zfb, wx) {
				let that = this;
				this.modalValue.type = type;
				this.modalValue.price = price;
				this.modalValue.id = id;
				this.modalValue.currencyName = currencyName;
				this.modalValue.yhk = yhk;
				this.modalValue.zfb = zfb;
				this.modalValue.wx = wx;
				console.log(this.modalValue);
				this.getPayList(); // 支付方式
				this.$forceUpdate();
				this.openPopup('buyPopup');
			},
			// 获取指定资产
			getassetsByCurrency() {
				this.$Ajax('/front/financial/assetsByCurrency', {
					assetType:1,
					currencyId: this.currencyId,
				}, res => {
					if (res.code == 0) {
						this.asset = res.obj.wallet;
					}
				});
			},
			changeTabs(index){
				if(this.tabsActive != index){
					this.tabsActive = index;
					this.orderList = [];
					this.pageNum = 1;
					this.getOrderList();
				}
			},
			getPayList() {
				let that = this;
				this.$Ajax('/front/user/getPayList', {}, res => {
					if (res.code == 0) {
						that.PayList = res.obj;
						if(that.PayList != null || that.PayList != undefined || that.PayList != ''){
							that.PayList.forEach((item,index) => {
								if(item.payType == 1 && that.modalValue.yhk == 1){
									that.nextActive = 1;
								}else if(item.payType == 2 && that.modalValue.zfb == 1){
									that.nextActive = 1;
								}else if(item.payType == 3 && that.modalValue.wx == 1){
									that.nextActive = 1;
								}
								console.log("item.nextActive",that.nextActive);
							})
						}else{
							that.nextActive = 0;
							console.log("this.nextActive",that.nextActive);
						}
						// console.log("this.status_1：",this.status_1,"this.status_2：",this.status_2,"this.status_3：",this.status_3);
						console.log("nextActive：",that.nextActive,that.modalValue.yhk,that.modalValue.zfb,that.modalValue.wx);
					}
				});
			},
			colsePopup(){
				this.hidePopup('buyPopup');
				this.num = '';
				uni.showTabBar();
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
	@import '/scss/exchange';
	@import '../safety/scss/safety';
</style>
