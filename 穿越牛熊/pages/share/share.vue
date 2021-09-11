<template>
	<view class="pages" :data-theme="pageTheme">
		<view class="initHeader initHeader--white">
			<view class="initHeader-wrapper"><view class="initHeader-back" @click="$tools.back(1)"></view></view>
		</view>
		<view class="initBg"><image src="../../static/share/img-share-01.jpg" mode="widthFix"></image></view>
		<view class="main">
			<view class="titleBox">
				<view class="titleBox-wrapper"><image src="../../static/share/icon-title.png" mode="widthFix"></image></view>
			</view>

			<view class="planeBox">
				<view class="planeBox-wrapper">
					<view class="planeBox-shareBox">
						<view class="planeBox-shareBox__label">邀请码</view>
						<view class="planeBox-shareBox__data">
							<text>{{ shareCode }}</text>
							<view class="planeBox-shareBox__copy">
								<image src="../../static/public/icon-copy-light.png" mode="widthFix" @click="$tools.copy(shareCode)"></image>
							</view>
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
								<!-- <tki-qrcode
								    ref="qrcode"
								    :val="shareImg" /> -->

								<!-- <image class="planeBox-qrcode" v-if="shareImg != ''" :src="shareImg" mode="widthFix" /> -->
							</view>
						</view>
					</view>

					<view class="planeBox-button initButton"><view class="initButton-btn initButton-btn--style" @click="$tools.copy(shareAddress)">复制邀请链接</view></view>
				</view>
			</view>
		</view>
	</view>
</template>
<script>
import tkiQrcode from '@/components/tki-qrcode/tki-qrcode.vue';
// import QR from '../../components/qrcode/qrcode.js';

export default {
	components: { tkiQrcode },
	data() {
		return {
			shareAddress: '',
			shareImg: '',
			shareCode: 0,

			ifShow: true,

			size: 280, // 二维码大小
			unit: 'upx', // 单位
			background: '#ffffff', // 背景色
			foreground: '#101010', // 前景色
			pdground: '#101010', // 角标色
			icon: '../../static/public/icon-logo.png', // 二维码图标
			iconsize: 30, // 二维码图标大小
			lv: 3, // 二维码容错级别 ， 一般不用设置，默认就行
			onval: true, // val值变化时自动重新生成二维码
			loadMake: false, // 组件加载完成后自动生成二维码
			src: '' // 二维码生成后的图片地址或base64
		};
	},
	onShow() {
		this.getCopyLink();
	},
	methods: {
		getCopyLink() {
			this.$Ajax('/front/user/shareAddress', {}, res => {
				console.log(JSON.stringify(res));
				if (res.code == 0) {
					this.shareAddress = res.obj.address;
					this.shareCode = res.obj.inviteCode;
					this.$refs.qrcode._makeCode();
				}
			});
		}
	}
};
</script>
<style lang="scss" scoped>
@import '/scss/share';
</style>
