<template>
	<view class="pages">
		<view class="header_bar header_bg">
			<view class="header">
				<view class="header-back" @click="$tools.back(1)"></view>
				<view class="header-title">兑换记录</view>
			</view>
		</view>
		<view class="">
			<view class="initNoData" v-if="list.length == 0">暂无数据</view>
			<view class="asset-record">
				<view class="asset-record-box" v-for="(item, key) in list" :key="key">
					<view class="asset-record-title">{{item.sendType.toUpperCase()}} 兑换成 {{item.receiveType.toUpperCase()}}</view>
					<!-- <view class="asset-record-time">手续费：{{item.fee}}</view> -->
					<view class="asset-record-time">时间：{{item.createTime}}</view>
					<view class="asset-record-num">{{item.receiveNum}}</view>
				</view>
			</view>
			<!-- <view class="asset-record">
				<view class="asset-record-box">
					<view class="asset-record-title">MMX兑换USDT</view>
					<view class="asset-record-time">地址：sdksjglagiljgmlskjgaslgji </view>
					<view class="asset-record-time">手续费：90</view>
					<view class="asset-record-time">2020-12-24  18:24</view>
					<view class="asset-record-num">+2</view>
				</view>
			</view> -->
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
				this.$Ajax('/convert/each/page', {
					limit: this.limit,
					page: this.page,
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
