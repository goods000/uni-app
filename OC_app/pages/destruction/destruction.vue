<template>
	<view class="pages">
		<view class="">

			<view class="destruction">
				<view class="header_bar header_bar--absolute">
					<view class="header">
						<view class="header-white" @click="$tools.back(1)"></view>
						<view class="header-title-white">OC销毁</view>
					</view>
				</view>

				<image src="../../static/destruction/icon-gif.gif" mode="widthFix" class="destruction_gif"></image>

				<view class="destructionBox">
					<image src="../../static/destruction/icon-destruction-title.png" mode="widthFix" class="destructionBox-image"></image>
					<view class="destructionBox-txt">REAL-createTime BLACK HOLE DESTRUCTION</view>
					<view class="destructionBox-asset">
						<view class="destructionBox-asset-title">销毁OC数量</view>
						<view class="destructionBox-asset-value">{{allDestroyValue}}</view>
						<view class="destructionBox-asset-addr">
							<view class="destructionBox-asset-addr-title">黑洞地址：</view>
							<view class="destructionBox-asset-addr-box">
								<view class="destructionBox-asset-addr-box__item">
									{{ address }}
								</view>
								<image src="../../static/destruction/icon-destruction-copy.png" mode="widthFix" @click="$tools.copy(address)"></image>
							</view>
						</view>
						<view class="destructionBox-asset-btn" @click="$tools.jump('../explorer/explorer')">地址详情</view>
					</view>
				</view>

				<view class="destructionBox-list">
					<view class="destructionBox-list__item">
						<view class="destructionBox-list__item--txt">账户名称</view>
						<view class="destructionBox-list__item--txt">时间</view>
						<view class="destructionBox-list__item--txt">销毁数量</view>
					</view>
					<view class="initNoData" v-if="accountList.length == 0">暂无记录</view>
					<scroll-view scroll-y="true" class="destructionBox-list-height" @scrolltolower="newsListLower" v-else>
						<view class="destructionBox-list__item" v-for="(item,index) in accountList" :key="index">
							<!-- <view class="destructionBox-list__item--txt">{{item.userName}}</view> -->
							<view class="destructionBox-list__item--txt">******</view>
							<view class="destructionBox-list__item--txt">{{item.createTime}}</view>
							<view class="destructionBox-list__item--txt">{{item.value}}</view>
						</view>
					</scroll-view>

				</view>

			</view>
		</view>
	</view>
</template>

