<template>
	<view class="pages">
		<view class="header_bar header_bg">
			<view class="header">
				<view class="header-back" @click="$tools.back(1)"></view>
				<view class="header-title">划转</view>
				<view class="header-right" @click="$tools.jump('./transferRecord')">
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
					<view class="form-label">划转地址</view>
					<input type="text" placeholder="请输入用户ID" v-model="addr" class="p_l"/>
					<view class="form-image" @click="scanCode()">
						<image src="../../static/public/icon-scan.png" mode="widthFix"></image>
					</view>
				</view>
			</view>
			<view class="form-box mt-mb">
				<view class="form-group">
					<view class="form-label">划转数量</view>
					<input type="text" placeholder="最小购买金额为100" v-model="num" />
				</view>
				<view class="form-group">
					<view class="form-label">手续费</view>
					<input type="text" placeholder="" :value="send_aaa_fee_scale + 'USDT'" disabled />
				</view>
				<view class="form-group">
					<view class="form-label">交易密码</view>
					<input type="password" placeholder="请输入您的交易密码" v-model="pay_password" />
				</view>
				<view class="form-group">
					<view class="form-label">实际到账</view>
					<input type="text" placeholder="" :value="actual_num + 'USDT'" disabled/>
				</view>
			</view>
			
			<!-- <view class="btn-active-login" @click="submit()" v-if="cashList.send_aaa_switch=0">确定</view>
			<view class="btn-active-login" @click="submit()" v-if="cashList.send_mx_switch=0">确定</view>
			<view class="btn-active-login" @click="submit()" v-if="cashList.send_usdt_switch=0">确定</view> -->
			<!-- <view class="btn-noopen" v-else>确定</view> -->
			<view class="btn-active-login" @click="submit()">确定</view>
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
				send_aaa_fee_scale:0
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
				this.$Ajax('/deal/index', {}, res => {
						if (res.code == 0) {
							this.send_aaa_fee_scale = res.send_aaa_fee_scale
						}
					}
				);
			},
			submit() {
				if(this.addr == ''){
					return this.$tools.toast('请输入用户ID');
				}
				if(/[^0-9]+/.test(this.addr)){
					return this.$tools.toast('用户ID只能为纯数字');
				}
				if(this.num == ''){
					return this.$tools.toast('请输入您的互转数量');
				}
				if(this.num < 100){
					return this.$tools.toast('最小互转数量为100');
				}
				if(this.pay_password == ''){
					return this.$tools.toast('请输入您的交易密码');
				}
				this.$Ajax('/deal/deal', {
					recUserId:this.addr,
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
				var a_num = this.num - this.send_aaa_fee_scale;
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
