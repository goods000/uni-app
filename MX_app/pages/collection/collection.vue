<template>
	<view class="pages">
		<view class="collection">
			<view class="header_bar">
			<view class="header">
				<view class="header-back" @click="$tools.back(1)"></view>
				<view class="header-title">收款码</view>
			</view> 
			</view> 
			
			<view class="collection-box">
				<view class="collection-image">
					<image src="../../static/logo.png" mode=""></image>
				</view>
				<view class="collection-name">{{userList.username}}</view>
				<view class="collection-uid">UID:{{userList.userId}}</view>
				<view class="collection-txt">扫描下方二维码收款</view>
				<view class="collection-qrcode">
					<image class="qrcode" v-if="img != ''" :src="img" mode="widthFix" />
				</view>
			</view>
			
		</view>
	</view>
</template>

<script>
	import QR from '../../components/qrcode/qrcode.js';
	
	export default {
		data() {
			return {
				val: 'sdgasgdsgg',
				size: 100,
				img: '',
				userList:[]
			}
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
							this.val = res.user.userId;
							console.log(this.val)
							this.creatQrcode();
						}
					}
				);
			},
			creatQrcode() {
				console.log("12314")
				let val = String(this.val);
				if (val == '') {
					return false;
				}
				console.log("14")
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
