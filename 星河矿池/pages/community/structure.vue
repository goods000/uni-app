<template>
	<view class="contentBg">
		<view class="team">
			<view class="team-Bg"></view>
			<view class="header_bar">
				<view class="header">
					<view class="header-white" @click="$tools.back(1)"></view>
					<view class="header-title-white">社区结构</view>
				</view> 
			</view> 
			
			<view class="teamBox">
				<!-- <view class="teamBox-top">
					<view class="teamBox-top-txt">推荐奖余额(CNY)</view>
					<view class="teamBox-top-count">{{ assetList.consume | number(2) }}</view>
				</view> -->
				<view class="teamBox-bottom">
					<view class="teamBox-bottom-item">
						<view class="teamBox-bottom-item__num">{{myTeam.vipCount_1 == null ? 0 : myTeam.vipCount_1}}</view>
						<view class="teamBox-bottom-item__title">直推人数</view>
					</view>
					<view class="teamBox-bottom-line"></view>
					<view class="teamBox-bottom-item">
						<view class="teamBox-bottom-item__num">{{myTeam.vipCount_2 == null ? 0 : myTeam.vipCount_2}}</view>
						<view class="teamBox-bottom-item__title">间推人数</view>
					</view>
				</view>
			</view>
		</view>
		
		<view class="initTabs">
			<view class="initTabs-control">
				<view class="initTabs-control__aniBg" :style="[{ left: (100 / 2) * recordTabsActive + '%' }, { width: 100 / 2 + '%' }]"></view>
				<view
					class="initTabs-control__item"
					:class="{ 'initTabs-control__item--active': recordTabsActive == 0 }"
					@click="changeRecordTabsActive(0)">
					直推会员
				</view>
				<view
					class="initTabs-control__item"
					:class="{ 'initTabs-control__item--active': recordTabsActive == 1 }"
					@click="changeRecordTabsActive(1)">
					间推会员
				</view>
			</view>
		</view>
			
		<view class="teamList">
			<view class="teamList-header">
				<view class="teamList-header-txt">钱包名称</view>
				<view class="teamList-header-txt">注册时间</view>
			</view>
			<!-- <view class="teamList-wrapper"> -->
			<view class="teamList-wrapper" v-if="recordTabsActive == 0">
				<view class="initNoData" v-if="myTeamList_1.length == 0">暂无数据</view>
				<scroll-view scroll-y="true" class="teamList-wrapper-height" @scrolltolower="newsList" v-else>
					<view class="teamList-wrapper-item" v-for="(item,index) in myTeamList_1" :key="index">
						<view class="teamList-wrapper-item__left">
							<!-- <image src="../../static/pack/logo.png" mode="widthFix"></image> -->
							<view class="teamList-wrapper-item__left-account">{{ item.account }}</view>
						</view>
						<view class="teamList-wrapper-item__time">{{ item.time.slice(0,19) }}</view>
					</view>
				</scroll-view>
			</view>
			<view class="teamList-wrapper" v-if="recordTabsActive == 1">
				<view class="initNoData" v-if="myTeamList_2.length == 0">暂无数据</view>
				<scroll-view scroll-y="true" class="teamList-wrapper-height" @scrolltolower="newsList" v-else>
					<view class="teamList-wrapper-item" v-for="(item,index) in myTeamList_2" :key="index">
						<view class="teamList-wrapper-item__left">
							<view class="teamList-wrapper-item__left-account">{{ item.account }}</view>
						</view>
						<view class="teamList-wrapper-item__time">{{ item.time.slice(0,19) }}</view>
						<!-- <view class="teamList-wrapper-item__time">{{ item.create_time.slice(0,19) }}</view> -->
					</view>
				</scroll-view>
			</view>
		</view> 
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				recordTabsActive: 0,
				// 页数
				pageSize: 3,
				pageNum: 1,
				pages: 0,
				subList1:[
					{phone:'哪****饼干',create_time:'2021-07-06 12:12:12'},
					{phone:'哪****饼干',create_time:'2021-07-06 12:12:12'},
					{phone:'哪****饼干',create_time:'2021-07-06 12:12:12'},
				],
				navigateFlag: [{ show: false }, { show: false }, { show: false }],
				myTeam:{
					vipCount_1:'',
					vipCount_2:'',
				},
				myTeamList_1:[],
				myTeamList_2:[],
			}
		},
		onShow() {
			this.init();
		},
		methods: {
			triggerCollapse(index) {
				this.navigateFlag[index].show = !this.navigateFlag[index].show;
			},
			init(){
				this.getmyTeam();
			},
			changeRecordTabsActive(index) {
				if (this.recordTabsActive != index) {
					this.recordTabsActive = index;
					this.getmyTeam();
				}
			},
			getmyTeam(){
				this.$Ajax('/front/userPassphrase/myTeam', {
					treeLevel:2,
				}, res => {
					if (res.code == 0) {
						this.myTeam = res.obj;
						this.myTeamList_1 = res.obj.vipList_1;
						this.myTeamList_2 = res.obj.vipList_2;
					}
				});
				
			}
		}
	}
</script>

<style lang="scss">
	@import '@/common/scss/pages/community/community';
	page{
		background: $globalColor-bgStyle;
	}
	.tipsBox{
		&-right{
			right: 30upx;
		}
	}
</style>
