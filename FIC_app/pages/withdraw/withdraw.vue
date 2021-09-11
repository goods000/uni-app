<template>
	<view class="pages">
		<view class="header_bar header_bg header_fixed">
			<view class="header">
				<view class="header-back" @click="$tools.back(1)"></view>
				<view class="header-title">提币</view>
				<view class="header-right" @click="$tools.jump('./withdrawRecord')">提币记录</view> 
			</view> 
		</view> 
		<view class="form">
			<view class="form-box">
				<view class="form-group-flex">
					<view class="form-label">提币地址</view>
					<input type="text" placeholder="请输入您的提币地址" value="" v-model="addr" placeholder-style="color:#ccc" />
					<view class="form-right-txt">USDT</view>
				</view>
				<view class="form-group-flex">
					<view class="form-label">提币金额</view>
					<input type="text" :placeholder="'最小提币金额为'+cashList.cash_usdt_lower_limit +'最大为'+cashList.cash_usdt_upper_limit" value="" v-model="num" placeholder-style="color:#ccc" />
					<view class="form-right-txt">USDT</view>
				</view>
				<view class="available-txt">可用：{{userList.usdtNum}} USDT</view>
				<view class="form-group-flex">
					<view class="form-label">手续费</view>
					<input type="text" :value="cashList.cash_usdt_fee_scale" disabled />
					<view class="form-right-txt">USDT</view>
				</view>
				<view class="form-group-flex">
					<view class="form-label">交易密码</view>
					<input type="password" placeholder="请输入您的交易密码" v-model="pay_password" placeholder-style="color:#ccc" />
					<view class="form-right-txt">USDT</view>
				</view>
			</view>
			
			<view class="form-group-txt-box">
				<view class="form-label">实际到账</view>
				<view class="form-label">{{actual_num}} USDT</view>
			</view>
			
			<view class="btn-active-login" @click="submit()" v-if="cashList.cash_usdt_switch == 0">确认提币</view>
			<view class="btn-noopen" v-else>确认提币</view>
		</view>
		
		<view class="recharge-bottom">
			<view class="buy-details-tips">
				<view class="buy-details-tips-title">注意：</view>
				<view class="buy-details-tips-content">最小提币数量为{{cashList.cash_usdt_lower_limit}}USDT</view>
				<view class="buy-details-tips-content">为保障您的账号安全，策略变更、密码修改我们会对提币进行人工审核，请耐心等待。</view>
				<view class="buy-details-tips-content">请务必确保电脑及浏览安全，防止信息被篡改或泄露。</view>
			</view>
		</view>
	</view>
</template>

<script>
	import md5 from '../../common/js/md5.js';
	
	export default {
		data() {
			return {
				addr: '',
				num: '',
				pay_password: '',
				userList:[],
				a_num: 0,
				cashList:[]
			}
		},
		onShow() {
			this.getUserList();
			this.getCash();
		},
		methods:{
			// 获取用户信息
			getUserList() {
				this.$Ajax('/user/info', {}, res => {
						if (res.code == 0) {
							this.userList = res.account
						}
					}
				);
			},
			// 获取参数
			getCash() {
				this.$Ajax('/cash/index', {}, res => {
						if (res.code == 0) {
							this.cashList = res.data
						}
					}
				);
			},
			submit() {
				if(this.addr == ''){
					return this.$tools.toast('请输入您的提币地址');
				}
				if(this.num == ''){
					return this.$tools.toast('请输入您的提币数量');
				}
				if(this.pay_password == ''){
					return this.$tools.toast('请输入您的交易密码');
				}
				this.$Ajax('/cash/apply', {
					address:this.addr,
					amount:this.num,
					payPassword: md5(this.pay_password).toString(),
					currType: 'usdt',
				}, res => {
						if (res.code == 0) {
							this.addr = '',
							this.num = '',
							this.pay_password = '',
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
						this.addr = msg;
					}
				});
			},
		},
		computed:{
			actual_num() {
				var a_num = this.num
				if(a_num <= 0){
					return 0;
				}else{
					return a_num;
				}
			}
		}
	}
</script>

<style>
	@import '@/common/css/style.css';
	page{background: #fff !important;}
	.btn-active-login{margin: 2% auto;}
</style>
