<template>
	<view class="pages">
		<view class="header_bar header_bg header_border">
			<view class="header">
				<view class="header-back" @click="$tools.back(1)"></view>
				<view class="header-title">添加银行卡</view>
			</view> 
		</view> 
		<view class="form">
			<view class="formBox">
				<view class="formBox-group">
					<view class="formBox-group__label">姓名</view>
					<input type="text" placeholder="请输入开户人姓名" placeholder-class="formBox-group--input" v-model="username" />
				</view>
				<!-- <view class="formBox-group">
					<view class="formBox-group__label">身份证号</view>
					<input type="text" placeholder="请输入身份证号" placeholder-class="formBox-group--input" v-model="idCard" />
				</view>
				<view class="formBox-group">
					<view class="formBox-group__label">手机号</view>
					<input type="text" placeholder="请输入手机号" placeholder-class="formBox-group--input" v-model="phone" />
				</view> -->
				<view class="formBox-group">
					<view class="formBox-group__label">开户行</view>
					<input type="text" placeholder="请输入开户行" placeholder-class="formBox-group--input" v-model="bank" />
				</view>
				<view class="formBox-group">
					<view class="formBox-group__label">银行卡号</view>
					<input type="text" placeholder="请输入银行卡号" placeholder-class="formBox-group--input" v-model="num" />
				</view>
				<view class="formBox-group">
					<view class="formBox-group__label">银行地址</view>
					<input type="text" placeholder="请输入银行地址" placeholder-class="formBox-group--input" v-model="address" />
				</view>
			</view>
			
			<view class="initBtn" @click="submit()">确定</view>
			
		</view>
	</view>
</template>

<script>
	import md5 from '../../common/js/md5.js';
	export default {
		data() {
			return {
				username: '',
				idCard: '',
				phone: '',
				bank: '',
				num: '',
				address: '',
				uploadList: {src:''},
			}
		},
		onLoad(hash) {
			this.username = hash.value1;
			this.num = hash.value2;
			this.bank = hash.value3;
			this.address = hash.value4;
		},
		methods:{
			submit() {
				if(this.username == ''){
					return this.$tools.toast('请输入开户人姓名');
				}
				// if(this.idCard == ''){
				// 	return this.$tools.toast('请输入身份证号');
				// }
				// if(this.phone == ''){
				// 	return this.$tools.toast('请输入手机号');
				// }
				if(this.bank == ''){
					return this.$tools.toast('请输入开户行');
				}
				if(this.num == ''){
					return this.$tools.toast('请输入银行卡号');
				}
				// if(!/^([1-9]{1})(\d{15}|\d{16}|\d{18})$/.test(this.num)){
				// 	return this.$tools.toast('请输入正确的银行卡号');
				// }
				if(this.address == ''){
					return this.$tools.toast('请输入银行地址');
				}
				this.$Ajax('/front/user/updatePay', {
					name: this.username,
					no: this.num,
					bankAddress: this.address,
					bankName: this.bank,
					payType:1,
					status: 1,
				}, res => {
					if (res.code == 0) {
						this.username ='',
						this.num ='',
						this.bank ='',
						this.address ='',
						// this.idCard ='',
						// this.phone ='',
						this.$tools.toastBack(res.msg,1);
					}
				});
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import '/scss/payment';
</style>
