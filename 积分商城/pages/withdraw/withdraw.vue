<template>
	<view class="pages">
		<view class="">
			<view class="initHeader initHeader--bgStyle initHeader--white">
				<view class="initHeader-wrapper">
					<view class="initHeader-back" @click="$tools.back(1)"></view>
					<view class="initHeader-title">提现</view>
					<view class="initHeader-right initHeader-right--text" @click="$tools.jump('./withdrawRecord',currencyId,selectType)">提现记录</view>
				</view>
			</view>
			
			<view class="form">
				<picker @change="bindPickerChange" :value="index" :range="array" range-key="currencyName" class="form-wrapper-picker">
				<!-- <view range-key="name" class="form-wrapper-picker"> -->
					<view class="form-wrapper__title">{{array[index].currencyName}}</view>
					<view class="form-wrapper__txt">选择币种</view>
				<!-- </view> -->
				</picker>
				<view class="form-wrapper" :class="{ 'form-wrapper--active': isFocus == 0}">
					<view class="form-wrapper-label">提现地址</view>
					<input type="text" @blur="blurInput(0)" @focus="focusInput(0)" placeholder="长按粘贴或输入提现地址" v-model="address" placeholder-style="color:#999999" />
					<!-- <image src="../../static/public/icon-scan.png" mode="widthFix" @click="scanCode()"></image> -->
				</view>
				<view class="form-wrapper" :class="{ 'form-wrapper--active': isFocus == 1}">
					<view class="form-wrapper-label">提现数量</view>
					<input type="text" @blur="blurInput(1)" @focus="focusInput(1)" placeholder="请输入提现的数量" v-model="num" placeholder-style="color:#999999" />
					<view class="form-wrapper-txt">
						<text>{{ selectType }}</text><text class="form-wrapper-txt__line">|</text>
						<text class="form-wrapper-txt__text" @click="allNum()">全部</text>
					</view>
				</view>
				<view class="form-item">余额 {{walletInfo.using}}{{ selectType }}</view>
				<view class="form-wrapper" :class="{ 'form-wrapper--active': isFocus == 2}">
					<view class="form-wrapper-label">手续费</view>
					<input type="text" @blur="blurInput(2)" @focus="focusInput(2)"  v-model="charge" placeholder-style="color:#999999" disabled/>
					<view class="form-wrapper-txt">{{ selectType }}</view>
				</view>
				<view class="form-wrapper" :class="{ 'form-wrapper--active': isFocus == 3}">
					<view class="form-wrapper-label">交易密码</view>
					<input type="password" @blur="blurInput(3)" @focus="focusInput(3)" placeholder="请输入交易密码" v-model="password" placeholder-style="color:#999999" />
				</view>
				
				<view class="form-flex">
					<view class="form-flex-txt">实际到账</view>
					<view class="form-flex-num">{{actual}} {{ selectType }}</view>
				</view>
				
				<view class="initBtn" @click="submit()">确定</view>
				
				
				<view class="form-tips">
					<view class="form-tips-txt">温馨提示</view>
					<view class="form-tips-info">1.请确保提现地址的准确性，否则提现将会被驳回。</view>
					<!-- <view class="form-tips-info">2.提现的手续费为{{ (currencyInfoList.rate)*100 }}%。</view> -->
					<view class="form-tips-info">2.为保障资金安全，当您账户安全策略变更、密码修改、我们会对提现进行人工审核。</view>
				</view>
							
				
			</view>
			
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				array: [],
				index: 0,
				selectType:'',
				currencyId:'',
				configId:'',
				address:'',
				num:'',
				password:'',
				actual: 0, //到账数量
				charge: 0, //手续费
				currencyInfoList: [],
				using: '', //可提数量
				percentage: '', //提现规则是否百分比(百分比:提现数量*rate,不为百分比:提现数量-tate)
				rate: '', //提现扣除手续费
				min: 0,
				max: 0,
				isFocus: null,
				walletInfo:{},
			}
		},
		watch:{
			num(){
				if(this.num == ''){
					this.charge = 0;
				}else{
					if (this.currencyInfoList[0].percentage == 1) {
						this.charge = this.num * this.currencyInfoList[0].rate;
					} else {
						this.charge = this.currencyInfoList[0].rate;
					}
				}
				this.actual = this.num - this.charge;
			}
		},
		onShow() {
			this.init();
		},
		methods: {
			init() {
				this.array = [];
				this.getCurrencyList();
			},
			focusInput(index) {
				this.isFocus = index;
			},
			blurInput(index) {
				this.isFocus = null;
			},
			//全部
			allNum() {
				this.num = this.walletInfo.using;
				// if (this.percentage) {
				// 	this.charge = this.num * this.rate;
				// } else {
				// 	this.charge = this.rate;
				// }
				// this.actual = this.num - this.charge;
			},
			// 账户可用资产
			getWalletInfo() {
				this.$Ajax('/front/financial/get/assets', {
					currencyId:this.currencyId
				}, res => {
						if (res.code == 0) {
							this.walletInfo = res.obj;
						}
					}
				);
			},
			//获取币种
			getCurrencyList() {
				this.$Ajax(
					'/front/financial/getCurrencyConfigList',{},
					res => {
						if (res.code == 0) {
							res.obj.forEach(item => {
								if(item.extractSwitch == 1){
									this.array.push(item);
								}
							});
							console.log("this.array：",this.array);
							if(this.selectType == ''){
								this.selectType = this.array[0].currencyName;
							}
							if(this.currencyId == ''){
								this.currencyId = this.array[0].currencyId;
							}
							if(this.configId == ''){
								this.configId = this.array[0].id;
							}
							this.getCurrencyInfo();
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
							this.currencyInfoList = res.obj.configList;
							console.log("currencyInfoList",this.currencyInfoList);
							this.getWalletInfo();
						}
					}
				);
			},
			bindPickerChange: function(e) {
				console.log('picker发送选择改变，携带值为：' + this.array[e.detail.value].currencyId)
				this.index = e.detail.value;
				// this.currencyId = this.index+1;
				this.currencyId = this.array[e.detail.value].currencyId
				this.configId = this.array[e.detail.value].id
				this.selectType = this.array[e.detail.value].currencyName
				console.log("currencyId：",this.currencyId,"selectType：",this.selectType)
				this.actual = 0, 
				this.charge = 0,
				this.getCurrencyInfo();
			},
			submit(){
				// console.log("this.configId",this.configId);
				if(this.address == ''){
					return this.$tools.toast('请输入地址');
				}
				if(this.num == ''){
					return this.$tools.toast('请输入数量');
				}
				if(this.password == ''){
					return this.$tools.toast('请输入您的钱包密码');
				}
				this.$Ajax('/front/financial/apply', {
					configId:this.configId,
					quantity:this.num,
					address:this.address,
					tradePwd:this.password,
				}, res => {
						if (res.code == 0) {
							this.address = '',
							this.num = '',
							this.password = '',
							this.code = '',
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
	page,.pages{background: $globalColor-bgStyle;height: 100vh;}
</style>
