<template>
	<view class="pages">
		<view class="import">
			<view class="header_bar header_bg">
				<view class="header">
					<view class="header-back" @click="$tools.back(1)"></view>
					<view class="header-title">导出助记词</view>
				</view> 
			</view> 
			
			<view class="exportBox">
				<view class="exportBox-image">
					<image src="../../static/operate/icon-success.png" mode="widthFix"></image>
				</view>
				<view class="exportBox-title">钱包地址助记词备份成功</view>
				<view class="exportBox-tips">请务必认真抄写助记词和私钥，建议您在使用钱包前做好备份，并安全保管切勿泄露，如丢失将无法找回您的资产，且无法恢复。</view>
			</view>
			
			<view class="exportBox-list">
				<view class="exportBox-list-item">
					<view class="exportBox-list-item--name">钱包地址</view>
					<view class="exportBox-list-item--info">
						<view class="exportBox-list-item--info__item">{{addresss}}</view>
						<image src="../../static/operate/icon-copy.png" mode="widthFix" @click="$tools.copy(addresss)"></image>
					</view>
				</view>
				<view class="exportBox-list-item">
					<view class="exportBox-list-item--name">私钥</view>
					<view class="exportBox-list-item--info">
						<view class="exportBox-list-item--info__item">{{privateKey}}</view>
						<image src="../../static/operate/icon-copy.png" mode="widthFix" @click="$tools.copy(privateKey)"></image>
					</view>
				</view>
				<view class="exportBox-list-item">
					<view class="exportBox-list-item--name">助记词</view>
					<view class="exportBox-list-item--info">
						<view class="exportBox-list-item--info__item">{{passphrase}}</view>
						<image src="../../static/operate/icon-copy.png" mode="widthFix" @click="$tools.copy(passphrase)"></image>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				addresss:'',
				privateKey:'',
				passphrase:'',
			}
		},
		onLoad(value) {
			this.addresss = value.value1;
			this.privateKey = value.value2;
			this.passphrase = value.value3;
		},
		onShow() {
		},
		methods: {
			
		},
	}
</script>

<style lang="scss" scoped>
	@import '@/common/scss/pages/operate/import';
	page{background: #FFFFFF;}
	.exportBox{
		&-list{
			@include flexLeftColumn;
			padding: 150upx 53upx 0;
			&-item{
				margin: 44upx 0;
				width: 100%;
				&--name{
					color: $globalColor-fontStyle;
					font-size: 20upx;
				}
				&--info{
					@include flexBetween;
					position: relative;
					&__item{
						color: $globalColor-fontStyle;
						font-size: 28upx;
						word-wrap: break-word;
						width: 90%;
					}
					image{
						width: 20upx;
						height: 20upx;
						display: inline-table;
					}
				}
			}
		}
	}
</style>
