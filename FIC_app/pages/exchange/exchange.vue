<template>
	<view class="pages">
		<view class="header_bar header_bg">
			<view class="header">
				<view class="header-back" @click="$tools.back(1)"></view>
				<view class="header-title">兑换</view>
				<view class="header-right" @click="$tools.jump('./exchangeRecord')">
					<image src="../../static/public/icon-record.png" mode=""></image>
				</view> 
			</view> 
		</view> 
		<view class="form">
			<view class="form-box">
				<view class="form-group">
					<view class="form-label">当前可用</view>
					<view class="form-data chioce">{{userList.usdtNum}}USDT</view>
				</view>
				<view class="form-group">
					<view class="form-label">兑换比率</view>
					<view class="form-data">1USDT={{mx_to_usdt_scale}}MX</view>
				</view>
			</view>
			<view class="form-box mt-mb">
				<view class="form-group">
					<view class="form-label">兑换数量</view>
					<input type="text" placeholder="请输入您的兑换数量" value="" v-model="num" />
				</view>
				<view class="form-group">
					<view class="form-label">手续费</view>
					<input type="text" placeholder="" :value="mx_to_usdt_fee_scale +'USDT'" disabled />
				</view>
				<view class="form-group">
					<view class="form-label">交易密码</view>
					<input type="password" placeholder="请输入您的交易密码" v-model="pay_password" />
				</view>
				<view class="form-group">
					<view class="form-label">实际到账</view>
					<input type="text" placeholder="" :value="actual_num + 'USDT'" />
				</view>
			</view>
			
			<view class="btn-active-login" @click="submit()" v-if="mx_to_usdt_switch = 0">确定</view>
			<view class="btn-noopen" v-else>确定</view>
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
				exList:[],
				mx_to_usdt_scale:0,
				mx_to_usdt_fee_scale:0,
				mx_to_usdt_switch:''
			}
		},
		onShow() {
			this.getUserList();
			this.getExchange();
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
			getExchange() {
				this.$Ajax('/convert/index', {}, res => {
						if (res.code == 0) {
							this.mx_to_usdt_scale = res.mx_to_usdt_scale
							this.mx_to_usdt_fee_scale = res.mx_to_usdt_fee_scale
							this.mx_to_usdt_switch = res.mx_to_usdt_switch
							console.log("是否开启",this.mx_to_usdt_switch)
						}
					}
				);
			},
			submit() {
				if(this.num == ''){
					return this.$tools.toast('请输入您的兑换数量');
				}
				if(this.num > 1000){
					return this.$tools.toast('每日上限金额为1000');
				}
				if(this.pay_password == ''){
					return this.$tools.toast('请输入您的交易密码');
				}
				this.$Ajax('/convert/convert', {
					sendNum:this.num,
					payPassword: md5(this.pay_password).toString(),
					sendType: 'mx',
					receiveType: 'usdt',
				}, res => {
						if (res.code == 0) {
							this.num ='',
							this.pay_password ='',
							this.$tools.toast(res.msg);
						}
					}
				);
			}
		},
		computed:{
			actual_num() {
				var a_num = this.num - this.mx_to_usdt_fee_scale;
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
	page{background: #fff;}
</style>
