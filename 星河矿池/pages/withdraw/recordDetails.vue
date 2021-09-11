<template>
	<view class="page">
		<view class="header_bar header_fixed">
			<view class="header">
				<view class="header-goBack" @click="$tools.back(1)"></view>
				<view class="header-title">记录详情</view>
			</view> 
		</view> 
		<view class="record">
			<view class="recordBox">
				<!-- <view class="initNoData" v-if="recordList.length == 0">暂无数据</view>
				<view class="recordBox-list" v-else v-for="(item, key) in recordList" :key="key"> -->
				<view class="recordBox-list">
					<view class="recordBox-list-header">
						<view class="recordBox-list-header-title">{{recordList.currencyName}}</view>
						<view class="recordBox-list-header-price">{{recordList.quantity}}</view>
					</view>
					<view class="recordBox-list-item">
						<view class="recordBox-list-item-title">状态</view>
						<view class="recordBox-list-item-status">{{recordList.statusStr}}</view>
					</view>
					<view class="recordBox-list-item">
						<view class="recordBox-list-item-title">提币地址</view>
						<view class="recordBox-list-item-status yellow">{{recordList.address}}</view>
					</view>
					<!-- <view class="recordBox-list-item">
						<view class="recordBox-list-item-title">交易哈希</view>
						<view class="recordBox-list-item-status">{{recordList.address}}</view>
					</view> -->
					<view class="recordBox-list-item">
						<view class="recordBox-list-item-title">手续费</view>
						<view class="recordBox-list-item-status">{{recordList.rate}}{{recordList.currencyName}}</view>
					</view>
					<view class="recordBox-list-item">
						<view class="recordBox-list-item-title">时间</view>
						<view class="recordBox-list-item-status">{{recordList.createTime}}</view>
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
					{currency_id:1,createTime:'2122-2-23 23:23',quantity:12,statusStr:'EDD',num:'-452.332'}
				],
			}
		},
		onLoad(option) {
			this.type = option.value1;
			this.id = option.value2;
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
				this.$Ajax('/front/financial/detailInfo', {
					type: this.type,
					id: this.id,
				}, res => {
						if (res.code == 0) {
							this.recordList = res.obj;
						}
					}
				);
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import '@/common/scss/pages/withdraw/withdrawRecord';
	.record .recordBox-list-item{
		align-items: flex-start;
		.yellow{
			color: $globalColor-styleActive;
		}
	}
</style>
