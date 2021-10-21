<template>
	<view class="pages bg_header">
		<view class="initHeader initHeader--bgStyle initHeader--white">
			<view class="initHeader-wrapper">
				<view class="initHeader-back" @click="$tools.back(1)"></view>
				<view class="initHeader-title">我的团队</view>
			</view>
		</view>

		<view class="main">
			<view class="teamBox">
				<view class="teamBox-wrapper">
					<view class="teamBox-wrapper__item">
						<image src="../../static/pack/logo.png" mode="widthFix" class="teamBox-wrapper__item--image"></image>
						<view class="teamBox-wrapper__item--name">{{phone}}</view>
						<view class="teamBox-wrapper__item--uid">
							<text>UID:{{id}}</text> 
							<image @click="$tools.copy(id)" src="../../static/index/icon-index-record.png" mode="widthFix"></image>
						</view>
					</view>
					<view class="teamBox-wrapper__line"></view>
					<view class="teamBox-wrapper__item">
						<view class="teamBox-wrapper__item--header">总业绩</view>
						<view class="teamBox-wrapper__item--asset">{{ teamAchievement | number(4) }}</view>
						<view class="teamBox-wrapper__item--push">直推人数：{{profit1}}人</view>
						<view class="teamBox-wrapper__item--team">团队人数：{{teamSize}}人</view>
					</view>
				</view>
			</view>
			<!-- <view class="recommendBox">
				<view class="recommendBox-wrapper">
					<view class="recommendBox-wrapper-item">
						<image src="../../static/team/icon-team-tips.png" mode="widthFix" class="recommendBox-wrapper-item__image"></image>
						<view class="">
							<view class="recommendBox-title">我的直推</view>
							<view class="recommendBox-txt">MY STRAIGHT ON</view>
						</view>
					</view>
				</view>
			</view> -->
			<view class="tabsBox">
				<view class="tabsBox-control">
					<view class="tabsBox-control__item" :class="{ 'tabsBox-control__item--active': tabsActive == 1 }" @click="changeTabsActive(1)">我的直推</view>
					<view class="tabsBox-control__item" :class="{ 'tabsBox-control__item--active': tabsActive == 2 }" @click="changeTabsActive(2)">我的间推</view>
				</view>
			</view>
			<view class="transitionBox">
				<view class="transitionBox-wrapper" v-if="tabsActive == 1">
					<view class="initNoData" v-if="teamList.length ==0">暂无记录</view>
					<view class="transitionBox-wrapper__item" v-for="(item,index) in teamList" :key="index" v-else>
						<!-- <view class="transitionBox-wrapper__item--box"> -->
							<!-- <view class="transitionBox-wrapper__item--title">{{ item.phone != '' ? item.phone : item.email }}</view> -->
							<!-- <view class="transitionBox-wrapper__item--title"></view>
							<view class="transitionBox-wrapper__item--see" @click="getCharge(item.id,index,item.status)">查看</view>
						</view> -->
						<view class="transitionBox-wrapper__item--box">
							<view class="transitionBox-content">
								<view class="transitionBox-content-title">手机号</view>
								<view class="transitionBox-content-data">{{ item.phone | conceal(3)}}</view>
							</view>
							<view class="transitionBox-content">
								<view class="transitionBox-content-title">业绩</view>
								<view class="transitionBox-content-data">{{ item.teamAchievement | number(2) }}</view>
								<!-- <view class="transitionBox-content-data">{{ (item.name != '' ? item.name : '******') | number(2) }}</view> -->
							</view>
							<view class="transitionBox-content">
								<view class="transitionBox-content-title">注册时间</view>
								<view class="transitionBox-content-data">{{ item.createTime }}</view>
							</view>
						</view>
					</view>
				</view>
				<view class="transitionBox-wrapper" v-if="tabsActive == 2">
					<view class="initNoData" v-if="teamList_1.length ==0">暂无记录</view>
					<view class="transitionBox-wrapper__item" v-for="(item,index) in teamList_1" :key="index" v-else>
						<!-- <view class="transitionBox-wrapper__item--box">
							<view class="transitionBox-wrapper__item--title"></view>
							<view class="transitionBox-wrapper__item--see" @click="getCharge(item.id,index,item.status)">查看</view>
						</view> -->
						<view class="transitionBox-wrapper__item--box">
							<view class="transitionBox-content">
								<view class="transitionBox-content-title">手机号</view>
								<view class="transitionBox-content-data">{{ item.phone | conceal(3) }}</view>
							</view>
							<view class="transitionBox-content">
								<view class="transitionBox-content-title">业绩</view>
								<view class="transitionBox-content-data">{{ item.teamAchievement | number(2) }}</view>
							</view>
							<view class="transitionBox-content">
								<view class="transitionBox-content-title">注册时间</view>
								<view class="transitionBox-content-data">{{ item.createTime }}</view>
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
			phone:'',
			id:'',
			teamAchievement:'',
			recordList:[
				{coin:'小木木',num:'23.30200',charge:'0',time:'653.504'},{coin:'小木木',num:'5.2200',charge:'0.23',time:'21/03/22 12:11'}
			],
			teamList: [],
			teamList_1: [],
			teamSize:'',
			profit1:'',
			tatistics:{},
			tabsActive: 1,
		};
	},
	onLoad(hash) {
		this.phone = hash.value1;
		this.id = hash.value2;
		this.teamAchievement = hash.value3;
	},
	onShow() {
		this.init();
	},
	methods: {
		init() {
			this.myTeamList();
			this.getRevenueStatistics();
		},
		// 查看直推业绩
		getCharge(uid,i,status){
			if(status == 1){
				this.$Ajax('/search/getRevenueStatistics', {
					userId:uid
				}, res => {
					if (res.code == 0) {
						if(this.tabsActive == 1){
							this.teamList.forEach((item,index) =>{
								if(index == i){
									this.teamList[index].name = res.obj.total;
									console.log(this.teamList[index].name,"name")
									this.teamList[index].status = 0;
								}
							})
						}else{
							this.teamList_1.forEach((item,index) =>{
								if(index == i){
									this.teamList_1[index].name = res.obj.total;
									console.log(this.teamList_1[index].name,"name")
									this.teamList_1[index].status = 0;
								}
							})
						}
					}
				});
			}else{
				if(this.tabsActive == 1){
					this.teamList.forEach((item,index) =>{
						if(index == i){
							this.teamList[index].status = 1;
						}
					})
				}else{
					this.teamList_1.forEach((item,index) =>{
						if(index == i){
							this.teamList_1[index].status = 1;
						}
					})
				}
			}
		},
		// 收益统计
		getRevenueStatistics() {
			this.$Ajax('/search/getRevenueStatistics', {
				userId:this.id
			}, res => {
				if (res.code == 0) {
					this.tatistics = res.obj;
				}
			});
		},
		// 获取信息
		myTeamList() {
			this.$Ajax('/front/user/myTeamList', {}, res => {
				if (res.code == 0) {
					this.profit1 = res.obj.profit1;
					this.teamSize = res.obj.teamSize;
					this.teamList = res.obj.subList1;
					this.teamList_1 = res.obj.subList2;
				}
			});
		},
		changeTabsActive(index) {
			if (this.tabsActive != index) {
				this.tabsActive = index;
			}
		},
	}
};
</script>

<style lang="scss" scoped>
@import '@/common/scss/pages/team/team';
</style>
