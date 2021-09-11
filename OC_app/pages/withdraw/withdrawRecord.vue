<template>
	<view class="pages">
		<view class="">
			
			<view class="header_bar header_bg header_fixed">
				<view class="header">
					<view class="header-back" @click="$tools.back(1)"></view>
					<view class="header-title">{{selectType}}提币记录</view>
				</view> 
			</view> 
			
			
			<view class="asset-list asset-listP">
				<view class="initNoData" v-if="recordList.length == 0">暂无数据</view>
				<view class="asset-list-box" v-else v-for="(item, key) in recordList" :key="key">
					<view class="asset-list-box__item">
						<view class="asset-list-box__item--title">{{item.currency_id}}</view>
						<view class="asset-list-box__item--info">
							<view class="asset-list-box__item--content">
								<text class="asset-list-box__item--content-txt">申请数量</text>
								<text class="asset-list-box__item--content-num">{{item.quantity}}</text>
							</view>
							<view class="asset-list-box__item--content">
								<text class="asset-list-box__item--content-txt">到账数量</text>
								<text class="asset-list-box__item--content-num">{{item.realQuantity}}</text>
							</view>
							<view class="asset-list-box__item--content">
								<text class="asset-list-box__item--content-txt">状态</text>
								<text class="asset-list-box__item--content-num">{{item.statusStr}}</text>
							</view>
						</view>
						<view class="asset-list-box__item--info">
							<view class="asset-list-box__item--content">
								<text class="asset-list-box__item--content-txt">地址</text>
								<text class="asset-list-box__item--content-num">{{item.address}}</text>
							</view>
							<view class="asset-list-box__item--content">
								<text class="asset-list-box__item--content-txt">时间</text>
								<text class="asset-list-box__item--content-num">{{item.createTime}}</text>
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
				// 页数
				pageSize: 20,
				pageNum: 1,
				pages: 0,
				selectType:'',
				recordList: [],
			}
		},
		onLoad(option) {
			this.currencyId = option.value1;
			this.selectType = option.value2;
		},
		onReachBottom() {
			if (this.pageNum >= this.pages) {
				return this.$tools.toast('到底啦');
			} else {
				this.pageNum++;
				this.getList();
			}
		},
		onShow() {
			this.recordList = [];
			this.getList();
		},
		methods:{
			getList() {
				this.$Ajax('/front/financial/extractList', {
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
</style>
