<template>
	<view class="pages">
		<view class="operateBox">
			<view class="header_bar">
				<view class="header">
					<view class="header-back" @click="$tools.back(1)"></view>
				</view> 
			</view> 
			<view class="firstBox-titleBox">
				<view class="firstBox-titleBox-wrapper">{{ i18n.operate.login_02 }}</view>
				<view class="firstBox-titleBox-title">{{ i18n.operate.welcome }}FPool</view>
			</view>
			<view class="operateBox-tabs">
				<view class="operateBox-tabs-item">
					<!-- <view class="operateBox-tabs-item__title" :class="{'operateBox-tabs-item__title--active': tabsActive == 0 }" @click="changeTabsActive(0)">{{ i18n.global.phone }}</view> -->
					<view class="operateBox-tabs-item__title" :class="{'operateBox-tabs-item__title--active': tabsActive == 1 }" @click="changeTabsActive(1)">{{ i18n.global.email }}</view>
				</view>
				<view class="operateBox-formBox">
					<view class="operateBox-formBox-list" :class="{ 'operateBox-formBox-list-input--active': isFocus == 1, showCloseBtn: phone != '' }">
						<view class="operateBox-formBox-list-title" v-show="tabsActive == 0" @click="zoneVisible = true">
							<view class="uni-input">+{{zone}}</view>
						</view>
						<input type="text" :placeholder="i18n.operate.placeholder + (tabsActive == 0 ? i18n.global.phone : i18n.global.email )" v-model="phone" placeholder-style="color:#CCCCCC" 
						@blur="blurInput(0)"
						@focus="focusInput(0)"/>
						<view class="operateBox-formBox-list-image">
							<view class="operateBox-formBox-list-image__clear operateBox-formBox-list-image__clear--active" @click="clearData('phone')">
								<image src="../../static/public/icon-clear.png" mode="widthFix"></image>
							</view>
						</view>
					</view>
					<view class="operateBox-formBox-list-header">{{ i18n.global.code }}</view>
					<view class="operateBox-flex">
						<view class="operateBox-formBox-list operateBox-formBox-lists" :class="{ 'operateBox-formBox-list-input--active': isFocus == 1, showCloseBtn: code != '' }">
							<input type="text" :placeholder="i18n.global.placeholder_code" placeholder-style="color:#CCCCCC" v-model="code"
							@blur="blurInput(1)"
							@focus="focusInput(1)"/>
							<view class="operateBox-formBox-list-image">
								<view class="operateBox-formBox-list-image__clear operateBox-formBox-list-image__clear--active" @click="clearData('code')">
									<image src="../../static/public/icon-clear.png" mode="widthFix"></image>
								</view>
							</view>
						</view>
						<view class="code" @click="sendCode()">{{ remain }}</view>
					</view>
					<view class="operateBox-formBox-list-header">{{ i18n.operate.loginPwd }}</view>
					<view class="operateBox-formBox-list" :class="{ 'operateBox-formBox-list-input--active': isFocus == 1, showCloseBtn: password != '' }">
						<input :placeholder="i18n.operate.placeholder_07" placeholder-style="color:#CCCCCC" v-model="password"
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
					<view class="operateBox-formBox-list-header">{{ i18n.global.tradePassword }}</view>
					<view class="operateBox-formBox-list" :class="{ 'operateBox-formBox-list-input--active': isFocus == 1, showCloseBtn: pay_password != '' }">
						<input :placeholder="i18n.operate.placeholder_08" placeholder-style="color:#CCCCCC" v-model="pay_password"
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
					<view class="operateBox-formBox-list-header">{{ i18n.invite.code }}</view>
					<view class="operateBox-formBox-list" :class="{ 'operateBox-formBox-list-input--active': isFocus == 1, showCloseBtn: invite != '' }">
						<input type="text" :placeholder="i18n.operate.placeholder_09" placeholder-style="color:#CCCCCC" v-model="invite"
						@blur="blurInput(4)"
						@focus="focusInput(4)"/>
						<view class="operateBox-formBox-list-image">
							<view class="operateBox-formBox-list-image__clear operateBox-formBox-list-image__clear--active" @click="clearData('invite')">
								<image src="../../static/public/icon-clear.png" mode="widthFix"></image>
							</view>
						</view>
					</view>
				</view>
				
			</view>
			<view class="operateBox-bottomBox">
				<view class="operateBox-agreement">
					<label :class="[isActive ? 'checkbox-active' : '']" @click="agreement()">
						<view class="checkbox" ></view>
					</label>
					<view class="operateBox-agreement-title">{{ i18n.operate.agreement_01 }}</view>
					<view class="operateBox-agreement-name">《{{ i18n.operate.userAgreement }}》</view>
				</view>
				
				<view class="operateBox-btn">
					<view class="operateBox-btn-chioce" @click="confim()">{{ i18n.operate.register }}</view>
				</view>
				
				<view class="operateBox-bottom">
					<view class="operateBox-bottom-title">{{ i18n.operate.haveAccount }}？</view>
					<view class="operateBox-bottom-choice" @click="$tools.jump('./login')">{{ i18n.operate.login }}</view>
				</view>
			</view>
		</view>
		
		<w-picker
			:visible.sync="zoneVisible"
			mode="selector"
			ref="picker"
			default-type="label"
			:options="zoneList"
			@confirm="onPickerConfirm($event, 'picker')"
		></w-picker>
		
	</view>
