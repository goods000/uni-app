<template>
	<view class="pages">
		<view class="initHeader initHeader--fixed initHeader--white">
			<view class="initHeader-wrapper">
				<view class="initHeader-back" @click="$tools.back()"></view>
				<view class="initHeader-title">账本记录</view>
			</view>
		</view>

		<view class="listBox">
			<view class="listBox-wrapper">
				<view class="initNoData" v-if="recodeList.length == 0">暂无数据</view>
				<view class="listBox-list" v-for="(item, index) in recodeList" :key="index" @click="$tools.jump('../collection/collection_detail', item.id)" v-else>
					<view class="listBox-list__header">
						<view class="listBox-list__title">{{ item.currencyName }}</view>
						<view class="listBox-list__status">{{ item.createTime }}</view>
					</view>
					<view class="listBox-list__body">
						<view class="listBox-list__item">
							<view class="listBox-list__item-label">块高({{ item.typeStr }})</view>
							<view class="listBox-list__item-data">{{ item.height != null ? item.height : '---' }}</view>
						</view>
						<view class="listBox-list__item">
							<view class="listBox-list__item-label">数量</view>
							<view class="listBox-list__item-data">{{ item.type == 2 || item.type == 4 || item.type == 8 ? item.fee : item.amount }}</view>
						</view>
						<view class="listBox-list__item">
							<view class="listBox-list__item-label">状态</view>
							<view class="listBox-list__item-data">{{ statusList[item.status] }}</view>
						</view>
					</view>
					<view class="listBox-list__footer">
						<view class="listBox-list__date">
							<view class="listBox-list__date-data">{{ item.type == 2 ? item.fromAddress : item.toAddress }}</view>
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
			recodeList: [],
			typeList: ['转账', '激活账号', '挖矿收益', '提币'],
			statusList: ['未确认', '已确认'],
			walletid: '',
			pageNum: 1,
			pageSize: 20,
			pages: 1
		};
	},
	onShow() {
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
			this.recodeList = [];
			this.getRecord();
		},
		getRecord() {
			this.$Ajax(
				'/front/transfer/tx/list',
				{
					pageNum: this.pageNum,
					pageSize: this.pageSize
				},
				res => {
					console.log(JSON.stringify(res));
					if (res.code == 0) {
						this.pages = res.obj.pages;
						var list = res.obj.list;
						this.recodeList = this.recodeList.concat(list);
					}
				}
			);
		}
	}
};
</script>

<style lang="scss" scoped>
.listBox {
	&-list {
		padding: 30upx;
		// border-bottom: 1upx solid #333333;
		&__header {
			@include flexLeft;
			position: relative;
		}

		&__body {
			@include flexBetween;
			border-bottom: 1upx dashed #333333;
			padding: 30upx 0;
			margin-bottom: 30upx;
		}

		&__footer {
			@include flexBetween;
		}

		&__item {
			width: 33.33%;
			text-align: left;

			&:nth-child(3n) {
				text-align: right;
			}

			&-label {
				color: #999999;
				font-size: 24upx;
				margin-bottom: 15upx;
			}

			&-data {
				color: #000000;
				font-size: 28upx;
				font-weight: bold;
			}
		}

		&__title {
			@include initBeforeHolder;
			color: #000000;
			font-size: 32upx;
			font-weight: bold;
			margin-right: 15upx;
			padding-left: 20upx;
		}

		&__period {
			color: #999999;
			font-size: 20upx;
		}

		&__status {
			color: $globalColor-style;
			font-size: 28upx;
			text-align: right;
			flex: 1;
			font-weight: bold;
		}

		&__date {
			@include flexLeft;
			color: #000000;
			font-size: 24upx;
		}
	}
}
</style>
