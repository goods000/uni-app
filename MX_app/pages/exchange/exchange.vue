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
				<view class="form-group" v-if="this.selectType == 1 || this.selectType == 2">
					<view class="form-label">兑换比率</view>
					<view class="form-data" v-if="this.selectType == 1">1MMX={{mx_to_usdt_scale}}USDT</view>
					<view class="form-data" v-if="this.selectType == 2">1USDT={{usdt_to_mx_scale}}MMX</view>
				</view>
			</view>
			<view class="form-box mt-mb">
				<view class="form-group">
					<view class="form-label">兑换类型</view>
					<picker @change="bindPickerChange" :value="index" :range="array" range-key="name" class="p_l">
						<view class="uni-input">{{array[index].name}}</view>
					</picker>
					<view class="picker-image">
						<image src="../../static/public/icon-next.png" mode=""></image>
					</view>
					<!-- <select v-model="selectType">
						<option value = "0">请选择您的兑换类型</option>
						<option value = "1">MMX兑换USDT</option>
						<option value = "2">USDT兑换MMX</option>
					</select> -->
				</view>
				<view class="form-group">
					<view class="form-label">兑换数量</view>
					<input type="text" placeholder="请输入您的兑换数量" value="" v-model="num" />
				</view>
				<!-- <view class="form-group">
					<view class="form-label">手续费</view>
					<input type="text" placeholder="" :value="mx_to_usdt_fee_scale +'USDT'" disabled />
				</view> -->
				<view class="form-group">
					<view class="form-label">交易密码</view>
					<input type="password" placeholder="请输入您的交易密码" v-model="pay_password" />
				</view>
				<view class="form-group" v-if="this.selectType == 1 || this.selectType == 2">
					<view class="form-label">实际到账</view>
					<input type="text" v-if="this.selectType == 1" :value="actual_num + 'USDT'" />
					<input type="text" v-if="this.selectType == 2" :value="actual_mx + 'MMX'" />
				</view>
			</view>
			
			<view class="btn-active-login" @click="submit()" v-if="mx_to_usdt_switch == 0">确定</view>
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
				usdt_to_mx_scale:0,
				mx_to_usdt_fee_scale:0,
				mx_to_usdt_switch:'',
				selectType:0,
				sendType:null,
				receiveType:null,
				title: 'picker',
				array: [{name:'请选择您的兑换类型'},{name:'MMX兑换USDT'},{name: 'USDT兑换MMX'}],
				index: 0,
			}
		},
		onShow() {
			this.getUserList();
			this.getExchange();
		},
		watch: {
		  deep: true,
		  immediate: true,
		  'selectType': function () {
		   if(this.selectType=='1'){
		    this.receiveType='usdt';
		    this.sendType='mmx';
		   }else if(this.selectType=='2'){
		    this.receiveType='mmx';
		    this.sendType='usdt';
		   }
			},
		},
		methods:{
			bindPickerChange: function(e) {
				console.log('picker发送选择改变，携带值为：' + e.detail.value)
				this.index = e.detail.value
				this.selectType = this.index
			},
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
							this.usdt_to_mx_scale = res.usdt_to_mx_scale
							// this.mx_to_usdt_fee_scale = res.mx_to_usdt_fee_scale
							this.mx_to_usdt_switch = res.mx_to_usdt_switch
						}
					}
				);
			},
			submit() {
				console.log("this.selectType",this.selectType);
				if(this.selectType == 0){
					return this.$tools.toast('请选择您的兑换类型');
				}
				if(this.num == ''){
					return this.$tools.toast('请输入您的兑换数量');
				}
				if(this.num > 1000){
					return this.$tools.toast('每日上限金额为1000');
				}
				if(this.pay_password == ''){
					return this.$tools.toast('请输入您的交易密码');
				}
				if(this.sendType == null){
					return this.$tools.toast('请选择兑换类型');
				}
				if(this.receiveType == null){
					return this.$tools.toast('请选择兑换类型');
				}
				this.$Ajax('/convert/convert', {
					sendNum:this.num,
					payPassword: md5(this.pay_password).toString(),
					sendType: this.sendType,
					receiveType: this.receiveType,
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
				var a_num = this.num * this.mx_to_usdt_scale;
				if(a_num <= 0){
					return 0;
				}else{
					return a_num;
				}
			},
			actual_mx() {
				var a_num = this.num * this.usdt_to_mx_scale;
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
