<template>
	<view class="pages" :data-theme="pageTheme">
		<view class="initHeader initHeader--fixed" :class="pageTheme == 'light' ? 'initHeader--black' : 'initHeader--white'">
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
						<view class="listBox-list__title">{{ item.createTime }}</view>
						<!-- <view class="listBox-list__btn" @click="cancelOrder(item.id)" v-show="item.status == 0">撤销</view> -->
					</view>
					<view class="listBox-list__body">
						<view class="listBox-list__item">
							<view class="listBox-list__item-label">套餐</view>
							<view class="listBox-list__item-data">{{ item.days }}</view>
						</view>
						<view class="listBox-list__item">
							<view class="listBox-list__item-label"></view>
							<view class="listBox-list__item-data"></view>
						</view>
						<view class="listBox-list__item">
							<view class="listBox-list__item-label">价格(USDT)</view>
							<view class="listBox-list__item-data">{{ item.price }}</view>
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
			recordList: [
				{currencyName:'USDT',createTime:'2021.04.06 17:40',days:'30天畅享',price:'100'},
				{currencyName:'USDT',createTime:'2021.04.06 17:40',days:'365天畅享',price:'100'},
			],
			statusList: ['申请中', '成功', '取消', '确认中'],
			currencyName: '',
			currencyId: '',

			// 页数
			pageSize: 20,
			pageNum: 1,
			pages: 0
		};
	},
	onLoad(option) {
		this.currencyId = option.value1;
		this.currencyName = option.value2;
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
			this.getRecord();
		},
		getRecord() {
			this.$Ajax('/front/user/vip/order/list',{
					pageSize: this.pageSize,
					pageNum: this.pageNum,
					currencyId: this.currencyId
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
@import '/scss/activation_record';
</style>
