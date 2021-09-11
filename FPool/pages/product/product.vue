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
								{{ i18n.product.title_type_01 }}
							</view>
							<view
								class="initButtonTabs-control__item"
								:class="{ 'initButtonTabs-control__item--active': recordTabsActive == 1 }"
								@click="changeRecordTabsActive(1)"
							>
								{{ i18n.product.title_type_02 }}
							</view>
						</view>
					</view>
					<view class="header-right">
						<image src="../../static/product/icon-product-record.png" mode="widthFix"></image>
						<view class="header-right-title" @click="$tools.jump('../about/about',1)">{{ i18n.product.description }}</view>
					</view>
				</view> 
			</view> 
			
			<view class="productBox">
				<view class="productBox-list" v-if="recordTabsActive == 0">
					<view class="initNoData" v-if="PowerList.length == 0">{{ i18n.global.noData }}</view>
					<view class="productBox-list-item" v-for="(item,index) in PowerList" :key="index"
					@click="$tools.jump('../product/productBuy',item.id,item.singeTb,item.contractDays,item.singeMoney,usdtcny,item.name,item.remarks)" v-else>
						<view class="tipsBox">
							<view class="tipsBox-wrapper">
								<view class="tipsBox-title">
									<view class="tipsBox-title__label" v-if="langType == 'cn'">{{item.name}}</view>
									<view class="tipsBox-title__label" v-if="langType == 'en'">{{item.remarks}}</view>
								</view>
							</view>
							<view class="productBox-list-status-image">
								<image :src="langType == 'cn' ? '../../static/product/icon-product-after--cn.png' : '../../static/product/icon-product-after.png'" mode="widthFix" v-if="item.surplusNum != 0"></image>
								<image :src="langType == 'cn' ? '../../static/product/icon-product-before--cn.png' : '../../static/product/icon-product-before.png'" mode="widthFix" v-if="item.surplusNum == 0"></image>
							</view>
						</view>
						<view class="productBox-list-status">
							<view class="productBox-list-status-dividend">{{ i18n.product.title_tips_01 }}</view>
							<view class="productBox-list-status-old">{{ i18n.product.title_tips_02 }}</view>
							<view class="productBox-list-status-time">
								<image src="../../static/product/icon-product-time.png" mode="widthFix"></image>
								<view class="productBox-list-status-title">{{ i18n.product.title_tips_03 }}</view>
							</view>
						</view>
						<view class="productBox-list-data">
							<view class="productBox-list-data-title">
								<view class="productBox-list-data-yellow"></view>
								{{ i18n.product.single_reserve }}
							</view>
							<view class="productBox-list-data-price">{{item.singeTb | number(2) }}TB</view>
						</view>
						<view class="productBox-list-data">
							<view class="productBox-list-data-title">
								<view class="productBox-list-data-yellow"></view>
								{{ i18n.product.single_price }}
							</view>
							<view class="productBox-list-data-price yellow">{{item.singeMoney | number(4) }}USDT</view>
						</view>
						<view class="productBox-list-data">
							<view class="productBox-list-data-title">
								<view class="productBox-list-data-yellow"></view>
								{{ i18n.product.contract_day }}
							</view>
							<view class="productBox-list-data-price">{{item.contractDays}}{{ i18n.product.days }}</view>
						</view>
						<view class="productBox-list-data">
							<view class="productBox-list-data-title">
								<view class="productBox-list-data-yellow"></view>
								{{ i18n.product.start_time }}
							</view>
							<!-- <view class="productBox-list-data-price">{{ i18n.product.after_end }}{{item.startTime}}{{ i18n.product.days }}</view> -->
							<view class="productBox-list-data-price">T + {{item.startTime}}</view>
						</view>
						<!-- <view class="productBox-list-data">
							<view class="productBox-list-data-title">
								<view class="productBox-list-data-yellow"></view>
								{{ i18n.product.Remaining }}/{{ i18n.product.total_sale }}
							</view>
						</view>
						<view class="productBox-list-content">
							<view class="productBox-list-content__chart">
								<view class="productBox-list-content__chart-line" :style="{ width: (((item.count - item.surplusNum) / item.count) *100) + '%' }"></view>
							</view>
						</view>
						<view class="productBox-list-data">
							<view class="productBox-list-data-title">
								<view class="productBox-list-data-price yellow">{{ item.surplusNum }}{{ i18n.product.share }}</view>
								<view class="productBox-list-data-price">/{{item.count}}{{ i18n.product.share }}</view>
							</view>
							<view class="productBox-list-data-price">{{(( (item.count - item.surplusNum) / item.count) * 100) | number(2)}}%</view>
						</view> -->
					</view>
				
				</view>
			
				<view class="productBox-list" v-if="recordTabsActive == 1">
					<view class="initNoOpen" :class="{'initNoOpen--cn' : langType == 'cn'}">
						{{ i18n.global.noOpen }}
						<view class="productBox-wrapper">
							<view class="productBox-wrapper__title">{{ i18n.product.tips_01 }}</view>
							<view class="productBox-wrapper__title">{{ i18n.product.tips_02 }}</view>
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
				PowerList:[
					{id:'12',name:'FILcoin满存算力--1.00T',surplusNum:0,singeTb:'1',singeMoney:'620',contractDays:'540',startTime:'T + 1',usdtcny:'6.5'}
				],
				// 页数
				pageSize: 20,
				pageNum: 1,
				pages: 0,
				usdtcny:'',
				langType:'',
			}
		},
		computed: {
			i18n() {
				return this.$t('message');
			}
		},
		onShow() {
			this.langType = uni.getStorageSync('initlanguage');
			let lang = uni.getStorageSync('initlanguage');
			uni.setTabBarItem({
				index: 0,
				text: this.$t('message').tarbar.item_01
			});
			uni.setTabBarItem({
				index: 1,
				text: this.$t('message').tarbar.item_02
			});
			// uni.setTabBarItem({
			// 	index: 2,
			// 	text: this.$t('message').tarbar.item_03
			// });
			uni.setTabBarItem({
				index: 2,
				text: this.$t('message').tarbar.item_04
			});
			uni.setTabBarItem({
				index: 3,
				text: this.$t('message').tarbar.item_05
			});
			this.init();
			this.recordTabsActive == 0
		},
		onReachBottom() {
			if (this.pageNum >= this.pages) {
				return this.$tools.toast(this.i18n.global.atLast);
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
				}
				// else{
				// 	this.getIPFSData(0)
				// }
			},
			//获取运算力信息
			getIPFSData(index) {
				this.$Ajax('/front/miner/getIPFSProduct', {
					type: index,
					pageSize: this.pageSize,
					pageNum: this.pageNum,
				}, res => {
						if (res.code == 0) {
							// console.log(JSON.stringify(res.obj))
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
