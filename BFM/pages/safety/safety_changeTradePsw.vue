<template>
	<view class="pages">
		<view class="initHeader initHeader--line initHeader--white">
			<view class="initHeader-wrapper">
				<view class="initHeader-back" @click="$tools.back(1)"></view>
				<view class="initHeader-title">修改交易密码</view>
			</view>
		</view>

		<view class="infoBox">
			<view class="infoBox-wrapper">
				<view class="infoBox-desc">当前绑定账号：{{ phone }}</view>
			</view>
		</view>

		<!-- <view class="titleBox">
			<view class="titleBox-title">修改交易密码</view>
			<view class="titleBox-note">向绑定的手机号/邮箱发送验证码</view>
		</view> -->
		<view class="main">
			<view class="operateBox">
				<view class="operateBox-wrapper">
					<view class="operateBox-list">
						<view class="operateBox-list__label">验证码</view>
						<view class="operateBox-list__input" :class="{ 'operateBox-list__input--active': isFocus == 0, showCloseBtn: code != '' }">
							<input @blur="blurInput(0)" @focus="focusInput(0)" placeholder-class="operateBox-list__placeholder" placeholder="请输入验证码" v-model="code" />
							<view class="operateBox-list__fixedBox">
								<view class="operateBox-list__fixedBox-btn operateBox-list__fixedBox-btn--clear" @click="clearData('code')">
									<image src="../../static/public/icon-clear.png" mode="widthFix"></image>
								</view>
								<view class="operateBox-list__fixedBox-verification" @click="sendCode()">{{ remain }}</view>
							</view>
						</view>
					</view>
					<view class="operateBox-list">
						<view class="operateBox-list__label">新交易密码</view>
						<view class="operateBox-list__input" :class="{ 'operateBox-list__input--active': isFocus == 1, showCloseBtn: newPsd != '' }">
							<input
								@blur="blurInput(1)"
								@focus="focusInput(1)"
								placeholder-class="operateBox-list__placeholder"
								placeholder="请输入新交易密码"
								:password="!eyeShowHideArray[1].show"
								v-model="newPsd"
							/>
							<view class="operateBox-list__fixedBox">
								<view class="operateBox-list__fixedBox-btn operateBox-list__fixedBox-btn--clear" @click="clearData('newPsd')">
									<image src="../../static/public/icon-clear.png" mode="widthFix"></image>
								</view>
								<view class="operateBox-list__fixedBox-btn operateBox-list__fixedBox-btn--eye" @click="toggleEyeStatus(1)">
									<image :src="eyeShowHideArray[1].show ? eyeShow : eyeHide" mode="widthFix"></image>
								</view>
							</view>
						</view>
					</view>
					<view class="operateBox-list">
						<view class="operateBox-list__label">确认新交易密码</view>
						<view class="operateBox-list__input" :class="{ 'operateBox-list__input--active': isFocus == 2, showCloseBtn: againPsd != '' }">
							<input
								@blur="blurInput(2)"
								@focus="focusInput(2)"
								placeholder-class="operateBox-list__placeholder"
								placeholder="请输入新交易密码"
								:password="!eyeShowHideArray[2].show"
								v-model="againPsd"
							/>
							<view class="operateBox-list__fixedBox">
								<view class="operateBox-list__fixedBox-btn operateBox-list__fixedBox-btn--clear" @click="clearData('againPsd')">
									<image src="../../static/public/icon-clear.png" mode="widthFix"></image>
								</view>
								<view class="operateBox-list__fixedBox-btn operateBox-list__fixedBox-btn--eye" @click="toggleEyeStatus(2)">
									<image :src="eyeShowHideArray[2].show ? eyeShow : eyeHide" mode="widthFix"></image>
								</view>
							</view>
						</view>
					</view>
					<!-- <view class="operateBox-button">
						<view
							class="operateBox-button__btn operateBox-button__btn--blue"
							:class="{ 'operateBox-button__btn--active': code != '' && newPsd != '' && againPsd != '' }"
							@click="change()"
						>
							修改
						</view>
					</view> -->
				</view>
			</view>
		</view>

		<view class="fixedBox">
			<view class="fixedBox-wrapper">
				<view class="initButton"><view class="initButton-btn initButton-btn--style" @click="change()">修改交易密码</view></view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			phone: '',
			code: '',
			newPsd: '',
			againPsd: '',
			remain: '发送验证码',
			isSend: true,
			time: 60,
			timer: null,

			isFocus: null,

			eyeShow: '../../static/public/icon-eye-open-green.png',
			eyeHide: '../../static/public/icon-eye-close-green.png',
			eyeShowHideArray: [{ show: false }, { show: false }, { show: false }]
		};
	},
	onLoad() {
		this.phone = uni.getStorageSync('gobalUser');
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
			if (!this.isSend) {
				return false;
			}

			uni.showLoading({
				title: '发送中',
				mask: true
			});

			this.$Ajax('/ajax/sendMyCode', {}, res => {
				this.isSend = false;
				this.remain = this.time + 's后可重发';
				this.timer = setInterval(() => {
					this.time--;
					this.remain = this.time + 's后可重发';
					if (this.time == 0) {
						clearInterval(this.timer);
						this.remain = '重新获取';
						(this.isSend = true), (this.time = 60);
					}
				}, 1000);
			});
			uni.hideLoading();
		},

		change() {
			if (this.code == '') {
				return this.$tools.toast('请输入验证码');
			}
			if (this.newPsd == '') {
				return this.$tools.toast('请输入新交易密码');
			}
			if (this.againPsd == '') {
				return this.$tools.toast('请输入新交易密码');
			}
			if (this.newPsd != this.againPsd) {
				return this.$tools.toast('两次输入的密码不一致');
			}

			this.$Ajax(
				'/front/user/findTradePwd',
				{
					newTradePwd: this.newPsd,
					code: this.code
				},
				res => {
					if (res.code == 0) {
						this.$tools.toastBack('修改成功', 1);
					}
				}
			);
		}
	}
};
</script>

<style lang="scss" scoped>
.main {
	padding: 30upx 0;
}

.infoBox {
	padding: 30upx;
	text-align: center;
	color: $globalColor-fontStyle;
	font-size: 32upx;
	font-weight: bold;
}
@import '@/common/scss/pages/operate';
</style>
