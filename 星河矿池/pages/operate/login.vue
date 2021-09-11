<template>
	<view class="pages">
		<view class="first">
			<view class="header_bar">
				<view class="header">
					<view class="header-goBack" @click="$tools.back(1)"></view>
				</view> 
			</view> 
			<view class="firstBox">
				<view class="firstBox-titleBox">
					<view class="firstBox-titleBox-wrapper">
						<view class="firstBox-title" :class="{'firstBox-title--active': tabsActive == 0 }" @click="changeTabsActive(0)">助记词登录</view>
						<!-- <view class="firstBox-title" :class="{'firstBox-title--active': tabsActive == 1 }" @click="changeTabsActive(1)">私钥登录</view> -->
					</view>
					<view class="firstBox-titleBox-title">欢迎来到星河</view>
				</view>
				<view class="firstBox-form">
					<!-- <view class="firstBox-form-item">
						<view class="firstBox-form-item-title">钱包名称</view>
						<view class="firstBox-form-item-input" :class="{ 'firstBox-form-item-input--active': isFocus == 1, showCloseBtn: phone != '' }">
							<input type="text" placeholder="请输入你的钱包名称" placeholder-style="color:#CCCCCC" v-model="phone"
							@blur="blurInput(0)"
							@focus="focusInput(0)"/>
							<view class="firstBox-form-item-image">
								<view class="firstBox-form-item-image__clear firstBox-form-item-image__clear--active" @click="clearData('phone')">
									<image src="../../static/public/icon-clear.png" mode="widthFix"></image>
								</view>
							</view>
						</view>
					</view> -->
					<view class="firstBox-form-item">
						<view class="firstBox-form-item-title">{{ tabsActive == 0 ? '助记词' : '私钥'}}</view>
						<textarea value="" class="firstBox-form-item-input" :class="{ 'firstBox-form-item-input--active': isFocus == 1, showCloseBtn: word != '' }"
						:placeholder="'请输入你的' + (tabsActive == 0 ? '助记词' : '私钥')"  placeholder-style="color:#CCCCCC" v-model="word"
						@blur="blurInput(0)"
						@focus="focusInput(0)"/>
					</view>
					<view class="firstBox-form-item">
						<view class="firstBox-form-item-title">密码</view>
						<view class="firstBox-form-item-input" :class="{ 'firstBox-form-item-input--active': isFocus == 1, showCloseBtn: password != '' }">
							<input placeholder="请输入你的密码" placeholder-style="color:#CCCCCC" v-model="password"
							:password="!eyeShowHideArray[1].show"
							@blur="blurInput(1)"
							@focus="focusInput(1)"/>
							<view class="firstBox-form-item-image">
								<view class="firstBox-form-item-image__clear firstBox-form-item-image__clear--active" @click="clearData('password')">
									<image src="../../static/public/icon-clear.png" mode="widthFix"></image>
								</view>
								<view class="firstBox-form-item-image__see" @click="toggleEyeStatus(1)">
									<image :src="eyeShowHideArray[1].show ? eyeShow : eyeHide" mode="widthFix"></image>
								</view>
							</view>
						</view>
					</view>
					<!-- <view class="firstBox-form-next">
						<view class="firstBox-form-next-title" @click="$tools.jump('./forget')">忘记密码？</view>
					</view> -->
				</view>
				
				<view class="firstBox-bottomBox">
					<view class="firstBox-btn">
						<view class="firstBox-btn-item-color" @click="confim()">登录</view>
					</view>
					<view class="firstBox-bottom">
						<view class="firstBox-bottom-title">还没有钱包？</view>
						<view class="firstBox-bottom-title-choice" @click="$tools.jump('./register')">创建</view>
					</view>
				</view>
				
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				phone: '',
				word: '',
				password: '',
				isFocus: null,
				eyeShow: '../../static/public/icon-eye-open.png',
				eyeHide: '../../static/public/icon-eye-close.png',
				eyeShowHideArray: [{ show: false }, { show: false }, { show: false }],
				tabsActive:0,
			}
		},
		onShow() {
	
		},
		methods: {
			changeTabsActive(index) {
				this.tabsActive = index;
				this.word = ''
			},
			confim(){
				// if (this.phone == '' ) {
				// 	return this.$tools.toast('请输入你的钱包名称');
				// }
				if (this.word == '' ) {
					return this.$tools.toast('请输入你的' + (this.tabsActive == 0 ? '助记词' : '私钥'));
				}
				if (this.password == '' ) {
					return this.$tools.toast('请输入你的密码');
				}
				this.$Ajax(
					'/front/login',
					{
						passphrase: this.word,
						tradePwd: this.password,
					},
					res => {
						if (res.code == 0) {
							uni.setStorageSync('token', res.obj.token);
							this.$tools.toastSwitchTab('登录成功', '../index/index');
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
	@import '@/common/scss/pages/operate/operate';
</style>
