<template>
	<view class="pages">
		<view class="invite">
			<view class="header_bar">
				<view class="invite-top">
					<view class="header">
						<view class="header-back" @click="$tools.back(1)"></view>
						<view class="header-title">邀请二维码</view>
					</view> 
				</view> 
			</view>
			
			<view class="invite-list">
				<view class="invite-list-item" @click="$tools.noOpen()">
					<view class="invite-list-immage">
						<image src="../../static/invite/icon-invite-1.png" mode="widthFix"></image>
					</view>
					<view class="invite-list-title">分享给好友</view>
				</view>
				<view class="invite-list-item" @click="$tools.noOpen()">
					<view class="invite-list-immage">
						<image src="../../static/invite/icon-invite-2.png" mode="widthFix"></image>
					</view>
					<view class="invite-list-title">好友注册</view>
				</view>
				<view class="invite-list-item" @click="$tools.noOpen()">
					<view class="invite-list-immage">
						<image src="../../static/invite/icon-invite-3.png" mode="widthFix"></image>
					</view>
					<view class="invite-list-title">获得奖励</view>
				</view>
			</view>
			
			<view class="invite-box">
				<view class="invite-qrcode">
					<image class="qrcode" v-if="img != ''" :src="img" mode="" />
				</view>
				<view class="invite-cion">邀请码:{{userList.userId}}</view>
				<view class="invite-cion-t">邀请链接</view>
				<view class="invite-code"> {{val}} </view>
				<view class="invite-code-btn" @click="$tools.copy(val)">复制链接</view>
			</view>
			
		</view>
	</view>
</template>

<script>
	import basePthURL from '../../common/js/url.js';
	import QR from '../../components/qrcode/qrcode.js';
	
	export default {
		data() {
			return {
				basePthURL: basePthURL.basePthURL,
				val: '',
				size: 100,
				img: '',
				userList:[]
			}
		},
		onShow() {
			console.log(basePthURL);
		},
		onLoad() {
			this.getUserList();
		},
		methods: {
			// 获取用户信息
			getUserList() {
				this.$Ajax('/user/info', {}, res => {
						if (res.code == 0) {
							this.userList = res.user
							this.val = this.basePthURL+'/register.html?invite='+ res.user.userId;
							console.log(this.val)
							this.creatQrcode();
						}
					}
				);
			},
			creatQrcode() {
				let val = String(this.val);
				if (val == '') {
					return false;
				}
				let img = QR.createQrCodeImg(val, {
					size: parseInt(this.size)
				});
				this.img = img;
			},
		}
	}
</script>

<style>
	@import '@/common/css/style.css';
	.header{background: none !important;}
</style>
