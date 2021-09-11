<template>
	<view class="pages">
		<view class="invite">
			
			<view class="header_bar">
				<view class="header">
					<view class="header-white" @click="$tools.back(1)"></view>
					<view class="header-title-white">{{ i18n.user.list_08 }}</view>
				</view> 
			</view> 
			<view class="invite-title">{{ i18n.invite.title }}</view>
			
			<view class="invite-box">
				<view class="invite-box-title">{{ i18n.invite.code }}</view>
				<view class="invite-box-code"> {{ shareCode }}
					<image class="invite-box-copy" src="../../static/invite/icon-copy.png" @click="$tools.copy(shareCode)" mode="" />
				</view>
				
				<view class="invite-box-qrcode">
					<image class="qrcode" v-if="shareImg != ''" :src="shareImg" mode="" />
				</view>
				<view class="invite-box-url">{{ shareAddress }}</view>
				
				<view class="initBtn" @click="$tools.copy(shareAddress)">{{ i18n.global.copy }}{{ i18n.invite.url }}</view>
				
				
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
		computed: {
			i18n() {
				return this.$t('message');
			}
		},
		onShow() {
			this.getUserList();
		},
		methods: {
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
		}
	}
</script>

<style lang="scss" scoped>
	@import '@/common/scss/pages/invite/invite';
	page{background: #FFEDC4;}
</style>
