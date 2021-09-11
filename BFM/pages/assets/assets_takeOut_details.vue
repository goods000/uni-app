<template>
	<view class="pages">
		<view class="initHeader initHeader--white">
			<view class="initHeader-wrapper">
				<view class="initHeader-back" @click="$tools.back(1)"></view>
				<view class="initHeader-title initHeader-title--center">提币详情</view>
			</view>
		</view>
		<view class="infoBox">
			<view class="infoBox-wrapper">
				<view class="infoBox-price">-{{ infoList.quantity }}USDT</view>
				<view class="infoBox-list">
					<view class="infoBox-list__title">类型</view>
					<view class="infoBox-list__data">普通提币</view>
				</view>
				<view class="infoBox-list">
					<view class="infoBox-list__title">提币地址</view>
					<view class="infoBox-list__data">{{ infoList.address }}</view>
				</view>
				<view class="infoBox-list">
					<view class="infoBox-list__title">状态</view>
					<view class="infoBox-list__data">{{ infoList.statusStr }}</view>
				</view>
				<view class="infoBox-list">
					<view class="infoBox-list__title">手续费</view>
					<view class="infoBox-list__data">{{ infoList.rate }} USDT</view>
				</view>
				<view class="infoBox-list">
					<view class="infoBox-list__title">时间</view>
					<view class="infoBox-list__data">{{ infoList.createTime }}</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			id: null,
			infoList: []
		};
	},
	onLoad(hash) {
		this.id = hash.value1;
		console.log(this.id);
	},
	onShow(e) {
		this.getDetails();
	},
	methods: {
		getDetails(id) {
			this.$Ajax(
				'/front/financial/detailInfo',
				{
					type: 2, //type  1 充值  type2 提现
					id: this.id
				},
				res => {
					this.infoList = res.obj;
					console.log(JSON.stringify(res));
				}
			);
		}
	}
};
</script>

<style lang="scss" scoped>
.infoBox {
	&-wrapper {
		padding: 30upx;
	}

	&-price {
		padding: 30upx 0;
		font-size: 54upx;
		color: $globalColor-style;
		border-bottom: 2upx solid #eeeeee;
	}

	&-list {
		padding: 30upx 0;
		border-bottom: 2upx solid #eeeeee;
		display: flex;
		justify-content: space-between;
		font-size: 28upx;
		&__title {
			color: #898d8c;
			flex: 1;
		}
		&__data {
			color: $globalColor-fontStyle;
			flex: 1;
			word-break: break-all;
			text-align: right;
		}
	}
}
</style>
