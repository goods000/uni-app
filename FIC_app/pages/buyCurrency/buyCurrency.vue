<template>
	<view class="pages">
		<view class="header_bar header_bg">
			<view class="header">
				<view class="header-back" @click="$tools.back(1)"></view>
				<view class="header-title">购买</view>
				<view class="header-right" @click="$tools.jump('./buyCurrencyRecord')">
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
					<view class="form-data">1USDT={{ usdt_to_aaa_scale }}AAA</view>
				</view>
			</view>
			<view class="form-box mt-mb">
				<view class="form-group">
					<view class="form-label">购买数量</view>
					<input type="text" placeholder="最小购买金额为100" v-model="num" />
				</view>
				<view class="form-group">
					<view class="form-label">手续费</view>
					<input type="text" placeholder="" :value="usdt_to_aaa_fee_scale + 'USDT'" disabled />
				</view>
				<view class="form-group">
					<view class="form-label">交易密码</view>
					<input type="password" placeholder="请输入您的交易密码" v-model="pay_password" />
				</view>
				<view class="form-group">
					<view class="form-label">实际到账</view>
					<input type="text" placeholder="" :value="actual_num + 'AAA'" disabled/>
				</view>
			</view>
			
			<view class="btn-active-login" @click="submit()">确定</view>
		</view>
	</view>
</template>

<script>
	import md5 from '../../common/js/md5.js';
	export default {
		data() {
			return {
				userList:[],
				convertList:[],
				num: '',
				pay_password: '',
				a_num: 0,
				usdt_to_aaa_scale: 0,
				usdt_to_aaa_fee_scale: ''
			}
		},
		onShow() {
			this.getUserList();
			this.getConvert();
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
			// 获取兑换
			getConvert() {
				this.$Ajax('/convert/index', {}, res => {
						if (res.code == 0) {
							this.usdt_to_aaa_scale = res.usdt_to_aaa_scale
							this.usdt_to_aaa_fee_scale = res.usdt_to_aaa_fee_scale
						}
					}
				);
			},
			submit() {
				if(this.num == ''){
					return this.$tools.toast('请输入您的购买数量');
				}
				if(this.num < 99){
					return this.$tools.toast('最小购买金额为100');
				}
				if(this.pay_password == ''){
					return this.$tools.toast('请输入您的交易密码');
				}
				this.$Ajax('/convert/convert', {
					sendNum:this.num,
					payPassword: md5(this.pay_password).toString(),
					sendType: 'USDT',
					receiveType: 'AAA'
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
				var a_num = this.num * this.usdt_to_aaa_scale;
				return a_num;
			}
		}
	}
</script>

<style>
	@import '@/common/css/style.css';
	page{background: #fff;}
</style>
