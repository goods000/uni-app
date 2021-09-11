<template>
	<view class="pages">
		<view class="header_bar header_fixed">
			<view class="header">
				<view class="header-goBack" @click="$tools.back(1)"></view>
				<view class="header-title">购买</view>
			</view> 
		</view> 
		
		<view class="productBuy">
			<view class="productBuy-image">
				<image src="../../static/product/product.png" mode="aspectFit"></image>
			</view>
			<view class="productBuyBox">
				<view class="productBuyBox-count">
					<image src="../../static/product/icon-product-reduce.png" mode="aspectFit" @click="reduce()"></image>
					<input type="text" v-model="num" />
					<image src="../../static/product/icon-product-plus.png" mode="aspectFit" @click="plus()"></image>
				</view>
				<view class="tipsBox">
					<view class="tipsBox-wrapper">
						<view class="tipsBox-title">
							<view class="tipsBox-title__label">{{ProductInfo.name}}</view>
							<view class="tipsBox-right-title"><text class="yellow">{{ProductInfo.singeMoney}}U</text>/份</view>
						</view>
					</view>
				</view>
				<view class="productBuyBox-list-data">
					<view class="productBuyBox-list-data-title">
						算力单价
					</view>
					<view class="productBuyBox-list-data-price">{{ProductInfo.singeTb}}TB</view>
				</view>
				<view class="productBuyBox-list-data" v-if="ProductInfo.remark != null">
					<view class="productBuyBox-list-data-title">
						质押及其他费用
					</view>
					<view class="productBuyBox-list-data-price">{{ProductInfo.remark}}</view>
				</view>
				<view class="productBuyBox-list-data">
					<view class="productBuyBox-list-data-title">
						合约周期
					</view>
					<view class="productBuyBox-list-data-price">{{ProductInfo.contractDays}}天</view>
				</view>
				<view class="productBuyBox-list-data">
					<view class="productBuyBox-list-data-title">
						开挖时间
					</view>
					<view class="productBuyBox-list-data-price">{{ProductInfo.startTime}}</view>
				</view>
				<view class="productBuyBox-list-data productBuyBox-list-data--active">
					<view class="productBuyBox-list-data-title">
						库存
					</view>
					<view class="productBuyBox-list-data-price">{{ProductInfo.surplusNum}}份</view>
				</view>
				<view class="productBuyBox-wrapper">
					<view class="productBuyBox-headerTitle">简介: </view>
					<view class="productBuyBox-content">{{ProductInfo.synopsis}}</view>
				</view>
			</view>
		</view>
		
		<view class="productBuyBtn">
			<view class="productBuyBtn-title">
				<view class="productBuyBtn-title-name">合计：</view>
				<view class="productBuyBtn-title-total" v-if="currencyId == 1">{{ProductInfo.singeMoney*num | number(2)}}USDT</view>
				<view class="productBuyBtn-title-total" v-if="currencyId == 2">{{ProductInfo.singeMoney*num*usdtLmPrice | number(2)}}LM</view>
			</view>
			<view class="productBuyBtn-btn" @click="openPopup('detailsPopup')">
				确认支付
			</view>
		</view>
		
		<!-- 支付确认详情 -->
		<uni-popup ref="detailsPopup" type="bottom" :animation="true">
			<view class="listBox">
				<view class="listBox-close" @click="hidePopup('detailsPopup')">×</view>
				<view class="listBox-usdt" v-if="currencyId == 1">{{ProductInfo.singeMoney*num | number(2)}}USDT</view>
				<view class="listBox-usdt" v-if="currencyId == 2">{{ProductInfo.singeMoney*num*usdtLmPrice | number(2)}}LM</view>
				<view class="listBox-form listBox-form--flex">
					<view class="listBox-form__label">订单信息</view>
					<view class="listBox-form__label">矿机购买</view>
				</view>
				<view class="listBox-form listBox-form--flex" @click="openPopup('waysPopup');hidePopup('detailsPopup')">
					<view class="listBox-form__label">支付类型</view>
					<view class="listBox-form__label listBox-form__label--next" v-if="currencyId == 1">USDT</view>
					<view class="listBox-form__label listBox-form__label--next" v-if="currencyId == 2">LM</view>
				</view>
				<view class="initBtn" @click="openPopup('psdPopup');hidePopup('detailsPopup');">确定</view>
			</view>
		</uni-popup>
		
		<!-- 支付方式 -->
		<uni-popup ref="waysPopup" type="bottom" :animation="true">
			<view class="listBox">
				<view class="listBox-form" @click="operate(1)">
					<view class="listBox-form__label">USDT</view>
				</view>
				<view class="listBox-form" @click="operate(2)">
					<view class="listBox-form__label">LM</view>
				</view>
				<view class="listBox-form" @click="hidePopup('waysPopup')">
					<view class="listBox-form__label">取消</view>
				</view>
			</view>
		</uni-popup>
		
		<!-- 交易框 -->
		<uni-popup ref="psdPopup" type="center" :animation="true" @change="changePopup($event,'psdPopup')">
			<view class="frameBox">
				<view class="frameBox-wrapper">
					<view class="frameBox-wrapper__label">产品购买</view>
				</view>
				<view class="frameBox-input">
					<input type="password" placeholder="请输入交易密码" placeholder-style="color:#cccccc"  v-model="password"/>
				</view>
				<view class="frameBox-btn">
					<view class="frameBox-btn__close" @click="hidePopup('psdPopup');password=''">取消</view>
					<view class="frameBox-btn__config"  @click="config()">确定</view>
				</view>
			</view>
		</uni-popup>
		
		
	</view>
