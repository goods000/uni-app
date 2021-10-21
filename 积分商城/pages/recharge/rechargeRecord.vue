<template>
	<view class="pages bg_header">
		<view class="">
			
			<view class="initHeader initHeader--bgStyle initHeader--white">
				<view class="initHeader-wrapper">
					<view class="initHeader-back" @click="$tools.back(1)"></view>
					<view class="initHeader-title">充值记录</view>
				</view>
			</view>
			
			<view class="record">
				<view class="record-wrapper">
					<view class="initNoData" v-if="recordList.length ==0">暂无交易记录</view>
					<view class="record-wrapper__item" v-for="(item,index) in recordList" :key="index" v-else>
						<view class="record-wrapper__item--header record-wrapper__item--header-top">
							<view class="record-wrapper__item--header-coin">{{item.currencyName}}</view>
							<view class="record-wrapper__item--header-status">{{item.statusStr}}</view>
						</view>
						<view class="record-wrapper__item--header">
							<view class="record-wrapper__item--header-title">充值数量：{{ item.amount }}</view>
							<view class="record-wrapper__item--header-title">手续费：{{ item.amount }}</view>
						</view>
						<view class="record-wrapper__item--header">
							<view class="record-wrapper__item--header-title">充值地址：{{item.address}}</view>
						</view>
						<view class="record-wrapper__item--header">
							<view class="record-wrapper__item--header-title">充值时间：{{ item.createTime }}</view>
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
	@import '@/common/scss/pages/asset/asset';
</style>
