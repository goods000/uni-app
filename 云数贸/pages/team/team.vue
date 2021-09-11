<template>
	<view class="pages">
		<view class="team">
			<view class="header_bar header_bg">
				<view class="header">
					<view class="header-back" @click="$tools.back(1)"></view>
					<view class="header-title-white">我的团队</view>
				</view> 
			</view> 
			
			<view class="teamMain">
				<view class="teamBox">
					<view class="teamBox-top">
						<view class="teamBox-top-count">{{myPhone}}</view>
						<view class="teamBox-top-txt">邀请码:{{id}}</view>
					</view>
					<view class="teamBox-bottom">
						<view class="teamBox-bottom-item">
							<view class="teamBox-bottom-item__num">{{  teamList.subSize1*1+teamList.subSize2*1+teamList.subSize3 }}</view>
							<view class="teamBox-bottom-item__title">团队总人数</view>
						</view>
						<view class="teamBox-bottom-item">
							<view class="teamBox-bottom-item__num">{{  (teamList.profit1*1+teamList.profit2*1+teamList.profit3) | number(2) }}</view>
							<view class="teamBox-bottom-item__title">团队总收益</view>
						</view>
					</view>
				</view>
				<view class="teamBox-wrapper">
					<view class="teamBox-list">
						<view class="teamBox-list-item">
							<view class="teamBox-list-item__data">{{ teamList.profit1 | number(2) }}</view>
							<view class="teamBox-list-item__title">直推收益</view>
						</view>
						<view class="teamBox-list-item">
							<view class="teamBox-list-item__data">{{ teamList.profit2 | number(2) }}</view>
							<view class="teamBox-list-item__title">二代收益</view>
						</view>
						<view class="teamBox-list-item">
							<view class="teamBox-list-item__data">{{ teamList.profit3 | number(2) }}</view>
							<view class="teamBox-list-item__title">三代收益</view>
						</view>
					</view>
				</view>
				<view class="teamBox-wrapper">
					<view class="teamBox-list">
						<view class="teamBox-list-item">
							<view class="teamBox-list-item__data">{{ teamList.subSize1 }}</view>
							<view class="teamBox-list-item__title">直推人数</view>
						</view>
						<view class="teamBox-list-item">
							<view class="teamBox-list-item__data">{{ teamList.subSize2 }}</view>
							<view class="teamBox-list-item__title">二代人数</view>
						</view>
						<view class="teamBox-list-item">
							<view class="teamBox-list-item__data">{{ teamList.subSize3 }}</view>
							<view class="teamBox-list-item__title">三代人数</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		
		<view class="tipsBox">
			<view class="tipsBox-title">
				<view class="tipsBox-title__label">我的直推</view>
			</view>
		</view>
		
		<view class="teamList">
			<view class="initNoData" v-if="subList1.length == 0">暂无数据</view>
			<scroll-view scroll-y="true" class="teamList-height" @scrolltolower="newsList" v-else>
				<view class="teamMain" v-for="(item,index) in subList1" :key="index"
				@click="$tools.jump('./teamDetails',item.userInfo.id)">
					<view class="teamBox">
						<view class="teamBox-top">
							<view class="teamBox-top-count" v-if="item.userInfo">{{ item.userInfo.phone }}</view>
							<view class="teamBox-top-txt" v-if="item.userInfo">注册时间:{{ item.userInfo.createTime.slice(0,10) }}</view>
						</view>
						<view class="teamBox-bottom">
							<view class="teamBox-bottom-item">
								<view class="teamBox-bottom-item__num">{{ item.subSize1*1+item.subSize2*1+item.subSize3*1 }}</view>
								<view class="teamBox-bottom-item__title">团队总人数</view>
							</view>
							<view class="teamBox-bottom-item">
								<view class="teamBox-bottom-item__num">{{ (item.profit1*1+item.profit2*1+item.profit3*1) | number(2) }}</view>
								<view class="teamBox-bottom-item__title">团队总收益</view>
							</view>
						</view>
					</view>
					<view class="teamBox-wrapper">
						<view class="teamBox-list">
							<view class="teamBox-list-item">
								<view class="teamBox-list-item__data">{{item.profit1 | number(2) }}</view>
								<view class="teamBox-list-item__title">直推收益</view>
							</view>
							<view class="teamBox-list-item">
								<view class="teamBox-list-item__data">{{item.profit2 | number(2) }}</view>
								<view class="teamBox-list-item__title">二代收益</view>
							</view>
						</view>
					</view>
					<view class="teamBox-wrapper">
						<view class="teamBox-list">
							<view class="teamBox-list-item">
								<view class="teamBox-list-item__data">{{item.subSize1}}</view>
								<view class="teamBox-list-item__title">直推人数</view>
							</view>
							<view class="teamBox-list-item">
								<view class="teamBox-list-item__data">{{item.subSize2}}</view>
								<view class="teamBox-list-item__title">二代人数</view>
							</view>
						</view>
					</view>
				</view>
			</scroll-view>
		</view>
		
		
		
	</view>
	
</template>

<script>
	import QR from '../../components/qrcode/qrcode.js';
	
	export default {
		data(){
			return{
				teamList: [],
				// 页数
				pageSize: 20,
				pageNum: 1,
				pages: 0,
				assetList:{},
				today:'',
				subList1:[
					// {userInfo :{phone:'',createTime:''}},
					{createTime:'2021.04.27 20.04',phone:'185***9421'},
					{createTime:'2021.04.09 12.12',phone:'146***7890'},
					{createTime:'2021.04.27 20.04',phone:'142***2131'},
					{createTime:'2021.04.27 20.04',phone:'178***4561'},
				],
				code:'',
				size: 100,
				img: '',
				userList:[],
				myPhone:'',
				id:'',
				userInfo:{},
			}
		},
		onLoad(hash) {
			this.myPhone = hash.value1;
			this.id = hash.value2;
		},
		onShow() {
			this.init();
		},
		methods: {
			init(){
				this.myTeamList();
				this.getList();
			},
			newsList() {
				if (this.pageNum >= this.pages) {
					return this.$tools.toast('到底了');
				} else {
					this.pageNum++;
					this.getList();
				}
			},
			// 获取信息
			myTeamList() {
				this.$Ajax('/front/user/myTeamList', {}, res => {
					if (res.code == 0) {
						this.teamList = res.obj;
					}
				});
			},
			// 下级人数
			getList() {
				this.$Ajax('/front/user/getSubordinate', {
					pageSize: this.pageSize,
					pageNum: this.pageNum,
					userId: this.id,
				}, res => {
					if (res.code == 0) {
						// this.pages = res.obj.pages;
						// this.subList1 = this.subList1.concat(res.obj);
						this.subList1 = res.obj;
						this.subList1.forEach((item,index) => {
							item.userInfo.phone = item.userInfo.phone.substring(0,3)+ '****' + item.userInfo.phone.substring(7);
						})
					}
				});
			},
		},
	}
</script>

<style lang="scss" scoped>
	@import '@/common/scss/pages/team/team';
</style>
