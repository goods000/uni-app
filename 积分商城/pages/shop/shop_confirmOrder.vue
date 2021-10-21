<template>
	<view class="pages bg_header">
		<view class="initHeader initHeader--fixed initHeader--line initHeader--white">
			<view class="initHeader-wrapper">
				<view class="initHeader-back" @click="$tools.back(1)"></view>
				<view class="initHeader-title">提交订单</view>
			</view>
		</view>

		<view class="main">
			<view class="addressBox">
				<view class="addressBox-wrapper" @click="$tools.jump('../address/address',1)">
					<view class="addressBox-noAddress" v-if="addressInfo.length == 0">暂无地址，请前往添加</view>
					<view class="addressBox-list" v-else>
						<view class="addressBox-list__top">
							<view class="addressBox-list__content">
								<view class="addressBox-list__area">{{ addressInfo[0].provinceName + addressInfo[0].cityName + addressInfo[0].countyName }}</view>
								<view class="addressBox-list__address">{{ addressInfo[0].detailAddress }}</view>
							</view>
						</view>
						<view class="addressBox-list__bottom">
							<view class="addressBox-list__item">
								<view class="addressBox-list__item-label"></view>
								<view class="addressBox-list__item-data">{{ addressInfo[0].name }}</view>
							</view>
							<view class="addressBox-list__item">
								<view class="addressBox-list__item-label"></view>
								<view class="addressBox-list__item-data">{{ addressInfo[0].tel }}</view>
							</view>
						</view>
					</view>
				</view>
			</view>

			<view class="listBox">
				<view class="listBox-wrapper">
					<!-- <view class="initNoData" v-if="orderList.length == 0">暂无数据</view>
					<view class="listBox-list" v-for="(item, index) in orderList" :key="index" v-else> -->
					<view class="listBox-list">
						<view class="listBox-list-image">
							<image :src="titelPic" mode=""></image>
						</view>
						<view class="listBox-list-news">
							<view class="listBox-list-title">{{ name }}</view>
							<view class="listBox-list-tips"><text>赠送</text>等价值的{{cnyToTPD | number(2)}}CLQ积分</view>
							<view class="listBox-list-txt">价格:</view>
							<view class="listBox-list-operate">
								<view class="operate-wrapper">
									<view class="operate-wrapper-price">{{ cost }}<text>{{ type == 0 ? 'CNY' : 'USDT' }}</text></view>
								</view>
								<view class="operate-wrapper__operate">
									<view class="operate-wrapper__operate--minus" @click="minusBtn()"></view>
									<view class="operate-wrapper__operate-quantity">{{ quantity }}</view>
									<view class="operate-wrapper__operate--plus" @click="plusBtn()"></view>
								</view>
							</view>
						</view>
					</view>
					<view class="listBox-wrapper__border">
						<view class="listBox-wrapper__title">购买方式</view>
						<view class="listBox-wrapper__title">{{ type == 0 ? 'CNY' : 'USDT' }}购买</view>
					</view>
					<view class="listBox-wrapper__border">
						<view class="listBox-wrapper__title">配送方式</view>
						<view class="listBox-wrapper__title">快递 包邮</view>
					</view>
					<view class="listBox-wrapper__border">
						<view class="listBox-wrapper__title">需支付</view>
						<view class="listBox-wrapper__title active">{{cost*quantity | number(2)}} {{ type == 0 ? 'CNY' : 'USDT' }}</view>
					</view>
				</view>
			</view>
			<view class="submitBox">
				<view class="submitBox-wrapper">
					<view class="submitBox-content">
						<view class="submitBox-total">合计:</view>
						<view class="submitBox-price">{{cost*quantity | number(2)}} <text>{{ type == 0 ? 'CNY' : 'USDT' }}</text></view>
					</view>
					<view class="submitBox-button" @click="openPopup('tradePswPopup')"><view class="submitBox-button__btn">提交订单</view></view>
				</view>
			</view>
		</view>

		<!-- 交易密码验证 -->
		<uni-popup ref="tradePswPopup" type="center" :animation="true" @change="changePopup">
			<view class="oppupBox">
				<view class="oppupBox-header">
					<view class="oppupBox-header-title">提交订单</view>
					<view class="oppupBox-header-right">
						<image src="../../static/shop/icon-shop-close.png" mode="widthFix" @click="hidePopup('tradePswPopup')"></image>
					</view>
				</view>
				<view class="oppupBox-wrapper">
					<view class="oppupBox-ways">
						<view class="oppupBox-ways-title">合计<text v-if="type != 0">(USDT)</text></view>
						<view class="oppupBox-ways-price"><text v-if="type == 0">￥</text>{{cost*quantity}}</view>
						<view class="oppupBox-ways-choice" v-if="type == 1">
							<input type="password" placeholder="请输入交易密码" class="oppupBox-ways-input" v-model="tradePwd"/>
						</view>
						<view class="oppupBox-ways-choice" v-if="type == 0">
							<image src="../../static/shop/wechat.png" mode="widthFix" class="oppupBox-ways-image"></image>
							<text class="oppupBox-ways-titleWays">微信支付</text>
						</view>
					</view>
				</view>
				<view class="initBtn" v-if="type != 0" @click="submitOrder()">确认支付</view>
				<view class="initBtn" v-else @click="payOrder()">确认支付</view>
			</view>
		</uni-popup>

		<!-- 支付方式选择 -->
		<!-- <w-picker :visible.sync="paymentVisible" mode="selector" ref="paymentPicker" :options="paymentArray" @confirm="onPickerConfirm($event, 'paymentPicker')"></w-picker> -->
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
			addressInfo: [
				// {provinceName:'广东省',cityName:'深圳市',countyName:'龙华区',detailAddress:'民治街道民泰社区龙华大道2号14楼14-3C',name:'小飞飞',tel:'188 **** 888'},
				],
			orderList: [
				// {productPic:'../../static/shop/icon-shop-01.png',productName:'凯撒专柜正品 新款女装 纯色方领 桑蚕丝上衣 真丝衬衫',price:'100',total:'2',tips:'购买赠送等价值的400TPD积分'},
			],
			orderId: 0,
			tradePwd: '',
			single: '',
			total: 0,
			count: 1,
			addressId: 0,
			shopDetailList: [],
			id: '',
			quota: '',
			trainPassword: '',
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
			quantity: 1,
			addobj: {},
			// 商品下单参数
			goodsId: '',
			nums: '',
			orderType: 0, // 0积分 1代金券
			paymentVisible: false,
			paymentLabel: '',
			paymentVal: null,
			paymentArray: [
				{
					label: 'SLA支付',
					value: 1
				}
			]
		};
	},
	onLoad(hash) {
		this.orderId = hash.value1;
		this.type = hash.value2;
		this.titelPic = hash.value3;
		this.cost = hash.value4;
		this.name = hash.value5;
		this.quantity = hash.value6;
		this.cnyToTPD = hash.value7;
		this.inventory = hash.value8;
	},
	onShow() {
		this.paymentLabel = this.paymentArray[0].label;
		this.paymentVal = this.paymentArray[0].value;
		this.init();
	},
	methods: {
		init() {
			this.addressuId = uni.getStorageSync('addressuId');
			console.log("this.addressuId：",this.addressuId);
			if (this.addressuId == '' || this.addressuId == undefined || this.addressuId == null) {
				this.getDefaultAddress();
			}else{
				this.getAddressInfo();
			}
		},
		// 获取地址
		getDefaultAddress() {
			this.$Ajax('/front/address/getUserAddressList', {}, res => {
				if (res.code == 0) {
					this.addressInfo = res.obj.filter(item => {
						return item.defaultFlag == 1;
					});
					console.log(JSON.stringify(this.addressInfo));
				}
			});
		},
		// 获取选择的地址
		getAddressInfo(){
			this.$Ajax(
				'/front/address/getUserAddressDetail',
				{
					userAddressId: this.addressuId
				},
				res => {
					console.log('地址详情：' + JSON.stringify(res));
					if (res.code == 0) {
						// this.addressInfo.push(res.obj);
						this.$set(this.addressInfo,0, res.obj);
						console.log(JSON.stringify(this.addressInfo));
					}
				}
			);
		},
		// 下单购买商品
		submitOrder() {
			if (this.addressInfo.length == 0) {
				return this.$tools.toast('请先选择收获地址');
			}
			if (this.tradePwd == '') {
				return this.$tools.toast('请输入交易密码');
			}
			this.$Ajax('/front/order/submitOrder',{
					type: this.type,
					productId: this.orderId,
					num: this.quantity,
					addressId: this.addressInfo[0].id,
					tradePwd: this.tradePwd,
				},
				res => {
					if (res.code == 0) {
						this.hidePopup('tradePswPopup');
						uni.removeStorageSync('addressuId');
						this.tradePwd = '';
						this.$tools.toastJump('购买成功','../order/order');
					}
				}
			);
		},
		// 人民币购买，跳转微信
		payOrder() {
			// uni.removeStorageSync('addressuId');
			// this.$tools.toast('暂未开放');
			if (this.addressInfo.length == 0) {
				return this.$tools.toast('请先选择收获地址');
			}
			this.$Ajax('/front/order/submitOrder',{
					type: this.type,
					productId: this.orderId,
					num: this.quantity,
					addressId: this.addressInfo[0].id,
					tradePwd: this.tradePwd,
				},
				res => {
					if (res.code == 0) {
						console.log(res.obj.wxurl);
						let url = res.obj.wxurl;
						this.hidePopup('tradePswPopup');
						plus.webview.create(url, 'test', {additionalHttpHeaders:{Referer:'https://szmixu.com'}});
						// setTimeout(() => {
						// 	uni.removeStorageSync('addressuId');
						// 	this.$tools.jump('../order/order');
						// }, 3000)
						
						// uni.setStorageSync('alipay',res.obj.wxurl);
						// this.$tools.jump('./alipay');
					}
				}
			);
		},
		minusBtn() {
			if (this.quantity > 1) {
				this.quantity--;
			}
		},
		plusBtn() {
			if(this.inventory == this.quantity){
				this.$tools.toast('库存达到最大数量');
				this.quantity = this.inventory;
			}else{
				this.quantity++;
			}
		},

		/* 弹出框公用 */
		openPopup(e) {
			this.$refs[e].open();
		},
		hidePopup(e) {
			this.$refs[e].close();
		},
		changePopup(e) {
			console.log('popup ' + e.type + ' 状态', e.show);
			if (!e.show) {
				this.tradepwd = '';
			}
		},

		/* 底部选项卡公用 */
		onPickerConfirm(res, type) {
			console.log('当前控制的Picker是：' + type + ';当前值是' + res.obj.value);

			if (type == 'paymentPicker') {
				this.paymentLabel = res.obj.label;
				this.paymentVal = res.obj.value;
			}
		}
	}
};
</script>

<style lang="scss" scoped>
@import '@/common/scss/pages/shop/shop_confirmOrder';
</style>
