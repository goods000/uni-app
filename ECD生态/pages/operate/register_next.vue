<template>
	<view class="pages contentBg">
		<view class="header_bar header_border">
			<view class="header">
				<view class="header-back" @click="$tools.back(1)"></view>
				<view class="header-title">密码设置</view>
			</view>
		</view>
		<view class="titleBox">
			<view class="titleBox-wrapper">
				<view class="titleBox-msg">
					设置您的登录密码、交易密码
					<br />
					并填写邀请码
				</view>
			</view>
		</view>

		<view class="main">
			<view class="operateBox">
				<view class="operateBox-wrapper">
					<view class="operateBox-item__label">登录密码</view>
					<view class="operateBox-item">
						<view class="operateBox-item__list">
							<view class="operateBox-item__input" :class="{ 'operateBox-item__input--active': isFocus == 0, showCloseBtn: pwd != '' }">
								<input
									@blur="blurInput(0)"
									@focus="focusInput(0)"
									placeholder-class="operateBox-item__placeholder"
									placeholder="请输入您的登录密码"
									:password="!eyeShowHideArray[0].show"
									v-model="pwd"
								/>
								<view class="operateBox-item__fixedBox">
									<view class="operateBox-item__fixedBox-btn operateBox-item__fixedBox-btn--clear" @click="clearData('pwd')">
										<image src="../../static/public/icon-clear.png" mode="widthFix"></image>
									</view>
									<view class="operateBox-item__fixedBox-btn operateBox-item__fixedBox-btn--eye" @click="toggleEyeStatus(0)">
										<image :src="eyeShowHideArray[0].show ? '../../static/public/icon-eyeShow.png' : '../../static/public/icon-eyeHide.png'" mode="widthFix"></image>
									</view>
								</view>
							</view>
						</view>
					</view>
					<view class="operateBox-item">
						<view class="operateBox-item__label">交易密码</view>
						<view class="operateBox-item__list">
							<view class="operateBox-item__input" :class="{ 'operateBox-item__input--active': isFocus == 1, showCloseBtn: tradePwd != '' }">
								<input
									@blur="blurInput(1)"
									@focus="focusInput(1)"
									placeholder-class="operateBox-item__placeholder"
									placeholder="请输入您的交易密码"
									:password="!eyeShowHideArray[1].show"
									v-model="tradePwd"
								/>
								<view class="operateBox-item__fixedBox">
									<view class="operateBox-item__fixedBox-btn operateBox-item__fixedBox-btn--clear" @click="clearData('tradePwd')">
										<image src="../../static/public/icon-clear.png" mode="widthFix"></image>
									</view>
									<view class="operateBox-item__fixedBox-btn operateBox-item__fixedBox-btn--eye" @click="toggleEyeStatus(1)">
										<image :src="eyeShowHideArray[1].show ? '../../static/public/icon-eyeShow.png' : '../../static/public/icon-eyeHide.png'" mode="widthFix"></image>
									</view>
								</view>
							</view>
						</view>
					</view>
					<view class="operateBox-item">
						<view class="operateBox-item__label">邀请码</view>
						<view class="operateBox-item__input" :class="{ 'operateBox-item__input--active': isFocus == 2, showCloseBtn: parentName != '' }">
							<input @blur="blurInput(2)" @focus="focusInput(2)" placeholder-class="operateBox-item__placeholder" placeholder="请填写邀请码" v-model="parentName" />
							<view class="operateBox-item__fixedBox">
								<view class="operateBox-item__fixedBox-btn operateBox-item__fixedBox-btn--clear" @click="clearData('parentName')">
									<image src="../../static/public/icon-clear.png" mode="widthFix"></image>
								</view>
							</view>
						</view>
					</view>
					<!-- <view class="operateBox-button">
					<view
						class="operateBox-button__btn operateBox-button__btn--blue"
						:class="{ 'operateBox-button__btn--active': pwd != '' && tradePwd != '' }"
						@click="register()"
					>
						注册
					</view>
				</view> -->
				</view>
			</view>
		</view>

		<view class="fixedBox">
			<view class="fixedBox-wrapper">
				<view class="initButton"><view class="initButton-btn initButton-btn--style" @click="register()">完 成</view></view>
			</view>
		</view>
	</view>
</template>

<script>
let WebIM = require("../../utils/WebIM")["default"];
export default {
	data() {
		return {
			zone: '',
			uuid: '',
			phone: '',
			pwd: '',
			tradePwd: '',
			parentName: '',
			deviceId: '',
			// 验证码
			remain: '获取验证码',
			isSend: true,
			time: 60,
			timer: null,
			// 输入框可见及删除
			isFocus: null,
			eyeShowHideArray: [{ show: false }, { show: false }, { show: false }, { show: false }, { show: false }],
			isToggle:true,
			code:0,
		};
	},
	onShow() {
	},
	onLoad(hash) {
		let app = getApp().globalData;
		this.uuid = hash.value1;
		this.zone = hash.value2;
		this.username = hash.value3;
	},
	methods: {
		register() {
			const that = this;
			if(!that.isToggle){
				that.timer = setTimeout(function() {
					clearTimeout(that.timer);
					that.isToggle = true;
				}, 2000);
				return false;
			}
			if (this.pwd == '') {
				return this.$tools.toast('请输入登录密码');
			}
			if (this.tradePwd == '') {
				return this.$tools.toast('请输入交易密码');
			}
			// if (this.parentName == '') {
			// 	return this.$tools.toast('请填写邀请码');
			// }
			console.log("that.isToggle",that.isToggle);
			// if(that.isToggle){
				that.isToggle = false;
				that.$Ajax(
					'/front/register/two',
					{
						pwd: that.pwd,
						tradePwd: that.tradePwd,
						uuid: that.uuid,
						inviteCode: that.parentName,
						deviceId: that.deviceId,
						nickname: that.username,
						zone: that.zone
					},
					res => {
						if (this.code == 0) {
							that.timer = setTimeout(function() {
								clearTimeout(that.timer);
								that.isToggle = true;
							}, 6000);
							that.$tools.toastJump('注册成功', '../operate/login');
						}
					}
				);
			// }
			// var options = {
			//   apiUrl: WebIM.config.apiURL,
			//   username: that.username.toLowerCase(),
			//   password: that.pwd,
			//   nickname: "",
			//   appKey: WebIM.config.appkey,
			//   success: function (res) {
			//     var data = {
			//       apiUrl: WebIM.config.apiURL,
			//       user: that.username.toLowerCase(),
			//       pwd: that.pwd,
			//       grant_type: "password",
			//       appKey: WebIM.config.appkey
			//     };
			//     uni.setStorage({
			//       key: "myUsername",
			//       data: that.username
			//     });
			// 	// return this.$tools.toastJump('注册成功', '../operate/login');
			//   },
			//   error: function (res) {
			//     if (res.statusCode !== "200") {
			//       if (res.statusCode == '400' && res.data.error == 'illegal_argument') {
			//         return uni.showToast({title: "用户名非法",icon:'none'});
			//       }
			//       uni.showToast({title: "用户名已被占用",icon:'none'});
			//     }
			//   }
			// };
			// WebIM.conn.registerUser(options);
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
		/* End */
	}
};
</script>

<style lang="scss" scoped>
@import '/scss/operate';
</style>
