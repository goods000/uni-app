<template>
	<view class="page">
		<view class="header_bar header_bg header_fixed">
			<view class="header">
				<view class="header-back" @click="$tools.back(1)"></view>
				<view class="header-title">{{selectType}}{{ i18n.global.recharge }}{{ i18n.global.record }}</view>
			</view> 
		</view> 
		<view class="record">
			<view class="recordBox">
				<view class="initNoData" v-if="recordList.length == 0">{{ i18n.global.noData }}</view>
				<view class="recordBox-list" v-else v-for="(item, key) in recordList" :key="key">
					<view class="recordBox-list-header">
						<view class="recordBox-list-header-title">{{item.currency_id}}</view>
					</view>
					<view class="recordBox-list-box">
						<view class="recordBox-list-item">
							<view class="recordBox-list-item-title">{{ i18n.global.time }}</view>
							<view class="recordBox-list-item-status">{{ item.createTime }}</view>
						</view>
						<view class="recordBox-list-item">
							<view class="recordBox-list-item-title">{{ i18n.global.quantity }}</view>
							<view class="recordBox-list-item-status">{{ item.quantity | number(2)}}</view>
						</view>
						<view class="recordBox-list-item">
							<view class="recordBox-list-item-title">{{ i18n.global.status }}</view>
							<view class="recordBox-list-item-status" v-if="langType == 'cn'">{{item.statusStr}}</view>
							<view class="recordBox-list-item-status" v-if="langType == 'en'">{{item.statusUs}}</view>
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
				selectType: '',
				currencyId: '',
		
				// 页数
				pageSize: 20,
				pageNum: 1,
				pages: 0,
				langType:'',
			};
		},
		onLoad(option) {
			this.currencyId = option.value1;
			this.selectType = option.value2;
		},
		computed: {
			i18n() {
				return this.$t('message');
			}
		},
		onShow(e) {
			this.langType = uni.getStorageSync('initlanguage');
			this.init();
		},
		onReachBottom() {
			if (this.pageNum >= this.pages) {
				return this.$tools.toast(this.i18n.global.atLast);
			}
			this.pageNum++;
			this.getRecord();
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
	@import '@/common/scss/pages/recharge/rechargeRecord';
	page{background: #FFFFFF;}
	.record .recordBox-list-item-status{
		white-space: nowrap;
	}
</style>
