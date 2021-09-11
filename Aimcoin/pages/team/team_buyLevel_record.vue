<template>
	<view class="pages" :data-theme="pageTheme">
		<view class="initHeader initHeader--line initHeader--fixed" :class="pageTheme == 'light' ? 'initHeader--black' : 'initHeader--white'">
			<view class="initHeader-wrapper">
				<view class="initHeader-back" @click="$tools.back(1)"></view>
				<view class="initHeader-title">购买记录</view>
			</view>
		</view>
		<view class="listBox">
			<view class="listBox-wrapper">
				<view class="initNoData" v-if="recordList.length == 0">暂无数据</view>
				<view class="listBox-list" v-for="(item, index) in recordList" :key="index">
					<view class="listBox-list__header">
						<view class="listBox-list__title">{{ item.name }}</view>
					</view>
					<view class="listBox-list__body">
						<view class="listBox-list__item listBox-list__item--flex2">
							<view class="listBox-list__item-label">时间</view>
							<view class="listBox-list__item-data">{{ item.createTime }}</view>
						</view>
						<view class="listBox-list__item">
							<view class="listBox-list__item-label">价格(USDT)</view>
							<view class="listBox-list__item-data">{{ item.price }}</view>
						</view>
						<view class="listBox-list__item">
							<view class="listBox-list__item-label">类别</view>
							<view class="listBox-list__item-data">{{ item.type == 0 ? '购买' : '升级' }}</view>
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
			pages: 0
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
			this.pageNum = 1;
			this.recordList = [];
			this.getRecord();
		},
		getRecord() {
			this.$Ajax(
				'/front/team/action/list',
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
@import '/scss/team_buyLevel_record';
</style>
