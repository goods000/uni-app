<template>
	<view class="pages">
		<view class="">
			
			<view class="header_bar header_bg header_fixed">
				<view class="header">
					<view class="header-back" @click="$tools.back(1)"></view>
					<view class="header-title">划转记录</view>
				</view> 
			</view> 
			
			
			<view class="asset-list asset-listP">
				<view class="initNoData" v-if="recordList.length == 0">暂无数据</view>
				<view class="asset-list-box" v-else v-for="(item, key) in recordList" :key="key">
					<view class="asset-list-box__item">
						<view class="asset-list-box__item--title">{{item.sourceStr}}--{{item.targetStr}}</view>
						<view class="asset-list-box__item--info">
							<view class="asset-list-box__item--content">
								<text class="asset-list-box__item--content-txt">数量</text>
								<text class="asset-list-box__item--content-num">{{item.quantity}}</text>
							</view>
							<view class="asset-list-box__item--content">
								<text class="asset-list-box__item--content-txt">状态</text>
								<text class="asset-list-box__item--content-num">{{item.statusStr}}</text>
							</view>
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
				recordList: [],
			}
		},
		onReachBottom() {
			if (this.pageNum >= this.pages) {
				return this.$tools.toast('到底啦');
			} else {
				this.pageNum++;
				this.getList();
			}
		},
		onLoad(value) {
			this.currencyId = value.value1;
		},
		onShow() {
			this.recordList = [];
			this.getList();
		},
		methods:{
			getList() {
				this.$Ajax('/front/financial/walletTransfer', {
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
