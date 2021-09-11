<template>
	<view class="page">
		<view class="product">
			<view class="header_bar header_bg">
				<view class="header">
					<view class="header-back" @click="$tools.back(1)"></view>
					<view class="header-title">{{ i18n.user.list_05 }}</view>
				</view> 
			</view> 
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
			
			<view class="productBox" v-if="recordTabsActive == 0">
				<view class="initNoData" v-if="PowerList.length == 0">{{ i18n.global.noData }}</view>
					<view class="productBox-list-item" v-for="(item,index) in PowerList" :key="index" v-else>
						<view class="tipsBox">
							<view class="tipsBox-wrapper">
								<view class="tipsBox-title">
									<view class="tipsBox-title__label" v-if="langType == 'cn'">{{item.name}}</view>
									<view class="tipsBox-title__label" v-if="langType == 'en'">{{item.remarks}}</view>
								<view class="tipsBox-right">{{item.singeTb | number(2) }}TB</view>
								</view>
							</view>
						</view>
						<view class="productBox-list-data">
							<view class="productBox-list-data-title">{{ i18n.product.single_reserve }}</view>
							<view class="productBox-list-data-price yellow">{{item.singeTb | number(2) }}TB</view>
						</view>
						<view class="productBox-list-data">
							<view class="productBox-list-data-title">{{ i18n.product.single_price }}</view>
							<view class="productBox-list-data-price yellow">{{item.singeMoney | number(4) }}USDT</view>
						</view>
						<view class="productBox-list-data">
							<view class="productBox-list-data-title">{{ i18n.productBuy.buy_share }}</view>
							<view class="productBox-list-data-price">{{item.buyNum}} {{ i18n.product.share }}</view>
						</view>
						<view class="productBox-list-data">
							<view class="productBox-list-data-title">{{ i18n.productBuy.in_hand }}</view>
							<view class="productBox-list-data-price">{{(item.singeTb * item.buyNum) | number(2) }}T</view>
						</view>
						<view class="productBox-list-data">
							<view class="productBox-list-data-title">{{ i18n.productBuy.buy_time }}</view>
							<view class="productBox-list-data-price">{{item.createTime}}</view>
						</view>
						<view class="productBox-list-data">
							<view class="productBox-list-data-title">{{ i18n.status.orderStatus }}</view>
							<view class="productBox-list-data-price" v-if="item.ipfsStatus == 1">{{ i18n.status.notStart }}</view>
							<view class="productBox-list-data-price" v-if="item.ipfsStatus == 2">{{ i18n.status.processing }}</view>
							<view class="productBox-list-data-price" v-if="item.ipfsStatus == 3">{{ i18n.status.end }}</view>
						</view>
					</view>
				</view>
			</view>
			
			<view class="productBox" v-if="recordTabsActive == 1">
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
				// 页数
				pageSize: 20,
				pageNum: 1,
				pages: 0,
				recordList: [],
				PowerList:[],
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
			this.init();
		},
		onReachBottom() {
			if (this.pageNum >= this.pages) {
				return this.$tools.toast(this.i18n.global.atLast);
			} else {
				this.pageNum++;
				if(this.recordTabsActive == 0){
					this.getBuyProductData(1);
				}
				// else{
				// 	this.getBuyProductData(0);
				// }
			}
		},
		methods: {
			init(){
				this.PowerList = [];
				this.getBuyProductData(1);
			},
			changeRecordTabsActive(index) {
				this.PowerList = [];
				if (this.recordTabsActive != index) {
					this.recordTabsActive = index;
				}
				if(index == 0){
					this.getBuyProductData(1)
				}
				// else{
				// 	this.getBuyProductData(0)
				// }
			},
			getBuyProductData(index){
				this.$Ajax('/front/miner/myBuyProductData', {
					type: index,
					pageSize: this.pageSize,
					pageNum: this.pageNum,
				}, res => {
					if (res.code == 0) {
						console.log(JSON.stringify(res.obj))
						this.pages = res.obj.pages;
						this.PowerList = this.PowerList.concat(res.obj.list);
					}
				});
				
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import '@/common/scss/pages/product/product';
	page{background: #FFFFFF;}
	.productBox{
		padding: 20upx 32upx;
		&-list{
			&-item{
				@include initShadow;
			}
		}
	}
	.initButtonTabs{
		margin: 20upx 30upx;
		&-control {
			@include initShadow;
			width: 100%;
			border: 20upx;
		}
	}
	.tipsBox{
		&-title{
			border-bottom: 1px solid rgba(255, 192, 51, .2);
		}
		&-right{
			right: 30upx;
			font-weight: 500;
		}
	}
</style>
