<template>
	<view class="page">
		<view class="setting">
			<view class="header_bg header_border header_bar">
				<view class="header">
					<view class="header-back" @click="$tools.back(1)"></view>
					<view class="header-title">个人信息</view>
				</view> 
			</view> 
			
			<view class="listBox">
				<view class="listBox-wrapper">
					<view class="listBox-list listBox-list--padding">
						<view class="listBox-list__label">头像</view>
						<view class="listBox-list__edit" @click="chooseImg()">
							<image :src="baseInfo.img" mode=""></image>
						</view>
					</view>
					<!-- <view class="listBox-list" @click="$tools.jump('./username',myUsername)">
						<view class="listBox-list__label">昵称</view>
						<view class="listBox-list__edit">{{myUsername}}</view>
					</view> -->
				</view>
				
				<view class="listBox-wrapper">		
					<view class="listBox-list listBox-list--no"> 
						<view class="listBox-list__label">UID</view>
						<view class="listBox-list__edit listBox-list__edit--width">{{baseInfo.hxUuid}}</view>
						<view class="listBox-list__copy" @click="$tools.copy(baseInfo.hxUuid)">
							<image src="../../static/public/icon-copy.png" mode="widthFix"></image>
						</view>
					</view>
				</view>
				<!-- <view class="listBox-wrapper">
					<view class="listBox-list listBox-list--no"> 
						<view class="listBox-list__label">邀请码</view>
						<view class="listBox-list__edit">{{baseInfo.inviteCode}}</view>
						<view class="listBox-list__copy" @click="$tools.copy(baseInfo.inviteCode)">
							<image src="../../static/public/icon-copy.png" mode="widthFix"></image>
						</view>
					</view>
				</view> -->
				<view class="listBox-wrapper" @click="$tools.jump('../share/share')">
					<view class="listBox-list"> 
						<view class="listBox-list__label">邀请码</view>
					</view>
				</view>
			</view>
			
			<view class="fixedBox">
				<view class="fixedBox-wrapper">
					<view class="initButton"><view class="initButton-btn initButton-btn--red"  @click="logout()">退出登录</view></view>
				</view>
			</view>
			
		</view>
	</view>
</template>

<script>
	let WebIM = require("../../utils/WebIM")["default"];
	import weburl from '../../common/js/url.js';
	export default {
		data() {
			return {
				username:'两广专业炒币~',
				uploadList:{src:'../../static/pack/logo.png'},
				baseInfo: [],
			}
		},
		onShow() {
			this.myUsername = uni.getStorageSync('myUsername');
			console.log(this.loginStatus);
			this.init();
		},
		methods: {
			init(){
				this.getUserList(); 
			},
			chooseImg() {
				let that = this;
				var token = uni.getStorageSync('token');
				uni.chooseImage({
					count: 1, //默认9
					sizeType: ['compressed'], //可以指定是原图还是压缩图，默认二者都有
					// sourceType: ['camera', 'album'], //从相册选择
					sourceType: ['album'], //从相册选择
					success: res => {
						this.baseInfo.img = res.tempFilePaths[0];
						let token = uni.getStorageSync('token');
						let files = [];
						files.push({ name: 'file', uri: this.baseInfo.img });
						let data = {
							token: token,
							// file: this.baseInfo.img,
						};
						uni.uploadFile({
							url: weburl.webUrl + '/front/user/userImage',
							files: files,
							header: { token: token },
							formData: data,
							success: res => {
								var data = JSON.parse(res.data);
								if (data.code == 0) {
									that.$tools.toast('头像修改成功');
								} else {
									that.$tools.toast(data.msg);
								}
							},
							fail(err) {},
							complete: res => {
								uni.hideLoading();
							}
						});
					},
					fail: function() {
						console.log('上传图片接口调用失败');
						return;
					}
				});
			},
			// 获取用户信息
			getUserList() {
				this.$Ajax('/front/user/baseInfo', {}, res => {
						if (res.code == 0) {
							this.baseInfo = res.obj;
							// if(this.userList.phone != null){
							// 	this.userList.phone = this.userList.phone.substring(0,3) + "****" + this.userList.phone.substring(7);
							// 	// console.log(this.userList.phone)
							// }
						}
					}
				);
			},
			logout() {
				let that = this;
				this.$Ajax('/front/logout', {}, res => {
					uni.removeStorage({
						key: 'token',
						success() {
							uni.setStorageSync("INFORM",[])
							WebIM.conn.close(); // uni.closeSocket()
							// that.$tools.toastJump('安全退出成功', '../operate/login');
						}
					});
				});
			},
		}
	}
</script>

<style lang="scss" scoped>
	@import '../user/scss/user';
	.initBtn{margin-top: 30%};
	.listBox{
		&-list{
			margin-left: 30upx;
			padding-left: 0px;
		}
	}
</style>
