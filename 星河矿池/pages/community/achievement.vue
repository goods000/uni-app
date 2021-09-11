<template>
	<view class="contentBg">
		<view class="record-Bg">
			<view class="header_bar">
				<view class="header">
					<view class="header-white" @click="$tools.back(1)"></view>
					<view class="initButtonTabs">
						<view class="initButtonTabs-control">
							<view class="initButtonTabs-control__aniBg" :style="[{ left: (tabsActive == 1 ? '25' : '75') + '%' }, { width: 20 / 2 + '%' }]"></view>
							<view
								class="initButtonTabs-control__item"
								:class="{ 'initButtonTabs-control__item--active': tabsActive == 1 }"
								@click="changeTabsActive(1)">
								产品业绩
							</view>
							<view
								class="initButtonTabs-control__item"
								:class="{ 'initButtonTabs-control__item--active': tabsActive == 2 }"
								@click="changeTabsActive(2)">
								<!-- @click="$tools.noOpen()"> -->
								创投业绩
							</view>
						</view>
					</view>
				</view> 
			</view> 
			<view class="total">
				<view class="total-wrapper">
					<view class="total-title">累计总业绩</view>
					<view class="total-level">
						<view class="total-level__image" v-if="tabsActive == 1 && teamLevel != ''">
							<image src="../../static/user/icon-level-1.png" mode="widthFix" v-if="teamLevel == 1"></image>
							<image src="../../static/user/icon-level-2.png" mode="widthFix" v-if="teamLevel == 2"></image>
							<image src="../../static/user/icon-level-3.png" mode="widthFix" v-if="teamLevel == 3"></image>
						</view>
						<view class="total-level__image" v-if="tabsActive == 2 && ventureLevel != ''">
							<image src="../../static/user/icon-node-1.png" mode="widthFix" v-if="ventureLevel == 1"></image>
							<image src="../../static/user/icon-node-2.png" mode="widthFix" v-if="ventureLevel == 2"></image>
							<image src="../../static/user/icon-node-3.png" mode="widthFix" v-if="ventureLevel == 3"></image>
						</view>
					</view>
					<view class="total-cion">
						<image src="../../static/public/USDT.png" mode="widthFix"></image>
						<!-- <image src="../../static/public/USDT.png" mode="widthFix" v-if="tabsActive == 1"></image>
						<image src="../../static/public/FIL.png" mode="widthFix" v-if="tabsActive == 2"></image> -->
						<view class="total-cion__item">
							<view class="total-cion__item-name">USDT</view>
							<view class="total-cion__item-num">{{tabsActive == 1 ? teamProfit.total : (ventureProfit.da*1+ventureProfit.xiao)}}</view>
						</view>
					</view>
					<view class="total-dataBox">
						<view class="total-dataBox__item">
							<view class="total-dataBox__item-title">{{tabsActive == 1 ? '直推业绩(USDT)' : '大区业绩(USDT)'}}</view>
							<view class="total-dataBox__item-data">{{tabsActive == 1 ? teamProfit.directSum : ventureProfit.da}}</view>
						</view>
						<view class="total-dataBox__item">
							<view class="total-dataBox__item-title">{{tabsActive == 1 ? '间推业绩(USDT)' : '小区业绩(USDT)'}}</view>
							<view class="total-dataBox__item-data">{{tabsActive == 1  ? teamProfit.indirectSum : ventureProfit.xiao}}</view>
						</view>
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
					{{tabsActive == 1 ? '直推业绩' : '大区业绩'}}
				</view>
				<view
					class="initTabs-control__item"
					:class="{ 'initTabs-control__item--active': recordTabsActive == 1 }"
					@click="changeRecordTabsActive(1)">
					{{tabsActive == 1 ? '间推业绩' : '小区业绩'}}
				</view>
			</view>
		</view>
			
		<view class="teamList" v-if="tabsActive == 1">
			<view class="teamList-header">
				<view class="teamList-header-txt">钱包名称</view>
				<!-- <view class="teamList-header-txt">{{tabsActive == 1 ? '矿机金额(U)' : '创投数量(FIL)'}}</view> -->
				<view class="teamList-header-txt">矿机金额(U)</view>
				<view class="teamList-header-txt">注册时间</view>
			</view>
			<view class="teamList-wrapper" v-if="recordTabsActive == 0">
				<scroll-view scroll-y="true" class="teamList-wrapper-height" @scrolltolower="newsList">
					<view class="initNoData" v-if="directList.length == 0">暂无数据</view>
					<view class="teamList-wrapper-item" v-for="(item,index) in directList" :key="index" v-else>
						<view class="teamList-wrapper-item__left">
							<!-- <image src="../../static/pack/logo.png" mode="widthFix"></image> -->
							<view class="teamList-wrapper-item__left-account">{{ item.userName }}</view>
						</view>
						<view class="teamList-wrapper-item__left-num">{{ item.money }}</view>
						<view class="teamList-wrapper-item__time">{{ item.createTime }}</view>
					</view>
				</scroll-view>
			</view>
			<view class="teamList-wrapper" v-if="recordTabsActive == 1">
				<scroll-view scroll-y="true" class="teamList-wrapper-height" @scrolltolower="newsList">
					<view class="initNoData" v-if="indirectList.length == 0">暂无数据</view>
					<view class="teamList-wrapper-item" v-for="(item,index) in indirectList" :key="index" v-else>
						<view class="teamList-wrapper-item__left">
							<!-- <image src="../../static/pack/logo.png" mode="widthFix"></image> -->
							<view class="teamList-wrapper-item__left-account">{{ item.userName }}</view>
						</view>
						<view class="teamList-wrapper-item__left-num">{{ item.money }}</view>
						<view class="teamList-wrapper-item__time">{{ item.createTime }}</view>
					</view>
				</scroll-view>
			</view>
		</view> 
		<view class="teamList" v-if="tabsActive == 2">
			<view class="teamList-header">
				<view class="teamList-header-txt">钱包名称</view>
				<view class="teamList-header-txt">创投数量</view>
				<view class="teamList-header-txt">注册时间</view>
			</view>
			<view class="teamList-wrapper" v-if="recordTabsActive == 0">
				<scroll-view scroll-y="true" class="teamList-wrapper-height" @scrolltolower="newsList">
					<view class="initNoData" v-if="daList.length == 0">暂无数据</view>
					<view class="teamList-wrapper-item" v-for="(item,index) in daList" :key="index" v-else>
						<view class="teamList-wrapper-item__left">
							<!-- <image src="../../static/pack/logo.png" mode="widthFix"></image> -->
							<view class="teamList-wrapper-item__left-account">{{ item.userName }}</view>
						</view>
						<view class="teamList-wrapper-item__left-num">{{ item.money }}{{item.currencyName}}</view>
						<view class="teamList-wrapper-item__time">{{ item.createTime }}</view>
					</view>
				</scroll-view>
			</view>
			<view class="teamList-wrapper" v-if="recordTabsActive == 1">
				<scroll-view scroll-y="true" class="teamList-wrapper-height" @scrolltolower="newsList">
					<view class="initNoData" v-if="indaList.length == 0">暂无数据</view>
					<view class="teamList-wrapper-item" v-for="(item,index) in indaList" :key="index" v-else>
						<view class="teamList-wrapper-item__left">
							<!-- <image src="../../static/pack/logo.png" mode="widthFix"></image> -->
							<view class="teamList-wrapper-item__left-account">{{ item.userName }}</view>
						</view>
						<view class="teamList-wrapper-item__left-num">{{ item.money }}</view>
						<view class="teamList-wrapper-item__time">{{ item.createTime }}</view>
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
				tabsActive: 1,
				recordTabsActive: 0,
				teamList: [],
				// 页数
				pageSize: 3,
				pageNum: 1,
				pages: 0,
				assetList:{},
				today:'',
				directList:[
					{phone:'哪****饼干',create_time:'03.24 14:54',num:'+40.024'},
					{phone:'哪****饼干',create_time:'03.24 14:54',num:'+40.024'},
					{phone:'哪****饼干',create_time:'03.24 14:54',num:'+40.024'},
				],
				indirectList:[],
				teamProfit:'',
				teamLevel:'',
				ventureLevel:'',
				ventureProfit:'',
				daList:[],
				indaList:[],
			}
		},
		onLoad(hash) {
			this.teamLevel = hash.value1;
			this.ventureLevel = hash.value2;
		},
		onShow() {
			this.init();
		},
		methods: {
			init(){
				this.getmyTeamProfit();
				this.getmyVentureProfit();
			},
			// 产品业绩
			getmyTeamProfit(){
				this.$Ajax('/front/userPassphrase/myTeamProfit', {
					type:this.tabsActive
				}, res => {
					if (res.code == 0) {
						console.log(JSON.stringify(res.obj))
						this.teamProfit = res.obj;
						this.directList = res.obj.directList;
						this.indirectList = res.obj.indirectList;
					}
				});
			},
			// 创投业绩
			getmyVentureProfit(){
				this.$Ajax('/front/userPassphrase/myVentureProfit', {}, res => {
					if (res.code == 0) {
						this.ventureProfit = res.obj;
						this.daList = res.obj.daList;
						this.indaList = res.obj.xiaoList;
					}
				});
			},
			changeRecordTabsActive(index) {
				this.PowerList = [];
				if (this.recordTabsActive != index) {
					this.recordTabsActive = index;
				}
			},
			changeTabsActive(index) {
				if (this.tabsActive != index) {
					this.tabsActive = index;
					// if(this.tabsActive == 1){
					// 	this.getmyTeamProfit();
					// }
					// if(this.tabsActive == 2){
					// 	this.getmyVentureProfit();
					// }
				}
			},
		}
	}
</script>

<style lang="scss" scoped>
	@import '@/common/scss/pages/community/community';
	.header{
		padding: 1% 3%;
	}
	.initButtonTabs{
		&-control{
			&__aniBg{
				border-bottom: 2px solid $globalColor-white;
			}
			&__item{
				color: #c06300;
				&--active{
					color: $globalColor-white;
				}
			}
		}
	}
	.teamList{
		&-wrapper{
			&-height{
				height: 60vh;
			}
		}
	}
</style>
