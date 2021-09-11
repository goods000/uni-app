<template>
	<view class="pages">
		<view class="initHeader  initHeader--white">
			<view class="initHeader-wrapper">
				<view class="initHeader-back" @click="$tools.back()"></view>
				<view class="initHeader-title">记录详情</view>
			</view>
		</view>
		<view class="infoBox">
			<view class="infoBox-wrapper">
				<view class="infoBox-label">{{ detailInfo.currencyName }}({{ detailInfo.typeStr }})</view>
				<view class="infoBox-data">{{ detailInfo.type == 2 || detailInfo.type == 4 || detailInfo.type == 8 ? detailInfo.fee : detailInfo.amount }}</view>
			</view>
		</view>
		<view class="listBox">
			<view class="listBox-wrapper">
				<view class="listBox-list">
					<view class="listBox-list__label">类型</view>
					<view class="listBox-list__data">{{ detailInfo.typeStr }}</view>
				</view>
				<view class="listBox-list">
					<view class="listBox-list__label">转出地址</view>
					<view class="listBox-list__data listBox-list__data--blue">{{ detailInfo.fromAddress }}</view>
				</view>
				<view class="listBox-list" v-if="detailInfo.type != 2">
					<view class="listBox-list__label">转入地址</view>
					<view class="listBox-list__data listBox-list__data--blue">{{ detailInfo.toAddress }}</view>
				</view>
				<view class="listBox-list">
					<view class="listBox-list__label">ID</view>
					<view class="listBox-list__data listBox-list__data--blue">{{ detailInfo.txHash }}</view>
				</view>
				<view class="listBox-list">
					<view class="listBox-list__label">矿工费</view>
					<view class="listBox-list__data">{{ detailInfo.fee }}{{ detailInfo.currencyName }}</view>
				</view>
				<view class="listBox-list">
					<view class="listBox-list__label">时间</view>
					<view class="listBox-list__data">{{ detailInfo.createTime }}</view>
				</view>
				<view class="listBox-list">
					<view class="listBox-list__label">块高</view>
					<view class="listBox-list__data">{{ detailInfo.height != null ? detailInfo.height : '---' }}</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			typeList: ['转账', '激活账号', '挖矿收益', '提币'],
			id: 0,
			detailInfo: []
		};
	},
	onLoad(hash) {
		this.id = hash.value1;
	},
	onShow() {
		this.getDetail();
	},
	methods: {
		getDetail() {
			this.$Ajax(
				'/front/transfer/tx/detail',
				{
					id: this.id
				},
				res => {
					console.log(JSON.stringify(res));
					if (res.code == 0) {
						this.detailInfo = res.obj;
					}
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
		@include flexBetween;
		border-bottom: 1upx solid #333333;
	}

	&-label {
		@include initBeforeHolder;
		padding-left: 20upx;
		color: #ffffff;
		font-size: 32upx;
		font-weight: bold;
	}

	&-data {
		color: $globalColor-style;
		font-size: 28upx;
		font-weight: bold;
	}
}

.listBox {
	&-wrapper {
		padding: 30upx;
	}

	&-list {
		@include flexBetween;
		align-items: flex-start;
		margin-bottom: 30upx;

		&__label {
			color: #999999;
			font-size: 28upx;
			width: 200upx;
		}

		&__data {
			word-break: break-all;
			text-align: right;
			flex: 1;
			color: #ffffff;
			font-size: 28upx;
			font-weight: bold;
			&--blue {
				color: $globalColor-style;
			}
		}
	}
}
</style>
