<template>
	<view class="pages">
		<view class="header_bar header_bg header_border">
			<view class="header">
				<view class="header-back" @click="$tools.back(1)"></view>
				<view class="header-title">{{ bankInfo == '' ? '绑定' : '修改'}}银行卡</view>
			</view> 
		</view> 
		
		<view class="content">
			<view class="content-flex">
				<view class="content-flex-title">姓名</view>
				<view class="content-flex-input">
					<input type="text" placeholder="请输入您的真实姓名" placeholder-class="inputColor" v-model="name"
					@blur="blurInput(0)" @focus="focusInput(0)"/>
				</view>
			</view>
			<view class="content-flex">
				<view class="content-flex-title">手机号</view>
				<view class="content-flex-input">
					<input type="text" placeholder-class="inputColor" v-model="phone" disabled="disabled"
					@blur="blurInput(1)" @focus="focusInput(1)"/>
				</view>
			</view>
			<view class="content-flex">
				<view class="content-flex-title">开户地址</view>
				<view class="content-flex-input">
					<input type="text" placeholder="请输入您的开户地址" placeholder-class="inputColor" v-model="bank_address"
					@blur="blurInput(2)" @focus="focusInput(2)"/>
				</view>
			</view>
			<view class="content-flex">
				<view class="content-flex-title">银行卡号</view>
				<view class="content-flex-input">
					<input type="text" placeholder="请输入您的银行卡号" placeholder-class="inputColor" v-model="no"
					@blur="blurInput(3)" @focus="focusInput(3)"/>
				</view>
			</view>
			<view class="content-flex">
				<view class="content-flex-title">开户银行</view>
				<view class="content-flex-input">
					<input type="text" placeholder="请输入您的开户银行" placeholder-class="inputColor" v-model="bank_name"
					@blur="blurInput(4)" @focus="focusInput(4)"/>
				</view>
			</view>
		</view>
		
		<view class="orderBtn">
			<view class="orderBtn-btn" @click="config()">确认</view>
		</view>
	</view>
</template>

<script>
	export default {
		data(){
			return{
				name: '',
				bank_name:'',
				phone:'',
				bank_address:'',
				no:'',
				bankInfo:[],
			}
		},
		onLoad(hash){
			this.phone = hash.value1;
		},
		onShow() {
			this.init();
		},
		methods: {
			init(){
				this.getBank();
			},
			focusInput(index) {
				this.isFocus = index;
			},
			blurInput(index) {
				this.isFocus = null;
			},
			// 获取银行卡信息
			getBank() {
				this.$Ajax('/front/mine/getBank', {}, res => {
					if (res.code == 0) {
						this.bankInfo = res.obj;
						this.bankInfo.forEach((item,index) => {
							this.name = item.name;
							this.bank_address = item.bankAddress;
							this.no = item.no;
							this.bank_name = item.bankName;
						})
					}
				});
			},
			config() {
				if (this.name == '') {
					return this.$tools.toast('请输入您的真实姓名');
				}
				if (this.bank_address == '') {
					return this.$tools.toast('请输入您的开户地址');
				}
				if (this.no == '') {
					return this.$tools.toast('请输入您的银行卡号');
				}
				if (this.bank_name == '') {
					return this.$tools.toast('请输入您的开户银行');
				}
				this.$Ajax('/front/mine/bangdingBank',{
						name: this.name,
						bank_address: this.bank_address,
						no: this.no,
						bank_name: this.bank_name,
					},
					res => {
						console.log(JSON.stringify(res.data));
						if (res.code == 0) {
							this.$tools.toastBack('绑定成功', 1);
						}
					}
				);
			}
		},
	}
</script>

<style lang="scss" scoped>
	@import '@/common/scss/pages/safety/safety';
</style>
