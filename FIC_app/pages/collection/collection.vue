<template>
	<view class="pages">
		<view class="collection">
			<view class="header_bar">
			<view class="header">
				<view class="header-back-1" @click="$tools.back(1)"></view>
				<view class="header-title-1">我的云算力</view>
			</view> 
			</view> 
		</view>
		
		<view class="power">
			<view class="power-box">
				<view class="power-tilte">总算力(T)</view>
				<view class="power-data">{{userList.levelInvest}}</view>
				<view class="power-tips">Fifecash Cloud to calculate force</view>
				
				<view class="power-fix">
					<view class="power-fix-box">
						<view class="power-fix-txt">累计收益(USDT)</view>
						<view class="power-fix-data">{{userList.quietTotal*1 + userList.dynamicTotal*1}}</view>
					</view>
					<view class="power-fix-box">
						<view class="power-fix-txt">今日收益(USDT)</view>
						<view class="power-fix-data">{{userList.quietToday*1 + userList.dynamicToday*1}}</view>
					</view>
				</view>
				<view class="btn-active" @click="$tools.jump('../mine/mine')">购买算力</view>
			</view>
		</view>
		
		<view class="tips_view">
			<view class="s_view"></view>
			<view class="tips-txt">我的云算力</view>
		</view>
		
		<view class="initNoData" v-if="list.length == 0">暂无数据</view>
		<view class="power-bottom" v-for="(item,index) in list" :key="index">
			<view class="power-bottom-garden"></view>
			<view class="power-bottom-list">
				<view class="power-bottom-list-txt">Fifecash云算力</view>
				<view class="power-bottom-list-info">购买数量：{{item.amount}}T</view>
				<!-- <view class="power-bottom-list-info">有效时长：20 天 /1080 天 </view> -->
				<view class="power-bottom-list-info">静态收益：{{(item.scale * item.worth)/100}} USDT /1 天</view>
				<view class="power-bottom-list-info">开启时间：{{item.createTime}}</view>
				<view class="power-bottom-list-info">结束时间：{{item.endTime}}</view>
			</view>
			<view class="power-bottom-image">
				<image src="../../static/collection/icon-collection-01.png" mode="widthFix"></image>
			</view>
		</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				userList:[],
				list: [],
				recordList: [],
				limit:20,
				page:1,
				totalPage:1,
			}
		},
		onShow() {
			this.getUserList();
			this.getList();
		},
		onReachBottom() {
			if (this.page >= this.totalPage) {
				return this.$tools.toast('到底啦');
			} else {
				this.page++;
				this.getList();
			}
		},
		methods: {
			// 获取用户信息
			getUserList() {
				this.$Ajax('/user/info', {}, res => {
						if (res.code == 0) {
							this.userList = res.account
						}
					}
				);
			},
			getList() {
				this.$Ajax('/lock/page', {
					limit: this.limit,
					page: this.page
				}, res => {
						if (res.code == 0) {
							this.totalPage = res.page.totalPage
							this.list = this.list.concat(res.page.list);
						}
					}
				);
			}
		}
	}
</script>

<style>
	@import '@/common/css/style.css';
	.header{background: none !important;}
	.tips_view{background: none !important;}
</style>
