<template>
	<view class="pages">
		<view class="initHeader initHeader--line initHeader--white">
			<view class="initHeader-wrapper">
				<view class="initHeader-back" @click="$tools.back(1)"></view>
				<view class="initHeader-title">划转记录</view>
			</view>
		</view>

		<view class="listBox">
			<view class="listBox-wrapper">
				<view class="initNoData" v-if="recordList.length == 0">暂无数据</view>
				<view class="listBox-list" v-for="(item, index) in recordList" :key="index">
					<view class="listBox-list__header">
						<view class="listBox-list__title">{{ item.createTime }}</view>
					</view>
					<view class="listBox-list__content">
						<view class="listBox-list__item">
							<view class="listBox-list__item-label">币种</view>
							<view class="listBox-list__item-data">{{ item.currencyName }}</view>
						</view>
						<view class="listBox-list__item">
							<view class="listBox-list__item-label">兑换数量(BFM)</view>
							<view class="listBox-list__item-data">{{ item.oamount }}</view>
						</view>
						<view class="listBox-list__item">
							<view class="listBox-list__item-label">获得数量(BLJ)</view>
							<view class="listBox-list__item-data">{{ item.tamount }}</view>
						</view>
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
			recordList: [],
			currencyName: '',
			currencyId: '',
			walletList: ['币币钱包', '法币钱包', '矿池钱包'],
			// 页数
			pageSize: 20,
			pageNum: 1,
			pages: 0
		};
	},
	onLoad(option) {
		this.currencyId = option.value1;
		this.currencyName = option.value2;
	},
	onShow(e) {
		this.init();
	},
	onReachBottom() {
		if (this.pageNum >= this.pages) {
			return this.$tools.toast('到底了');
		} else {
			this.pageNum++;
			this.getRecord();
		}
	},
	methods: {
		init() {
			this.recordList = [];
			this.getRecord();
		},
		getRecord() {
			this.$Ajax(
				'/front/inner/transfer/list',
				{
					pageSize: this.pageSize,
					pageNum: this.pageNum
				},
				res => {
					console.log(JSON.stringify(res));
					if (res.code == 0) {
						this.pages = res.obj.pages;
						this.recordList = this.recordList.concat(res.obj.list);
					}
				}
			);
		}
	}
};
</script>

<style lang="scss" scoped>
.listBox {
	&-wrapper {
		padding: 30upx 0;
	}

	&-list {
		padding: 0 30upx;
		margin-bottom: 30upx;
		// border-bottom: 1upx solid #666666;
		&__header {
			@include flexBetween;
			height: 60upx;
			// background-color: red;
		}

		&__content {
			@include flexBetween;
			padding: 15upx 0;
			margin-bottom: 15upx;
		}

		&__title {
			color: $globalColor-fontStyle;
			font-size: 32upx;
			font-weight: bold;
			@include initBeforeHolder;
		}

		&__btn {
			@include flexCenter;
			font-size: 24upx;
			color: $globalColor-style;
			border: 1upx solid $globalColor-style;
			border-radius: 8upx;
			text-align: center;
			padding: 8upx 15upx;
		}

		&__item {
			flex: 1;
			font-size: 24upx;
			text-align: center;
			color: $globalColor-fontStyle;

			&:first-child {
				text-align: left;
			}
			&:last-child {
				text-align: right;
			}
			&--long {
				flex: 2;
			}

			&-label {
				color: #999999;
				margin-bottom: 8upx;
			}
		}
		&__msg {
			font-size: 24upx;
			color: #999999;
			text {
				color: $globalColor-fontStyle;
			}
		}
	}
}
</style>
