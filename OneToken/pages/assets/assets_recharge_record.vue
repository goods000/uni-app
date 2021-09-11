<template>
	<view class="pages">
		<view class="initHeader initHeader--fixed initHeader--black">
			<view class="initHeader-wrapper">
				<view class="initHeader-back" @click="$tools.back(1)"></view>
				<view class="initHeader-title">充币记录</view>
			</view>
		</view>
		<view class="listBox">
			<view class="listBox-wrapper">
				<view class="initNoData" v-if="recordList.length == 0">暂无数据</view>
				<view class="listBox-list" v-for="(item, index) in recordList" :key="index" @click="$tools.jump('../assets/assets_recharge_detail', item.id)">
					<view class="listBox-list__header">
						<view class="listBox-list__title">{{ item.currencyName }}</view>
					</view>
					<view class="listBox-list__body">
						<view class="listBox-list__item listBox-list__item--long">
							<view class="listBox-list__item-label">时间</view>
							<view class="listBox-list__item-data">{{ item.createTime }}</view>
						</view>
						<view class="listBox-list__item">
							<view class="listBox-list__item-label">数量</view>
							<view class="listBox-list__item-data">{{ item.quantity }}</view>
						</view>
						<view class="listBox-list__item">
							<view class="listBox-list__item-label">状态</view>
							<view class="listBox-list__item-data">成功</view>
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
			statusList: ['Unconfirmed','Success'],
			currencyName: '',
			currencyId: '',

			// 页数
			pageSize: 20,
			pageNum: 1,
			pages: 0
		};
	},
	computed: {
		i18n() {
			return this.$t('message');
		}
	},
	onLoad(option) {
		this.currencyId = option.value1;
		this.currencyName = option.value2;
	},
	onShow() {
		this.init();
	},
	onReachBottom() {
		if (this.pageNum >= this.pages) {
			return this.$tools.toast('到底了');
		} else {
			this.pageNum++;
			this.getRecord();
		}
	},
	methods: {
		init() {
			this.recordList = [];
			this.getRecord();
		},
		getRecord() {
			this.$Ajax(
				'/front/financial/rechargeList',
				{
					pageSize: this.pageSize,
					pageNum: this.pageNum,
					currencyId: this.currencyId
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
@import '/scss/assets_recharge_record';
</style>
