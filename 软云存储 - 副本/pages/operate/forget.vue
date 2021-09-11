<template>
	<view class="pages">
		<view class="operateBox">
			<view class="header_bar header_border">
				<view class="header">
					<view class="header-back" @click="$tools.back(1)"></view>
				</view> 
			</view> 
			<view class="firstBox-titleBox">
				<view class="firstBox-titleBox-wrapper">忘记密码</view>
				<view class="firstBox-titleBox-title">在这里可以重新设置您的登录密码</view>
			</view>
			
			<view class="operateBox-tabs">
				<view class="operateBox-tabs-item">
					<view class="operateBox-tabs-item__title" :class="{'operateBox-tabs-item__title--active': tabsActive == 0 }" @click="changeTabsActive(0)">手机号</view>
					<view class="operateBox-tabs-item__title" :class="{'operateBox-tabs-item__title--active': tabsActive == 1 }" @click="changeTabsActive(1)">邮箱</view>
				</view>
				<view class="operateBox-formBox">
					<view class="operateBox-formBox-list" :class="{ 'operateBox-formBox-list-input--active': isFocus == 1, showCloseBtn: phone != '' }">
						<picker @change="bindPickerChange" :value="index" :range="zoneList" range-key="zone" class="operateBox-formBox-list-title" v-show="tabsActive == 0">
							<view class="uni-input">+{{zone}}</view>
						</picker>
						<input type="text" :placeholder="'请输入您的' + (tabsActive == 0 ? '手机号' : '邮箱账号')" v-model="phone" placeholder-style="color:#CCCCCC" 
						@blur="blurInput(1)"
						@focus="focusInput(1)"/>
						<view class="operateBox-formBox-list-image">
							<view class="operateBox-formBox-list-image__clear operateBox-formBox-list-image__clear--active" @click="clearData('phone')">
								<image src="../../static/public/icon-clear.png" mode="widthFix"></image>
							</view>
						</view>
					</view>
					<view class="operateBox-formBox-list-header">验证码</view>
					<view class="operateBox-flex">
						<view class="operateBox-formBox-list operateBox-formBox-lists" :class="{ 'operateBox-formBox-list-input--active': isFocus == 1, showCloseBtn: code != '' }">
							<input type="text" placeholder="请输入您的验证码" placeholder-style="color:#CCCCCC" v-model="code"
							@blur="blurInput(2)"
							@focus="focusInput(2)"/>
							<view class="operateBox-formBox-list-image">
								<view class="operateBox-formBox-list-image__clear operateBox-formBox-list-image__clear--active" @click="clearData('code')">
									<image src="../../static/public/icon-clear.png" mode="widthFix"></image>
								</view>
							</view>
						</view>
						<view class="code" @click="sendCode()">{{ remain }}</view>
					</view>
					<view class="operateBox-formBox-list-header">新密码</view>
					<view class="operateBox-formBox-list" :class="{ 'operateBox-formBox-list-input--active': isFocus == 1, showCloseBtn: password != '' }">
						<input placeholder="重新设置您的密码" placeholder-style="color:#CCCCCC" v-model="password"
						:password="!eyeShowHideArray[0].show"
						@blur="blurInput(3)"
						@focus="focusInput(3)"/>
						<view class="operateBox-formBox-list-image">
							<view class="operateBox-formBox-list-image__clear operateBox-formBox-list-image__clear--active" @click="clearData('password')">
								<image src="../../static/public/icon-clear.png" mode="widthFix"></image>
							</view>
							<view class="operateBox-formBox-list-image__see" @click="toggleEyeStatus(0)">
								<image :src="eyeShowHideArray[0].show ? eyeShow : eyeHide" mode="widthFix"></image>
							</view>
						</view>
					</view>
					<view class="operateBox-formBox-list-header">确认密码</view>
					<view class="operateBox-formBox-list" :class="{ 'operateBox-formBox-list-input--active': isFocus == 1, showCloseBtn: re_password != '' }">
						<input placeholder="再次确认您的登录密码" placeholder-style="color:#CCCCCC" v-model="re_password"
						:password="!eyeShowHideArray[1].show"
						@blur="blurInput(4)"
						@focus="focusInput(4)"/>
						<view class="operateBox-formBox-list-image">
							<view class="operateBox-formBox-list-image__clear operateBox-formBox-list-image__clear--active" @click="clearData('re_password')">
								<image src="../../static/public/icon-clear.png" mode="widthFix"></image>
							</view>
							<view class="operateBox-formBox-list-image__see" @click="toggleEyeStatus(1)">
								<image :src="eyeShowHideArray[1].show ? eyeShow : eyeHide" mode="widthFix"></image>
							</view>
						</view>
					</view>
				</view>
			</view>
			<view class="operateBox-bottomBoxFor">
				<view class="operateBox-btn">
					<view class="operateBox-btn-chioce" @click="confim()">确认</view>
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
				re_password: '',
				pickerShow: false,
				zoneList: [],
				// 验证码
				remain: '发送',
				isSend: true,
				time: 60,
				timer: null,
				zoneList: [],
				zone: '86',
				index: 0,
				isFocus: null,
				eyeShow: '../../static/public/icon-eye-open.png',
				eyeHide: '../../static/public/icon-eye-close.png',
				eyeShowHideArray: [{ show: false }, { show: false }, { show: false }],
			}
		},
		onShow() {
			this.getZoneList();
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
			// 获取区号
			getZoneList() {
				this.$Ajax('/ajax/zoneList',{},
					res => {
						if (res.code == 0) {
							this.zoneList = res.obj;
						}
					}
				);
				uni.hideLoading();
			},
			sendCode() {
				uni.showLoading({
					title: '发送中',
					mask: true
				});
				if (this.phone == '' ) {
					return this.$tools.toast('请输入注册' + (this.tabsActive == 0 ? '手机号' : '邮箱账号'));
				}
				this.$Ajax(
					'/ajax/sendCode',
					{
						zone: this.zone,
						phoneEmail: this.phone,
					},
					res => {
						if (res.code == 0) {
							this.$tools.toast('发送成功 ');
							this.isSend = false;
							this.remain = this.time + 's';
							this.timer = setInterval(() => {
								this.time--;
								this.remain = this.time + 's';
								if (this.time == 0) {
									clearInterval(this.timer);
									this.remain = '重新获取';
									(this.isSend = true), (this.time = 60);
								}
							}, 1000);
						}
					}
				);
				uni.hideLoading();
			},
			confim(){
				if (this.phone == '' ) {
					return this.$tools.toast('请输入' + (this.tabsActive == 0 ? '手机号' : '邮箱账号'));
				}
				if (this.code == '' ) {
					return this.$tools.toast('请输入您的验证码');
				}
				if (this.password == '' ) {
					return this.$tools.toast('重新设置您的密码');
				}
				if (this.re_password == '' ) {
					return this.$tools.toast('再次确认您的登录密码');
				}
				if (this.password != this.re_password){
					return this.$tools.toast('两者密码不一致');
				}
				this.$Ajax(
					'/front/forgetPassword',
					{
						name: this.phone,
						code: this.code,
						pwd: this.password,
					},
					res => {
						if (res.code == 0) {
							this.$tools.toastJump('修改成功', '../operate/login');
						}
					}
				);
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
