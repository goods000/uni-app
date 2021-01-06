<template>
	<view class="pages">
		<view class="header_bar header_bg">
			<view class="header">
				<view class="header-back" @click="$tools.back(1)"></view>
				<view class="header-title">交易记录</view>
			</view>
		</view>
		<view class="">
			<view class="initNoData" v-if="list.length == 0">暂无数据</view>
			<view class="asset-record">
				<view class="asset-record-box" v-for="(item, key) in list" :key="key">
					<view class="asset-record-title-box">
						<view class="asset-record-title">{{item.currType.toUpperCase()}} </view>
						<view class="" v-if="item.status == 0">(待审核)</view>
						<view class="" v-if="item.status == 1">(审核成功)</view>
						<view class="" v-if="item.status == 2">(审核驳回)</view>
						<view class="" v-if="item.status == 3">(交易成功)</view>
						<view class="" v-if="item.status == 4">(交易失败)</view>
					</view>
					<view class="asset-record-time">地址：{{item.address}}</view>
					<view class="asset-record-time">手续费：{{item.fee}}</view>
					<view class="asset-record-time">时间：{{item.createTime}}</view>
					<view class="asset-record-time" v-if="item.hash != null">hash：{{item.hash}}</view>
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
				limit:10,
				page:1,
				pages:1
			}
		},
		onReachBottom() {
			if (this.page >= this.pages) {
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
				this.$Ajax('/cash/page', {
					limit: this.limit,
					page: this.page
				}, res => {
						if (res.code == 0) {
							this.list = res.page.list
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
