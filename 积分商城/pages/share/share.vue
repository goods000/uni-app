<template>
	<view class="pages">
		<view class="initHeader initHeader--white initHeader--absolute">
			<view class="initHeader-wrapper">
				<view class="initHeader-back" @click="$tools.back(1)"></view>
				<view class="initHeader-title">邀请好友</view>
			</view>
		</view>
		<view class="main">
			<view class="titleBox">
				<view class="titleBox-wrapper">
					<image src="../../static/share/icon-title.png" mode="widthFix"></image>
					<view class="titleBox-wrapper-title">INVITE FRIENDS TO WIN NICE GIFTS</view>
				</view>
			</view>

			<view class="planeBox">
				<view class="planeBox-wrapper">
					<view class="planeBox-shareBox">
						<view class="planeBox-shareBox__label">邀请码</view>
						<view class="planeBox-shareBox__data">
							<text>{{ shareCode }}</text>
							<!-- <view class="planeBox-shareBox__copy">
								<image src="../../static/public/icon-copy-style.png" mode="widthFix" @click="$tools.copy(shareCode)"></image>
							</view> -->
						</view>
					</view>

					<view class="planeBox-qrcode">
						<view class="planeBox-qrcode__wrapper">
							<view class="planeBox-qrcode__code">
								<tki-qrcode
									cid="qrcode1"
									ref="qrcode"
									:val="shareAddress"
									:size="size"
									:unit="unit"
									:background="background"
									:foreground="foreground"
									:pdground="pdground"
									:icon="icon"
									:iconSize="iconsize"
									:lv="lv"
									:onval="onval"
									:loadMake="loadMake"
									:usingComponents="true"
								/>
							</view>
							<view class="planeBox-qrcode__note">扫描二维码注册账号</view>
						</view>
					</view>

					<view class="planeBox-button initButton"><view class="initButton-btn initButton-btn--style" @click="$tools.copy(shareAddress)">复制邀请链接</view></view>
				</view>
			</view>

			<view class="bgBox"></view>
		</view>
		
		<!-- <view class="mafu" id="qrcode"><image class="imageMa" v-if="img != ''" :src="img" mode="widthFix" /></view>
		<view class="shareCode">你的邀请码为: {{ shareCode }}</view> -->
	</view>
</template>
<script>
import tkiQrcode from '@/components/tki-qrcode/tki-qrcode.vue';

export default {
	components: { tkiQrcode },
	data() {
		return {
			// shareAddress: 'https://mixushop.online/register.html?uid=912905483',
			// shareAddress: '请重新进入页面刷新',
			shareAddress: '',
			shareImg: '',
			shareCode: '',
			ifShow: true,
			val: '二维码', // 要生成的二维码值
			size: 280, // 二维码大小
			unit: 'upx', // 单位
			background: '#ffffff', // 背景色
			foreground: '#101010', // 前景色
			pdground: '#101010', // 角标色
			icon: '../../static/pack/logo.png', // 二维码图标
			iconsize: 30, // 二维码图标大小
			lv: 3, // 二维码容错级别 ， 一般不用设置，默认就行
			onval: false, // val值变化时自动重新生成二维码
			loadMake: true, // 组件加载完成后自动生成二维码
			src: '' // 二维码生成后的图片地址或base64
		};
	},
	onLoad() {
		this.getCopyLink();
	},
	onShow() {
		this.getCopyLink();
	},
	methods: {
		getCopyLink() {
			this.$Ajax('/front/user/shareAddress', {}, res => {
				// console.log(JSON.stringify(res));
				if (res.code == 0) {
					this.shareAddress = res.obj.address;
					let codeDate = res.obj.address.split('uid=');
					this.shareCode = codeDate[1];
					// this.shareCode = res.obj.code;
					this.$refs.qrcode._makeCode();
					// this.shareImg = this.creatQrcode(this.shareAddress);
				}
			});
		},
		creatQrcode(url) {
			if (url == '') {
				return false;
			}
			let img = QR.createQrCodeImg(url);
			console.log(img);
			return img;
		}
	}
};
</script>
<style lang="scss" scoped>
@import '@/common/scss/pages/share/share';
</style>
