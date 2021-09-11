<template>
	<view class="pages">
		<view class="invite">
			
			<view class="header_bar">
				<view class="header">
					<view class="header-goBack" @click="$tools.back(1)"></view>
				</view> 
			</view> 
			<view class="invite-title">推荐得赏金</view>
			
			<view class="invite-box">
				<view class="invite-box-title">邀请码</view>
				<view class="invite-box-code">{{ shareCode }}</view>
				<view class="initBtn" @click="$tools.copy(shareCode)">复制邀请码</view>
				<view class="invite-box-tips">每邀请好友就可以共享平台好礼，邀请越多获得越多</view>
				<view class="invite-box-qrcode">
					<image v-if="shareImg != ''" :src="shareImg" mode="" class="invite-box-qrcode__image"/>
					<image src="../../static/pack/logo.png" mode="" class="logo"></image>
				</view>
				<view class="invite-box-icon">扫码邀请好友</view>
				
			</view>
			
		</view>
	</view>
</template>

<script>
	import QR from '../../components/qrcode/qrcode.js';
	import webUrl from '../../common/js/url.js';
	export default {
		data() {
			return {
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
			this.getUserList();
		},
		methods: {
			// 获取用户信息
			getUserList() {
				this.$Ajax('/front/userPassphrase/shareAddress', {}, res => {
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
		}
	}
</script>

<style lang="scss" scoped>
	@import '@/common/scss/pages/invite/invite';
	page{background: #FFEDC4;}
</style>
