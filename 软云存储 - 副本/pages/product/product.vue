<template>
	<view class="pages content">
		<view class="product">
			<view class="header_bar header_fixed header_main">
				<view class="header">
					<view class="initButtonTabs">
						<view class="initButtonTabs-control">
							<view class="initButtonTabs-control__aniBg" :style="[{ left: (100 / 2) * recordTabsActive + '%' }, { width: 100 / 2 + '%' }]"></view>
							<view
								class="initButtonTabs-control__item"
								:class="{ 'initButtonTabs-control__item--active': recordTabsActive == 0 }"
								@click="changeRecordTabsActive(0)"
							>
								IPFS云算力(现货)
							</view>
							<view
								class="initButtonTabs-control__item"
								:class="{ 'initButtonTabs-control__item--active': recordTabsActive == 1 }"
								@click="changeRecordTabsActive(1)"
							>
								IPFS云算力(期货)
							</view>
						</view>
					</view>
					<view class="header-right">
						<image src="../../static/product/icon-product-record.png" mode="widthFix"></image>
						<view class="header-right-title" @click="$tools.jump('../about/about',1)">说明</view>
					</view>
				</view> 
			</view> 
			
			<view class="productBox">
				<view class="productBox-list">
					<view class="initNoData" v-if="PowerList.length == 0">暂无数据</view>
					<view class="productBox-list-item" v-for="(item,index) in PowerList" :key="index"
					@click="$tools.jump('../product/productBuy',item.id,item.singeTb,item.contractDays,item.singeMoney,usdtcny,item.name)" v-else>
						<view class="tipsBox">
							<view class="tipsBox-wrapper">
								<view class="tipsBox-title">
									<view class="tipsBox-title__label">{{item.name}}</view>
								</view>
							</view>
							<view class="productBox-list-status-image">
								<image src="../../static/product/icon-product-after.png" mode="widthFix" v-if="item.surplusNum == 0"></image>
								<image src="../../static/product/icon-product-before.png" mode="widthFix" v-if="item.surplusNum != 0"></image>
							</view>
						</view>
						<view class="productBox-list-status">
							<view class="productBox-list-status-dividend">头矿红利</view>
							<view class="productBox-list-status-old">云算力老用户专享</view>
							<view class="productBox-list-status-time">
								<image src="../../static/product/icon-product-time.png" mode="widthFix"></image>
								<view class="productBox-list-status-title">限时抢购</view>
							</view>
						</view>
						<view class="productBox-list-data">
							<view class="productBox-list-data-title">
								<view class="productBox-list-data-yellow"></view>
								单份存力
							</view>
							<view class="productBox-list-data-price">{{item.singeTb | number(2) }}TB</view>
						</view>
						<view class="productBox-list-data">
							<view class="productBox-list-data-title">
								<view class="productBox-list-data-yellow"></view>
								算力单价
							</view>
							<!-- <view class="productBox-list-data-price yellow">{{item.singeMoney * usdtcny | number(2) }}CNY/{{item.singeMoney | number(4) }}USDT</view> -->
							<view class="productBox-list-data-price yellow">{{item.singeMoney | number(4) }}USDT</view>
						</view>
						<view class="productBox-list-data">
							<view class="productBox-list-data-title">
								<view class="productBox-list-data-yellow"></view>
								合约周期
							</view>
							<view class="productBox-list-data-price">{{item.contractDays}}天</view>
						</view>
						<view class="productBox-list-data">
							<view class="productBox-list-data-title">
								<view class="productBox-list-data-yellow"></view>
								开挖时间
							</view>
							<view class="productBox-list-data-price">{{item.startTime}}</view>
						</view>
						<view class="productBox-list-data">
							<view class="productBox-list-data-title">
								<view class="productBox-list-data-yellow"></view>
								剩余/总售
							</view>
						</view>
						<view class="productBox-list-content">
							<view class="productBox-list-content__chart">
								<view class="productBox-list-content__chart-line" :style="{ width: (((item.count - item.surplusNum) / item.count) *100) + '%' }"></view>
							</view>
						</view>
						<view class="productBox-list-data">
							<view class="productBox-list-data-title">
								<view class="productBox-list-data-price yellow">{{ item.surplusNum }}份</view>
								<view class="productBox-list-data-price">/{{item.count}}份</view>
							</view>
							<view class="productBox-list-data-price">{{(( (item.count - item.surplusNum) / item.count) * 100) | number(2)}}%</view>
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
				recordTabsActive: 0,
				PowerList:[],
				// 页数
				pageSize: 20,
				pageNum: 1,
				pages: 0,
				usdtcny:'',
			}
		},
		onShow() {
			this.init();
			this.recordTabsActive == 0
		},
		onReachBottom() {
			if (this.pageNum >= this.pages) {
				return this.$tools.toast('到底啦');
			} else {
				this.pageNum++;
				if(this.recordTabsActive == 0){
					this.getIPFSData(1);
				}else{
					this.getIPFSData(0);
				}
			}
		},
		methods:{
			init(){
				this.recordTabsActive == 0
				this.PowerList = [];
				this.changeRecordTabsActive(0)
			},
			changeRecordTabsActive(index) {
				this.PowerList = [];
				if (this.recordTabsActive != index) {
					this.recordTabsActive = index;
				}
				if(index == 0){
					this.getIPFSData(1)
				}else{
					this.getIPFSData(0)
				}
			},
			//获取运算力信息
			getIPFSData(index) {
				this.$Ajax('/search/getIPFSProduct', {
					type: index,
					pageSize: this.pageSize,
					pageNum: this.pageNum,
				}, res => {
						if (res.code == 0) {
							console.log(JSON.stringify(res.obj))
							this.usdtcny = res.obj.usdtcny;
							this.pages = res.obj.data.pages;
							this.PowerList = this.PowerList.concat(res.obj.data.list);
						}
					}
				);
			},
		}
	}
</script>

<style lang="scss" scoped>
	@import '@/common/scss/pages/product/product';
</style>
