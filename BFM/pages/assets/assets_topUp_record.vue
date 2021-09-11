<template>
	<view class="pages">
		<view class="initHeader initHeader--line initHeader--fixed initHeader--white">
			<view class="initHeader-wrapper">
				<view class="initHeader-back" @click="$tools.back(1)"></view>
				<view class="initHeader-title">{{ currencyName }} 充值记录</view>
			</view>
		</view>

		<view class="listBox">
			<view class="listBox-wrapper">
				<view class="initNoData" v-if="recordList.length == 0">暂无数据</view>
				<view class="listBox-list" v-for="(item, index) in recordList" :key="index" @click="$tools.jump('../assets/assets_topUp_details', item.id)">
					<view class="listBox-list__content">
						<view class="listBox-list__item listBox-list__item--long">
							<view class="listBox-list__item-title">时间</view>
							<view class="listBox-list__item-data">{{ item.createTime }}</view>
						</view>
						<view class="listBox-list__item">
							<view class="listBox-list__item-title">数量</view>
							<view class="listBox-list__item-data">{{ item.quantity }}</view>
						</view>
						<view class="listBox-list__item">
							<view class="listBox-list__item-title">状态</view>
							<view class="listBox-list__item-data">{{ item.statusStr }}</view>
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
				'/front/financial/rechargeList',
				{
					pageSize: this.pageSize,
					pageNum: this.pageNum,
					currencyId: this.currencyId
				},
				res => {
					if (res.code == 0) {
						var list = res.obj.list;
						this.recordList = this.recordList.concat(list);
						this.pages = res.obj.pages;
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
		border-bottom: 1upx solid #999999;

		&__content {
			display: flex;
			justify-content: space-between;
			padding: 30upx;
			border-bottom: 1upx solid #999999;
		}
		&__item {
			flex: 1;
			font-size: 24upx;
			text-align: center;
			color: #000000;
			&:first-child {
				text-align: left;
			}
			&:last-child {
				text-align: right;
			}
			&--long {
				flex: 2;
			}

			&-title {
				color: #999999;
				margin-bottom: 15upx;
			}
		}
		&__msg {
			padding: 30upx;
			font-size: 24upx;
			color: #999999;

			text {
				color: #000000;
			}
		}
	}
}
</style>
