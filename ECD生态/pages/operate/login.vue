<template>
	<view class="pages">
		<view class="initHeader initHeader--black"><view class="initHeader-wrapper"></view></view>

		<!-- 背景 -->
		<view class="initBg"><image src="../../static/operate/img-bg.png" mode="widthFix"></image></view>

		<view class="titleBox">
			<view class="titleBox-wrapper">
				<view class="titleBox-title">欢迎来到ECD社区</view>
				<view class="titleBox-note">Welcome to ECD community</view>
			</view>
		</view>

		<view class="main">
			<view class="planeBox">
				<view class="planeBox-wrapper">
					<view class="operateBox">
						<view class="operateBox-wrapper">
							<view class="operateBox-item">
								<view class="operateBox-item__label">账号</view>
								<view class="operateBox-item__list">
									<view class="operateBox-item__input" :class="{ 'operateBox-item__input--active': isFocus == 0, showCloseBtn: phone != '' }">
										<input
											@blur="blurInput(0)"
											@focus="focusInput(0)"
											placeholder-class="operateBox-item__placeholder"
											placeholder="请输入您的手机号"
											v-model="phone"
										/>
										<view class="operateBox-item__fixedBox">
											<view class="operateBox-item__fixedBox-btn operateBox-item__fixedBox-btn--clear" @click="clearData('phone')">
												<image src="../../static/public/icon-clear.png" mode="widthFix"></image>
											</view>
										</view>
									</view>
								</view>
							</view>
							<view class="operateBox-item">
								<view class="operateBox-item__label">密码</view>
								<view class="operateBox-item__list">
									<view class="operateBox-item__input" :class="{ 'operateBox-item__input--active': isFocus == 1, showCloseBtn: pwd != '' }">
										<input
											@blur="blurInput(1)"
											@focus="focusInput(1)"
											placeholder-class="operateBox-item__placeholder"
											placeholder="请输入密码"
											:password="!eyeShowHideArray[1].show"
											v-model="pwd"
										/>
										<view class="operateBox-item__fixedBox">
											<view class="operateBox-item__fixedBox-btn operateBox-item__fixedBox-btn--clear" @click="clearData('pwd')">
												<image src="../../static/public/icon-clear.png" mode="widthFix"></image>
											</view>
											<view class="operateBox-item__fixedBox-btn operateBox-item__fixedBox-btn--eye" @click="toggleEyeStatus(1)">
												<image :src="eyeShowHideArray[1].show ? '../../static/public/icon-eyeShow.png' : '../../static/public/icon-eyeHide.png'" mode="widthFix"></image>
											</view>
										</view>
									</view>
								</view>
								<view class="operateBox-row">
									<!-- <view class="operateBox-linkBtn"><text @click="$tools.switchTab('../index/index')">游客模式</text></view> -->
									<view class="operateBox-linkBtn"><text @click="$tools.jump('../operate/forget')">忘记密码？</text></view>
								</view>
								
								
								<view class="operateBox-btn initButton">
									<view class="operateBox-agreement">
										<label :class="[isActive ? 'checkbox-active' : '']" @click="agreement()">
											<view class="checkbox" ></view>
										</label>
										<view class="operateBox-agreement-title">我已阅读并同意</view>
										<view class="operateBox-agreement-name"> 《ECD生态用户协议》</view>
									</view>
									<view class="initButton-btn initButton-btn--style" @click="login()">登录</view>
								</view>
								<view class="operateBox-textButton">
									还没有账号？
									<text class="operateBox-textButton--style" @click="$tools.jump('../operate/register')">点击注册</text>
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>

		<view class="copyrightBox">
			<view class="copyrightBox-wrapper">
				<!-- <view class="copyrightBox-logo"><image src="../../static/operate/icon-copyright-logo.png" mode="widthFix"></image></view> -->
				<view class="copyrightBox-title">ECD生态打造数字资产顶级生态圈</view>
			</view>
		</view>
	</view>
</template>

<script>
let WebIM = require("../../utils/WebIM")["default"];
let disp = require("../../utils/broadcast");
export default {
	data() {
		return {
			zone: '86',
			phone: '',
			pwd: '',
			isActive : true,
			isFocus: null,
			eyeShowHideArray: [{ show: false }, { show: false }, { show: false }]
		};
	},
	onLoad: function () {
		const me = this;
		const app = getApp().globalData;
		disp.on("em.error.passwordErr", function () {
			uni.showToast({title: "用户名或密码错误",icon:'none'});
		});
	},
	methods: {
		agreement(){
			if(!this.isActive){
				this.isActive = true;
			}else{
				this.isActive = false;
			}
		},
		login() {
			const that = this;
			if (that.phone == '') {
				return that.$tools.toast('请输入您的手机号');
			}
			if (that.pwd == '') {
				return that.$tools.toast('请输入密码');
			}
			console.log(111, {
			  apiUrl: WebIM.config.apiURL,
			  user: that.phone,
			  pwd: that.pwd,
			  appKey: WebIM.config.appkey
			})
			that.$Ajax(
				'/front/login',
				{
					account: that.phone,
					pwd: that.pwd
				},
				res => {
					if (res.code == 0) {
						console.log('进来了');   
						uni.setStorageSync('myUser', that.phone);
						uni.setStorageSync('gobalPsw', that.pwd);
						uni.setStorageSync('token', res.obj.token);
						uni.setStorageSync('myUsername', res.obj.nickName);
						uni.setStorageSync('myUuid', res.obj.hxUuid);
						uni.setStorageSync('userId', res.obj.userId);
						var options = {
						    apiUrl: WebIM.config.apiURL,
						    user: res.obj.nickName,
						    pwd: res.obj.name,   //账号密码登录
						    appKey: WebIM.config.appkey,
						    success: function (res) {
						      var token = res.access_token;
							  console.log('token',token);
							  uni.setStorageSync('MItoken', token);
							  that.$tools.toastSwitchTab('登录成功', '../index/index');
						    },
						    error: function(){
						    }
						};
						WebIM.conn.open(options);
						// this.$tools.toastSwitchTab('登录成功', '../index/index');
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
		/* End */
	}
};
</script>

<style lang="scss" scoped>
@import '/scss/operate';
page{
	background: #F5F5F5;
}
.initButton{
	align-items: flex-start;
}
.titleBox {
	margin: 155upx 0 60upx; 
}
.operateBox{
	&-row{
		justify-content: flex-end;
	}
}
</style>
