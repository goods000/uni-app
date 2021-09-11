<template>
	<view class="pages">
		<view class="operateBox">
			<view class="header_bar">
				<view class="header">
					<view class="header-goBack" @click="$tools.back(1)"></view>
				</view> 
			</view> 
			<view class="firstBox-titleBox">
				<view class="firstBox-titleBox-wrapper">备份助记词</view>
				<view class="firstBox-titleBox-title">请按从左至右依次记住下方12个助记词顺序，我们 将在下一步验证</view>
			</view>
			<view class="operateBox-tabs">
				<view class="operateBox-formBox">
					<view class="operateBox-formBox-list-header"></view>
					<view class="operateBox-formBox-list operateBox-formBox-list-titleWords">
						<view class="operateBox-formBox-list-words" v-for="(item,index) in wordList" :key="index">
							{{item}}
						</view>
					</view>
				</view>
			</view>
			<view class="operateBox-bottomBox">
				<view class="operateBox-btn">
					<view class="operateBox-btn-chioce" @click="$tools.jump('./mnemonic_words')">下一步</view>
				</view>
			</view>
			
			
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				words:'',
				wordList:[{title:'GLIB'},{title:'UN'},{title:'TOLD'},{title:'DEAL'},{title:'ITS'},{title:'MY'},{title:'FAME'},{title:'OBEY'},{title:'BAH'},{title:'LEON'},{title:'DRAM'}],
			}
		},
		onShow() {
			if (!uni.getStorageSync('wordList')) {
				this.getword();
			} else {
				this.wordList = uni.getStorageSync('wordList');
			}
		},
		methods: {
			getword() {
				this.$Ajax('/front/passphrase/get', {}, res => {
					if (res.code == 0) {
						this.wordList = res.obj;
						console.log(this.wordList);
						uni.setStorageSync('wordList', this.wordList);
					}
				});
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import '@/common/scss/pages/operate/register';
</style>
