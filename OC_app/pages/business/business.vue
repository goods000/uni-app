<template>
	<view class="pages">
		<view class="">

			<view class="header_bar header_bg header_border">
				<view class="header">
					<view class="header-back" @click="$tools.back(1)"></view>
					<view class="header-title">OTC</view>
				</view>
			</view>

			<view class="business">
				<view class="business-type">
					<picker @change="bindPickerChange" :value="index" :range="array" range-key="name" class="business-type-picker">
						<view class="uni-input">{{array[index].name}}</view>
					</picker>

					<view class="business-icon">
						<image src="../../static/business/icon-business-apply.png" mode="widthFix" @click="$tools.jump('../business/businessApply')"></image>
						<image src="../../static/business/icon-business-01.png" mode="widthFix" @click="$tools.jump('../business/release')"></image>
						<image src="../../static/business/icon-business-order.png" mode="widthFix" @click="$tools.jump('../business/businessRecord')"></image>
					</view>
				</view>

				<view class="initNoData" v-if="orderList.length == 0">暂无数据</view>
				<view class="business-list" v-for="(item, index) in orderList" :key="index" v-else>
					<view class="business-list-box">
						<view class="business-list-box-header">
							<view class="business-list-box-header-left">
								<image src="../../static/operate/logo.png" mode="widthFix"></image>
								<!-- <image :src="item.pic" mode="widthFix"></image> -->
								<view class="business-list-box-header-left--name">{{ item.userName }}</view>
							</view>
							<view class="business-list-box-header-left--tips">成交率 {{ item.success }} / 成交率 99%</view>
						</view>
						<view class="business-list-box__item">
							<view class="business-list-box__item-info">
								<view class="business-list-box__item-info--data">数量 : {{ item.quantity - item.tradeQuantity }}
									{{item.currencyName}}</view>
								<view class="business-list-box__item-info--data">限额 : ￥{{ item.min }} - {{ item.max }}</view>
							</view>
							<view class="business-list-box__item-info">
								<view class="business-list-box__item-info--txt">单价</view>
								<view class="business-list-box__item-info--price">￥{{ item.price }}</view>
							</view>
						</view>
						<view class="business-list-box__payment">
							<view class="business-list-box__payment--pay">
								<image src="../../static/payment/icon-payment-bank.png" mode="widthFix" v-show="item.yhk == 1"></image>
								<image src="../../static/payment/icon-payment-alipay.png" mode="widthFix" v-show="item.zfb == 1"></image>
								<image src="../../static/payment/icon-payment-weChat.png" mode="widthFix" v-show="item.wx == 1"></image>
							</view>
							<view class="business-list-box__payment--btn" v-if="selectType == 0" @click="startModal(item.type, item.quantity, item.price, item.min, item.max, item.id, item.currencyName)">购买</view>
							<view class="business-list-box__payment--btn" v-if="selectType == 1" @click="startModal(item.type, item.quantity, item.price, item.min, item.max, item.id, item.currencyName)">出售</view>
						</view>
					</view>
				</view>

			</view>


			<!-- 弹出层 -->
			<uni-popup ref="buyPopup" type="bottom" :animation="true">
				<view class="oppupBox">
					<view class="header_bar">
						<view class="header">
							<view class="header-left"><text>{{ selectType == 0 ? '购买' : '出售' }} {{modalValue.currencyName}}</text></view>
							<view class="header-right" @click="close()">
								<image src="../../static/public/icon-close.png" mode="widthFix"></image>
							</view>
						</view>
					</view>
					<view class="oppupBusiness-price">价格：{{ modalValue.price }}CNY/{{modalValue.currencyName}}</view>
					<view class="oppupBusiness_tabs">
						<view class="oppupBusiness_tabs-list">
							<view class="oppupBusiness_tabs-list-txt" :class="{ 'active': tabsActive == 0 }" @click="changeTabsActive(0)">按金额{{ selectType == 0 ? '购买' : '出售' }}</view>
							<view class="oppupBusiness_tabs-list-txt" :class="{ 'active': tabsActive == 1 }" @click="changeTabsActive(1)">按数量{{ selectType == 0 ? '购买' : '出售' }}</view>
						</view>
					</view>
					<!-- <view class="oppupBusiness-input">
						<input type="text" :placeholder="tabsActive == 0 ? '购买金额(CNY）' : '请输入购买数量'" :value="tabsActive == 0 ? needQuantity : needQuantity/modalValue.price"/>
						<view class="oppupBusiness-input-tips" @click="modalSelectAll()">全部</view>
					</view> -->

					<view class="oppupBusiness-input">
						<input type="text" :placeholder="tabsActive == 0 ? (selectType == 0 ? '购买' : '出售')+'金额(CNY)' : '请输入'+(selectType == 0 ? '购买' : '出售' )+'数量'"
						 v-model="needQuantity" />
						<view class="oppupBusiness-input-tips" @click="modalSelectAll()">全部</view>
					</view>
					<!-- <view class="oppupBusiness-input" v-show="tabsActive == 0">
						<input type="text" :placeholder="(selectType == 0 ? '购买' : '出售')+'金额(CNY)'" v-model="needQuantity" />
						<view class="oppupBusiness-input-tips" @click="modalSelectAll()">全部</view>
					</view>
					<view class="oppupBusiness-input" v-show="tabsActive == 1">
						<input type="text" :placeholder="'请输入'+(selectType == 0 ? '购买' : '出售' )+'数量'" v-model="newNeedQuantity" />
						<view class="oppupBusiness-input-tips" @click="modalSelectAllumn()">全部</view>
					</view> -->
					<view class="oppupBusiness-items">限额 {{ modalValue.min }} - {{ modalValue.max }} CNY</view>
					<view class="oppupBusiness-list">
						<view class="oppupBusiness-list-item">
							<view class="oppupBusiness-list-item__txt">交易数量</view>
							<view class="oppupBusiness-list-item__price">{{ orderAmount2Coin | number(4) }} {{modalValue.currencyName}}</view>
						</view>
						<view class="oppupBusiness-list-item">
							<view class="oppupBusiness-list-item__txt">实付款</view>
							<view class="oppupBusiness-list-item__price">{{ orderAmount2CNY | number(2) }} CNY</view>
						</view>
					</view>
					<view class="initBtn" @click="getTicket()">确定</view>
				</view>
			</uni-popup>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				title: 'picker',
				array: [{
					name: '我要买'
				}, {
					name: '我要卖'
				}],
				index: 0,
				selectType: 0,
				tabsActive: 0,
				pageTotal: 1,
				pageNum: 1,
				pageSize: 20,
				pages: 1,
				otcList: [],
				otcTradeId: 0,
				quantity: '',
				orderList: [
					// {id:1,type:0,pic:'../../static/operate/logo.png',otcName:'商家姓名',quantity:6000,tradeQuantity:2000,currencyName:4000,min:5,max:10,yhk:1,wx:1,zfb:1,success:'1452',price:'81.48'},
					// {id:2,type:1,pic:'../../static/operate/icon-success.png',otcName:'test',quantity:4000,tradeQuantity:2000,currencyName:4000,min:4.5,max:5.5,yhk:1,wx:1,zfb:0,success:'66',price:'999'},
					// {id:3,type:0,pic:'../../static/operate/icon-logo-title.png',otcName:'yayayya',quantity:500,tradeQuantity:200,currencyName:600,min:6,max:99,yhk:0,wx:1,zfb:1,success:'80',price:'100'},
				],
				modalValue: [],
				needQuantity: '',
				totalQuantity: 0,
				totalPrice: 0,

				orderAmount2Coin: '---',
				orderAmount2CNY: '---',

				newNeedQuantity: 0
			}
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
		onShow() {
			this.init();
		},
		watch: {
			// contNeedQuantity(val, newVal) {
			// 	this.newNeedQuantity = newVal;
			// },
			needQuantity(newValue, oldValue) {
				console.log(newValue);
				// orderAmount2Coin
				// orderAmount2CNY
				// 
				
				if(newValue == ''){
					this.orderAmount2Coin = '---';
					this.orderAmount2CNY = '---';
					return
				}

				if(this.tabsActive == 0){
					this.orderAmount2Coin = newValue / this.modalValue.price;
					this.orderAmount2CNY = newValue;
				}else if(this.tabsActive == 1){
					this.orderAmount2Coin = newValue;
					this.orderAmount2CNY = newValue * this.modalValue.price;
				}
				// this.orderAmount2Coin = newValue / this.modalValue.price;
			},
			// newNeedQuantity(newValue, oldValue){
			// 	// orderAmount2Coin
			// 	// orderAmount2CNY
			// 	this.orderAmount2Coin = newValue * this.modalValue.price;
			// },
			// totalQuantity() {
			// 	 return ()this.needQuantity/this.modalValue.price;
			// }
		},
		methods: {
			init() {
				this.getOTCList(this.selectType);
			},
			getOTCList() {
				// 获取数据
				this.$Ajax('/front/otc/init', {}, res => {
					if (res.code == 0) {
						console.log(JSON.stringify(res.obj));
						this.otcTradeId = res.obj[0].id;
						// this.otcList = res.obj;
						this.getOrderList(this.selectType);
					}
				});
			},
			getOrderList(type) {
				uni.showLoading({
					title: '列表拉取中',
					mask: true
				});
				this.$Ajax('/front/otc/getOrderList', {
						configId: this.otcTradeId,
						sort: this.selectType == 0 ? 1 : 0,
						// type: this.selectType,
						type: this.selectType,
						pageNum: this.pageNum,
						pageSize: this.pageSize
					},
					res => {
						// console.log(JSON.stringify(res));
						if (res.code == 0) {
							this.pages = res.obj.pageInfo.pages;
							this.orderList = res.obj.pageInfo.list;
							uni.hideLoading();
						}
					}
				);
			},
			bindPickerChange: function(e) {
				console.log('picker发送选择改变，携带值为：' + e.detail.value)
				this.index = e.detail.value
				this.selectType = this.index
				this.getOrderList(this.selectType);
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
				this.changeTabsActive(this.modalValue.type);
				this.tabsActive = 0;
				this.$forceUpdate();
				this.openPopup('buyPopup');
			},
			changeTabsActive(index) {
				if (this.tabsActive != index) {
					this.tabsActive = index;
					this.needQuantity = '';
					this.newNeedQuantity = '';
				}
			},
			modalSelectAll() {
				this.needQuantity = this.modalValue.max;
			},
			modalSelectAllumn() {
				this.needQuantity = this.modalValue.quantity;
			},
			getTicket() {
				if (this.needQuantity == '') {
					return this.$tools.toast(this.tabsActive == 0 ? '购买金额(CNY）' : '请输入购买数量');
				}
				if (this.orderAmount2CNY > this.modalValue.max) {
					return this.$tools.toast('输入数量不能大于限额');
				}
				if (this.orderAmount2CNY < this.modalValue.min) {
					return this.$tools.toast('输入数量不能小于限额');
				}
				console.log("this.needQuantity", this.needQuantity);
				this.$Ajax(
					'/front/otc/trade', {
						orderId: this.modalValue.id,
						// quantity: this.tabsActive == 0 ? this.needQuantity : this.orderAmount2CNY
						quantity: this.orderAmount2CNY,
					},
					res => {
						if (res.code == 0) {
							this.$tools.toast(res.msg);
							this.hidePopup('buyPopup');
							this.needQuantity = '';
							this.$tools.jump('../business/businessOrder', res.obj);
						}
					}
				);
			},
			close() {
				this.hidePopup('buyPopup');
				this.needQuantity = '';
				this.modalValue = []
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
				if (!e.show) {
					this.pay_password = '';
				}
			}
		},
		// computed: {
		// 	contNeedQuantity() {
		// 		return (this.needQuantity / this.modalValue.price);
		// 	},
		// },
		// computed: {
		//    if(this.tabsActive == 0){
		//    	needQuantity() {
		//    		this.totalPrice = this.needQuantity;
		//    	}
		//    }else{
		//    	needQuantity() {
		//    		this.totalQuantity = this.needQuantity * this.modalValue.price;
		//    	}
		//    }
		// }
	}
</script>

<style lang="scss" scoped>
	@import '@/common/scss/pages/business/business';
	@import '@/common/scss/pages/setting/setting';

	page {
		background: #FFFFFF;
	}

	.header-right {
		image {
			width: 29upx;
			height: 29upx;
		}
	}
</style>
