<template>
	<view class="pages">
		<view class="header_bar">
			<view class="header">
				<view class="header-back--white" @click="$tools.back(1)"></view>
				<view class="header-title"></view>
			</view> 
		</view> 
		
		<view class="invite-box">
			<view class="invite-box-qrcode">
				<image class="invite-box-qrcode__code" v-if="shareImg != ''" :src="shareImg" mode="" />
				<image src="../../static/pack/logo.png" mode="width" class="invite-box-qrcode__logo"></image>
			</view>
			<view class="invite-box-title">邀请码</view>
			<view class="invite-box-code">{{ shareCode }}</view>
			<view class="invite-btn" @click="$tools.copy(shareAddress)">复制</view>
			
		</view>
		
	</view>
</template>

<script>
	import QR from '../../components/qrcode/qrcode.js';
	import webUrl from '../../common/js/url.js';
	export default {
			data(){
				return{
					webUrl: webUrl.webUrl,
					val: '',
					size: 100,
					shareAddress : '',
					shareImg: '',
					shareCode: 0,
					userList:[],
				}
			},
			onShow() {
				this.init();
			},
			methods: {
				init(){
					this.getUserList();
				},
				// 获取用户信息
				getUserList() {
					this.$Ajax('/front/user/shareAddress', {}, res => {
							console.log(JSON.stringify(res));
							if (res.code == 0) {
								this.shareAddress = res.obj.address;
								console.log(this.shareAddress)
								this.shareCode = res.obj.code;
								console.log(this.shareCode)
								this.shareImg = this.creatQrcode(this.shareAddress);
							}
						}
					);
				},
				creatQrcode(url) {
					if (url == '') {
						return false;
					}
					let img = QR.createQrCodeImg(url);
					return img;
				}
			},
		}
	</script>

<style lang="scss" scoped>
	@import './scss/share';
</style>
