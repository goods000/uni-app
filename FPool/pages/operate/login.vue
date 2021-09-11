<template>
	<view class="pages">
		<view class="first">
			<view class="header_bar">
				<view class="header">
					<view class="header-back" @click="$tools.back(1)"></view>
				</view> 
			</view> 
			<view class="firstBox">
				<view class="firstBox-titleBox">
					<view class="firstBox-titleBox-wrapper">{{ i18n.operate.login_01 }}</view>
					<view class="firstBox-titleBox-title">{{ i18n.operate.welcome }}FPool</view>
				</view>
				
				<view class="firstBox-form">
					<view class="firstBox-form-item">
						<view class="firstBox-form-item-title">{{ i18n.operate.account_01 }}</view>
						<view class="firstBox-form-item-input" :class="{ 'firstBox-form-item-input--active': isFocus == 1, showCloseBtn: phone != '' }">
							<input type="text" :placeholder="i18n.operate.placeholder_01" placeholder-style="color:#CCCCCC" v-model="phone"
							@blur="blurInput(0)"
							@focus="focusInput(0)"/>
							
							<view class="firstBox-form-item-image">
								<view class="firstBox-form-item-image__clear firstBox-form-item-image__clear--active" @click="clearData('phone')">
									<image src="../../static/public/icon-clear.png" mode="widthFix"></image>
								</view>
							</view>
						</view>
					</view>
					<view class="firstBox-form-item">
						<view class="firstBox-form-item-title">{{ i18n.global.password }}</view>
						<view class="firstBox-form-item-input" :class="{ 'firstBox-form-item-input--active': isFocus == 1, showCloseBtn: password != '' }">
							<input :placeholder="i18n.operate.placeholder_02" placeholder-style="color:#CCCCCC" v-model="password"
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
					<view class="firstBox-form-next">
						<view class="firstBox-form-next-title" @click="$tools.jump('./forget')">{{ i18n.operate.forget }}？</view>
					</view>
				</view>
				
				<view class="firstBox-bottomBox">
					<view class="firstBox-btn">
						<view class="firstBox-btn-item-color" @click="confim()">{{ i18n.operate.login }}</view>
					</view>
					
					<view class="firstBox-bottom">
						<view class="firstBox-bottom-title-choice" @click="$tools.switchTab('../index/index')">{{ i18n.operate.touristMode }}</view>
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
				password: '',
				isFocus: null,
				eyeShow: '../../static/public/icon-eye-open.png',
				eyeHide: '../../static/public/icon-eye-close.png',
				eyeShowHideArray: [{ show: false }, { show: false }, { show: false }],
			}
		},
		computed: {
			i18n() {
				return this.$t('message');
			}
		},
		onShow() {
	
		},
		methods: {
			confim(){
				if (this.phone == '' ) {
					return this.$tools.toast(this.i18n.operate.placeholder_01);
				}
				if (this.password == '' ) {
					return this.$tools.toast(this.i18n.operate.placeholder_02);
				}
				this.$Ajax(
					'/front/loginNV',
					{
						name: this.phone,
						password: this.password,
					},
					res => {
						if (res.code == 0) {
							uni.setStorageSync('token', res.obj.token);
							this.$tools.toastSwitchTab(this.i18n.operate.placeholder_03, '../index/index');
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
