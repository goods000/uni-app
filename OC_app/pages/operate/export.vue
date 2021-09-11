<template>
	<view class="pages">
		<view class="import">
			<view class="importBox-header">
				<view class="importBox-title">导出助记词</view>
			</view>
			
			<view class="exportBox">
				<view class="exportBox-image">
					<image src="../../static/operate/icon-success.png" mode="widthFix"></image>
				</view>
				<view class="exportBox-title">钱包地址助记词备份成功</view>
				<view class="exportBox-tips">请务必认真抄写助记词和私钥，建议您在使用钱包前做好备份，并安全保管切勿泄露，如丢失将无法找回您的资产，且无法恢复。</view>
			</view>
			
			<view class="exportBox-btn">
				<view class="initBtn" @click="submit()">
					进入APP
				</view>
			</view>
			
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		onLoad(value) {
			this.passphrase = value.value1;
		},
		onShow() {
			this.information = uni.getStorageSync('information');
			console.log("information:",this.information);
			uni.removeStorageSync('address');
			uni.removeStorageSync('wordsList');
			uni.removeStorageSync('sortArr');
			uni.removeStorageSync('wordsArr');
		},
		methods: {
			submit(){
				console.log(this.passphrase);
				console.log(this.information.name);
				console.log(this.information.pwd);
				this.$Ajax(
					'/front/address/import/bypassphrase',
					{
						passphrase: this.passphrase,
						name: this.information.name,
						pwd: this.information.pwd,
					},
					res => {
						console.log(JSON.stringify(res));
						if (res.code == 0) {
							uni.setStorageSync('token', res.obj.token);
							uni.setStorageSync('userId', res.obj.userId);
							// uni.setStorageSync('passphrase', this.words);
							
							uni.removeStorageSync('information');
							uni.removeStorageSync('address');
							uni.removeStorageSync('wordsList');
							uni.removeStorageSync('sortArr');
							uni.removeStorageSync('wordsArr');
							this.$tools.toastSwitchTab(res.msg, '../index/index');
						}
					}
				); 
			}
		},
		onBackPress(e) {
			console.log("禁止返回");
			return true
		}, 
		onHide: function() {
			console.log("页面销毁了。。。")
			uni.removeStorageSync('address');
			uni.removeStorageSync('wordsList');
			uni.removeStorageSync('sortArr');
			uni.removeStorageSync('wordsArr');
		},
		onUnload: function() {
			console.log("页面卸载了。。。")
			uni.removeStorageSync('address');
			uni.removeStorageSync('wordsList');
			uni.removeStorageSync('sortArr');
			uni.removeStorageSync('wordsArr');
		}
	}
</script>

<style lang="scss" scoped>
	@import '@/common/scss/pages/operate/import';
	page{background: #FFFFFF;}
</style>
