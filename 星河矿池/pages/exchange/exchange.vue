<template>
	<view class="page pages">
		<view class="header_bar">
			<view class="header">
				<view class="header-goBack" @click="$tools.back(1)"></view>
				<view class="header-title">闪兑</view>
				<view class="header-goRight" @click="$tools.jump('./exchangeRecord',currencyId,selectType)"></view> 
			</view> 
		</view> 
		<view class="withdraw">
			<view class="withdrawBox">
				<view class="withdrawBox-list">
					<view class="withdrawBox-list-input">
						<image src="../../static/exchange/icon-title.png" mode="widthFix" class="withdrawBox-icon"></image>
						<view class="withdrawBox-operate">
							<view class="withdrawBox-operate__item">
								<view class="withdrawBox-operate__item-title">消耗:</view>
								<!-- <picker @change="bindUp" :value="index" :range="sendArray" range-key="name" class="withdrawBox-picker__up">
									<view class="uni-input">{{sendArray[index].name}}</view>
								</picker> -->
								<input type="text" v-model="sendType" class="withdrawBox-inputItem" disabled="disabled"/>
							</view>
							<view class="withdrawBox-operate__item">
								<view class="withdrawBox-operate__item-title">获得:</view>
								<picker @change="bindPickerChange" :value="index" :range="array" range-key="name" class="withdrawBox-picker">
									<!-- <view class="uni-input">{{array[index].name}}</view> -->
									<view class="uni-input">{{selectType}}</view>
								</picker>
							</view>
						</view>
						<image src="../../static/exchange/icon-tips.png" mode="widthFix" class="withdrawBox-exchange" @click="exchange(sendType)"></image>
					</view>
				</view>
				<view class="withdrawBox-list">
					<view class="withdrawBox-list-title">数量</view>
					<view class="withdrawBox-list-input">
						<input type="text" value="" placeholder="请输入闪兑数量" placeholder-style="color:#999999" v-model="num"/>
						<view class="withdrawBox-list-input-image">
							<view class="withdrawBox-list-input-u">{{ selectType }}</view>
							<view class="withdrawBox-list-input-all" @click="allNum()">全部</view>
						</view>
					</view>
				</view>
				<view class="withdrawBox-banlance">*可用数量  {{ walletInfo.using | number(4) }} {{ sendType }}</view>
				
				<view class="withdrawBox-list">
					<view class="withdrawBox-list-title">交易密码</view>
					<view class="withdrawBox-list-input">
						<input type="password" placeholder="请输入您的交易密码" placeholder-style="color:#999999" v-model="password"/>
					</view>
				</view>
				
				<view class="initBtn" @click="sumbit()">闪兑</view>
				
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				title: 'picker',
				sendArray: [],
				array: [{name:'FIL'},{name:'HX'}],
				index: 0,
				tabsActive: 0,
				snedCurrencyId:1,
				sendType:'USDT',
				selectType:'',
				currencyId:'',
				address: '',
				num: '',
				password: '',
				code: '',
				currencyInfoList:[],
				actual: 0, //到账数量
				charge: 0, //手续费
				using: '', //可提数量
				percentage: '', //闪兑规则是否百分比(百分比:闪兑数量*rate,不为百分比:闪兑数量-tate)
				rate: '', //闪兑扣除手续费
				min: 0,
				max: 0,
				walletInfo:{},
			}
		},
		onShow() {
			this.init();
		},
		methods: {
			changeTabsActive(index) {
				this.tabsActive = index;
			},
			init() {
				this.getCurrencyList();
			},
			//获取币种
			getCurrencyList() {
				this.$Ajax(
					'/front/miner/currencyList',
					{
						type: 3
					},
					res => {
						if (res.code == 0) {
							this.array = res.obj;
							this.array.forEach(item => {
								item.label = item.name;
								item.value = item.id;
							});
							if(this.selectType == ''){
								this.selectType = this.array[1].name;
							}
							if(this.currencyId == ''){
								this.currencyId = this.array[1].id;
							}
							this.getCurrencyInfo();
							this.getWalletInfo();
						}
					}
				);
			},
			//读取币种信息
			getCurrencyInfo() {
				this.$Ajax(
					'/front/financial/extractInit',
					{
						currencyId: this.currencyId
					},
					res => {
						if(res.code == 0){
							this.currencyInfoList = res.obj;
						}
					}
				);
			},
			bindPickerChange: function(e) {
				console.log('picker发送选择改变，携带值为：' + this.array[e.detail.value].id +';当前值是' + this.array[e.detail.value].name)
				this.index = e.detail.value
				this.snedCurrencyId = 1;
				this.sendType = 'USDT';
				this.currencyId = this.array[e.detail.value].id;
				this.selectType = this.array[e.detail.value].name;
				this.num == ''
				this.charge == ''
				this.actual == ''
				this.getCurrencyInfo();
				this.getWalletInfo();
			},
			exchange(sendType){
				let currencyId = this.currencyId; 
				let send = this.snedCurrencyId; 
				this.sendType = this.selectType;
				this.currencyId = send;
				this.snedCurrencyId = currencyId;
				this.selectType = sendType;
				this.getCurrencyInfo();
				this.getWalletInfo();
			},
			//闪兑全部
			allNum() {
				this.num = this.walletInfo.using;
				if (this.percentage) {
					this.charge = this.num * this.rate;
				} else {
					this.charge = this.rate;
				}
				this.actual = this.num - this.charge;
			},
			// 账户可用资产
			getWalletInfo() {
				this.$Ajax('/front/userPassphrase/getWalletInfo', {
					currencyId:this.snedCurrencyId
				}, res => {
						if (res.code == 0) {
							this.walletInfo = res.obj;
						}
					}
				);
			},
			sumbit() {
				console.log("上：",this.snedCurrencyId,this.sendType,"下：",this.currencyId,this.selectType)
				// if(this.address == ''){
				// 	return this.$tools.toast('请输入地址');
				// }
				if(this.num == ''){
					return this.$tools.toast('请输入闪兑数量');
				}
				if(this.password == ''){
					return this.$tools.toast('请输入交易密码');
				}
				this.$Ajax(
					'/front/userPassphrase/flashCash',
					{
						forCurrencyId:this.snedCurrencyId,
						toCurrencyId:this.currencyId,
						num:this.num,
						tradePwd:this.password,
					},
					res => {
						if (res.code == 0) {
							this.address = '';
							this.num = '';
							this.code = '';
							this.password = '';
							this.$tools.toast('闪兑申请成功');
						}
					}
				);
			},
			sendCode() {
				uni.showLoading({
					title: '发送中',
					mask: true
				});
				this.$Ajax('/ajax/sendMyCode',{},res => {
						if (res.code == 0) {
							this.$tools.toast('发送成功 ');
							this.isSend = false;
							this.remain = this.time + 's后重新获取';
							this.timer = setInterval(() => {
								this.time--;
								this.remain = this.time + 's后重新获取';
								if (this.time == 0) {
									clearInterval(this.timer);
									this.remain = '重新获取';
									(this.isSend = true), (this.time = 60);
								}
							}, 1000);
						}
					}
				);
				uni.hideLoading();
			},
			//扫一扫
			scanCode() {
				uni.scanCode({
					onlyFromCamera: true,
					// success: res => {
					success: function (res)  {  
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
	.initBtn{
		position: absolute;
		bottom: 20upx;
		width: 92%;
	}
</style>
