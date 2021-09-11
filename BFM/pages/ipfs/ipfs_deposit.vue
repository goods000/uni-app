<template>
	<view class="pages">
		<view class="initHeader initHeader--fixed initHeader--white">
			<view class="initHeader-wrapper">
				<view class="initHeader-back" @click="$tools.back(1)"></view>
				<view class="initHeader-title">FIL定存</view>
			</view>
		</view>
		<view class="main">
			<view class="listBox">
				<view class="listBox-wrapper">
					<view class="initNoData" v-if="recordList.length == 0">暂无数据</view>
					<view class="listBox-list" v-for="(item, index) in recordList" :key="index" @click="$tools.jump('../ipfs/ipfs_deposit_info', item.id)">
						<view class="listBox-content">
							<view class="listBox-title">{{ item.fixedName }}</view>
							<view class="listBox-desc">一次性结算100%兑付</view>
						</view>
						<view class="listBox-itemBox">
							<view class="listBox-itemBox__item">
								<view class="listBox-itemBox__item-data listBox-itemBox__item-data--style">{{ item.fixedRate }}%</view>
								<view class="listBox-itemBox__item-label">套餐收益比率</view>
							</view>
							<view class="listBox-itemBox__item">
								<view class="listBox-itemBox__item-data">{{ item.fixedDays }}天</view>
								<view class="listBox-itemBox__item-label">{{ item.fixedMul }}FIL起购 定期产品</view>
							</view>
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

			// 页数
			pageSize: 20,
			pageNum: 1,
			pages: 1
		};
	},
	computed: {
		i18n() {
			return this.$t('message');
		}
	},
	onShow() {
		this.init();
	},
	onReachBottom() {
		if (this.pageNum >= this.pages) {
			return this.$tools.toast(this.$t('message').g_atLast);
		} else {
			this.pageNum++;
			this.getRecord();
		}
	},
	methods: {
		init() {
			this.pageNum = 1;
			this.recordList = [];
			this.getRecord();
		},

		getRecord() {
			this.$Ajax(
				'/front/coin/getFixedDepositList',
				{
					pageSize: this.pageSize,
					pageNum: this.pageNum
				},
				res => {
					console.log('算力列表' + JSON.stringify(res));
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
@import '@/common/scss/pages/ipfs/ipfs_deposit';
</style>
