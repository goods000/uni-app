<template>
	<view class="pages">
		<view class="header_bar header_bg header_border">
			<view class="header">
				<view class="header-back" @click="$tools.back(1)"></view>
				<view class="header-title">节点申请</view>
			</view> 
		</view> 
		<view class="form">
			<view class="formBox">
				<view class="formBox-group">
					<view class="formBox-group__label">姓名</view>
					<input type="text" placeholder="请输入开户人姓名" placeholder-class="formBox-group--input" v-model="username" disabled/>
				</view>
				<view class="formBox-group">
					<view class="formBox-group__label">{{ phone.indexOf('@') <0 ? '手机号' : '邮箱号' }}</view>
					<input type="text" placeholder-class="formBox-group--input" v-model="phone" disabled/>
				</view>
				<view class="formBox-group">
					<view class="formBox-group__label">所在区域</view>
					<input type="text" placeholder="请选择..." v-model="address.result" @click="regionVisible = true" disabled="disabled" 
					placeholder-class="formBox-group--input" />
				</view>
				<view class="formBox-group">
					<view class="formBox-group__label">质押钱包地址</view>
					<input type="text" placeholder="100万枚ECD以上可申请..." placeholder-class="formBox-group--input" v-model="walletAddress" />
				</view>
			</view>
			
			<image src="../../static/node/icon-apply-logo.png" class="apply-logo" mode=""></image>
			
			<view class="initBtn" @click="submit()">提交</view>
			
		</view>
		
		<!-- 城市选择模态框 -->
		<w-picker
			:visible.sync="regionVisible"
			mode="region"
			:value="defaultRegion"
			default-type="value"
			:hide-area="false"
			@confirm="onConfirm($event, 'region')"
			ref="region"
		></w-picker>	
		
	</view>
</template>

<script>
	import md5 from '../../common/js/md5.js';
	export default {
		data() {
			return {
				username: '',
				phone: '',
				address: {
					result: ''
				},
				walletAddress: '',
				regionVisible: false,
				defaultRegion: ['440000', '440300', '440307'],
			}
		},
		onLoad(hash) {
			this.username = hash.value1;
		},
		onShow() {
			this.phone = uni.getStorageSync('myUser');
		},
		methods:{
			submit() {
				// if(this.username == ''){
				// 	return this.$tools.toast('请输入姓名');
				// }
				// if(this.phone == ''){
				// 	return this.$tools.toast('请输入手机号');
				// }
				if(this.address.result == ''){
					return this.$tools.toast('请输入地址');
				}
				if(this.walletAddress == ''){
					return this.$tools.toast('请输入质押钱包地址');
				}
				this.$Ajax('/front/node/nodeApply', {
					name: this.username,
					phone: this.phone,
					address: this.address.result,
					walletAddress: this.walletAddress,
				}, res => {
					if (res.code == 0) {
						this.username ='',
						this.phone ='',
						this.address.result ='',
						this.walletAddress ='',
						this.$tools.toastBack(res.msg,1);
					}
				});
			},
			onConfirm(res) {
				this.address = res;
				console.log(this.address.result)
				// this.province = this.result.obj.province.label;
				// this.city = this.result.obj.city.label;
				// this.area = this.result.obj.area.label;
				// console.log(JSON.stringify(res));
			},
		}
	}
</script>

<style lang="scss" scoped>
	@import '../payment/scss/payment';
	.apply-logo{
		width: 404upx;
		height: 86upx;
		margin: 15% auto;
		text-align: center;
	}
</style>
