<template>
	<view class="pages">
		<view class="initHeader initHeader--line initHeader--fixed initHeader--white">
			<view class="initHeader-wrapper">
				<view class="initHeader-back" @click="$tools.back(1)"></view>
				<view class="initHeader-title">矿池记录</view>
			</view>
		</view>

		<view class="listBox">
			<view class="listBox-wrapper">
				<view class="initNoData" v-if="recordList.length == 0">暂无数据</view>
				<view class="listBox-list" v-for="(item, index) in recordList" :key="index">
					<view class="listBox-list__left">
						<view class="listBox-list__title">{{ item.remark }}</view>
						<view class="listBox-list__date">{{ item.createTime }}</view>
					</view>
					<view class="listBox-list__right"><view class="listBox-list__data">+{{ item.money | number(4) }}</view></view>
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
			
			pageNum: 1,
			pageSize: 15,
			pages: 1,
		};
	},
	onReachBottom() {
		if (this.pageNum >= this.pages) {
			return this.$tools.toast('到底了');
		}else{
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
				'/front/inner/pool/list',
				{
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
		}
	}
};
</script>

<style lang="scss" scoped>
@import '@/common/scss/pages/miningPool/miningPool_record';
</style>
