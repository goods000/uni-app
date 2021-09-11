<template>
	<view class="pages">
		<view class="initHeader initHeader--black">
			<view class="initHeader-wrapper">
				<view class="initHeader-back" @click="$tools.back()"></view>
				<view class="initHeader-title">我的邀请</view>
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
						直推会员
					</view>
					<view
						class="tabsBox-control__item initButtonTabs-control__item"
						:class="{ 'initButtonTabs-control__item--active': tabsActive == 2 }"
						@click="changeTabsActive(2)"
					>
						团队会员
					</view>
				</view>
				<view class="tabsBox-wrapper">
					<view class="tabsBox-content">
						<view class="listBox">
							<view class="listBox-wrapper">
								<view class="listBox-header">
									<view class="listBox-data">用户名</view>
									<view class="listBox-data">账户</view>
									<view class="listBox-data">注册时间</view>
								</view>
								<view class="listBox-body">
									<view class="initNoData" v-if="recordList.length == 0">暂无数据</view>
									<view class="listBox-list" v-for="(item, index) in recordList" :key="index">
										<view class="listBox-data">{{ item.name }}</view>
										<view class="listBox-data">{{ item.account }}</view>
										<view class="listBox-data listBox-data--date">{{ item.time }}</view>
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
	onShow() {
		this.init();
	},
	methods: {
		init() {
			this.recordList = [];
			this.pageNum = 1;
			this.getRecordList();
		},
		getRecordList() {
			this.$Ajax(
				'/front/user/my/invite/list',
				{
					type: this.tabsActive,
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
@import '/scss/team';
</style>
