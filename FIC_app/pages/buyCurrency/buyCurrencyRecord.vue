<template>
	<view class="pages">
		<view class="header_bar header_bg">
			<view class="header">
				<view class="header-back" @click="$tools.back(1)"></view>
				<view class="header-title">购买记录</view>
			</view>
		</view>
		<view class="">
			<view class="initNoData" v-if="list.length == 0">暂无数据</view>
			<view class="asset-record">
				<view class="asset-record-box" v-for="(item, key) in list" :key="key">
					<view class="asset-record-title">{{item.sendNum}}-->{{item.receiveNum}}</view>
					<view class="asset-record-time">手续费：{{item.fee}}</view>
					<view class="asset-record-time">时间：{{item.createTime}}</view>
					<view class="asset-record-num">{{item.amount}}</view>
				</view>
			</view>
		</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list: [],
				recordList: [],
				limit:20,
				page:1,
				totalPage:1
			}
		},
		onReachBottom() {
			if (this.page >= this.totalPage) {
				return this.$tools.toast('到底啦');
			} else {
				this.page++;
				this.getList();
			}
		},
		onShow() {
			this.getList();
		},
		methods:{
			getList() {
				this.$Ajax('/convert/page', {
					limit: this.limit,
					page: this.page,
					sendType: "usdt"
				}, res => {
						if (res.code == 0) {
							this.totalPage = res.page.totalPage
							this.list = this.recordList.concat(res.page.list);
						}
					}
				);
			}
		}
	}
</script>

<style>
	@import '@/common/css/style.css';
</style>
