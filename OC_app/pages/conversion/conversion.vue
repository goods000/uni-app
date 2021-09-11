<template>
	<view class="pages">
		<view class="">
			
			<view class="header_bar header_bg">
				<view class="header">
					<view class="header-back" @click="$tools.back(1)"></view>
					<view class="header-title">划转</view>
					<view class="header-right"@click="$tools.jump('./conversionRecord',currencyId)">划转记录</view>
				</view> 
			</view> 
			
			<view class="form">
				<picker @change="bindPickerChange" :value="index" :range="array" range-key="name" class="form-wrapper-picker">
					<view class="form-wrapper__title">{{array[index].name}}</view>
					<view class="form-wrapper__txt">选择划转方式</view>
				</picker>
				<view class="form-wrapper">
					<view class="form-wrapper-label">币种</view>
					<input type="text" v-model="currency" placeholder-style="color:#999999" disabled/>
				</view>
				<view class="form-wrapper">
					<view class="form-wrapper-label">划转数量</view>
					<input type="text" placeholder="请输入划转的数量" v-model="num" placeholder-style="color:#999999" />
					<view class="form-wrapper-txt">
						<text>{{ currency }}</text>
						<text class="form-wrapper-txt__text" @click="allNum()">|&nbsp;&nbsp;全部</text>
					</view>
				</view>
				<view class="form-item" v-if="selectType == 1">余额 {{ using }} {{ currency }}</view>
				<view class="form-item" v-if="selectType == 2">余额 {{ using }} {{ currency }}</view>
				<!-- <view class="form-wrapper">
					<view class="form-wrapper-label">手续费</view>
					<input type="text" :value="fee" placeholder-style="color:#999999" disabled/>
					<view class="form-wrapper-txt">OC</view>
				</view> -->
				<view class="form-wrapper">
					<view class="form-wrapper-label">钱包密码</view>
					<input type="password" placeholder="请输入您的钱包密码" v-model="password" placeholder-style="color:#999999" />
				</view>
				
				<view class="form-tips">
					<view class="form-tips-txt">注意：</view>
					<view class="form-tips-txt">资产只有划转到对应账户才可以进行交易，目前币种只接受USDT进行划转功能，账户间的划转不收取手续费用。</view>
				</view>
			
				
				<view class="initBtn" @click="submit()">划转</view>
			</view>
			
		</view>
	</view>
</template>

<script>
	import md5 from '../../common/js/md5.js';
	
	export default {
		data() {
			return {
				account:'',
				num:'',
				password:'',
				array: [{name:'币币转法币账户'},{name:'法币转币币账户'}],
				index: 0,
				selectType:1,
				fee: '',
				currencyList:[],
				using: '',
				currency: '',
				currencyId: '',
			}
		},
		onShow() {
			this.init();
		},
		methods: {
			init(){
				this.getcurrency();
				this.getAssetsTotal();
			},
			bindPickerChange: function(e) {
				console.log('picker发送选择改变，携带值为：' + e.detail.value)
				this.index = e.detail.value;
				this.selectType = this.index+1;
				this.num = '';
				this.getAssetsTotal();
			},
			// 获取资产
			getAssetsTotal() {
				this.$Ajax('/front/financial/assetsTotal', {}, res => {
					if (res.code == 0) {
						// this.assetsTotalList = res.obj;
						this.currencyList = res.obj.assetList;
						res.obj.assetList.forEach((item,index) => {
							if(item.currencyName == 'USDT'){
								if(this.selectType == 1){
									this.using = item.using
								}else{
									this.using = item.otcUsing
								}
							}
						})
					}
				});
			},
			// 获取币种
			getcurrency() {
				this.$Ajax('/front/financial/getTransferCurrency', {}, res => {
					if (res.code == 0) {
						this.currency = res.obj[0].currencyName;
						this.currencyId = res.obj[0].currencyId;
					}
				});
			},
			//全部
			allNum() {
				this.num = this.using;
				// if (this.percentage) {
				// 	this.charge = this.num * this.rate;
				// } else {
				// 	this.charge = this.rate;
				// }
				// this.actual = this.num - this.charge;
			},
			submit(){
				if(this.num == ''){
					return this.$tools.toast('请输入划转的数量');
				}
				if(this.password == ''){
					return this.$tools.toast('请输入您的钱包密码');
				}
				this.$Ajax('/front/financial/transfer', {
					type:this.selectType,
					pwd: this.password,
					currencyId: this.currencyId,
					quantity:this.num,
				}, res => {
						if (res.code == 0) {
							this.account = '',
							this.num = '',
							this.password = '',
							this.$tools.toast(res.msg);
						}
					}
				);
			},
			// 扫一扫
			scanCode() {
				uni.scanCode({
					onlyFromCamera: true,
					success: res => {
						let msg = res.result;
						this.address = msg;
					}
				});
			},
		}
	}
</script>

<style lang="scss" scoped>
	@import '@/common/scss/pages/withdraw/withdraw';
	page{background: #FFFFFF;}
</style>
