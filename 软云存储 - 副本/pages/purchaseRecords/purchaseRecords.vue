<template>
	<view class="page">
		<view class="product">
			<view class="header_bar header_bg">
				<view class="header">
					<view class="header-back" @click="$tools.back(1)"></view>
					<view class="header-title">购买记录</view>
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
			
			<view class="productBox">
				<view class="initNoData" v-if="PowerList.length == 0">暂无数据</view>
					<view class="productBox-list-item" v-for="(item,index) in PowerList" :key="index" v-else>
						<view class="tipsBox">
							<view class="tipsBox-wrapper">
								<view class="tipsBox-title">
									<view class="tipsBox-title__label">{{item.name}}</view>
								<view class="tipsBox-right">{{item.singeTb | number(2) }}TB</view>
								</view>
							</view>
						</view>
						<view class="productBox-list-data">
							<view class="productBox-list-data-title">单份存力</view>
							<view class="productBox-list-data-price yellow">{{item.singeTb | number(2) }}TB</view>
						</view>
						<view class="productBox-list-data">
							<view class="productBox-list-data-title">算力金额</view>
							<view class="productBox-list-data-price yellow">{{item.singeMoney | number(4) }}USDT</view>
						</view>
						<view class="productBox-list-data">
							<view class="productBox-list-data-title">购买份数</view>
							<view class="productBox-list-data-price">{{item.buyNum}} 份</view>
						</view>
						<view class="productBox-list-data">
							<view class="productBox-list-data-title">到手存力</view>
							<view class="productBox-list-data-price">{{(item.singeTb * item.buyNum) | number(2) }}T</view>
						</view>
						<view class="productBox-list-data">
							<view class="productBox-list-data-title">购买时间</view>
							<view class="productBox-list-data-price">{{item.createTime}}</view>
						</view>
						<view class="productBox-list-data">
							<view class="productBox-list-data-title">订单状态</view>
							<view class="productBox-list-data-price" v-if="item.ipfsStatus == 1">未开始</view>
							<view class="productBox-list-data-price" v-if="item.ipfsStatus == 2">进行中</view>
							<view class="productBox-list-data-price" v-if="item.ipfsStatus == 3">结束</view>
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
				PowerList:[]
			}
		},
		onShow() {
			this.init();
		},
		onReachBottom() {
			if (this.pageNum >= this.pages) {
				return this.$tools.toast('到底啦');
			} else {
				this.pageNum++;
				if(this.recordTabsActive == 0){
					this.getBuyProductData(1);
				}else{
					this.getBuyProductData(0);
				}
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
				}else{
					this.getBuyProductData(0)
				}
			},
			getBuyProductData(index){
				this.$Ajax('/front/user/myBuyProductData', {
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
