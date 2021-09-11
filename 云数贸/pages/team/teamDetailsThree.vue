<template>
	<view class="pages">
		<view class="header_bar header_bg header_fixed">
			<view class="header">
				<view class="header-back" @click="$tools.back(1)"></view>
				<view class="header-title-white">三代</view>
			</view> 
		</view> 
		
		<view class="teamList">
			<view class="initNoData" v-if="subList1.length == 0">暂无数据</view>
			<view class="teamMain" v-for="(item,index) in subList1" :key="index">
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
					{createTime:'2021.04.27 20.04',phone:'185***9421'},
					{createTime:'2021.04.09 12.12',phone:'146***7890'},
					{createTime:'2021.04.27 20.04',phone:'142***2131'},
					{createTime:'2021.04.27 20.04',phone:'178***4561'},
				],
				code:'',
				size: 100,
				img: '',
				userList:[],
				id:'',
				userInfo:{},
			}
		},
		onLoad(hash) {
			this.id = hash.value1;
		},
		onShow() {
			this.init();
		},
		onReachBottom() {
			if (this.pageNum >= this.pages) {
				return this.$tools.toast('到底啦');
			} else {
				this.pageNum++;
				this.myTeamList();
			}
		},
		methods: {
			init(){
				this.myTeamList();
			},
			// 获取信息
			myTeamList() {
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
	.teamList{
		// margin-top: 30upx;
	}
</style>
