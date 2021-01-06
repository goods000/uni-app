<template>
	<view class="pages">
		<view class="asset">
			<view class="asset-box-data">
				<view class="header_bar header_bar--absolute">
					<view class="header">
						<view class="header-title">资产</view>
					</view> 
				</view>
				
				<view class="asset-box-title main_top">我的资产</view>
				<view class="asset-box-count">
					<view class="asset-box-count-title">当前可用USDT</view>
					<view class="asset-box-count-num">{{userList.usdtNum}}</view>
				</view>
				<view class="asset-box-type">
					<view class="asset-box-type-l">
						<view class="asset-box-type-title">当前可用MMX</view>
						<view class="asset-box-type-data">{{userList.mxNum}}</view>
					</view>
					<view class="asset-box-type-l">
						<view class="asset-box-type-title">当前可用SLC</view>
						<view class="asset-box-type-data">{{userList.slcNum}}</view>
					</view>
				</view>
			</view>
			
			<!-- 列表 -->
			<view class="asset-list">
				<view class="asset-list-box" @click="$tools.jump('../recharge/recharge')">
					<view class="asset-list-box-image">
						<image src="../../static/asset/icon-asset-1.png" mode=""></image>
					</view>
					<view class="asset-list-box-title">充币</view>
				</view>
				<view class="asset-list-box" @click="$tools.jump('../withdraw/withdraw')">
					<view class="asset-list-box-image">
						<image src="../../static/asset/icon-asset-2.png" mode=""></image>
					</view>
					<view class="asset-list-box-title">自动交易</view>
				</view>
				<view class="asset-list-box" @click="$tools.jump('../exchange/exchange')">
					<view class="asset-list-box-image">
						<image src="../../static/asset/icon-asset-3.png" mode=""></image>
					</view>
					<view class="asset-list-box-title">兑换</view>
				</view>
				<view class="asset-list-box" @click="$tools.jump('../transfer/transfer')">
					<view class="asset-list-box-image">
						<image src="../../static/asset/icon-asset-4.png" mode=""></image>
					</view>
					<view class="asset-list-box-title">划转</view>
				</view>
			</view>
			
			<!-- 记录 -->
			<view class="tips_view mt">
				<view class="tips-txt">交易记录</view>
			</view>
			<view class="asset-record">
				<view class="initNoData" v-if="list.length == 0">暂无数据</view>
				<view class="asset-record">
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
			</view>
		
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				userList:[],
				typeList:[],
				list: [],
				limit:10,
				page:1,
				pages:1
			}
		},
		onReachBottom() {
			if (this.page >= this.pages) {
				return this.$tools.toast('到底啦');
			} else {
				this.page++;
				this.getList();
			}
		},
		onShow() {
			this.getUserList();
			this.getTypeList();
			this.getList();
		},
		methods:{
			// 获取用户信息
			getUserList() {
				this.$Ajax('/user/info', {}, res => {
						if (res.code == 0) {
							this.userList = res.account
						}
					}
				);
			},
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
			getList() {
				this.$Ajax('/accountLog/page', {
					limit: this.limit,
					page: this.page
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
	.header{background: none;}
</style>
