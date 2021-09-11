<template>
	<view class="pages">
		<view class="initHeader initHeader--white">
			<view class="initHeader-wrapper">
				<view class="initHeader-back" @click="$tools.back(1)"></view>
				<view class="initHeader-title">BFM矿池</view>
				<view class="initHeader-record" @click="$tools.jump('../miningPool/miningPool_record')"></view>
			</view>
		</view>
		<view class="bgBox"><image src="../../static/miningPool/img-bg.png" mode="widthFix"></image></view>
		<view class="main">
			<view class="titleBox">
				<view class="titleBox-wrapper">
					<view class="titleBox-info">
						<view class="titleBox-info__title">矿池总量(BLJ)</view>
						<view class="titleBox-info__data">{{ walletInfo.pool }}</view>
						<!-- <view class="titleBox-info__cny">≈{{ money | number(4) }}CNY</view> -->
					</view>
				</view>
			</view>
			<view class="tabsBox">
				<view class="tabsBox-control">
					<view class="tabsBox-control__item" :class="{ 'tabsBox-control__item--active': tabsActive == 1 }" @click="changeTabsActive(1)">持币算力</view>
					<view class="tabsBox-control__item" :class="{ 'tabsBox-control__item--active': tabsActive == 2 }" @click="changeTabsActive(2)">推广算力</view>
					<view class="tabsBox-control__item" :class="{ 'tabsBox-control__item--active': tabsActive == 3 }" @click="changeTabsActive(3)">团队算力</view>
				</view>
				<view class="tabsBox-wrapper">
					<view class="tabsBox-content">
						<view class="listBox">
							<view class="listBox-wrapper">
								<view class="initNoData" v-if="recordList.length == 0">暂无数据</view>
								<view class="listBox-list" v-for="(item, index) in recordList" :key="index">
									<view class="listBox-list__left">
										<view class="listBox-list__date">{{ item.updateTime }}</view>
										<view class="listBox-list__remark">{{ item.des }}</view>
									</view>
									<view class="listBox-list__right"><view class="listBox-list__data">+{{ item.profit }}</view></view>
								</view>
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
			walletInfo: [],
			recordList: [],

			tabsActive: 1,

			pageNum: 1,
			pageSize: 20,
			pages: 1
		};
	},
	onLoad(hash) {},
	onShow() {
		this.init();
	},
	methods: {
		init() {
			this.recordList = [];
			this.pageNum = 1;
			this.getWalletInfo();
			this.getRecord();
		},
		getWalletInfo() {
			this.$Ajax(
				'/front/financial/currency/wallet',
				{
					currencyName: 'BLJ'
				},
				res => {
					console.log(JSON.stringify(res));
					if (res.code == 0) {
						this.walletInfo = res.obj;
					}
				}
			);
		},
		getRecord() {
			this.recordList = [];
			this.pageNum = 1;
			this.getAllRecord();
		},
		getAllRecord() {
			this.$Ajax(
				'/front/inner/profit/list',
				{
					pageNum: this.pageNum,
					pageSize: this.pageSize,
					type: this.tabsActive //类型【1静态 2动态 3团队】
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
		changeTabsActive(index) {
			if (this.tabsActive != index) {
				this.tabsActive = index;
				this.getRecord();
			}
		}
	}
};
</script>

<style lang="scss" scoped>
@import '@/common/scss/pages/miningPool/miningPool';
</style>
