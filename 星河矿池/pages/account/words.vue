<template>
	<view class="pages">
		<view class="import">
			<view class="header_bar">
				<view class="header">
					<view class="header-back" @click="$tools.back(1)"></view>
					<view class="header-title">导出{{type == 1 ? '助记词' : '私钥'}}</view>
				</view> 
			</view> 
			
			<view class="exportBox">
				<view class="exportBox-image">
					<image src="../../static/operate/icon-success.png" mode="widthFix"></image>
				</view>
				<view class="exportBox-title">导出成功</view>
			</view>
			
			<view class="exportBox-list">
				<view class="exportBox-list-item">
					<view class="exportBox-list-item--name">钱包地址</view>
					<view class="exportBox-list-item--info">
						<view class="exportBox-list-item--info__item">{{userList.address}}</view>
						<image src="../../static/public/icon-record.png" mode="widthFix" @click="$tools.copy(userList.address)"></image>
					</view>
				</view>
				<view class="exportBox-list-item" v-if="type == 2">
					<view class="exportBox-list-item--name">私钥</view>
					<view class="exportBox-list-item--info">
						<view class="exportBox-list-item--info__item">{{userList.privateKey}}</view>
						<image src="../../static/public/icon-record.png" mode="widthFix" @click="$tools.copy(userList.privateKey)"></image>
					</view>
				</view>
				<view class="exportBox-list-item" v-if="type == 1">
					<view class="exportBox-list-item--name">助记词</view>
					<view class="exportBox-list-item--info">
						<view class="exportBox-list-item--info__item">{{userList.passphrase}}</view>
						<image src="../../static/public/icon-record.png" mode="widthFix" @click="$tools.copy(userList.passphrase)"></image>
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
				userList:{},
				type:'',
				address:'s3Y8VTUQNhsYmtJDUrsSFKXgTKLze2HJJb',
				privateKey:'sLupnmjtQyGq5UmuMBQ28Pqwmx472GMeT',
				passphrase:'sLupnmjtQyGq5UmuMBQ28Pqwmx472GMeT',
			}
		},
		onLoad(value) {
			this.type = value.value1;
		},
		onShow() {
			this.getUserList();
		},
		methods: {
			// 获取用户信息
			getUserList() {
				this.$Ajax('/front/userPassphrase/baseInfo', {}, res => {
						if (res.code == 0) {
							this.userList = res.obj;
						}
					}
				);
			},
		},
	}
</script>

<style lang="scss" scoped>
	@import '@/common/scss/pages/account/account';
	page{background: #FFFFFF;}
	.exportBox{
		&-list{
			@include flexLeftColumn;
			padding: 150upx 30upx 0;
			&-item{
				margin: 44upx 0;
				width: 100%;
				&--name{
					color: #666666;
					font-size: 20upx;
					margin-bottom: 10upx;
				}
				&--info{
					@include flexBetween;
					position: relative;
					&__item{
						color: $globalColor-fontStyle;
						font-size: 28upx;
						font-weight: bold;
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
