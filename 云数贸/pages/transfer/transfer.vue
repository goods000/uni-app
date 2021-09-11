<template>
	<view class="contentBg">
		<view class="header_bar header_bg">
			<view class="header">
				<view class="header-back" @click="$tools.back(1)"></view>
				<view class="header-title">转账</view>
				<view class="header-right" @click="$tools.jump('./transferRecord')">
					<image src="../../static/public/icon-record.png" mode="widthFix"></image>
				</view>
			</view> 
		</view> 
		
		<view class="">
			<view class="content-flex">
				<view class="content-flex-title">选择转出股种</view>
				<picker @change="bindPickerChange" :value="index" :range="SharesList" range-key="name" class="content-flex-picker">
					<view class="content-flex-picker__title">{{SharesList[index].name}}</view>
				</picker>
			</view>
		</view>
		
		<view class="content">
			<view class="content-warpper">
				<view class="content-warpper-title">对方UID</view>
				<view class="content-warpper-input">
					<input type="text" placeholder="输入接收方手机号" placeholder-class="inputColor" v-model="uid"
					@blur="blurInput(0)" @focus="focusInput(0)"/>
				</view>
			</view>
			<view class="content-warpper">
				<view class="content-warpper-title">转出股数</view>
				<view class="content-warpper-input">
					<input type="text" placeholder="请输入转出股数" placeholder-class="inputColor" v-model="num"
					@blur="blurInput(1)" @focus="focusInput(1)"/>
					<view class="content-warpper-code" @click="allNum()">全部</view>
				</view>
			</view>
			<view class="content-using">*可用数量：{{using}} </view>
			<view class="content-warpper">
				<view class="content-warpper-title">交易密码</view>
				<view class="content-warpper-input">
					<input  type="password" placeholder="请输入您的交易密码" placeholder-class="inputColor" v-model="tradePwd"
					@blur="blurInput(2)" @focus="focusInput(2)"/>
				</view>
			</view>
		</view>
		
		<view class="orderBtn">
			<view class="orderBtn-btn" @click="config()">转账</view>
		</view>
		
	</view>
</template>

<script>
	export default {
			data(){
				return{
					uid:'',
					num:'',
					tradePwd:'',
					using: '', //可用数量
					SharesList: [{name:'YSM原始股'}],
					index: 0,
					typeActive: 1,
					name:'YSM原始股',
					currencyId:'',
					address:'',
				}
			},
			onShow() {
				this.init();
			},
			methods: {
				init(){
					this.getSharesList();
				},
				focusInput(index) {
					this.isFocus = index;
				},
				blurInput(index) {
					this.isFocus = null;
				},
				//全部
				allNum() {
					this.num = this.using;
				},
				// 获取股票列表
				getSharesList() {
					this.$Ajax('/front/shares/getSharesList', {}, res => {
						if (res.code == 0) {
							this.SharesList = res.obj;
							this.currencyId = this.SharesList[0].id;
							this.getAssetsInfo();
						}
					});
				},
				bindPickerChange: function(e) {
					console.log('picker发送选择改变，携带值为：' + e.detail.value)
					this.index = e.detail.value;
					this.currencyId = this.SharesList[e.detail.value].id;
					this.name = this.SharesList[e.detail.value].name;
					this.getAssetsInfo();
				},
				// 获取指定资产
				getAssetsInfo() {
					this.$Ajax('/front/mine/getAssetsInfo', {
						currencyId: this.currencyId,
					}, res => {
						if (res.code == 0) {
							this.using = res.obj.using;
						}
					});
				},
				config() {
					console.log(this.currencyId)
					if (this.uid == '') {
						return this.$tools.toast('输入接收方手机号');
					}
					if (this.num == '') {
						return this.$tools.toast('请输入转出股数');
					}
					if (this.tradePwd == '') {
						return this.$tools.toast('请输入您的交易密码');
					}
					this.$Ajax('/front/mine/transfer',
						{
							currencyId: this.currencyId,
							phone: this.uid,
							num: this.num,
							payPwd: this.tradePwd,
						},
						res => {
							console.log(JSON.stringify(res.data));
							if (res.code == 0) {
								this.uid = '';
								this.num = '';
								this.tradePwd = '';
								this.$tools.toast(res.msg);
							}
						}
					);
				}
			},
		}
	</script>

<style lang="scss" scoped>
	@import '@/common/scss/pages/safety/safety';
	.content-flex{
		border-bottom: 16upx solid $globalColor-bgStyle;
	}
</style>
