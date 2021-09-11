<template>
	<view class="pages">
		<view class="initHeader initHeader--white">
			<view class="initHeader-wrapper">
				<view class="initHeader-back" @click="$tools.back(1)"></view>
				<view class="initHeader-title">算力管理</view>
			</view>
		</view>
		<view class="bgBox"><image src="../../static/ipfs/img-bg-style-3.png" mode="widthFix"></image></view>
		<view class="main">
			<view class="infoBox">
				<view class="infoBox-wrapper">
					<view class="infoBox-info">
						<view class="infoBox-info__label">总算力(T)</view>
						<view class="infoBox-info__data">{{ totalCalc | number(4) }}</view>
					</view>
				</view>
			</view>
			<view class="listBox">
				<view class="listBox-wrapper">
					<view class="listBox-title">已购算力</view>
					<view class="listBox-content">
						<view class="listBox-list" v-for="(item, index) in recordList" :key="index" @click="$tools.jump('../ipfs/ipfs_calcPower_detail', item.id)">
							<view class="listBox-list__logo"><image src="../../static/ipfs/icon-ipfs-logo.png" mode="widthFix"></image></view>
							<view class="listBox-list__content">
								<view class="listBox-list__title">{{ item.cloudName }}</view>
								<view
									class="listBox-list__status"
									:class="[
										{ 'listBox-list__status--doing': item.cloudStatus == 0 },
										{ 'listBox-list__status--done': item.cloudStatus == 1 },
										{ 'listBox-list__status--freeze': item.cloudStatus == 2 }
									]"
								>
									{{ statusList[item.cloudStatus] }}
								</view>
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
			statusList: ['收益中','已结算','封装中'],
			totalCalc: 0,
			
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
			this.getTotalCalc();
		},
		getTotalCalc(){
			this.$Ajax(
				'/front/coin/getCloudPowerTotal', {},
				res => {
					console.log('总算力：' + JSON.stringify(res))
					if (res.code == 0) {
						this.totalCalc = res.obj;
					}
				}
			);
		},
		getRecord() {
			this.$Ajax(
				'/front/coin/getCloudUserList', {
					pageSize: this.pageSize,
					pageNum: this.pageNum
				},
				res => {
					console.log('定存列表' + JSON.stringify(res))
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
@import '@/common/scss/pages/ipfs/ipfs_calcPower_list';
</style>
