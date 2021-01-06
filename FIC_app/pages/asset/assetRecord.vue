<template>
	<view class="pages">
		<view class="assetRecord">
			<view class="header_bar header_bg">
				<view class="header">
					<view class="header-back" @click="$tools.back(1)"></view>
					<view class="header-title">明细记录</view>
				</view> 
			</view> 
			
			<view class="">
				<view class="initNoData" v-if="list.length == 0">暂无数据</view>
				<view class="asset-record asset-record-height">
					<view class="asset-record-box" v-for="(item, key) in list" :key="key">
						<view class="asset-record-title-box">
							<view class="asset-record-title">{{item.currType.toUpperCase()}}</view>	
							<view v-for="(info, key) in typeList" :key="key">
								<view v-if="info.code == item.sceneType">({{info.value}})</view>
							</view>
						</view>	
						<view class="asset-record-time">{{item.createTime}}</view>
						<view class="asset-record-num" v-if="item.amount < 0">{{item.amount}}</view>
						<view class="asset-record-num chioce" v-else>+{{item.amount}}</view>
					</view>
				</view>
				<!-- <view class="asset-record">
					<view class="asset-record-box">
						<view class="asset-record-title">MX兑换USDT</view>
						<view class="asset-record-time">地址：sdksjglagiljgmlskjgaslgji </view>
						<view class="asset-record-time">手续费：90</view>
						<view class="asset-record-time">2020-12-24  18:24</view>
						<view class="asset-record-num">+2</view>
					</view>
				</view> -->
			</view>
			
			
			
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				typeList: [],
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
			this.getTypeList();
		},
		methods:{
			getTypeList() {
				this.$Ajax('/dict/flow', {
					limit: this.limit,
					page: this.page
				}, res => {
						if (res.code == 0) {
							this.typeList = res.list
						}
					}
				);
			},
			getList() {
				this.$Ajax('/accountLog/page', {
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
