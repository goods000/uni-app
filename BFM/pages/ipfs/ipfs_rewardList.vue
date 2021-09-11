<template>
	<view class="pages">
		<view class="initHeader initHeader--white">
			<view class="initHeader-wrapper">
				<view class="initHeader-back" @click="$tools.back(1)"></view>
				<view class="initHeader-title">我的收益</view>
			</view>
		</view>
		<view class="main">
			<view class="tabsSelectBox">
				<view class="tabsSelectBox-wrapper">
					<scroll-view scroll-x="true" class="tabsSelectBox-scroll">
						<view
							class="tabsSelectBox-item"
							:class="{ 'tabsSelectBox-item--active': tabsActive == item.value }"
							v-for="(item, index) in tabsList"
							:key="index"
							@click="changeTabsActive(item.value)"
						>
							{{ item.label }}
						</view>
					</scroll-view>
				</view>
			</view>
			<view class="listBox">
				<view class="listBox-wrapper">
					<view class="listBox-content">
						<view class="initNoData" v-if="logList.length == 0">暂无数据</view>
						<view class="listBox-list" v-for="(item, index) in logList" :key="index">
							<view class="listBox-list__content">
								<view class="listBox-list__title">{{ item.typeStr }}</view>
								<view class="listBox-list__date">{{ item.createTime }}</view>
							</view>
							<view class="listBox-list__price">{{ item.money }}</view>
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
			logList: [],
			tabsList: [
				{
					label: '25%释放收益',
					value: 34
				},
				{
					label: '释放总收益',
					value: 35
				},
				{
					label: '销售收益',
					value: 39
				},
				{
					label: '管理收益',
					value: 37
				},
				{
					label: '矿池分红',
					value: 38
				}
			],
			tabsActive: 0,

			pageNum: 1,
			pageSize: 20,
			pages: 1
		};
	},
	computed: {
		i18n() {
			return this.$t('message');
		}
	},
	onShow() {
		this.tabsActive = this.tabsList[0].value;
		this.init();
	},
	methods: {
		init() {
			this.pageNum = 1;
			this.logList = [];
			this.getLogList();
		},
		getLogList() {
			this.$Ajax(
				'/front/financial/getLog',
				{
					type: this.tabsActive,
					pageNum: this.pageNum,
					pageSize: this.pageSize
				},
				res => {
					console.log(JSON.stringify(res));
					if (res.code == 0) {
						this.pages = res.obj.pages;
						this.logList = this.logList.concat(res.obj.list);
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
@import '@/common/scss/pages/ipfs/ipfs_rewardList';
</style>
