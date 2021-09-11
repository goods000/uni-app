<template>
	<view class="pages" :data-theme="pageTheme">
		<view class="initHeader initHeader--fixed" :class="pageTheme == 'light' ? 'initHeader--black' : 'initHeader--white'">
			<view class="initHeader-wrapper">
				<view class="initHeader-back" @click="$tools.back(1)"></view>
				<view class="initHeader-title">每日盈利记录</view>
			</view>
		</view>
		<view class="main">
			<view class="listBox">
				<view class="listBox-wrapper">
					<view class="listBox-header">
						<view class="listBox-data">类型</view>
						<view class="listBox-data">盈利数量(USDT)</view>
						<view class="listBox-data">时间</view>
					</view>
					<view class="listBox-body">
						<view class="initNoData" v-show="recordList.length == 0">暂无数据</view>
						<view class="listBox-list" v-for="(item, index) in recordList" :key="index">
							<view class="listBox-data">量化盈利</view>
							<view class="listBox-data listBox-data--style">{{ item.profit | number(6) }}</view>
							<view class="listBox-data listBox-data--date">{{ item.date }}</view>
						</view>
					</view>
				</view>
			</view>
		</view>

		<view class="fixedBox">
			<view class="fixedBox-wrapper">
				<view class="shareBox">
					<view class="shareBox-wrapper">
						<view class="shareBox-left">
							<view class="shareBox-logo"><image src="../../static/public/icon-logo.png" mode="widthFix"></image></view>
							<view class="shareBox-info">
								<view class="shareBox-info__title">{{ $store.state.projectName }}</view>
								<view class="shareBox-info__desc">智能量化交易</view>
							</view>
						</view>
						<view class="shareBox-center">
							<view class="shareBox-profit">{{ totalProfit.totalProfit | number(4) }}</view>
							<view class="shareBox-label">总盈利(USDT)</view>
						</view>
						<view class="shareBox-right">
							<view class="shareBox-code">
								<tki-qrcode
									cid="qrcode1"
									ref="qrcode"
									:val="shareAddress"
									:size="100"
									unit="upx"
									background="#ffffff"
									foreground="#101010"
									pdground="#101010"
									:onval="onval"
									:loadMake="loadMake"
									:usingComponents="true"
								/>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
import tkiQrcode from '@/components/tki-qrcode/tki-qrcode.vue';
export default {
	components: { tkiQrcode },
	data() {
		return {
			totalProfit: [],
			recordList: [],

			pageNum: 1,
			pageSize: 20,
			pages: 1,
			
			shareAddress: '',
			onval: true, // val值变化时自动重新生成二维码
			loadMake: false, // 组件加载完成后自动生成二维码
		};
	},
	onLoad(hash) {
		this.currencyId = hash.value1;
		this.assetType = hash.value2;
	},
	onShow() {
		this.$setStatusBarStyle();
		this.init();
	},
	onReachBottom() {
		if (this.pageNum >= this.pages) {
			return this.$tools.toast('到底了');
		} else {
			this.pageNum++;
			this.getRecordList();
		}
	},
	methods: {
		init() {
			this.pageNum = 1;
			this.recordList = [];
			this.getRecordList();
			this.getTotalProfit();
			this.getCopyLink();
		},
		getTotalProfit() {
			this.$Ajax(
				'/front/profit/total/statistic',
				{
					currencyName: ''
				},
				res => {
					console.log(JSON.stringify(res));
					if (res.code == 0) {
						this.totalProfit = res.obj;
					}
				}
			);
		},
		getCopyLink() {
			this.$Ajax('/front/user/shareAddress', {}, res => {
				console.log(JSON.stringify(res));
				if (res.code == 0) {
					this.shareAddress = res.obj.address;
					this.$refs.qrcode._makeCode();
				}
			});
		},
		getRecordList() {
			this.$Ajax(
				'/front/profit/daily/record',
				{
					pageNum: this.pageNum,
					pageSize: this.pageSize
				},
				res => {
					console.log(JSON.stringify(res));
					if (res.code == 0) {
						this.pages = res.obj.pages;
						this.recordList = this.recordList.concat(res.obj.list);
					}
				}
			);
		}
	}
};
</script>

<style lang="scss" scoped>
@import '/scss/quantification_dayReward';
</style>
