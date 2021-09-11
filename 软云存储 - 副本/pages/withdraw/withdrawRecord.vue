<template>
	<view class="page">
		<view class="header_bar header_bg header_fixed">
			<view class="header">
				<view class="header-back" @click="$tools.back(1)"></view>
				<view class="header-title">{{selectType}}提币记录</view>
			</view> 
		</view> 
		<view class="record">
			<view class="recordBox">
				<view class="initNoData" v-if="recordList.length == 0">暂无数据</view>
				<view class="recordBox-list" v-else v-for="(item, key) in recordList" :key="key">
					<view class="recordBox-list-header">
						<view class="recordBox-list-header-title">提币{{item.currency_id}}</view>
						<view class="recordBox-list-header-price">{{item.quantity}}</view>
					</view>
					<view class="recordBox-list-item">
						<view class="recordBox-list-item-title">状态</view>
						<view class="recordBox-list-item-status">{{item.statusStr}}</view>
					</view>
					<view class="recordBox-list-item">
						<view class="recordBox-list-item-title">提币地址</view>
						<view class="recordBox-list-item-status">{{item.address}}</view>
					</view>
					<!-- <view class="recordBox-list-item">
						<view class="recordBox-list-item-title">交易哈希</view>
						<view class="recordBox-list-item-status">1xdai165sf1d45vdnf1fz1n1f10b12fb1xdai165sf1d45vd</view>
					</view> -->
					<view class="recordBox-list-item">
						<view class="recordBox-list-item-title">手续费</view>
						<view class="recordBox-list-item-status">{{item.rate}}</view>
					</view>
					<view class="recordBox-list-item">
						<view class="recordBox-list-item-title">时间</view>
						<view class="recordBox-list-item-status">{{item.createTime}}</view>
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
				recordList: [],
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
				this.$Ajax('/front/financial/extractList', {
					pageSize: this.pageSize,
					pageNum: this.pageNum,
					currencyId: this.currencyId,
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
	@import '@/common/scss/pages/withdraw/withdrawRecord';
	page{background: #FFFFFF;}
</style>
