<template>
	<view class="pages">
		<view class="initHeader initHeader--white">
			<view class="initHeader-wrapper">
				<view class="initHeader-back" @click="$tools.back(1)"></view>
				<view class="initHeader-title">选择账户</view>
			</view>
		</view>
		<view class="main">
			<view class="formBox">
				<view class="formBox-wrapper">
					<view class="initNoData" v-if="assetsModeList.length == 0">暂无数据</view>
					<view class="formBox-list" v-for="(item, index) in assetsModeList" :key="index" @click="selectMode(item.key)">
						<view class="formBox-list__label">{{ item.name }}</view>
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
			assetsModeList: []
		};
	},
	onShow() {
		this.init();
	},
	methods: {
		init() {
			this.getAssetsMode();
		},
		getAssetsMode(assetType) {
			this.$Ajax('/front/financial/getWalletList', {}, res => {
				if (res.code == 0) {
					this.assetsModeList = res.obj;
					this.assetsModeList.forEach((item, key)=>{
						if(item.key == 1){
							this.assetsModeList.splice(key,1);
						}
					})
					console.log(JSON.stringify(this.assetsModeList));
				}
			});
		},
		selectMode(key){
			uni.setStorageSync('assetsMode', key);
			this.$tools.back();
		}
	}
};
</script>

<style lang="scss" scoped>
.formBox {
	&-list {
		@include flexBetween;
		padding: 30upx;
		border-bottom: 1upx solid #333333;
		border-top: 1upx solid #333333;
		margin-bottom: 15upx;
		&__label {
			font-size: 32upx;
			color: #FFFFFF;
		}
		&__switch {
			@include flexRight;
			transform: translateX(15upx);
		}
		&__data {
			background-position: right center;
			background-repeat: no-repeat;
			background-size: 14upx 26upx;
			background-image: url(../../static/public/icon-arrow-right-grey.png);
			color: #99999d;
			font-size: 28upx;
			padding-right: 30upx;
		}

		&:first-child {
			border-top: 0;
		}
	}
}
</style>
