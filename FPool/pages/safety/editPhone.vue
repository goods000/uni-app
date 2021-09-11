<template>
	<view class="page">
		<view class="safety">
			
			<view class="header_bar">
				<view class="header">
					<view class="header-back" @click="$tools.back(1)"></view>
					<view class="header-title">{{ i18n.binding.editPhone }}</view>
				</view> 
			</view> 
			
			<!-- <view class="safety-list">
				<view class="safety-list-title">账号</view>
				<view class="safety-list-input">
					<input type="text" placeholder="请输入您的账号" placeholder-style="color:#999999" v-model="account"/>
				</view>
			</view> -->
			<view class="safety-list">
				<view class="safety-list-title">{{ i18n.binding.phone }}<</view>
				<view class="safety-list-input">
					<view class="safety-list-input-picker" @click="zoneVisible = true">
						<view class="uni-input">+{{ zone }}</view>
					</view>
					<input type="text" :placeholder="i18n.binding.placeholder_01" placeholder-style="color:#999999" v-model="phone"/>
				</view>
			</view>
			<view class="safety-list">
				<view class="safety-list-title">{{ i18n.binding.phone }}{{ i18n.global.code }}</view>
				<view class="safety-list-input">
					<input type="text" :placeholder="i18n.global.placeholder_code" placeholder-style="color:#999999" v-model="code"/>
					<view class="safety-list-input-image">
						<view class="safety-list-input-all" @click="sendCode()">{{ remain }}</view>
					</view>
				</view>
			</view>
			
			<view class="initBtn" @click="submit()">{{ i18n.global.enter }}</view>
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
	import vPicker from '@/components/w-picker/w-picker.vue';
	
	export default {
		components: { vPicker },
		data() {
			return {
				account: '',
				phone: '',
				code: '',
				eyeShow: '../../static/public/icon-login-see.png',
				eyeHide: '../../static/public/icon-login-nosee.png',
				eyeShowHideArray: [{ show: false }, { show: false }, { show: false }],
				// 验证码
				remain: this.$t('message').global.sendCode,
				isSend: true,
				time: 60,
				timer: null,
				uuid:'',
				zoneVisible: false,
				zoneList: [],
				zone: '86',
				index: 0,
				isActive : false,
			}
		},
		computed: {
			i18n() {
				return this.$t('message');
			}
		},
		onShow() {
			this.getUUID2Fun();
			this.getZoneList();
		},
		methods: {
			toggleEyeStatus(index) {
				this.eyeShowHideArray[index].show = !this.eyeShowHideArray[index].show;
			},
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
			getUUID2Fun() {
				let that = this;
				// #ifdef APP-PLUS
				plus.device.getInfo({
					success: function(e) {
						console.log('getDeviceInfo success: ' + JSON.stringify(e));
						that.uuid = e.uuid;
						console.log('是否有UUID:' + this.uuid);
					},
					fail: function(e) {
						console.log('getDeviceInfo failed: ' + JSON.stringify(e));
					}
				});
				// #endif
				// #ifndef APP-PLUS
				that.uuid = Math.random();
				console.log('是否有UUID:' + this.uuid);
				// #endif
			},
			sendCode() {
				if (this.phone == '') {
					return this.$tools.toast(this.i18n.binding.placeholder_01);
				}
				uni.showLoading({
					title: this.i18n.global.sending,
					mask: true
				});
				this.$Ajax('/ajax/sendCode',{
					phoneEmail: this.phone,
					zone: this.zone,
				},res => {
					if (res.code == 0) {
						this.$tools.toast(this.i18n.global.sendSuccess);
						this.isSend = false;
						this.remain = this.time + this.i18n.global.reacquire;
						this.timer = setInterval(() => {
							this.time--;
							this.remain = this.time + this.i18n.global.reacquire;
							if (this.time == 0) {
								clearInterval(this.timer);
								this.remain = this.i18n.global.reacquire_01;
								(this.isSend = true), (this.time = 60);
							}
						}, 1000);
					}
				});
				uni.hideLoading();
			},
			submit(){
				if (this.phone == '') {
					return this.$tools.toast(this.i18n.binding.placeholder_01);
				}
				if(this.phone.length!=11 || !/^((1[0-9])+\d{9})$/.test(this.phone)){
					return this.$tools.toast(this.i18n.binding.placeholder_03);
				}
				if (this.code == '') {
					return this.$tools.toast(this.i18n.global.placeholder_code);
				}
				this.$Ajax(
					'/front/user/changePhone',
					{
						newPhone: this.phone,
						zone: this.zone,
						code: this.code,
						uuid: this.uuid,
					},
					res => {
						console.log(JSON.stringify(res));
						if (res.code == 0) {
							that.$tools.toastJump(this.i18n.global.modifySuccess, './safety');
						}
					}
				);
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import '@/common/scss/pages/safety/safety';
	.initBtn{margin-top: 40%;position: absolute;bottom: 46upx;left: 0;right: 0;margin: auto;}
	.page{
		background: #F5F6FA;
		height: 100vh;
		overflow: scroll;
	}
</style>
