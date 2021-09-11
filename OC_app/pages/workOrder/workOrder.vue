<template>
	<view class="pages">
		<view class="initHeader initHeader--black">
			<view class="initHeader-wrapper">
				<view class="initHeader-back" @click="$tools.back(1)"></view>
				<view class="initHeader-title">工单</view>
			</view>
		</view>
		<view class="main">
			<view class="titleBox">
				<view class="titleBox-title"><image src="../../static/workOrder/icon-title.png" mode="widthFix"></image></view>
			</view>
			<view class="initButton"><view class="initButton-btn initButton-btn--style" @click="$tools.jump('../workOrder/workOrder_type')">提交工单</view></view>
			<view class="listBox">
				<view class="listBox-wrapper">
					<view class="listBox-title initTitle">
						<view class="initTitle-wrapper"><view class="initTitle-label">我的工单</view></view>
					</view>
					<view class="listBox-body">
						<view class="initNoData" v-if="orderList.length == 0">暂无数据</view>
						<view class="listBox-list" v-for="(item, index) in orderList" :key="index" @click="$tools.jump('../workOrder/workOrder_detail', item.id)">
							<view class="listBox-list__icon"><image src="../../static/workOrder/icon-bug.png" mode="widthFix"></image></view>
							<view class="listBox-list__info">
								<view class="listBox-list__title">{{ item.title }}</view>
								<view class="listBox-list__date">{{ item.createTime }}</view>
							</view>
							<view class="listBox-list__status">{{ item.statusStr }}</view>
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
			orderList: [],

			pageNum: 1,
			pageSize: 20,
			pages: 1
		};
	},
	onShow() {
		this.init();
	},
	onReachBottom() {
		if (this.pageNum >= this.pages) {
			return this.$tools.toast('到底了');
		} else {
			this.pageNum++;
			this.getOrderList();
		}
	},
	methods: {
		init() {
			this.pageNum = 1;
			this.orderList = [];
			this.getOrderList();
		},
		getOrderList() {
			this.$Ajax(
				'/front/work/myWork',
				{
					pageNum: this.pageNum,
					pageSize: this.pageSize
				},
				res => {
					console.log(JSON.stringify(res));
					if (res.code == 0) {
						this.pages = res.obj.pages;
						this.orderList = this.orderList.concat(res.obj.list);
					}
				}
			);
		}
	}
};
</script>

<style lang="scss" scoped>
@import '@/common/scss/pages/workOrder/workOrder';
</style>
