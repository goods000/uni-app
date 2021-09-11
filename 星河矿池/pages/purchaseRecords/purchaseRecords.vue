<template>
	<view class="page">
		<view class="product">
			<view class="header_bar">
				<view class="header">
					<view class="header-back" @click="$tools.back(1)"></view>
					<view class="initButtonTabs">
						<view class="initButtonTabs-control">
							<view class="initButtonTabs-control__aniBg" v-if="recordTabsActive == 3" :style="[{ left: '62' + '%' }, { width: 20 / 2 + '%' }]"></view>
							<view class="initButtonTabs-control__aniBg" v-else-if="recordTabsActive == 4" :style="[{ left: '88' + '%' }, { width: 20 / 2 + '%' }]"></view>
							<view class="initButtonTabs-control__aniBg" v-else :style="[{ left: (recordTabsActive == 1 ? '12' : '37') + '%' }, { width: 20 / 2 + '%' }]"></view>
							<!-- <view class="initButtonTabs-control__aniBg" :style="[{ left: (recordTabsActive == 0 ? '25' : '75') + '%' }, { width: 20 / 2 + '%' }]"></view> -->
							<view
								class="initButtonTabs-control__item"
								:class="{ 'initButtonTabs-control__item--active': recordTabsActive == 1 }"
								@click="changeRecordTabsActive(1)"
							>
								进行中
							</view>
							<view
								class="initButtonTabs-control__item"
								:class="{ 'initButtonTabs-control__item--active': recordTabsActive == 2 }"
								@click="changeRecordTabsActive(2)"
							>
								收益中
							</view>
							<view
								class="initButtonTabs-control__item"
								:class="{ 'initButtonTabs-control__item--active': recordTabsActive == 3 }"
								@click="changeRecordTabsActive(3)"
							>
								已完成
							</view>
							<view
								class="initButtonTabs-control__item"
								:class="{ 'initButtonTabs-control__item--active': recordTabsActive == 4 }"
								@click="changeRecordTabsActive(4)"
							>
								已失败
							</view>
						</view>
					</view>
					
				</view> 
			</view> 
			
			<view class="productBox">
				<view class="initNoData" v-if="PowerList.length == 0">暂无数据</view>
					<view class="productBox-list-item" v-for="(item,index) in PowerList" :key="index" v-else>
						<view class="tipsBox">
							<view class="tipsBox-wrapper">
								<view class="tipsBox-title">
									<view class="tipsBox-title__label">{{item.name}} (第{{item.periodical}}期)</view>
								<view class="tipsBox-times">{{item.createTime}}</view>
								</view>
							</view>
						</view>
						<view class="productBox-operateBox">
							<view class="productBox-operate">
								<view class="productBox-operate-title">参与数量({{item.currencyName}})</view>
								<view class="productBox-operate-price">{{ item.buyNum }}{{item.currencyName}}</view>
							</view>
							<view class="productBox-operate">
								<view class="productBox-operate-title">燃烧数量</view>
								<view class="productBox-operate-price">{{ item.lmFee }}LM</view>
							</view>
							<view class="productBox-operate">
								<view class="productBox-operate-title">订单状态</view>
								<view class="productBox-operate-price" v-if="item.status == 1">未收益</view>
								<view class="productBox-operate-price" v-if="item.status == 2">收益中</view>
								<view class="productBox-operate-price" v-if="item.status == 3">收益完成</view>
								<view class="productBox-operate-price" v-if="item.status == 4">已失败</view>
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
				recordTabsActive: 1,
				// 页数
				pageSize: 20,
				pageNum: 1,
				pages: 0,
				recordList: [],
				PowerList:[
					{name:'产品名称1',singeTb:'1',singeMoney:'450',contractDays:'100',startTime:'T+7',surplusNum:90,count:100,createTime:'2021-11-12 12:12:12',ipfsStatus:1},
					{name:'产品名称1',singeTb:'1',singeMoney:'450',contractDays:'100',startTime:'T+7',surplusNum:0,count:100,createTime:'2021-11-12 12:12:12',ipfsStatus:3},
				]
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
				this.getBuyProductData(this.recordTabsActive);
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
					this.getBuyProductData(index)
				}
			},
			getBuyProductData(index){
				this.$Ajax('/front/venture/myVentureBuyData', {
					status: index,
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
	@import '@/common/scss/pages/product/records';
	.productBox{
		padding: 20upx 32upx;
		&-list{
			&-item{
				@include initShadow;
			}
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
