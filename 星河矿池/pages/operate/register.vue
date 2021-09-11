<template>
	<view class="pages">
		<view class="operateBox">
			<view class="header_bar">
				<view class="header">
					<view class="header-goBack" @click="$tools.back(1)"></view>
				</view> 
			</view> 
			<view class="firstBox-titleBox">
				<view class="firstBox-titleBox-wrapper">创建地址</view>
				<view class="firstBox-titleBox-title">设置您的钱包名称以及密码</view>
			</view>
			<view class="operateBox-tabs">
				<!-- <view class="operateBox-tabs-item">
					<view class="operateBox-tabs-item__title" :class="{'operateBox-tabs-item__title--active': tabsActive == 0 }" @click="changeTabsActive(0)">手机号</view>
					<view class="operateBox-tabs-item__title" :class="{'operateBox-tabs-item__title--active': tabsActive == 1 }" @click="changeTabsActive(1)">邮箱</view>
				</view> -->
				<view class="operateBox-formBox">
					<view class="operateBox-formBox-list-header">钱包名称</view>
					<view class="operateBox-formBox-list" :class="{ 'operateBox-formBox-list-input--active': isFocus == 1, showCloseBtn: phone != '' }">
						<!-- <picker @change="bindPickerChange" :value="index" :range="zoneList" range-key="zone" class="operateBox-formBox-list-title" v-show="tabsActive == 0">
							<view class="uni-input">+{{zone}}</view>
						</picker> -->
						<input type="text" placeholder="请输入你的钱包名称" v-model="phone" placeholder-style="color:#CCCCCC" 
						@blur="blurInput(0)"
						@focus="focusInput(0)"/>
						<view class="operateBox-formBox-list-image">
							<view class="operateBox-formBox-list-image__clear operateBox-formBox-list-image__clear--active" @click="clearData('phone')">
								<image src="../../static/public/icon-clear.png" mode="widthFix"></image>
							</view>
						</view>
					</view>
					<view class="operateBox-formBox-list-header">邀请码</view>
					<view class="operateBox-formBox-list" :class="{ 'operateBox-formBox-list-input--active': isFocus == 1, showCloseBtn: invite != '' }">
						<input type="text" placeholder="请填写邀请码" placeholder-style="color:#CCCCCC" v-model="invite"
						@blur="blurInput(4)"
						@focus="focusInput(4)"/>
						<view class="operateBox-formBox-list-image">
							<view class="operateBox-formBox-list-image__clear operateBox-formBox-list-image__clear--active" @click="clearData('invite')">
								<image src="../../static/public/icon-clear.png" mode="widthFix"></image>
							</view>
						</view>
					</view>
					<!-- <view class="operateBox-formBox-list-header">验证码</view>
					<view class="operateBox-flex">
						<view class="operateBox-formBox-list operateBox-formBox-lists" :class="{ 'operateBox-formBox-list-input--active': isFocus == 1, showCloseBtn: code != '' }">
							<input type="text" placeholder="请输入您的验证码" placeholder-style="color:#CCCCCC" v-model="code"
							@blur="blurInput(1)"
							@focus="focusInput(1)"/>
							<view class="operateBox-formBox-list-image">
								<view class="operateBox-formBox-list-image__clear operateBox-formBox-list-image__clear--active" @click="clearData('code')">
									<image src="../../static/public/icon-clear.png" mode="widthFix"></image>
								</view>
							</view>
						</view>
						<view class="code" @click="sendCode()">{{ remain }}</view>
					</view> -->
					<view class="operateBox-formBox-list-header">密码</view>
					<view class="operateBox-formBox-list" :class="{ 'operateBox-formBox-list-input--active': isFocus == 1, showCloseBtn: password != '' }">
						<input placeholder="请输入您的密码" placeholder-style="color:#CCCCCC" v-model="password"
						:password="!eyeShowHideArray[1].show"
						@blur="blurInput(2)"
						@focus="focusInput(2)"/>
						<view class="operateBox-formBox-list-image">
							<view class="operateBox-formBox-list-image__clear operateBox-formBox-list-image__clear--active" @click="clearData('password')">
								<image src="../../static/public/icon-clear.png" mode="widthFix"></image>
							</view>
							<view class="operateBox-formBox-list-image__see" @click="toggleEyeStatus(1)">
								<image :src="eyeShowHideArray[1].show ? eyeShow : eyeHide" mode="widthFix"></image>
							</view>
						</view>
					</view>
					<view class="operateBox-formBox-list-header">确认密码</view>
					<view class="operateBox-formBox-list" :class="{ 'operateBox-formBox-list-input--active': isFocus == 1, showCloseBtn: pay_password != '' }">
						<input placeholder="再次确认您的密码" placeholder-style="color:#CCCCCC" v-model="pay_password"
						:password="!eyeShowHideArray[2].show"
						@blur="blurInput(3)"
						@focus="focusInput(3)"/>
						<view class="operateBox-formBox-list-image">
							<view class="operateBox-formBox-list-image__clear operateBox-formBox-list-image__clear--active" @click="clearData('pay_password')">
								<image src="../../static/public/icon-clear.png" mode="widthFix"></image>
							</view>
							<view class="operateBox-formBox-list-image__see" @click="toggleEyeStatus(2)">
								<image :src="eyeShowHideArray[2].show ? eyeShow : eyeHide" mode="widthFix"></image>
							</view>
						</view>
					</view>
				</view>
				
			</view>
			<view class="operateBox-bottomBox">
				
				<view class="operateBox-btn">
					<view class="operateBox-btn-chioce" @click="confim()">下一步</view>
				</view>
				
				<view class="operateBox-bottom">
					<view class="operateBox-bottom-title">已有钱包？</view>
					<view class="operateBox-bottom-choice" @click="$tools.jump('./login')">导入</view>
				</view>
			</view>
			
			
		</view>
	</view>
