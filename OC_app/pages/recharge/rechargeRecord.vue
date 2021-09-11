<template>
	<view class="pages">
		<view class="">
			
			<view class="header_bar header_bg header_fixed">
				<view class="header">
					<view class="header-back" @click="$tools.back(1)"></view>
					<view class="header-title">{{selectType}}充币记录</view>
				</view> 
			</view> 
			
			
			<view class="asset-list asset-listP">
				<view class="initNoData" v-if="recordList.length == 0">暂无数据</view>
				<view class="asset-list-box" v-else v-for="(item, key) in recordList" :key="key">
					<view class="asset-list-box__item">
						<view class="asset-list-box__item--title">{{item.currency_id}}</view>
						<view class="asset-list-box__item--info">
							<view class="asset-list-box__item--content">
								<text class="asset-list-box__item--content-txt">数量</text>
								<text class="asset-list-box__item--content-num">{{ item.quantity }}</text>
							</view>
							<view class="asset-list-box__item--content">
								<text class="asset-list-box__item--content-txt">状态</text>
								<text class="asset-list-box__item--content-num">{{item.statusStr}}</text>
							</view>
							<view class="asset-list-box__item--content">
								<text class="asset-list-box__item--content-txt">时间</text>
								<text class="asset-list-box__item--content-num">{{ item.createTime }}</text>
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
				selectType: '',
				currencyId: '',
		
				// 页数
				pageSize: 20,
				pageNum: 1,
				pages: 0
			};
		},
		onLoad(option) {
			this.currencyId = option.value1;
			this.selectType = option.value2;
		},
		onShow(e) {
			this.init();
		},
		onReachBottom() {
			if (this.pageNum >= this.pages) {
				return this.$tools.toast('到底了');
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
	@import '@/common/scss/pages/asset/asset';
</style>
