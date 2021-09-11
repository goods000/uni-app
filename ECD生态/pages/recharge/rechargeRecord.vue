<template>
	<view class="pages">
		<view class="header_bar header_fixed header_bg">
			<view class="header">
				<view class="header-goBack" @click="$tools.back(1)"></view>
				<view class="header-title">{{selectType}}充币记录</view>
			</view> 
		</view> 
		<view class="record">
			<view class="recordBox">
				<view class="initNoData" v-if="recordList.length == 0"></view>
				<view class="recordBox-list" v-else v-for="(item, key) in recordList" :key="key">
					<view class="recordBox-list-header">
						<view class="recordBox-list-header-title">{{item.currencyName}}</view>
					</view>
					<view class="recordBox-list-box">
						<view class="recordBox-list-item">
							<view class="recordBox-list-item-title">时间</view>
							<view class="recordBox-list-item-status">{{ item.createTime }}</view>
						</view>
						<view class="recordBox-list-item">
							<view class="recordBox-list-item-title">数量</view>
							<view class="recordBox-list-item-status">{{ item.quantity | number(2)}}</view>
						</view>
						<view class="recordBox-list-item">
							<view class="recordBox-list-item-title">状态</view>
							<view class="recordBox-list-item-status">{{item.statusStr}}</view>
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
					{currencyName:'USDT',currency_id:1,createTime:'2122-2-23 23:23',quantity:12,statusStr:'EDD'}
				],
				selectType: '',
				currencyId: '',
		
				// 页数
				pageSize: 20,
				pageNum: 1,
				pages: 0
			};
		},
		onLoad(option) {
			this.currencyId = option.value1;
			this.selectType = option.value2;
		},
		onShow(e) {
			this.init();
		},
		onReachBottom() {
			if (this.pageNum >= this.pages) {
				return this.$tools.toast('到底了');
			}
			this.pageNum++;
			this.getRecord();
		},
		methods: {
			init() {
				this.recordList = [];
				this.getRecord();
			},
			getRecord() {
				this.$Ajax(
					'/front/financial/rechargeList',
					{
						pageSize: this.pageSize,
						pageNum: this.pageNum,
						currencyId: this.currencyId
					},
					res => {
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
	@import '/scss/rechargeRecord';
	.header_fixed + view{
		padding-top: $global-header-height !important;
		/* #ifdef APP-PLUS */
		padding-top: 180upx !important;
		/* #endif */
	}
</style>
