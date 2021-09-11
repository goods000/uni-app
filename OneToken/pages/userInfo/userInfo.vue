<template>
	<view class="pages">
		<view class="initHeader initHeader--fixed initHeader--black">
			<view class="initHeader-wrapper">
				<view class="initHeader-back" @click="$tools.back(1)"></view>
				<view class="initHeader-title">主页</view>
			</view>
		</view>
		<view class="main">
			<view class="userInfoBox">
				<view class="userInfoBox-wrapper">
					<view class="userInfoBox-header">
						<view class="userInfoBox-avatar"><image :src="tradeUserInfo.userImage" mode="scaleToFill"></image></view>
						<view class="userInfoBox-info">
							<view class="userInfoBox-name">{{ tradeUserInfo.userName }}</view>
							<view class="userInfoBox-strategy">
								<view class="userInfoBox-strategy__label">策略：</view>
								<view class="userInfoBox-strategy__data">{{ userInfo.strategy }}</view>
							</view>
						</view>
					</view>
					<view class="userInfoBox-body">
						<view class="userInfoBox-itemBox">
							<view class="userInfoBox-itemBox__item">
								<view class="userInfoBox-itemBox__item-data userInfoBox-itemBox__item-data--style">{{ tradeUserInfo.traderFund | number(4) }}</view>
								<view class="userInfoBox-itemBox__item-label">交易账户</view>
							</view>
							<view class="userInfoBox-itemBox__item">
								<view class="userInfoBox-itemBox__item-data">{{ tradeUserInfo.sameOrientation | number(2) }}</view>
								<view class="userInfoBox-itemBox__item-label">正向</view>
							</view>
							<view class="userInfoBox-itemBox__item">
								<view class="userInfoBox-itemBox__item-data">{{ tradeUserInfo.reserveOrientation | number(2) }}</view>
								<view class="userInfoBox-itemBox__item-label">反向</view>
							</view>
						</view>
					</view>

					<view class="userInfoBox-button">
						<!-- <view class="userInfoBox-button__btn userInfoBox-button__btn--orange">关 注</view> -->
						<view class="userInfoBox-button__btn userInfoBox-button__btn--red" @click="$tools.jump('../documentary/documentary_follow', tradeUserInfo.id)">跟 随</view>
					</view>
				</view>
			</view>

			<view class="tabsBox">
				<view class="tabsBox-control">
					<view class="tabsBox-control__item" :class="{ 'tabsBox-control__item--active': tabsActive == 0 }" @click="changeTabsActive(0)">跟随</view>
					<view class="tabsBox-control__item" :class="{ 'tabsBox-control__item--active': tabsActive == 1 }" @click="changeTabsActive(1)">账户</view>
					<view class="tabsBox-control__item" :class="{ 'tabsBox-control__item--active': tabsActive == 2 }" @click="changeTabsActive(2)">交易</view>
					<view class="tabsBox-control__item" :class="{ 'tabsBox-control__item--active': tabsActive == 3 }" @click="changeTabsActive(3)">动态</view>
					<view class="tabsBox-control__item" :class="{ 'tabsBox-control__item--active': tabsActive == 4 }" @click="changeTabsActive(4)">其他</view>
				</view>
				<view class="tabsBox-wrapper">
					<view class="tabsBox-content" v-show="tabsActive == 0">
						<view class="followBox">
							<view class="followBox-wrapper">
								<view class="followBox-item">
									<view class="followBox-title"><view class="followBox-title__label">正在跟随</view></view>
									<view class="initNoData" v-if="nowFollowData.length == 0">暂无数据</view>
									<scroll-view scroll-y="true" class="followBox-content" @scrolltolower="nowFollowLower">
										<view class="followBox-list" v-for="(item, index) in nowFollowData" :key="index">
											<view class="followBox-plane">
												<view class="followBox-header">
													<view class="followBox-avatar"><image :src="item.userImage" mode="scaleToFill"></image></view>
													<view class="followBox-info">
														<view class="followBox-name">{{ item.userName }}</view>
														<view class="followBox-row">
															<view class="followBox-type">{{ item.bourseName }}跟随者</view>
														</view>
													</view>
												</view>
												<view class="followBox-body">
													<view class="followBox-itemBox">
														<view class="followBox-itemBox__item">
															<view class="followBox-itemBox__item-data followBox-itemBox__item-data--style">
																{{ item.followProfit | number(4) }}
															</view>
															<view class="followBox-itemBox__item-label">跟随收益({{ item.profitCurrency }})</view>
														</view>
														<view class="followBox-itemBox__item">
															<view class="followBox-itemBox__item-data">{{ item.contractCurrency }}</view>
															<view class="followBox-itemBox__item-label">跟随币种</view>
														</view>
														<view class="followBox-itemBox__item">
															<view class="followBox-itemBox__item-data">{{ item.followCount }}</view>
															<view class="followBox-itemBox__item-label">跟随笔数</view>
														</view>
													</view>
												</view>
											</view>
										</view>
									</scroll-view>
								</view>
								<view class="followBox-item">
									<view class="followBox-title"><view class="followBox-title__label">历史跟随</view></view>
									<view class="initNoData" v-if="historyFollowData.length == 0">暂无数据</view>
									<scroll-view scroll-y="true" class="followBox-content" @scrolltolower="historyFollowLower">
										<view class="followBox-list" v-for="(item, index) in historyFollowData" :key="index">
											<view class="followBox-plane">
												<view class="followBox-header">
													<view class="followBox-avatar"><image :src="item.userImage" mode="scaleToFill"></image></view>
													<view class="followBox-info">
														<view class="followBox-name">{{ item.userName }}</view>
														<view class="followBox-row">
															<view class="followBox-type">{{ item.bourseName }}跟随者</view>
														</view>
													</view>
												</view>
												<view class="followBox-body">
													<view class="followBox-itemBox">
														<view class="followBox-itemBox__item">
															<view class="followBox-itemBox__item-data followBox-itemBox__item-data--style">
																{{ item.followProfit | number(4) }}
															</view>
															<view class="followBox-itemBox__item-label">跟随收益({{ item.profitCurrency }})</view>
														</view>
														<view class="followBox-itemBox__item">
															<view class="followBox-itemBox__item-data">{{ item.contractCurrency }}</view>
															<view class="followBox-itemBox__item-label">跟随币种</view>
														</view>
														<view class="followBox-itemBox__item">
															<view class="followBox-itemBox__item-data">{{ item.followCount }}</view>
															<view class="followBox-itemBox__item-label">跟随笔数</view>
														</view>
													</view>
												</view>
											</view>
										</view>
									</scroll-view>
								</view>
							</view>
						</view>
					</view>
					<view class="tabsBox-content" v-show="tabsActive == 1">
						<view class="realPlaneBox">
							<view class="realPlaneBox-wrapper">
								<view class="realPlaneBox-account">
									<view class="realPlaneBox-account__item">
										<view class="realPlaneBox-account__icon"><image :src="tradeUserInfo.bourseLogo" mode="widthFix"></image></view>
										<view class="realPlaneBox-account__content">
											<view class="realPlaneBox-account__name">{{ tradeUserInfo.bourseName }}</view>
											<view class="realPlaneBox-account__type">交易员</view>
										</view>
									</view>
								</view>
								<view class="realPlaneBox-plane">
									<!-- <view class="realPlaneBox-select"><view class="realPlaneBox-select__label">USDT</view></view> -->
									<view class="realPlaneBox-itemBox">
										<view class="realPlaneBox-itemBox__item">
											<view class="realPlaneBox-itemBox__item-data">{{ tradeUserInfo.traderFund | number(4) }}</view>
											<view class="realPlaneBox-itemBox__item-label">账户资产</view>
										</view>
										<view class="realPlaneBox-itemBox__item">
											<view class="realPlaneBox-itemBox__item-data">{{ tradeUserInfo.profitRate }}</view>
											<view class="realPlaneBox-itemBox__item-label">总收益率</view>
										</view>
										<view class="realPlaneBox-itemBox__item">
											<view class="realPlaneBox-itemBox__item-data">{{ tradeUserInfo.followerReward }}</view>
											<view class="realPlaneBox-itemBox__item-label">跟随奖励</view>
										</view>
										<view class="realPlaneBox-itemBox__item">
											<view class="realPlaneBox-itemBox__item-data realPlaneBox-itemBox__item-data--style">{{ tradeUserInfo.traderProfit | number(4) }}</view>
											<view class="realPlaneBox-itemBox__item-label">总收益({{ tradeUserInfo.profitCurrency }})</view>
										</view>
										<view class="realPlaneBox-itemBox__item">
											<view class="realPlaneBox-itemBox__item-data">{{ tradeUserInfo.monthCount }}</view>
											<view class="realPlaneBox-itemBox__item-label">交易频次/月</view>
										</view>
										<view class="realPlaneBox-itemBox__item">
											<view class="realPlaneBox-itemBox__item-data">{{ tradeUserInfo.winRate }}</view>
											<view class="realPlaneBox-itemBox__item-label">交易胜率</view>
										</view>
										<view class="realPlaneBox-itemBox__item">
											<view class="realPlaneBox-itemBox__item-data">{{ tradeUserInfo.weekProfit | number(4) }}</view>
											<view class="realPlaneBox-itemBox__item-label">7日收益</view>
										</view>
										<view class="realPlaneBox-itemBox__item">
											<view class="realPlaneBox-itemBox__item-data">{{ tradeUserInfo.followerProfit | number(4) }}</view>
											<view class="realPlaneBox-itemBox__item-label">跟随者总收益</view>
										</view>
										<view class="realPlaneBox-itemBox__item">
											<view class="realPlaneBox-itemBox__item-data">{{ tradeUserInfo.followerAmount | number(4) }}</view>
											<view class="realPlaneBox-itemBox__item-label">跟随总量({{ tradeUserInfo.currencyName }})</view>
										</view>
									</view>

									<view class="realPlaneBox-echartsBox">
										<view class="realPlaneBox-echartsBox__wrapper"><total-income v-if="tabsActive == 1" :traderId="traderId"></total-income></view>
									</view>
									<view class="realPlaneBox-echartsBox">
										<view class="realPlaneBox-echartsBox__wrapper"><month-income v-if="tabsActive == 1" :traderId="traderId"></month-income></view>
									</view>
									<view class="realPlaneBox-echartsBox">
										<view class="realPlaneBox-echartsBox__wrapper"><daily-income v-if="tabsActive == 1" :traderId="traderId"></daily-income></view>
									</view>
									<view class="realPlaneBox-echartsBox">
										<view class="realPlaneBox-echartsBox__wrapper"><totalTradeCount v-if="tabsActive == 1" :traderId="traderId"></totalTradeCount></view>
									</view>
								</view>
							</view>
						</view>
					</view>
					<view class="tabsBox-content" v-show="tabsActive == 2">
						<view class="recordBox">
							<view class="recordBox-wrapper">
								<view class="recordBox-item">
									<view class="recordBox-title"><view class="recordBox-title__label">当前持仓</view></view>
									<view class="initNoData" v-if="nowRecordData.length == 0">暂无数据</view>
									<scroll-view scroll-y="true" class="recordBox-content" @scrolltolower="nowRecordLower">
										<view class="recordBox-list" v-for="(item, index) in nowRecordData" :key="index">
											<view class="recordBox-plane">
												<view class="recordBox-header">
													<view class="recordBox-name">{{ item.currencyName  }}</view>
													<view
														class="recordBox-type"
														:class="[{ 'recordBox-type--green': item.tradeType == 1 }, { 'recordBox-type--red': item.tradeType == 2 }]"
													>
														{{ item.tradeTypeStr }}
													</view>
													<view class="recordBox-date">{{ item.createTime }}</view>
												</view>
												<view class="recordBox-body">
													<view class="recordBox-itemBox">
														<view class="recordBox-itemBox__item">
															<view class="recordBox-itemBox__item-data recordBox-itemBox__item-data--style">{{ item.profit | number(4) }}</view>
															<view class="recordBox-itemBox__item-label">收益({{ item.profitCurrency }})</view>
														</view>
														<view class="recordBox-itemBox__item">
															<view class="recordBox-itemBox__item-data">{{ item.profitRate }}</view>
															<view class="recordBox-itemBox__item-label">收益率</view>
														</view>
														<view class="recordBox-itemBox__item">
															<view class="recordBox-itemBox__item-data">{{ item.openQuantity | number(2) }}</view>
															<view class="recordBox-itemBox__item-label">持仓量({{ item.currencyName }})</view>
														</view>
													</view>
												</view>
											</view>
										</view>
									</scroll-view>
								</view>
								<view class="recordBox-item">
									<view class="recordBox-title"><view class="recordBox-title__label">历史记录</view></view>
									<view class="initNoData" v-if="historyRecordData.length == 0">暂无数据</view>
									<scroll-view scroll-y="true" class="recordBox-content" @scrolltolower="historyRecordLower">
										<view class="recordBox-list" v-for="(item, index) in historyRecordData" :key="index">
											<view class="recordBox-plane">
												<view class="recordBox-header">
													<view class="recordBox-name">{{ item.currencyName }}</view>
													<view
														class="recordBox-type"
														:class="[{ 'recordBox-type--green': item.tradeType == 1 }, { 'recordBox-type--red': item.tradeType == 2 }]"
													>
														{{ item.tradeTypeStr }}
													</view>
													<view class="recordBox-date">{{ item.createTime }}</view>
												</view>
												<view class="recordBox-body">
													<view class="recordBox-itemBox">
														<view class="recordBox-itemBox__item">
															<view class="recordBox-itemBox__item-data recordBox-itemBox__item-data--style">{{ item.profit | number(4) }}</view>
															<view class="recordBox-itemBox__item-label">收益({{ item.profitCurrency }})</view>
														</view>
														<view class="recordBox-itemBox__item">
															<view class="recordBox-itemBox__item-data">{{ item.profitRate }}</view>
															<view class="recordBox-itemBox__item-label">收益率</view>
														</view>
														<view class="recordBox-itemBox__item">
															<view class="recordBox-itemBox__item-data">{{ item.openQuantity | number(2) }}</view>
															<view class="recordBox-itemBox__item-label">持仓量({{ item.currencyName }})</view>
														</view>
													</view>
												</view>
											</view>
										</view>
									</scroll-view>
								</view>
							</view>
						</view>
					</view>
					<view class="tabsBox-content" v-show="tabsActive == 3">
						<view class="dynamicBox">
							<view class="dynamicBox-wrapper">
								<view class="dynamicBox-list" v-for="(item, index) in dynamicList" :key="index">
									<view class="dynamicBox-list__date">{{ item.createTime }}</view>
									<view class="dynamicBox-list__plane">
										<view class="dynamicBox-list__message">{{ item.content }}</view>
										<view class="dynamicBox-list__imageList">
											<view class="dynamicBox-list__imageList-image" :style="{ 'background-image': 'url(' + subItem + ')' }" v-for="(subItem,subIndex) in item.imageList" :key="subIndex" @click="previewImage(item.imageList)">
												<!-- <image :src="subItem" mode="scaleToFill"></image> -->
											</view>
										</view>
										<view class="dynamicBox-list__button">
											<view class="dynamicBox-list__button-btn" :class="{'dynamicBox-list__button-btn--active': item.supportCount}" @click="dynamicSupport(item.id, item.focusFlag, index)">赞({{ item.supportCount }})</view>
										</view>
									</view>
								</view>
							</view>
						</view>
					</view>
					<view class="tabsBox-content" v-show="tabsActive == 4">
						<view class="otherBox">
							<view class="otherBox-wrapper">
								<view class="otherBox-list">
									<view class="otherBox-list__label">注册时间：</view>
									<view class="otherBox-list__data">{{ tradeUserInfo.createTime }}</view>
								</view>
								<view class="otherBox-list">
									<view class="otherBox-list__label">交易币种：</view>
									<view class="otherBox-list__data">{{ tradeUserInfo.currencyName }}</view>
								</view>
								<view class="otherBox-list">
									<view class="otherBox-list__label">交易所：</view>
									<view class="otherBox-list__data">{{ tradeUserInfo.bourseName }}</view>
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
import totalIncome from '../echart/userInfo/totalIncome.vue';
import monthIncome from '../echart/userInfo/monthIncome.vue';
import dailyIncome from '../echart/userInfo/dailyIncome.vue';
import totalTradeCount from '../echart/userInfo/totalTradeCount.vue';
export default {
	components: {
		totalIncome,
		monthIncome,
		dailyIncome,
		totalTradeCount
	},
	data() {
		return {
			userInfo: [],
			tradeUserInfo: [],
			nowFollowData: [],
			historyFollowData: [],
			nowRecordData: [],
			historyRecordData: [],
			dynamicList: [], //动态

			tabsActive: 0,

			traderId: '',
			bourseName: '',
			currencyName: '',
			type: '',

			// 分页
			nowPageNum: 1, //总页数
			nowPageSize: 20, //当前页数
			nowPages: 1, //请求记录

			historyPageNum: 1, //总页数
			historyPageSize: 20, //当前页数
			historyPages: 1 ,//请求记录
			
			// 分页
			dynamicPages: 1, //总页数
			dynamicPageNum: 1, //当前页数
			dynamicPageSize: 20 //请求记录
		};
	},
	onReachBottom() {
		if(this.tabsActive == 3){
			if (this.dynamicPageNum >= this.dynamicPages) {
				return this.$tools.toast('到底了');
			} else {
				this.dynamicPageNum++;
				this.getDynamicByTraderList();
			}
		}
	},
	onLoad(hash) {
		this.traderId = hash.value1;
		this.bourseName = hash.value2;
		this.currencyName = hash.value3;
		this.type = hash.value4;
	},
	onShow() {
		this.init();
	},
	methods: {
		init() {
			this.getTradeUserInfo();
			this.getData();
		},

		//获取交易员信息
		getTradeUserInfo() {
			this.$Ajax(
				'/front/trader/detail',
				{
					traderId: this.traderId
				},
				res => {
					console.log('交易员信息：' + JSON.stringify(res.obj.traderInfo));
					if (res.code == 0) {
						this.tradeUserInfo = res.obj.traderInfo;
						this.userInfo = res.obj.userInfo;
					}
				}
			);
		},
		getData() {
			this.nowPageNum = 1;
			this.historyPageNum = 1;
			this.dynamicPageNum = 1;
			this.nowFollowData = [];
			this.historyFollowData = [];
			this.nowRecordData = [];
			this.historyRecordData = [];
			this.dynamicList = [];

			if (this.tabsActive == 0) {
				this.getNowFollowData();
				this.getHistoryFollowData();
			} else if (this.tabsActive == 2) {
				this.getNowRecord();
				this.getHistoryRecordData();
			} else if (this.tabsActive == 3) {
				this.getDynamicByTraderList();
			}
		},
		getNowFollowData() {
			this.$Ajax(
				'/front/trader/follower/list',
				{
					traderId: this.traderId, //交易员id
					status: 1, //状态【1正在跟随 2历史跟随】
					pageNum: this.nowPageNum,
					pageSize: this.nowPageSize
				},
				res => {
					// console.log('正在跟随' + JSON.stringify(res));
					if (res.code == 0) {
						this.nowPages = res.obj.pages;
						this.nowFollowData = this.nowFollowData.concat(res.obj.list);
					}
				}
			);
		},
		nowFollowLower(e) {
			if (this.nowPageNum >= this.nowPages) {
				return this.$tools.toast('到底了');
			} else {
				this.nowPageNum++;
				this.getNowFollowData();
			}
		},
		getHistoryFollowData() {
			this.$Ajax(
				'/front/trader/follower/list',
				{
					traderId: this.traderId, //交易员id
					status: 2, //状态【1正在跟随 2历史跟随】
					pageNum: this.historyPageNum,
					pageSize: this.historyPageSize
				},
				res => {
					// console.log('正在跟随' + JSON.stringify(res));
					if (res.code == 0) {
						this.historyPages = res.obj.pages;
						this.historyFollowData = this.historyFollowData.concat(res.obj.list);
					}
				}
			);
		},
		historyFollowLower(e) {
			if (this.historyPageNum >= this.historyPages) {
				return this.$tools.toast('到底了');
			} else {
				this.historyPageNum++;
				this.getHistoryFollowData();
			}
		},
		getNowRecord() {
			this.$Ajax(
				'/front/trader/trade/list',
				{
					traderId: this.traderId, //交易员id
					status: 1, //状态【1在持 2历史】
					pageNum: this.nowPageNum,
					pageSize: this.nowPageSize
				},
				res => {
					// console.log('当前：' + JSON.stringify(res));
					if (res.code == 0) {
						this.nowPages = res.obj.pages;
						this.nowRecordData = this.nowRecordData.concat(res.obj.list);
					}
				}
			);
		},
		nowRecordLower(e) {
			if (this.nowPageNum >= this.nowPages) {
				return this.$tools.toast('到底了');
			} else {
				this.nowPageNum++;
				this.getNowRecord();
			}
		},
		getHistoryRecordData() {
			this.$Ajax(
				'/front/trader/trade/list',
				{
					traderId: this.traderId, //交易员id
					status: 2, //状态【1在持 2历史】
					pageNum: this.historyPageNum,
					pageSize: this.historyPageSize
				},
				res => {
					// console.log('历史：' + JSON.stringify(res));
					if (res.code == 0) {
						this.historyPages = res.obj.pages;
						this.historyRecordData = this.historyRecordData.concat(res.obj.list);
					}
				}
			);
		},
		historyRecordLower(e) {
			if (this.historyPageNum >= this.historyPages) {
				return this.$tools.toast('到底了');
			} else {
				this.historyPageNum++;
				this.getHistoryRecordData();
			}
		},
		
		getDynamicByTraderList(){
			this.$Ajax(
				'/front/dynamic/trader/publish/list',
				{
					traderId: this.traderId, //交易员id
					pageNum: this.dynamicPageNum,
					pageSize: this.dynamicPageSize
				},
				res => {
					// console.log('历史：' + JSON.stringify(res));
					if (res.code == 0) {
						this.dynamicPages = res.obj.pages;
						this.dynamicList = this.dynamicList.concat(res.obj.list);
					}
				}
			);
		},
		
		
		dynamicSupport(id, flag, index) {
			if (flag == 1) {
				this.$Ajax(
					'/front/support/cancel',
					{
						dynamicRecordId: id
					},
					res => {
						if (res.code == 0) {
							this.$set(this.dynamicList[index], 'focusFlag', this.dynamicList[index].focusFlag  = 0);
							this.$set(this.dynamicList[index], 'supportCount', this.dynamicList[index].supportCount - 1);
						}
					}
				);
			} else {
				this.$Ajax(
					'/front/support/do',
					{
						dynamicRecordId: id
					},
					res => {
						if (res.code == 0) {
							this.$set(this.dynamicList[index], 'focusFlag', this.dynamicList[index].focusFlag  = 1);
							this.$set(this.dynamicList[index], 'supportCount', this.dynamicList[index].supportCount + 1);
						}
					}
				);
			}
		},
		
		previewImage(imageList){
			uni.previewImage({
				urls: imageList,
				success: function(data) {
					console.log('选中了第' + (data.tapIndex + 1) + '个按钮,第' + (data.index + 1) + '张图片');
				},
				fail: function(err) {
					console.log(err.errMsg);
				}
			});
		},
		
		
		changeTabsActive(index) {
			if (this.tabsActive != index) {
				this.tabsActive = index;
				this.init();
			}
		}
	}
};
</script>

<style lang="scss" scoped>
@import '/scss/userInfo';
</style>
