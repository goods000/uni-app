<template>
	<view class="pages">
		<view class="">
			
			<view class="header_bar header_bg header_fixed">
				<view class="header">
					<view class="header-back" @click="$tools.back(1)"></view>
					<view class="header-title">发布记录</view>
				</view> 
			</view> 
			
			<view class="release_tabs">
				<view class="release_tabs-list">
					<view class="release_tabs-list-txt" :class="{ 'active': tabsActive == 0 }" @click="changeTabsActive(0)">进行中</view>
					<view class="release_tabs-list-txt" :class="{ 'active': tabsActive == 1 }" @click="changeTabsActive(1)">已取消</view>
					<view class="release_tabs-list-txt" :class="{ 'active': tabsActive == 2 }" @click="changeTabsActive(2)">已完成</view>
				</view>
			</view>
			
			<view class="releaseRecord">
				<view class="initNoData" v-if="recordList.length == 0">暂无记录</view>
				<view class="releaseRecord-box" v-for="(item, index) in recordList" :key="index"  v-else>
					<view class="releaseRecord-box-header">
						<view class="releaseRecord-box-header__title">
							<text class="buy" v-if="item.typeStr == '买'">买入</text>
							<text class="sell" v-if="item.typeStr == '卖'">卖出</text>
							 {{ item.currencyName }}
						</view>
						<view class="releaseRecord-box-header__btn" v-if="item.status == 0"  @click.stop="deleteOrder(item.id)" @touchmove.stop.prevent v-show="item.status != 1">撤单</view>
						<view class="releaseRecord-box-header__end" v-else>{{ item.statusStr }}</view>
					</view>
					<view class="releaseRecord-box-price">￥{{ item.price }}</view>
					<view class="releaseRecord-box-info">
						<view class="releaseRecord-box-info__num">数量：{{ item.quantity }}</view>
						<view class="releaseRecord-box-info__time">时间：{{ item.createTime }}</view>
						<!-- <view class="">状态：{{ item.statusStr }}</view> -->
					</view>
				</view>
				
				<!-- <view class="releaseRecord-box">
					<view class="releaseRecord-box-header">
						<view class="releaseRecord-box-header__title"><text class="sell">出售</text>OC</view>
						<view class="releaseRecord-box-header__btn" v-if="tabsActive == 0">撤单</view>
						<view class="releaseRecord-box-header__end" v-if="tabsActive == 1">已完成</view>
					</view>
					<view class="releaseRecord-box-price">￥4200.00</view>
					<view class="releaseRecord-box-info">
						<view class="releaseRecord-box-info__num">数量：2,000.000</view>
						<view class="releaseRecord-box-info__time">时间：2021/01/11 14:00</view>
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
				tabsActive: 0,
				recordList: [],
				currencyName: '',
				currencyId: '',
				// 页数
				pageSize: 20,
				pageNum: 1,
				pages: 0
			}
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
			changeTabsActive(index) {
				if(this.tabsActive != index){
					this.tabsActive = index;
					this.recordList = [];
					this.getRecord();
				}
			},
			getRecord() {
				this.recordList = [];
				this.$Ajax(
					'/front/otc/myOrderList',
					{
						pageSize: this.pageSize,
						pageNum: this.pageNum,
						status: this.tabsActive
					},
					res => {
						if (res.code == 0) {
							this.pages = res.obj.pages;
							this.recordList = this.recordList.concat(res.obj.list);
						}
					}
				);
			},
			deleteOrder(id) {
				this.$Ajax(
					'/front/otc/cancelOrder',
					{
						orderId: id
					},
					res => {
						if (res.code == 0) {
							this.$tools.toast('撤销成功');
							this.getRecord();
						}
					}
				);
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import '@/common/scss/pages/release/releaseRecord';
</style>
