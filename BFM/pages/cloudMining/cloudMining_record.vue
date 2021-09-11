<template>
	<view class="pages">
		<view class="initHeader initHeader--fixed initHeader--white">
			<view class="initHeader-wrapper">
				<view class="initHeader-back" @click="$tools.back(1)"></view>
				<view class="initHeader-title">购买记录</view>
			</view>
		</view>

		<view class="listBox">
			<view class="initNoData" v-if="recordList.length == 0">暂无数据</view>
			<view class="listBox-list" v-for="(item, index) in recordList" :key="index">
				<view class="listBox-list__header">
					<view class="listBox-list__title">认购时间: {{ item.createTime }}</view>
				</view>
				<view class="listBox-list__content">
					<view class="listBox-list__item">
						<view class="listBox-list__item-label">矿机价格 (BLJ)</view>
						<view class="listBox-list__item-data">{{ item.price }}</view>
					</view>
					<view class="listBox-list__item">
						<view class="listBox-list__item-label">购买总额(BLJ)</view>
						<view class="listBox-list__item-data">{{ item.total }}</view>
					</view>
					<view class="listBox-list__item">
						<view class="listBox-list__item-label">购买数量(T)</view>
						<view class="listBox-list__item-data">{{ item.amount }}</view>
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
				'/front/machine/user/list',
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
@import '@/common/scss/pages/cloudMining/cloudMining_record';
</style>
