<template>
	<view class="pages">
		<view class="import setup">
			
			<view class="importBox-header">
				<view class="importBox-header-left" @click="$tools.back(1)">
					<image src="../../static/operate/icon-back.png" mode="widthFix"></image>
				</view>
			</view>
			
			<view class="importBox-txt">备份助记词和私钥</view>
			
			<view class="importBox-list">
				<view class="importBox-list-item-label">钱包地址</view>
				<view class="importBox-list-item">
					<input type="text" :value="address" placeholder-style="color:#999999" disabled/>
					<image src="../../static/operate/icon-copy.png" mode="widthFix" @click="$tools.copy(address)"></image>
				</view>
				<view class="importBox-list-item-label">助记词</view>
				<view class="importBox-list-wordsBox">
					<view class="importBox-list-wordsBox-words" v-for="(item,index) in wordsList" :key="index">
						<view class="importBox-list-wordsBox-words__tips">{{index+1}}</view>
						<view class="importBox-list-wordsBox-words__txt">{{item}}</view>
					</view>
				</view>
				<view class="importBox-list-item-label">钱包私钥</view>
				<view class="importBox-list-item">
					<input type="text" :value="privateKey" placeholder-style="color:#999999" disabled/>
					<image src="../../static/operate/icon-copy.png" mode="widthFix" @click="$tools.copy(privateKey)"></image>
				</view>
				
			</view>
			
			<view class="importBox-btn">
				<view class="initBtn" @click="$tools.jump('./checkWords');">
					马上验证
				</view>
			</view>
			
			<view class="setup-title">
				<view class="setup-title-txt">注意：</view>
				<view class="setup-title-txt">请务必认真抄写助记词和私钥，并安全保管切勿泄露，如丢失将无法找回您的资产，且无法恢复。</view>
			</view>
			
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				address:'',
				privateKey:'',
				wordsList:['GLIB','UN','TOLD','ALIA','DEAL','ITS','MY','FAME','OBEY','BAH','LEON','DRAM']
			}
		},
		onShow() {
			let information = uni.getStorageSync('information');
			// console.log("information:",information);
			// if (!uni.getStorageSync('wordsList') || !uni.getStorageSync('address')) {
			if (!uni.getStorageSync('wordsList')) {
				this.getword();
			} else {
				this.wordsList = uni.getStorageSync('wordsList');
				this.address = uni.getStorageSync('address').address;
				this.privateKey = uni.getStorageSync('address').key;
			}
		},
		methods: {
			getword() {
				this.$Ajax('/front/address/get/passphrase', {}, res => {
					if (res.code == 0) {
						this.address = res.obj.address;
						this.privateKey = res.obj.privateKey;
						this.wordsList = res.obj.passphrase.split(' ');
						const obj = {address: this.address, key:this.privateKey}
						uni.setStorageSync('address', obj);
						uni.setStorageSync('wordsList', this.wordsList);
					}
				});
			},
		}
	}
</script>

<style lang="scss" scoped>
	@import '@/common/scss/pages/operate/import';
	page{background: #FFFFFF;}
	.importBox-list-item{background: rgba(221,229,238,0.24);}
	.importBox-list-wordsBox-words{background: rgba(221,229,238,0.24);}
</style>