</template>

<script>
	import md5 from '../../common/js/md5.js';
	export default {
		data() {
			return {
				tabsActive: 0,
				phone: '',
				code: '',
				password: '',
				pay_password: '',
				invite: '',
				pickerShow: false,
				selectType:0,
				title: 'picker',
				isActive : true,
				isFocus: null,
				eyeShow: '../../static/public/icon-eye-open.png',
				eyeHide: '../../static/public/icon-eye-close.png',
				eyeShowHideArray: [{ show: false }, { show: false }, { show: false }],
			}
		},
		onShow() {
		},
		methods: {
			changeTabsActive(index) {
				this.tabsActive = index;
				this.phone = ''
			},
			bindPickerChange: function(e) {
				console.log('picker发送选择改变，携带值为：' + e.detail.value)
				let index = e.detail.value;
				this.zone = this.zoneList[index].zone
				console.log(this.zone)
			},
			confim(){
				if (this.phone == '' ) {
					return this.$tools.toast('请输入你的钱包名称');
				}
				if (this.invite == ''){
					return this.$tools.toast('请输入您的邀请码');
				}
				if (this.password == '' ) {
					return this.$tools.toast('请输入您的密码');
				}
				if (this.pay_password == ''){
					return this.$tools.toast('再次确认您的密码');
				}
				if (this.password != this.pay_password){
					return this.$tools.toast('两者密码不一致');
				}
				
				const obj = {name: this.phone, pwd:this.password,parentName:this.invite}
				
				uni.setStorageSync('information', obj);
				this.$tools.toastJump('创建成功', './mnemonic');
				
			},
			/* clear & eye */
			focusInput(index) {
				this.isFocus = index;
			},
			blurInput(index) {
				this.isFocus = null;
			},
			clearData(keyName) {
				for (var key in this.$data) {
					if (key == keyName) {
						this.$data[key] = '';
					}
				}
			},
			toggleEyeStatus(index) {
				this.eyeShowHideArray[index].show = !this.eyeShowHideArray[index].show;
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import '@/common/scss/pages/operate/register';
</style>
