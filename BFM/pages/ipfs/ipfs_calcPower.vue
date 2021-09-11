<template>
	<view class="pages">
		<view class="initHeader initHeader--white">
			<view class="initHeader-wrapper">
				<view class="initHeader-back" @click="$tools.back(1)"></view>
				<view class="initHeader-title">算力购买</view>
			</view>
		</view>
		<view class="bgBox"><image src="../../static/ipfs/img-bg-style-2.png" mode="widthFix"></image></view>
		<view class="main">
			<view class="listBox">
				<view class="listBox-wrapper">
					<view class="listBox-list" v-for="(item, index) in recordList" :key="index">
						<view class="listBox-header">
							<view class="listBox-content">
								<view class="listBox-title">{{ item.cloudName }}</view>
								<!-- <view class="listBox-desc">{{ item.remark }}</view> -->
							</view>
							<view class="listBox-btn" @click="$tools.jump('../ipfs/ipfs_calcPower_buy', item.id)">购买</view>
						</view>
						<view class="listBox-itemBox">
							<view class="listBox-itemBox__item listBox-itemBox__item--flex2">
								<view class="listBox-itemBox__item-data listBox-itemBox__item-data--style">{{ item.cloudDays }}</view>
								<view class="listBox-itemBox__item-label">合约周期(天)</view>
							</view>
							<view class="listBox-itemBox__item listBox-itemBox__item--flex2">
								<view class="listBox-itemBox__item-data">{{ item.profitDays }}天</view>
								<view class="listBox-itemBox__item-label">封装期(天)</view>
							</view>
							<view class="listBox-itemBox__item listBox-itemBox__item--flex3">
								<view class="listBox-itemBox__item-data">{{ item.cloudMul }}</view>
								<view class="listBox-itemBox__item-label">认购价格(CNY/T)</view>
							</view>
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
			
			// 页数
			pageSize: 20,
			pageNum: 1,
			pages: 1
		};
	},
	computed: {
		i18n() {
			return this.$t('message');
		}
	},
	onShow() {
		this.init();
	},
	onReachBottom() {
		if (this.pageNum >= this.pages) {
			return this.$tools.toast(this.$t('message').g_atLast);
		} else {
			this.pageNum++;
			this.getRecord();
		}
	},
	methods: {
		init() {
			this.pageNum = 1;
			this.recordList = [];
			this.getRecord();
		},
		
		getRecord() {
			this.$Ajax(
				'/front/coin/getCloudPowerList', {
					pageSize: this.pageSize,
					pageNum: this.pageNum
				},
				res => {
					console.log('算力列表' + JSON.stringify(res))
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
@import '@/common/scss/pages/ipfs/ipfs_calcPower';
</style>
