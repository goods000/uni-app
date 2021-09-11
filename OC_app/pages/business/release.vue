<template>
	<view class="pages">
		<view class="">
			
			<view class="header_bar header_bg">
				<view class="header">
					<view class="header-back" @click="$tools.back(1)"></view>
					<view class="header-title">发布交易</view>
					<view class="header-right" @click="$tools.jump('./releaseRecord')">发布记录</view>
				</view> 
			</view> 
			
			<view class="release_tabs">
				<view class="release_tabs-list">
					<view class="release_tabs-list-txt" :class="{ 'active': tabsActive == 0 }" @click="changeTabsActive(0)">我要买币</view>
					<view class="release_tabs-list-txt" :class="{ 'active': tabsActive == 1 }" @click="changeTabsActive(1)">我要卖币</view>
				</view>
			</view>
			
			<view class="businessOrder-list">
				<view class="businessOrder-list-label">价格</view>
				<view class="businessOrder-list-title">
					<input type="text" placeholder="请输入价格" v-model="price"/>
					<text>CNY</text>
				</view>
			</view>
			<view class="businessOrder-list">
				<view class="businessOrder-list-label">交易数量</view>
				<view class="businessOrder-list-title">
					<input type="text" placeholder="请输入交易数量" v-model="num"/>
					<text>{{ currencyName }}</text>
				</view>
			</view>
			<view class="businessOrder-list">
				<view class="businessOrder-list-label">可用数量</view>
				<view class="businessOrder-list-title">
					<input type="text" disabled v-model="otcUsing"/>
					<text>{{ currencyName }}</text>
				</view>
			</view>
			
			<view class="businessOrder-list">
				<view class="businessOrder-list-label">单笔最小成交额</view>
				<view class="businessOrder-list-title">
					<input type="text" placeholder="请输入最小成交额" v-model="min"/>
					<text>CNY</text>
				</view>
			</view>
			<view class="businessOrder-list">
				<view class="businessOrder-list-label">单笔最大成交额</view>
				<view class="businessOrder-list-title">
					<input type="text" placeholder="请输入最大成交额" v-model="max"/>
					<text>CNY</text>
				</view>
			</view>
			
			<view class="formBox">
				<!-- <view class="formBox-input">
					<view class="formBox-input-label">备注</view>
					<textarea value="" placeholder="请输入您的备注信息" v-model="remarks"/>
				</view> -->
				<view class="formBox-input">
					<view class="formBox-input-label">支付方式</view>
					<view class="formBox-input-ways">
						<view class="formBox-input-ways-txtNo" v-if="paymentList.length == 0">未设置收款方式</view>
						<view class="formBox-input-ways-txt" :class="item.checked == 1 ? 'active' : ''"
						v-for="(item, index) in paymentList"
						:key="index"
						@click="selectPayment(index)"
						v-else>
							<image src="../../static/payment/icon-payment-bank.png" mode="widthFix" v-if="item.payType == 1"></image>
							<image src="../../static/payment/icon-payment-alipay.png" mode="widthFix" v-if="item.payType == 2"></image>
							<image src="../../static/payment/icon-payment-weChat.png" mode="widthFix" v-if="item.payType == 3"></image>
							<text v-if="item.payType == 1">银行卡</text>
							<text v-if="item.payType == 2">支付宝</text>
							<text v-if="item.payType == 3">微信</text>
						</view>
						
						<!-- <view class="formBox-input-ways-txt" :class="{ 'active': zfb == 1 }" @click="changeWays(2)">
							<image src="../../static/payment/icon-payment-alipay.png" mode="widthFix"></image>
							<text>支付宝</text>
						</view> -->
						
					</view>
				</view>
			</view>
			
			<view class="businessOrder-list">
				<view class="businessOrder-list-label">钱包密码</view>
				<view class="businessOrder-list-title">
					<input type="password" placeholder="请输入钱包密码" v-model="password"/>
				</view>
			</view>
			
			<view class="formBox">
				<view class="initBtn" @click="submit()">立即发布</view>
				
				<view class="formBox-tips">
					<view class="formBox-tips-title">注意：</view>
					<view class="formBox-tips-title">1.请务必收到货款后，再确认收款</view>
					<view class="formBox-tips-title">2.请核实款项来源及转账备注，以免银行卡被冻结</view>
				</view>
			</view>
			
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				price:'',
				num:'',
				min:'',
				max:'',
				remarks:'',
				password:'',
				tabsActive: 0, //0买 1卖
				waysActive: 0,
				paymentActiveList: { yhk: false, zfb: false, wx: false },
				paymentList:[],
				assetsTotalList:[],
				currencyList:[],
				otcUsing: 0,
				currencyName: '',
				assetList:[],
			}
		},
		onShow() {
			this.init();
		},
		methods: {
			init() {
				this.getOTCList();
				this.getPayList();
				this.getAssetsTotal();
				// this.getRatio();
			},
			// 获取资产
			getAssetsTotal() {
				this.$Ajax('/front/financial/assetsTotal', {}, res => {
					// console.log(JSON.stringify(res.obj));
					if (res.code == 0) {
						this.assetsTotalList = res.obj;
						this.assetList = res.obj.assetList;
						this.assetList.forEach((item,index) => {
							if(item.currencyName == 'USDT'){
								this.currencyName = item.currencyName;
								this.otcUsing = item.otcUsing; 
							}
						})
						// this.currencyList = res.obj.assetList;
					}
				});
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
			// 买卖切换
			changeTabsActive(index) {
				if(this.tabsActive != index){
					this.tabsActive = index;
				}
			},
			// 支付方式
			changeWays(index) {
				// if(this.waysActive != index){
				// 	this.waysActive = index;
				// }
				console.log("index:",index)
				if(index == 1){
					this.yhk = 1;
				}else if(index == 2){
					this.zfb == 1
				}else{
					this.wx == 1
				}
			},
			getPayList() {
				let that = this;
				this.$Ajax('/front/otc/publishPay', {}, res => {
					if (res.code == 0) {
						this.paymentList = res.obj;
						this.paymentList.forEach((item, index) => {
							that.$set(item, 'checked', false);
							// if (item.payType == 3) {
							// 	item.imgUrl = '../../static/payment/icon-wechat.png';
							// 	item.imgUrlActive = '../../static/payment/icon-wechat-active.png';
							// } else if (item.payType == 2) {
							// 	item.imgUrl = '../../static/payment/icon-alipay.png';
							// 	item.imgUrlActive = '../../static/payment/icon-alipay-active.png';
							// } else if (item.payType == 1) {
							// 	item.imgUrl = '../../static/payment/icon-unionpay.png';
							// 	item.imgUrlActive = '../../static/payment/icon-unionpay-active.png';
							// }
						});
					}
				});
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
			submit(){
				let that =this;
				if(that.price == ''){
					return that.$tools.toast('请输入价格');
				}
				if(that.num == ''){
					return that.$tools.toast('请输入交易数量');
				}
				if(that.min == ''){
					return that.$tools.toast('请输入最小成交额');
				}
				if(that.max == ''){
					return that.$tools.toast('请输入最大成交额');
				}
				// if(that.remarks == ''){
				// 	return that.$tools.toast('请输入您的备注信息');
				// }
				if(that.paymentActiveList == ''){
					return that.$tools.toast('请选择支付方式');
				}
				if(that.password == ''){
					return that.$tools.toast('请输入钱包密码');
				}
				that.$Ajax('/front/otc/publish', {
					configId:that.currencyId,
					price: that.price,
					quantity: that.num,
					min: that.min,
					max: that.max,
					wx: that.paymentActiveList.wx ? '1' : '0',
					zfb: that.paymentActiveList.zfb ? '1' : '0',
					yhk: that.paymentActiveList.yhk ? '1' : '0',
					type: that.tabsActive,
					remark: '',
					tradePassword: that.password,
				}, res => {
					if (res.code == 0) {
						that.price ='',
						that.num ='',
						that.min ='',
						that.max ='',
						that.remarks ='',
						that.password ='',
						that.$tools.toast(res.msg);
						this.getAssetsTotal();
					}
				});
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import '@/common/scss/pages/setting/setting';
	@import '@/common/scss/pages/business/businessOrder';
	.businessOrder{
		&-list{
			&-title{
				input{
					text-align: right;
				}
				text{
					margin-left: 35upx;
				}
			}
		}
	}
	.release_tabs{
		background: $globalColor-white;
		padding:  20upx 94upx 0;
		margin-bottom: 12upx;
		&-list{
			@include flexBetween;
			// padding: 0 94upx;
			&-txt{
				margin-right: 68upx;
				color: #999999;
				font-size: 28upx;
				padding-bottom: 12upx;
				border-bottom:2px solid transparent;
			}
			.active{
				color: $globalColor-style;
				border-bottom:2px solid $globalColor-style;
			}
		}
	}
	.formBox{
		margin: 12upx 0 0;
		&-input{
			textarea{
				height: 120upx;
				border-bottom: 1px solid #F5F5F5;
			}
			&-ways{
				@include flexBetween;
				border-bottom: 1px solid #F5F5F5;
				padding-bottom: 38upx;
				&-txt{
					width: 32.33%;
					border: 1px solid #DDDDDD;
					border-radius: 8upx;
					padding: 22upx 0;
					@include flexCenter;
					image{
						width: 32upx;
						height: 32upx;
						margin-right: 12upx;
					}
					text{
						color: #DDDDDD;
						font-size: 26upx;
					}
				}
				&-txtNo{
					color: #999999;
					font-size: 28upx;
					margin:10upx 0;
				}
				.active{
					color: $globalColor-style;
					border:1px solid $globalColor-style;
					text{
						color: $globalColor-style;
					}
				}
			}
		}
		&-tips{
			padding-bottom: 12%;
		}
	}
	
</style>
