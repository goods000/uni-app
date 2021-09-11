<template>
	<view class="pages" :data-theme="pageTheme">
		<view class="initHeader initHeader--line initHeader--fixed" :class="pageTheme == 'light' ? 'initHeader--black' : 'initHeader--white'">
			<view class="initHeader-wrapper">
				<view class="initHeader-back" @click="$tools.back(1)"></view>
				<view class="initHeader-centerTabs">
					<view class="initHeader-centerTabs__wrapper">
						<view class="initHeader-centerTabs__item" :class="{ 'initHeader-centerTabs__item--active': tabsActive == 0 }" @click="changeTabsActive(0)">转出记录</view>
						<view class="initHeader-centerTabs__item" :class="{ 'initHeader-centerTabs__item--active': tabsActive == 1 }" @click="changeTabsActive(1)">转入记录</view>
					</view>
				</view>
				<!-- <view class="initHeader-title">转账记录</view> -->
			</view>
		</view>
		<view class="main">
			<view class="listBox">
				<view class="listBox-wrapper">
					<view class="initNoData" v-if="recordList.length == 0">暂无数据</view>
					<view class="listBox-list" v-for="(item, index) in recordList" :key="index">
						<view class="listBox-list__header">
							<view class="listBox-list__title">{{ item.walletType == 1 ? 'USDT' : 'GG' }}</view>
						</view>
						<view class="listBox-list__body">
							<view class="listBox-list__item listBox-list__item--flex2">
								<view class="listBox-list__item-label">时间</view>
								<view class="listBox-list__item-data">{{ item.createTime }}</view>
							</view>
							<view class="listBox-list__item">
								<view class="listBox-list__item-label">数量</view>
								<view class="listBox-list__item-data">{{ item.quantity }}</view>
							</view>
							<view class="listBox-list__item">
								<view class="listBox-list__item-label">类型</view>
								<view class="listBox-list__item-data">{{ walletTypeList[item.walletType - 1] }}</view>
							</view>
						</view>
						<view class="listBox-list__footer">
							<view class="listBox-list__address">对方账号：{{ item.targetAccount }}</view>
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
			walletTypeList: ['资金账户', '点卡账户', '佣金账户'],
			
			tabsActive: 0,

			// 页数
			pageNum: 1,
			pageSize: 20,
			pages: 1
		};
	},
	onShow() {
		this.$setStatusBarStyle();
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
			this.pageNum = 1;
			this.getRecord();
		},
		getRecord() {
			this.$Ajax(
				'/front/financial/transfer/list',
				{
					pageSize: this.pageSize,
					pageNum: this.pageNum,
					direction: this.tabsActive
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
				this.pageNum = 1;
				this.recordList = [];
				this.getRecord();
			}
		}
	}
};
</script>

<style lang="scss" scoped>
@import '/scss/assets_transfer_record';
</style>
