<template>
	<view class="pages">
		<view class="wallet">
			<view class="wallet-Bg"></view>
			<view class="header_bar">
				<view class="header">
					<view class="header-white" @click="$tools.back(1)"></view>
				</view> 
				
				<view class="wallet-tabs">
					<view class="wallet-tabs__title" :class="{'wallet-tabs__title--active': tabsActive == 0 }" @click="changeTabsActive(0)">资金账户</view>
					<view class="wallet-tabs__title" :class="{'wallet-tabs__title--active': tabsActive == 1 }" @click="changeTabsActive(1)">奖励账户</view>
				</view>
			</view> 
			
			<view class="walletBox">
				<view class="walletBox-top">
					<view class="walletBox-top-left">
						<image src="../../static/team/icon-team-logo.png" mode="widthFix" class="walletBox-top-left-image"></image>
						<view class="walletBox-top-left-txt" v-if="tabsActive == 0">股票总价值</view>
						<view class="walletBox-top-left-txt" v-if="tabsActive == 1">团队总收益</view>
					</view>
					<view class="walletBox-top-right" v-if="tabsActive == 0">{{ (SharesPrice * assetList.balance) | number(2) }}</view>
					<view class="walletBox-top-right" v-if="tabsActive == 1">{{ assetList.consume | number(2) }}</view>
				</view>
				<view class="walletBox-bottom" v-if="tabsActive == 0">
					<view class="walletBox-bottom-item">
						<view class="walletBox-bottom-item__title">持有股数</view>
						<view class="walletBox-bottom-item__num">{{ assetList.balance }}</view>
					</view>
					<view class="walletBox-bottom-item">
						<view class="walletBox-bottom-item__title">上月涨幅</view>
						<view class="walletBox-bottom-item__num">{{ zhang }}/股</view>
					</view>
					<view class="walletBox-bottom-item">
						<view class="walletBox-bottom-item__title">涨幅率</view>
						<view class="walletBox-bottom-item__num">{{ percentage }}%</view>
					</view>
				</view>
				<view class="walletBox-bottom" v-if="tabsActive == 1">
					<view class="walletBox-bottom-item">
						<view class="walletBox-bottom-item__title">今日收益</view>
						<view class="walletBox-bottom-item__num">{{ today }}</view>
					</view>
					<view class="walletBox-bottom-item">
						<view class="walletBox-bottom-item__title">团队人数</view>
						<view class="walletBox-bottom-item__num">{{ teamList.teamSize }}</view>
					</view>
				</view>
			</view>
		</view>
		
		<view class="initBtn">
			<view class="initBtn-btn" @click="openPopup('Popup')">提 现</view>
		</view>
		
		<view class="tipsBox">
			<view class="tipsBox-title">
				<view class="tipsBox-title__label">财务明细</view>
			</view>
		</view>
		
		<view class="walletList">
			<view class="walletList-wrapper" v-if="tabsActive == 0">
				<view class="initNoData" v-if="list.length == 0">暂无数据</view>
				<scroll-view scroll-y="true" class="walletList-wrapper-height" @scrolltolower="recordListLower" v-else>
					<view class="walletList-wrapper-item" v-for="(item,index) in list" :key="index">
						<view class="walletList-wrapper-item__top walletList-wrapper-item__top-mt">
							<view class="walletList-wrapper-item__top--name">购买股数</view>
							<view class="walletList-wrapper-item__top--time">{{ item.createTime }}</view>
						</view>
						<view class="walletList-wrapper-item__top">
							<view class="walletList-wrapper-item__top--time">股数</view>
							<view class="walletList-wrapper-item__top--time">价值(CNY)</view>
						</view>
						<view class="walletList-wrapper-item__top">
							<view class="walletList-wrapper-item__top--num">{{ item.num }}</view>
							<view class="walletList-wrapper-item__top--count">{{ item.totalPrice }}</view>
						</view>
					</view>
				</scroll-view>	
			</view>
			<view class="walletList-wrapper" v-if="tabsActive == 1">
				<view class="initNoData" v-if="recordList.length == 0">暂无数据</view>
				<scroll-view scroll-y="true" class="walletList-wrapper-height" @scrolltolower="recordListLower" v-else>
					<view class="walletList-wrapper-item" v-for="(item,index) in recordList" :key="index">
						<view class="walletList-wrapper-item__top walletList-wrapper-item__top-mt">
							<view class="walletList-wrapper-item__top--name">{{ item.typeStr }}</view>
							<!-- <view class="walletList-wrapper-item__top--time">{{ item.createTime }}</view> -->
						</view>
						<view class="walletList-wrapper-item__top">
							<view class="walletList-wrapper-item__top--time">时间</view>
							<view class="walletList-wrapper-item__top--time">额度(CNY)</view>
						</view>
						<view class="walletList-wrapper-item__top">
							<view class="walletList-wrapper-item__top--num">{{ item.createTime }}</view>
							<view class="walletList-wrapper-item__top--count">{{ item.money }}</view>
						</view>
					</view>
				</scroll-view>	
			</view>
		</view>
		
		<!-- 提现框 -->
		<uni-popup ref="Popup" type="center" :animation="true" @change="changePopup($event,'Popup')">
			<view class="oppupBox">
				<view class="oppupBox-header">温馨提示</view>
				<view class="oppupBox-title">目前“提现”功能系统暂未开放，敬请期待！</view>
				<view class="oppupBox-btn" @click="hidePopup('Popup')">确定</view>
			</view>
		</uni-popup>
		
		
	</view>
