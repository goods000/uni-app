<template>
	<view class="pages">
		<view class="initHeader initHeader--white">
			<view class="initHeader-wrapper">
				<view class="initHeader-back" @click="$tools.back(1)"></view>
				<view class="initHeader-title">定存管理</view>
			</view>
		</view>
		<view class="main">
			<view class="listBox">
				<view class="listBox-wrapper">
					<view class="listBox-content">
						<view class="initNoData" v-if="recordList.length == 0">暂无数据</view>
						<view class="listBox-list" v-for="(item, index) in recordList" :key="index" @click="$tools.jump('../ipfs/ipfs_deposit_detail', item.id)">
							<view class="listBox-list__logo"><image src="../../static/ipfs/icon-coin-logo.png" mode="widthFix"></image></view>
							<view class="listBox-list__content">
								<view class="listBox-list__title">{{ item.fixedName }}</view>
								<view
									class="listBox-list__status"
									:class="[
										{ 'listBox-list__status--doing': item.fixedStatus == 0 },
										{ 'listBox-list__status--done': item.fixedStatus == 1 },
										{ 'listBox-list__status--freeze': item.fixedStatus == 2 }
									]"
								>
									{{ statusList[item.fixedStatus] }}
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
			statusList: ['锁仓中','已结算'],
			
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
				'/front/coin/getFixedUserList', {
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
@import '@/common/scss/pages/ipfs/ipfs_deposit_list';
</style>