<script>
	import webUrl from '@/common/js/url.js'
	export default {
		data() {
			return {
				allDestroyValue: '',
				accountList: [
					// {userName:'沐沐呀',createTime:'2021/01/11 22:00',value:'100.00'},{userName:'沐沐呀',createTime:'2021/01/11 22:00',value:'100.00'},{userName:'沐沐呀',createTime:'2021/01/11 22:00',value:'100.00'},{userName:'沐沐呀',createTime:'2021/01/11 22:00',value:'100.00'},{userName:'沐沐呀',createTime:'2021/01/11 22:00',value:'100.00'},{userName:'沐沐呀',createTime:'2021/01/11 22:00',value:'100.00'},{userName:'沐沐呀',createTime:'2021/01/11 22:00',value:'100.00'},
					// {userName:'沐沐呀',createTime:'2021/01/11 22:00',value:'100.00'},{userName:'沐沐呀',createTime:'2021/01/11 22:00',value:'100.00'},{userName:'沐沐呀',createTime:'2021/01/11 22:00',value:'100.00'},{userName:'沐沐呀',createTime:'2021/01/11 22:00',value:'100.00'},{userName:'沐沐呀',createTime:'2021/01/11 22:00',value:'100.00'},{userName:'沐沐呀',createTime:'2021/01/11 22:00',value:'100.00'},{userName:'沐沐呀',createTime:'2021/01/11 22:00',value:'100.00'},
					// {userName:'沐沐呀',createTime:'2021/01/11 22:00',value:'100.00'},{userName:'沐沐呀',createTime:'2021/01/11 22:00',value:'100.00'},{userName:'沐沐呀',createTime:'2021/01/11 22:00',value:'100.00'},{userName:'沐沐呀',createTime:'2021/01/11 22:00',value:'100.00'},{userName:'沐沐呀',createTime:'2021/01/11 22:00',value:'100.00'},{userName:'沐沐呀',createTime:'2021/01/11 22:00',value:'100.00'},{userName:'沐沐呀',createTime:'2021/01/11 22:00',value:'100.00'},
					// {userName:'沐沐呀',createTime:'2021/01/11 22:00',value:'100.00'},{userName:'沐沐呀',createTime:'2021/01/11 22:00',value:'100.00'},{userName:'沐沐呀',createTime:'2021/01/11 22:00',value:'100.00'},{userName:'沐沐呀',createTime:'2021/01/11 22:00',value:'100.00'},{userName:'沐沐呀',createTime:'2021/01/11 22:00',value:'100.00'},{userName:'沐沐呀',createTime:'2021/01/11 22:00',value:'100.00'},{userName:'沐沐呀',createTime:'2021/01/11 22:00',value:'100.00'},
					// {userName:'沐沐呀',createTime:'2021/01/11 22:00',value:'100.00'},{userName:'沐沐呀',createTime:'2021/01/11 22:00',value:'100.00'},{userName:'沐沐呀',createTime:'2021/01/11 22:00',value:'100.00'},{userName:'沐沐呀',createTime:'2021/01/11 22:00',value:'100.00'},{userName:'沐沐呀',createTime:'2021/01/11 22:00',value:'100.00'},{userName:'沐沐呀',createTime:'2021/01/11 22:00',value:'100.00'},{userName:'沐沐呀',createTime:'2021/01/11 22:00',value:'100.00'},
					// {userName:'沐沐呀',createTime:'2021/01/11 22:00',value:'100.00'},{userName:'沐沐呀',createTime:'2021/01/11 22:00',value:'100.00'},{userName:'沐沐呀',createTime:'2021/01/11 22:00',value:'100.00'},{userName:'沐沐呀',createTime:'2021/01/11 22:00',value:'100.00'},{userName:'沐沐呀',createTime:'2021/01/11 22:00',value:'100.00'},{userName:'沐沐呀',createTime:'2021/01/11 22:00',value:'100.00'},{userName:'沐沐呀',createTime:'2021/01/11 22:00',value:'100.00'},
					// {userName:'沐沐呀',createTime:'2021/01/11 22:00',value:'100.00'},{userName:'沐沐呀',createTime:'2021/01/11 22:00',value:'100.00'},{userName:'沐沐呀',createTime:'2021/01/11 22:00',value:'100.00'},{userName:'沐沐呀',createTime:'2021/01/11 22:00',value:'100.00'},{userName:'沐沐呀',createTime:'2021/01/11 22:00',value:'100.00'},{userName:'沐沐呀',createTime:'2021/01/11 22:00',value:'100.00'},{userName:'沐沐呀',createTime:'2021/01/11 22:00',value:'100.00'},
					// {userName:'沐沐呀',createTime:'2021/01/11 22:00',value:'100.00'},{userName:'沐沐呀',createTime:'2021/01/11 22:00',value:'100.00'},{userName:'沐沐呀',createTime:'2021/01/11 22:00',value:'100.00'},{userName:'沐沐呀',createTime:'2021/01/11 22:00',value:'100.00'},{userName:'沐沐呀',createTime:'2021/01/11 22:00',value:'100.00'},{userName:'沐沐呀',createTime:'2021/01/11 22:00',value:'100.00'},{userName:'沐沐呀',createTime:'2021/01/11 22:00',value:'100.00'},

				],
				pagevalue: 1,
				pageSize: 20,
				pageSum: 0,
				scrollTop: 0,
				webUrl: webUrl.webUrl,
				address: '',
			}
		},
		onShow() {
			this.init();
			this.address = this.webUrl + '/explorer/index.html';
		},
		methods: {
			init() {
				this.pagevalue = 1;
				this.accountList = [];
				this.getList();
			},
			newsListLower(e) {
				if (this.pagevalue >= this.pages) {
					return this.$tools.toast('到底了');
				} else {
					this.pagevalue++;
					this.getList();
				}
			},
			getList() {
				this.$Ajax('/search/queryDestroy', {
					pageNum: this.pagevalue,
					pageSize: this.pageSize
				}, res => {
					if (res.code == 0) {
						this.allDestroyValue = res.obj.allDestroyValue;
						this.pages = res.obj.list.pages;
						this.accountList = this.accountList.concat(res.obj.list.list);
					}
				});
			},
		}
	}
</script>

<style lang="scss" scoped>
	@import '@/common/scss/pages/destruction/destruction';

	.initNoData {
		color: #FFFFFF;
	}
</style>