</template>

<script>
	import uniPopup from '@/components/uni-popup/uni-popup.vue'
	export default {
		components: { uniPopup },
		data() {
			return {
				ProductInfo:{},
				singeTb:'',
				contractDays:'',
				num:1,
				password:'',
				usdtcny:'',
				minerId:'',
				currencyId:1,
				actual: 0, //到账数量
				charge: 0, //手续费
				usdtLmPrice:0,
			}
		},
		onLoad(value) {
			this.minerId = value.value1;
		},
		onShow() {
			this.init();
		},
		methods:{
			init(){
				this.getIPFSProductInfo();
				this.getUsdtLmPrice();
			},
			operate(index){
				this.currencyId = index;
				this.hidePopup('waysPopup');
				this.openPopup('detailsPopup');
			},
			//读取币种信息
			getUsdtLmPrice() {
				this.$Ajax('/search/usdtLmPrice',{},
					res => {
						if(res.code == 0){
							this.usdtLmPrice = res.obj;
						}
					}
				);
			},
			//获取矿机详情
			getIPFSProductInfo() {
				this.$Ajax('/front/miner/getIPFSProductInfo', {
					minerId: this.minerId,
				}, res => {
						if (res.code == 0) {
							console.log(JSON.stringify(res.obj))
							this.ProductInfo = res.obj;
						}
					}
				);
			},
			config(){
				if (this.num == '' ) {
					return this.$tools.toast('请输入购买份数');
				}
				if (!/^[1-9]\d*$/.test(this.num)) {
					return this.$tools.toast('请输入购买整数T');
				}
				if (this.password == '' ) {
					return this.$tools.toast('请输入交易密码');
				}
				this.$Ajax('/front/miner/buyProduct',
					{
						ipfsId: this.minerId,
						currencyId:this.currencyId,
						num: this.num,
						pwd: this.password,
					},
					res => {
						if (res.code == 0) {
							this.password = '';
							this.hidePopup('psdPopup');
							this.$tools.jump('./success',this.num,this.ProductInfo.name,this.remarks);
							// this.$tools.toastBack(res.msg, 1);
						}
					}
				);
			},
			reduce(){
				if(this.num == 1){
					this.num = 1;
				}else{
					this.num --;
				}
			},
			plus(){
				this.num ++;
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
	@import '@/common/scss/pages/product/productBuy';
</style>
