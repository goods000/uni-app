<template>
	<view class="pages">
		<view class="initHeader initHeader--black">
			<view class="initHeader-wrapper"><view class="initHeader-back" @click="$tools.back(1)"></view></view>
		</view>

		<!-- <view class="bgBox"></view> -->

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
						<input @blur="blurInput(0)" @focus="focusInput(0)" placeholder-class="operateBox-list__placeholder" placeholder="请输入邮箱" v-model="phone" />
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
	</view>
</template>

<script>
export default {
	data() {
		return {
			zone: '86',
			phone: '',
			code: '',

			// 验证码
			remain: '发送验证码',
			canSend: true,
			time: 60,
			timer: null,

			// 勾选框
			ischecked: false,

			// 输入框可见及删除
			isFocus: null,
			eyeShow: '../../static/public/icon-eye-open-black.png',
			eyeHide: '../../static/public/icon-eye-close-black.png',
			eyeShowHideArray: [{ show: false }, { show: false }, { show: false }, { show: false }, { show: false }],

			operateTabsActive: 0
		};
	},
	methods: {
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
			if (this.phone == '') {
				return this.$tools.toast('请输入邮箱');
			}
			if(this.canSend){
				this.$Ajax(
					'/ajax/sendCode',
					{
						account: this.phone,
						zone: this.zone
					},
					res => {
						if (res.code == 0) {
							this.$tools.toast('发送成功 ');

							this.canSend = false;
							this.remain = this.time + 's';
							this.timer = setInterval(() => {
								this.time--;
								this.remain = this.time + 's';
								if (this.time == 0) {
									clearInterval(this.timer);
									this.remain = '重新获取';
									(this.canSend = true), (this.time = 60);
								}
							}, 1000);
						}
					}
				);
			}
		},

		next() {
			if (this.phone == '') {
				return this.$tools.toast('请输入邮箱');
			}
			if (this.code == '') {
				return this.$tools.toast('请输入验证码');
			}
			
			let reg =/^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/;
			
			console.log('当前输入的是否邮箱：' + reg.test(this.phone));
			
			if(!reg.test(this.phone)){
				return this.$tools.toast('请输入正确的邮箱账号');
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
						this.$tools.jump('../operate/register_next', res.obj);
					}
				}
			);
		},

		checkboxChange() {
			this.ischecked = !this.ischecked;
		},
		changeOperateTabsActive(index) {
			this.operateTabsActive = index;
		}
	}
};
</script>

<style lang="scss" scoped>
@import '@/common/scss/pages/operate';
</style>
