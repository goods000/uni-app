<template>
	<view class="pages">
		<view class="header_bar header_bg header_fixed">
			<view class="header">
				<view class="header-back" @click="$tools.back(1)"></view>
				<view class="header-title">收益记录</view>
			</view> 
		</view> 
		
		<view class="record-top">
			<view class="record-top-box">
				<view class="record-top-image">
					<image src="../../static/record/icon-record-1.png" mode=""></image>
				</view>
				<view class="record-tips">
					<view class="record-num">{{accountList.quietTotal*1 + accountList.dynamicTotal*1}}</view>
					<view class="record-txt">累计收益</view>
				</view>
			</view>
			<view class="record-top-box-1"></view>
			<view class="record-top-box">
				<view class="record-top-image">
					<image src="../../static/record/icon-record-2.png" mode=""></image>
				</view>
				<view class="record-tips">
					<view class="record-num">{{accountList.quietToday*1 + accountList.dynamicToday*1}}</view>
					<view class="record-txt">今日收益</view>
				</view>
			</view>
		</view>
		
		<view class="record-tab">
			<view class="record-tab-list">
				<view class="record-tab-list-txt" :class="{ 'active': tabsActive == 1 }" @click="changeTabsActive(1)">算力收益</view>
				<view class="record-tab-list-txt" :class="{ 'active': tabsActive == 2 }" @click="changeTabsActive(2)">邀请返现</view>
			</view>
		</view>
		<view class="asset-record">
			<view class="initNoData" v-if="list.length == 0">暂无数据</view>
			<view class="asset-record-box" v-for="(item,index) in list" :key="index">
				<view class="asset-record-title">算力收益</view>
				<view class="asset-record-time">2020-12-29  18:24</view>
				<view class="asset-record-num">+12.465</view>
			</view>
		</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				tabsActive: 1,
				accountList:[],
				list: [],
				limit:10,
				page:1,
				pages:1,
				type:'interest',
			}
		},
		onShow() {
			this.getUserList()
			this.type = 'interest'
			this.getList(this.type);
		},
		onReachBottom() {
			if (this.page >= this.pages) {
				return this.$tools.toast('到底啦');
			} else {
				this.page++;
				this.getList(this.type);
			}
		},
		methods: {
			// 获取用户信息
			getUserList() {
				this.$Ajax('/user/info', {}, res => {
						if (res.code == 0) {
							this.accountList = res.account
						}
					}
				);
			},
			changeTabsActive(index) {
				if(this.tabsActive != index){
					this.tabsActive = index;
				}
				if(index == 1){
					this.type = 'interest'
					this.getList(this.type)
				}else{
					this.type = 'dynamic'
					this.getList(this.type)
				}
			},
			getList(type) {
				this.$Ajax('/income/page', {
					limit: this.limit,
					page: this.page,
					type: this.type,
				}, res => {
						if (res.code == 0) {
							this.list = res.page.list
						}
					}
				);
			}
		}
	}
</script>

<style>
	@import '@/common/css/style.css';
	page{background: #FFFFFF !important;}
	.asset-record{margin: 0 10px;}
	.asset-record .asset-record-box{padding: 10px 0px;}
</style>
