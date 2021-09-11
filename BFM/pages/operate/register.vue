<template>
	<view class="pages">
		<view class="initHeader initHeader--white">
			<view class="initHeader-wrapper"><view class="initHeader-back" @click="$tools.back(1)"></view></view>
		</view>

		<view class="bgBox"></view>

		<view class="titleBox"><view class="titleBox-title">账号注册</view></view>

		<view class="operateBox">
			<view class="operateBox-wrapper">
				<!-- <view class="operateBox-tabs">
					<view class="operateBox-tabs__control">
						<view
							class="operateBox-tabs__control-item"
							:class="{ 'operateBox-tabs__control-item--active': operateTabsActive == 0 }"
							@click="changeOperateTabsActive(0)"
						>
							手机注册
						</view>
						<view
							class="operateBox-tabs__control-item"
							:class="{ 'operateBox-tabs__control-item--active': operateTabsActive == 1 }"
							@click="changeOperateTabsActive(1)"
						>
							邮箱注册
						</view>
					</view>
				</view> -->
				<view class="operateBox-list">
					<view class="operateBox-list__label">账号</view>
					<view class="operateBox-list__input" :class="{ 'operateBox-list__input--active': isFocus == 0, showCloseBtn: phone != '' }">
						<view class="operateBox-list__zone" @click="zoneVisible = true">+{{ zone }}</view>
						<input @blur="blurInput(0)" @focus="focusInput(0)" placeholder-class="operateBox-list__placeholder" placeholder="请输入注册手机号/邮箱" v-model="phone" />
						<view class="operateBox-list__fixedBox">
							<view class="operateBox-list__fixedBox-btn operateBox-list__fixedBox-btn--clear" @click="clearData('phone')">
								<image src="../../static/public/icon-clear.png" mode="widthFix"></image>
							</view>
						</view>
					</view>
				</view>
				<view class="operateBox-list">
					<view class="operateBox-list__label">验证码</view>
					<view class="operateBox-list__input" :class="{ 'operateBox-list__input--active': isFocus == 1, showCloseBtn: code != '' }">
						<input @blur="blurInput(1)" @focus="focusInput(1)" placeholder-class="operateBox-list__placeholder" placeholder="请输入验证码" v-model="code" />
						<view class="operateBox-list__fixedBox">
							<view class="operateBox-list__fixedBox-btn operateBox-list__fixedBox-btn--clear" @click="clearData('code')">
								<image src="../../static/public/icon-clear.png" mode="widthFix"></image>
							</view>
							<view class="operateBox-list__fixedBox-verification" @click="sendCode()">{{ remain }}</view>
						</view>
					</view>
				</view>
				<!-- <view class="operateBox-button">
					<view class="operateBox-button__btn operateBox-button__btn--blue" :class="{ 'operateBox-button__btn--active': phone != '' && code != '' }" @click="next()">
						下一步
					</view>
				</view> -->
			</view>
		</view>
		
		<view class="fixedBox">
			<view class="fixedBox-wrapper">
				<view class="initButton"><view class="initButton-btn initButton-btn--style" @click="next()">下一步</view></view>
			</view>
		</view>

		<!-- 区号选择 -->
		<w-picker
			:visible.sync="zoneVisible"
			mode="selector"
			ref="zonePicker"
			default-type="label"
			:options="zoneArray"
			@confirm="onPickerConfirm($event, 'zonePicker')"
		></w-picker>
	</view>
</template>

<script>
import vPicker from '@/components/w-picker/w-picker.vue';
export default {
	components: {
		vPicker
	},
	data() {
		return {
			zone: '86',
			phone: '',
			code: '',

			// 验证码
			remain: '发送验证码',
			isSend: true,
			time: 60,
			timer: null,

			// 勾选框
			ischecked: false,

			// 输入框可见及删除
			isFocus: null,
			eyeShow: '../../static/public/icon-eye-open-green.png',
			eyeHide: '../../static/public/icon-eye-close-green.png',
			eyeShowHideArray: [{ show: false }, { show: false }, { show: false }, { show: false }, { show: false }],

			operateTabsActive: 0,
						
			zoneVisible: false,
			zoneLabel: '', //币种
			zoneVal: '',
			zoneArray: []
		};
	},
	onShow() {
		this.init();
	},
	methods: {
		init() {
			this.getZoneList();
		},
		getZoneList() {
			this.$Ajax('/ajax/zoneList', {}, res => {
				console.log(JSON.stringify(res));
				if (res.code == 0) {
					this.zoneArray = res.obj;
					this.zoneArray.forEach(item => {
						item.label = item.zone + ' ' + item.cnName;
						item.value = item.zone;
					});
				}
			});
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
		},
		/* End */

		sendCode() {
			uni.showLoading({
				title: '发送中',
				mask: true
			});
			this.$Ajax(
				'/ajax/sendCode',
				{
					account: this.phone,
					zone: this.zone
				},
				res => {
					if (res.code == 0) {
						this.$tools.toast('发送成功 ');

						this.isSend = false;
						this.remain = this.time + 's后重新获取';
						this.timer = setInterval(() => {
							this.time--;
							this.remain = this.time + 's后重新获取';
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

		next() {
			if (this.phone == '') {
				return this.$tools.toast('请输入手机号');
			}
			if (this.code == '') {
				return this.$tools.toast('请输入验证码');
			}

			this.$Ajax(
				'/front/register/one',
				{
					account: this.phone,
					code: this.code
				},
				res => {
					if (res.code == 0) {
						console.log(JSON.stringify(res));
						this.$tools.jump('../operate/register_next', res.obj, this.zone);
					}
				}
			);
		},

		checkboxChange() {
			this.ischecked = !this.ischecked;
		},
		changeOperateTabsActive(index) {
			this.operateTabsActive = index;
		},

		/* 底部选项卡公用 */
		onPickerConfirm(res, type) {
			console.log('当前控制的Picker是：' + type + ';当前值是' + res.obj.value);

			if (type == 'zonePicker') {
				this.zoneLabel = res.obj.label;
				this.zoneVal = res.obj.value;
				this.zone = res.obj.zone;
			}
		}
	}
};
</script>

<style lang="scss" scoped>
@import '@/common/scss/pages/operate';
</style>