</template>

<script>
	import uniPopup from '@/components/uni-popup/uni-popup.vue'
	export default {
		components: { uniPopup },
			data(){
				return{
					tabsActive:0,
					assetList:{},
					SharesPrice:'',
					shares_fales:'',
					zhang:'',
					percentage:'',
					list:[],
					teamList:[],
					recordList:[],
					// 页数
					pageSize: 20,
					pageNum: 1,
					pages: 0,
				}
			},
			onLoad(hash) {
				this.SharesPrice = hash.value1,
				this.zhang = hash.value2,
				this.percentage = hash.value3
			},
			onShow() {
				this.init();
			},
			methods: {
				init(){
					this.list = [];
					this.getList();
					this.recordList = [];
					this.getRecordList();
					this.myTeamList();
					this.getRevenueStatistics();
					this.getAssetsInfo();
				},
				// 资产
				getAssetsInfo() {
					this.$Ajax('/front/mine/getAssetsInfo', {}, res => {
						if (res.code == 0) {
							this.assetList = res.obj;
						}
					});
				},
				// 团队人数
				getRevenueStatistics() {
					this.$Ajax('/front/mine/getRevenueStatistics', {}, res => {
						if (res.code == 0) {
							this.today = res.obj.today;
						}
					});
				},
				// 团队
				myTeamList() {
					this.$Ajax('/front/user/myTeamList', {}, res => {
						if (res.code == 0) {
							this.teamList = res.obj;
						}
					});
				},
				recordListLower() {
					if (this.pageNum >= this.pages) {
						return this.$tools.toast('到底了');
					} else {
						if(this.tabsActive == 0){
							this.pageNum++;
							this.getList();
						}else{
							this.pageNum++;
							this.getRecordList();
						}
						
					}
				},
				// 资金账户
				getList() {
					this.$Ajax('/front/mine/getOrderList', {
						pageSize: this.pageSize,
						pageNum: this.pageNum,
					}, res => {
						if (res.code == 0) {
							this.pages = res.obj.pages;
							this.list = this.list.concat(res.obj.list);
						}
					});
				},
				// 奖励账户
				getRecordList(type) {
					this.$Ajax('/search/getUserWalletRecordList', {
						pageSize: this.pageSize,
						pageNum: this.pageNum,
						type:'102'
					}, res => {
						if (res.code == 0) {
							this.pages = res.obj.pages;
							this.recordList = this.recordList.concat(res.obj.list);
						}
					});
				},
				changeTabsActive(index) {
					this.list = [];
					this.recordList = [];
					if (this.tabsActive != index) {
						this.tabsActive = index;
					}
					if(index == 0){
						this.pageNum = 1;
						this.getList();
					}
					if(index == 1){
						this.pageNum = 1;
						this.getRecordList();
					}
				},
				/* 弹出框公用 */
				openPopup(e) {
					this.$refs[e].open();
				},
				hidePopup(e) {
					this.$refs[e].close();
				},
				changePopup(e) {
					console.log('popup ' + e.type + ' 状态', e.show);
				}
			},
		}
	</script>

<style lang="scss" scoped>
	@import '@/common/scss/pages/wallet/wallet';
	page,.pages{background: #EDEDF2;height: 100vh;}
</style>
