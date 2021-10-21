<template>
	<view class="pages">
		<view class="bg_header">
			<view class="initHeader initHeader--bgStyle initHeader--white">
				<view class="initHeader-wrapper">
					<view class="initHeader-back" @click="$tools.back(1)"></view>
					<view class="initHeader-title">记录</view>
				</view>
			</view>
			
			<view class="record">
				<view class="record-wrapper">
					<view class="initNoData" v-if="recordList.length ==0">暂无记录</view>
					<view class="record-wrapper__item" v-for="(item,index) in recordList" :key="index" v-else>
						<view class="record-wrapper__item--header record-wrapper__item--header-top">
							<view class="record-wrapper__item--header-coin">{{item.typeStr}}</view>
						</view>
						<view class="record-wrapper__item--header">
							<view class="record-wrapper__item--header-title">类型：{{ item.currencyId == 1 ? 'USDT' : 'CLQ' }}</view>
							<view class="record-wrapper__item--header-title">{{item.money >0 ? '+' : ''}}{{item.money}}</view>
						</view>
						<!-- <view class="record-wrapper__item--header">
							<view class="record-wrapper__item--header-title">：{{item.userName}}</view>
						</view> -->
						<view class="record-wrapper__item--header">
							<view class="record-wrapper__item--header-title">时间：{{item.createTime}}</view>
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
				recordList:[],
				// 页数
				pageSize: 20,
				pageNum: 1,
				pages: 0,
			}
		},
		onShow() {
			this.recordList = [];
			this.init();
		},
		onReachBottom() {
			console.log(this.pages);
			if (this.pageNum >= this.pages) {
				return this.$tools.toast('到底啦');
			} else {
				this.pageNum++;
				this.getList();
			}
		},
		methods: {
			init() {
				this.getList()
			},
			getList() {
				this.$Ajax('/front/financial/getLog', {
					pageSize: this.pageSize,
					pageNum: this.pageNum,
				}, res => {
						if (res.code == 0) {
							this.pages = res.obj.pages;
							this.recordList = this.recordList.concat(res.obj.list);
						}
					}
				);
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import '@/common/scss/pages/withdraw/withdraw';
</style>
