<template>
	<view class="page">
		<view class="header_bar header_bg header_fixed">
			<view class="header">
				<view class="header-back" @click="$tools.back(1)"></view>
				<view class="header-title">{{selectType}}{{ i18n.global.withdraw }}{{ i18n.global.record }}</view>
			</view> 
		</view> 
		<view class="record">
			<view class="recordBox">
				<view class="initNoData" v-if="recordList.length == 0">{{ i18n.global.noData }}</view>
				<view class="recordBox-list" v-else v-for="(item, key) in recordList" :key="key">
					<view class="recordBox-list-header">
						<view class="recordBox-list-header-title">{{ i18n.global.withdraw }}{{item.currency_id}}</view>
						<view class="recordBox-list-header-price">{{item.quantity}}</view>
					</view>
					<view class="recordBox-list-item">
						<view class="recordBox-list-item-title">{{ i18n.global.status }}</view>
						<view class="recordBox-list-item-status" v-if="langType == 'cn'">{{item.statusStr}}</view>
						<view class="recordBox-list-item-status" v-if="langType == 'en'">{{item.statusUs}}</view>
					</view>
					<view class="recordBox-list-item">
						<view class="recordBox-list-item-title">{{ i18n.withdraw.label_01 }}</view>
						<view class="recordBox-list-item-status">{{item.address}}</view>
					</view>
					<!-- <view class="recordBox-list-item">
						<view class="recordBox-list-item-title">交易哈希</view>
						<view class="recordBox-list-item-status">1xdai165sf1d45vdnf1fz1n1f10b12fb1xdai165sf1d45vd</view>
					</view> -->
					<view class="recordBox-list-item">
						<view class="recordBox-list-item-title">{{ i18n.withdraw.label_04 }}</view>
						<view class="recordBox-list-item-status">{{item.freezeQuantity}}</view>
					</view>
					<view class="recordBox-list-item">
						<view class="recordBox-list-item-title">{{ i18n.global.time }}</view>
						<view class="recordBox-list-item-status">{{item.createTime}}</view>
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
				// 页数
				pageSize: 20,
				pageNum: 1,
				pages: 0,
				selectType:'',
				recordList: [],
				langType:'',
			}
		},
		computed: {
			i18n() {
				return this.$t('message');
			}
		},
		onLoad(option) {
			this.currencyId = option.value1;
			this.selectType = option.value2;
		},
		onReachBottom() {
			if (this.pageNum >= this.pages) {
				return this.$tools.toast(this.i18n.global.atLast);
			} else {
				this.pageNum++;
				this.getList();
			}
		},
		onShow() {
			this.langType = uni.getStorageSync('initlanguage');
			this.recordList = [];
			this.getList();
		},
		methods:{
			getList() {
				this.$Ajax('/front/financial/extractList', {
					pageSize: this.pageSize,
					pageNum: this.pageNum,
					currencyId: this.currencyId,
				}, res => {
						if (res.code == 0) {
							this.pages = res.obj.pages;
							this.recordList = this.recordList.concat(res.obj.list);
						}
					}
				);
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import '@/common/scss/pages/withdraw/withdrawRecord';
	page{background: #FFFFFF;}
</style>