</template>

<script>
	import md5 from '../../common/js/md5.js';
	import vPicker from '@/components/w-picker/w-picker.vue';
	
	export default {
		components: { vPicker },
		data() {
			return {
				tabsActive: 1,
				phone: '',
				code: '',
				password: '',
				pay_password: '',
				invite: '',
				zoneVisible: false,
				pickerShow: false,
				zoneList: [],
				zone: '86',
				// 验证码
				remain: this.$t('message').global.send,
				isSend: true,
				time: 60,
				timer: null,
				selectType:0,
				index: 0,
				isActive : true,
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
			this.getZoneList();
		},
		methods: {
			agreement(){
				if(!this.isActive){
					this.isActive = true;
				}else{
					this.isActive = false;
				}
			},
			changeTabsActive(index) {
				this.tabsActive = index;
				this.phone = ''
			},
			/* 底部选项卡公用 */
			onPickerConfirm(res, type) {
				console.log('当前控制的Picker是：' + type + ';当前值是' + res.obj.zone);
				if (type == 'picker') {
					this.zone = res.obj.zone;
					console.log(this.zone)
				}
			},
			// 获取区号
			getZoneList() {
				this.$Ajax('/ajax/zoneList',{},
					res => {
						if (res.code == 0) {
							this.zoneList = res.obj;
							this.zoneList.forEach(item => {
								item.label = item.zone;
							});
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
					return this.$tools.toast(this.i18n.operate.placeholder + (this.tabsActive == 0 ? this.i18n.global.phone : this.i18n.global.email ));
				}
				this.$Ajax(
					'/ajax/sendCode',
					{
						zone: this.zone,
						phoneEmail: this.phone,
					},
					res => {
						if (res.code == 0) {
							this.$tools.toast(this.i18n.global.sendSuccess);
							this.isSend = false;
							this.remain = this.time + 's';
							this.timer = setInterval(() => {
								this.time--;
								this.remain = this.time + 's';
								if (this.time == 0) {
									clearInterval(this.timer);
									this.remain = this.i18n.global.reacquire_01;
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
					return this.$tools.toast(this.i18n.operate.placeholder + (this.tabsActive == 0 ? this.i18n.global.phone : this.i18n.global.email ));
				}
				if(this.phone.indexOf("@") <0){
					if (this.phone.length!=11 || !/^((1[0-9])+\d{9})$/.test(this.phone)){
						return this.$tools.toast(this.i18n.binding.placeholder_03);
					}
				}
				if(this.phone.indexOf("@") >-1){
					if(!/^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/g.test(this.phone)){
						return this.$tools.toast(this.i18n.binding.placeholder_04);
					}
				}
				if (this.code == '' ) {
					return this.$tools.toast(this.i18n.global.placeholder_code);
				}
				if (this.password == '' ) {
					return this.$tools.toast(this.i18n.operate.placeholder_07);
				}
				if (this.pay_password == ''){
					return this.$tools.toast(this.i18n.operate.placeholder_08);
				}
				if (this.invite == ''){
					return this.$tools.toast(this.i18n.operate.placeholder_09);
				}
				if (this.isActive == ''){
					return this.$tools.toast(this.i18n.operate.placeholder_10);
				}
				this.$Ajax(
					'/front/register',
					{
						phoneEmail: this.phone,
						code: this.code,
						pwd: this.password,
						tradePwd: this.pay_password,
						parentName: this.invite,
					},
					res => {
						if (res.code == 0) {
							uni.removeStorageSync('registeData');
							this.$tools.toastJump(this.i18n.operate.registerSuccess, '../operate/login');
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
