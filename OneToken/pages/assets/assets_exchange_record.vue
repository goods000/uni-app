<template>
	<view class="pages">
		<view class="initHeader initHeader--fixed initHeader--black">
			<view class="initHeader-wrapper">
				<view class="initHeader-back" @click="$tools.back(1)"></view>
				<view class="initHeader-title">闪兑记录</view>
			</view>
		</view>

		<view class="listBox">
			<view class="listBox-wrapper">
				<view class="initNoData" v-if="recordList.length == 0">暂无数据</view>
				<view class="listBox-list" v-for="(item, index) in recordList" :key="index">
					<view class="listBox-list__header">
						<view class="listBox-list__title">{{ item.fromCurrencyName }} 兑 {{ item.toCurrencyName }}</view>
						<view class="listBox-list__date">{{ item.createTime }}</view>
					</view>
					<view class="listBox-list__body">
						<!-- <view class="listBox-list__item listBox-list__item--long">
							<view class="listBox-list__item-label">时间</view>
							<view class="listBox-list__item-data">{{ item.createTime }}</view>
						</view> -->
						<view class="listBox-list__item">
							<view class="listBox-list__item-label">转出数量({{ item.fromCurrencyName }})</view>
							<view class="listBox-list__item-data">{{ item.fromQuantity | number(4) }}</view>
						</view>
						<view class="listBox-list__item">
							<view class="listBox-list__item-label">转入数量({{ item.toCurrencyName }})</view>
							<view class="listBox-list__item-data">{{ item.toQuantity | number(4) }}</view>
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
			currencyName: '',
			currencyId: '',
			walletList: ['币币钱包', '法币钱包', '矿池钱包'],
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
	onShow(e) {
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
				'/front/exchange/record',
				{
					pageSize: this.pageSize,
					pageNum: this.pageNum
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
@import '/scss/assets_exchange_record';
</style>
