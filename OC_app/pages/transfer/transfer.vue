<template>
	<view class="pages">
		<view class="">
			
			<view class="header_bar header_bg">
				<view class="header">
					<view class="header-back" @click="$tools.back(1)"></view>
					<view class="header-title">转账</view>
					<view class="header-right"@click="$tools.jump('./transferRecord')">转账记录</view>
				</view> 
			</view> 
			
			<view class="form">
				<picker @change="bindPickerChange" :value="index" :range="array" range-key="name" class="form-wrapper-picker">
					<view class="form-wrapper__title">{{array[index].name}}</view>
					<view class="form-wrapper__txt">选择转账方式</view>
				</picker>
				<view class="form-wrapper">
					<view class="form-wrapper-label">币种</view>
					<input type="text" v-model="currency" placeholder-style="color:#999999" disabled/>
				</view>
				<view class="form-wrapper">
					<view class="form-wrapper-label">转账钱包地址</view>
					<input type="text" placeholder="输入转账钱包地址" v-model="account" placeholder-style="color:#999999" />
				</view>
				<view class="form-wrapper">
					<view class="form-wrapper-label">转账数量</view>
					<input type="text" placeholder="请输入转账的资金数量" v-model="num" placeholder-style="color:#999999" />
					<view class="form-wrapper-txt">{{ currency }}</view>
				</view>
				<view class="form-item">余额 {{ using }} {{ currency }}</view>
				<view class="form-wrapper">
					<view class="form-wrapper-label">手续费</view>
					<input type="text" :value="fee" placeholder-style="color:#999999" disabled/>
					<view class="form-wrapper-txt">{{ currency }}</view>
				</view>
				<view class="form-wrapper">
					<view class="form-wrapper-label">钱包密码</view>
					<input type="password" placeholder="请输入您的钱包密码" v-model="password" placeholder-style="color:#999999" />
				</view>
				
				<view class="form-tips">
					<view class="form-tips-txt">注意：</view>
					<view class="form-tips-txt">转账分为普通用户转账和股东转账，普通用户转账，转账后资金直接进入币币账户，股东转账资金进入节点账户，锁仓结算后释放，且股东账户无法为同为股东的账号进行转账。</view>
				</view>
			
				
				<view class="initBtn" @click="submit()">转账</view>
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
				array: [{name:'币币转币币账户'},{name:'合伙人转节点账户'}],
				index: 0,
				selectType:1,
				fee: '',
				currencyList:[],
				using: 0,
				currency: '',
				currencyId: '',
			}
		},
		onShow() {
			this.init();
		},
		methods: {
			init(){
				this.getFee();
				this.getcurrency();
				this.getAssetsTotal();
			},
			bindPickerChange: function(e) {
				console.log('picker发送选择改变，携带值为：' + e.detail.value)
				this.index = e.detail.value;
				this.selectType = this.index+1;
				this.getAssetsTotal();
			},
			// 获取资产
			getAssetsTotal() {
				this.$Ajax('/front/financial/assetsTotal', {}, res => {
					if (res.code == 0) {
						// this.assetsTotalList = res.obj;
						this.currencyList = res.obj.assetList;
						
						res.obj.assetList.forEach((item,index) => {
							if(this.selectType == 1){
								if(item.currencyName == 'OC'){
									this.using = item.using;
								}
							}else{
								if(item.currencyName == 'OC'){
									this.using = item.partnerUsing;
								}
							}
						})
					}
				});
			},
			// 获取币种
			getcurrency() {
				this.$Ajax('/front/financial/getPTCurrency', {}, res => {
					if (res.code == 0) {
						this.currency = res.obj.name;
						this.currencyId = res.obj.id;
					}
				});
			},
			// 获取手续费
			getFee() {
				this.$Ajax('/front/transfer/oc/fee', {}, res => {
					if (res.code == 0) {
						this.fee = res.obj;
					}
				});
			},
			submit(){
				if(this.account == ''){
					return this.$tools.toast('请输入转账的账号');
				}
				if(this.num == ''){
					return this.$tools.toast('请输入数量');
				}
				if(this.password == ''){
					return this.$tools.toast('请输入您的钱包密码');
				}
				this.$Ajax('/front/transfer/do/tx', {
					toAddress:this.account,
					amount:this.num,
					currencyId: this.currencyId,
					tradePwd: this.password,
					type: this.selectType,
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
