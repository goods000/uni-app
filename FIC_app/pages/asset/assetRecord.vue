<template>
	<view class="pages">
		<view class="assetRecord">
			<view class="header_bar header_bg header_fixed">
				<view class="header">
					<view class="header-back" @click="$tools.back(1)"></view>
					<view class="header-title">明细记录</view>
				</view> 
			</view> 
			
			<view class="">
				<view class="initNoData" v-if="list.length == 0">暂无数据</view>
				<view class="asset-record asset-record-height">
					<view class="asset-record-box" v-for="(item, key) in list" :key="key">
						<view class="asset-record-title-box">
							<view class="asset-record-title">{{item.currType.toUpperCase()}}</view>	
							<view v-for="(info, key) in typeList" :key="key">
								<view v-if="info.code == item.sceneType">({{info.value}})</view>
							</view>
						</view>	
						<view class="asset-record-time">{{item.createTime}}</view>
						<view class="asset-record-num" v-if="item.amount < 0">{{item.amount}}</view>
						<view class="asset-record-num chioce" v-else>+{{item.amount}}</view>
					</view>
				</view>
				<!-- <view class="asset-record">
					<view class="asset-record-box">
						<view class="asset-record-title">MX兑换USDT</view>
						<view class="asset-record-time">地址：sdksjglagiljgmlskjgaslgji </view>
						<view class="asset-record-time">手续费：90</view>
						<view class="asset-record-time">2020-12-24  18:24</view>
						<view class="asset-record-num">+2</view>
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
				typeList: [],
				list: [],
				recordList: [],
				limit:20,
				page:1,
				totalPage:1,
				type_c:''
			}
		},
		onReachBottom() {
			if (this.page >= this.totalPage) {
				return this.$tools.toast('到底啦');
			} else {
				this.page++;
				this.getList();
			}
		},
		onLoad(value1) {
			// console.log("value1",value1)
			this.type_c = value1.value1;
			// console.log("type_c",this.type_c)
			this.type_c = this.type_c
			this.getTypeList(this.type_c);
			this.getList(this.type_c);
		},
		onShow() {
			
		},
		methods:{
			getTypeList() {
				this.$Ajax('/dict/flow', {
					limit: this.limit,
					page: this.page
				}, res => {
						if (res.code == 0) {
							this.typeList = res.list
						}
					}
				);
			},
			getList(type_c) {
				this.$Ajax('/accountLog/page', {
					limit: this.limit,
					page: this.page,
					currType:this.type_c
				}, res => {
						if (res.code == 0) {
							this.totalPage = res.page.totalPage
							this.list = this.recordList.concat(res.page.list);
						}
					}
				);
			}
		}
	}
</script>

<style>
	@import '@/common/css/style.css';
</style>
