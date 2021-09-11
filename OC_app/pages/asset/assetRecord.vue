<template>
	<view class="pages">
		<view class="">
			
			<view class="header_bar header_bg header_fixed">
				<view class="header">
					<view class="header-left" @click="$tools.back(1)">
						<image src="../../static/operate/icon-back.png" mode="widthFix"></image>
					</view>
				</view> 
			</view>
				
			<view class="asset-list">
				<view class="asset-list-box">
					<view class="asset-list-box__item">
						<view class="asset-list-box__item--title big">{{type}}</view>
						<view class="asset-list-box__item--info">
							<view class="asset-list-box__item--content">
								<text class="asset-list-box__item--content-txt">可用数量({{type}})</text>
								<text class="asset-list-box__item--content-num">{{available}}</text>
							</view>
							<view class="asset-list-box__item--content">
								<text class="asset-list-box__item--content-txt">冻结</text>
								<text class="asset-list-box__item--content-num">{{freeze}}</text>
							</view>
							<view class="asset-list-box__item--content">
								<text class="asset-list-box__item--content-txt">折合(CNY)</text>
								<text class="asset-list-box__item--content-num">{{price_num | number(4) }}</text>
							</view>
						</view>
					</view>
				</view>
			</view>
			
			<view class="asset-list asset-listP">
				<view class="asset-list-header">我的资产</view>
				<view class="initNoData" v-if="recordList.length == 0" >暂无数据</view>
				<view class="asset-list-box" v-else>
					<view class="asset-list-box__item" v-for="(item,index) in recordList" :key="index" >
						<view class="asset-list-box__item--title">{{item.typeStr}}</view>
						<view class="asset-list-box__item--info">
							<view class="asset-list-box__item--content">
								<text class="asset-list-box__item--content-txt">金额</text>
								<text class="asset-list-box__item--content-num">{{item.money}}</text>
							</view>
							<!-- <view class="asset-list-box__item--content">
								<text class="asset-list-box__item--content-txt">状态</text>
								<text class="asset-list-box__item--content-num">{{item.orderStatus}}</text>
							</view> -->
							<view class="asset-list-box__item--content">
								<text class="asset-list-box__item--content-txt">时间</text>
								<text class="asset-list-box__item--content-num">{{item.createTime}}</text>
							</view>
						</view>
					</view>
					<!-- <view class="asset-list-box__item">
						<view class="asset-list-box__item--title">划转</view>
						<view class="asset-list-box__item--info">
							<view class="asset-list-box__item--content">
								<text class="asset-list-box__item--content-txt">数量</text>
								<text class="asset-list-box__item--content-num">0.0000</text>
							</view>
							<view class="asset-list-box__item--content">
								<text class="asset-list-box__item--content-txt">状态</text>
								<text class="asset-list-box__item--content-num">已完成</text>
							</view>
							<view class="asset-list-box__item--content">
								<text class="asset-list-box__item--content-txt">时间</text>
								<text class="asset-list-box__item--content-num">2021/01/11 18:01</text>
							</view>
						</view>
					</view> -->
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
				recordList:[],
			}
		},
		onLoad(value) {
			this.type = value.value1;
			this.currencyId = value.value2;
			this.available = value.value3;
			this.freeze = value.value4;
			this.price_num = value.value5;
			this.assetType = value.value6;
		},
		onShow() {
			this.init();
		},
		onReachBottom() {
			if (this.pageNum >= this.pages) {
				return this.$tools.toast('到底了');
			}
			this.pageNum++;
			this.getList();
		},
		methods: {
			init() {
				this.recordList = [];
				this.getList();
			},
			getList(){
				this.$Ajax('/front/financial/getLog', {
					assetType: this.assetType,
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
	@import '@/common/scss/pages/asset/asset';
	.header{
		&-left{
			image{
				width: 40upx;
				height: 40upx;
			}
		}
	}
</style>
