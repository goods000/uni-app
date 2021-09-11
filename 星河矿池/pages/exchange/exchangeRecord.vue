<template>
	<view class="page">
		<view class="header_bar header_fixed">
			<view class="header">
				<view class="header-goBack" @click="$tools.back(1)"></view>
				<view class="header-title">兑换记录</view>
			</view> 
		</view> 
		<view class="record">
			<view class="recordBox">
				<view class="initNoData" v-if="recordList.length == 0">暂无数据</view>
				<view class="recordBox-list" v-else v-for="(item, key) in recordList" :key="key">
					<view class="recordBox-list-header">
						<view class="recordBox-list-header-title">{{item.createTime}}</view>
					</view>
					<view class="recordBox-list-box">
						<view class="recordBox-list-item">
							<view class="recordBox-list-item-title">流向</view>
							<view class="recordBox-list-item-status">{{ item.currencyName }}-{{ item.toCurrencyName }}</view>
						</view>
						<view class="recordBox-list-item">
							<view class="recordBox-list-item-title">消耗{{ item.currencyName }}</view>
							<view class="recordBox-list-item-status">{{ item.num | number(2)}}</view>
						</view>
						<view class="recordBox-list-item">
							<view class="recordBox-list-item-title">获得{{ item.toCurrencyName }}</view>
							<view class="recordBox-list-item-status">{{item.toNum}}</view>
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
				// 页数
				pageSize: 20,
				pageNum: 1,
				pages: 0,
				selectType:'',
				recordList: [
					{currency_id:1,createTime:'2122-2-23 23:23',quantity:12,statusStr:'EDD'}
				],
			}
		},
		onLoad(option) {
			this.currencyId = option.value1;
			this.selectType = option.value2;
		},
		onReachBottom() {
			if (this.pageNum >= this.pages) {
				return this.$tools.toast('到底啦');
			} else {
				this.pageNum++;
				this.getList();
			}
		},
		onShow() {
			this.recordList = [];
			this.getList();
		},
		methods:{
			getList() {
				this.$Ajax('/front/userPassphrase/getFlashCashRecord', {
					pageSize: this.pageSize,
					pageNum: this.pageNum,
					type: 1,
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
	@import '@/common/scss/pages/recharge/rechargeRecord';
</style>
