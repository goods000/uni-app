<template>
	<view class="pages">
		<view class="initHeader initHeader--line initHeader--fixed initHeader--black">
			<view class="initHeader-wrapper">
				<view class="initHeader-back" @click="$tools.back(1)"></view>
				<view class="initHeader-title">提币记录</view>
			</view>
		</view>

		<view class="listBox">
			<view class="initNoData" v-if="recordList.length == 0">暂无数据</view>
			<view class="listBox-list" v-for="(item, index) in recordList" :key="index">
				<view class="listBox-list__header">
					<view class="listBox-list__title">{{ currencyName }}</view>
					<!-- <view class="listBox-list__btn" @click="cancelOrder(item.id)" v-show="item.status == 0">撤销</view> -->
				</view>
				<view class="listBox-list__content">
					<view class="listBox-list__item listBox-list__item--long">
						<view class="listBox-list__item-label">时间</view>
						<view class="listBox-list__item-data">{{ item.createTime }}</view>
					</view>
					<view class="listBox-list__item">
						<view class="listBox-list__item-label">数量</view>
						<view class="listBox-list__item-data">{{ item.quantity }}</view>
					</view>
					<view class="listBox-list__item">
						<view class="listBox-list__item-label">状态</view>
						<view class="listBox-list__item-data">{{ item.statusStr }}</view>
					</view>
				</view>
				<view class="listBox-list__msg">
					<view class="listBox-list__order">
						提币地址：
						<text>{{ item.address }}</text>
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
				'/front/financial/extractList',
				{
					pageSize: this.pageSize,
					pageNum: this.pageNum,
					currencyId: this.currencyId
				},
				res => {
					console.log(JSON.stringify(res));
					if (res.code == 0) {
						this.pages = res.obj.pages;
						this.recordList = this.recordList.concat(res.obj.list);
					}
				}
			);
		},
		cancelOrder(id) {
			this.$Ajax(
				'/front/financial/extract/cancel',
				{
					id: id
				},
				res => {
					console.log(JSON.stringify(res));
					if (res.code == 0) {
						this.$tools.toast('撤销成功');
						this.init();
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
		padding: 0 30upx;
		margin-bottom: 30upx;
		&__header {
			@include flexBetween;
			height: 60upx;
			// background-color: red;
		}

		&__content {
			@include flexBetween;
			padding: 15upx 0;
			margin-bottom: 15upx;
			border-bottom: 1upx dashed #999999;
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
