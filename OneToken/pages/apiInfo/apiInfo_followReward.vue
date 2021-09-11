<template>
	<view class="pages">
		<view class="initHeader initHeader--black">
			<view class="initHeader-wrapper">
				<view class="initHeader-back" @click="$tools.back()"></view>
				<view class="initHeader-title">我的跟随者</view>
			</view>
		</view>
		<view class="main">
			<view class="tabsBox initButtonTabs">
				<view class="tabsBox-control initButtonTabs-control">
					<view class="initButtonTabs-control__aniBg" :style="[{ left: (100 / 2) * (tabsActive - 1) + '%' }, { width: 100 / 2 + '%' }]"></view>
					<view
						class="tabsBox-control__item initButtonTabs-control__item"
						:class="{ 'initButtonTabs-control__item--active': tabsActive == 1 }"
						@click="changeTabsActive(1)"
					>
						正在跟随
					</view>
					<view
						class="tabsBox-control__item initButtonTabs-control__item"
						:class="{ 'initButtonTabs-control__item--active': tabsActive == 2 }"
						@click="changeTabsActive(2)"
					>
						历史跟随
					</view>
				</view>
				<view class="tabsBox-wrapper">
					<view class="tabsBox-content">
						<view class="followBox">
							<view class="followBox-wrapper">
								<view class="initNoData" v-if="recordList.length == 0">暂无数据</view>
								<view class="followBox-list" v-for="(item, index) in recordList" :key="index">
									<view class="followBox-plane">
										<view class="followBox-header">
											<view class="followBox-avatar"><image :src="item.userImage" mode="scaleToFill"></image></view>
											<view class="followBox-info">
												<view class="followBox-name">{{ item.userName }}</view>
												<view class="followBox-row">
													<view class="followBox-type">{{ item.bourseName }}跟随者</view>
												</view>
											</view>
										</view>
										<view class="followBox-body">
											<view class="followBox-itemBox">
												<view class="followBox-itemBox__item">
													<view class="followBox-itemBox__item-data followBox-itemBox__item-data--style">{{ item.followProfit | number(4) }}</view>
													<view class="followBox-itemBox__item-label">跟随收益({{ item.profitCurrency }})</view>
												</view>
												<view class="followBox-itemBox__item">
													<view class="followBox-itemBox__item-data">{{ item.contractCurrency }}</view>
													<view class="followBox-itemBox__item-label">跟随币种</view>
												</view>
												<view class="followBox-itemBox__item">
													<view class="followBox-itemBox__item-data">{{ item.followReward | number(4) }}</view>
													<view class="followBox-itemBox__item-label">跟随返佣</view>
												</view>
											</view>
										</view>
									</view>
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
			recordList: [],

			apiBindId: null,
			tabsActive: 1,

			// 分页
			pages: 1,
			pageNum: 1,
			pageSize: 20
		};
	},
	onReachBottom() {
		if (this.pageNum >= this.pages) {
			return this.$tools.toast('到底了');
		} else {
			this.pageNum++;
			this.getRecordList();
		}
	},
	onLoad(hash) {
		this.apiBindId = hash.value1;
	},
	onShow() {
		this.init();
	},
	methods: {
		init() {
			this.recordList = [];
			this.pageNum = 1;
			this.getRecordList();
		},
		// 获取直推用户名单
		getRecordList() {
			this.$Ajax(
				'/front/api/follower/list',
				{
					apiBindId: this.apiBindId,
					status: 1, //状态【1正在跟随 2历史跟随】
					pageNum: this.pageNum,
					pageSize: this.pageSize
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
				this.init();
			}
		}
	}
};
</script>

<style lang="scss" scoped>
@import '/scss/apiInfo_followReward';
</style>
