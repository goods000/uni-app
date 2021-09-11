<template>
	<view class="pages">
		<view class="initHeader initHeader--fixed initHeader--black">
			<view class="initHeader-wrapper">
				<view class="initHeader-left">
					<view class="initHeader-tabs">
						<view class="initHeader-tabs__control">
							<view
								class="initHeader-tabs__control-item"
								:class="{ 'initHeader-tabs__control-item--active': headerTabsActive == 0 }"
								@click="changeHeaderTabsActive(0)"
							>
								跟单
							</view>
							<view
								class="initHeader-tabs__control-item"
								:class="{ 'initHeader-tabs__control-item--active': headerTabsActive == 1 }"
								@click="changeHeaderTabsActive(1)"
							>
								USDT
							</view>
							<view
								class="initHeader-tabs__control-item"
								:class="{ 'initHeader-tabs__control-item--active': headerTabsActive == 2 }"
								@click="changeHeaderTabsActive(2)"
							>
								币本位
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="main">
			<!-- 图标按钮 -->
			<view class="iconItemBox" v-show="headerTabsActive == 0">
				<view class="iconItemBox-wrapper">
					<view class="iconItemBox-item" @click="$tools.jump('../documentary/documentary_bind')">
						<view class="iconItemBox-item__icon"><image src="../../static/documentary/icon-iconItem-01.png" mode="widthFix"></image></view>
						<view class="iconItemBox-item__content">
							<view class="iconItemBox-item__label">我要跟单</view>
							<view class="iconItemBox-item__data">绑定交易平台API跟随</view>
						</view>
					</view>
					<view class="iconItemBox-item" @click="$tools.noOpen()">
						<view class="iconItemBox-item__icon"><image src="../../static/documentary/icon-iconItem-02.png" mode="widthFix"></image></view>
						<view class="iconItemBox-item__content">
							<view class="iconItemBox-item__label">交易所入驻</view>
							<view class="iconItemBox-item__data">优质交易所合作上线</view>
						</view>
					</view>
				</view>
			</view>
			<view class="followBox">
				<view class="followBox-wrapper">
					<view class="followBox-item" v-if="headerTabsActive == 0">
						<view class="followBox-title">
							<view class="followBox-title__label">USDT合约交易员</view>
							<view class="followBox-title__more" @click="changeHeaderTabsActive(1)"></view>
						</view>
						<view class="initNoData" v-if="usdtDataList.length == 0">暂无数据</view>
						<scroll-view scroll-y="true" class="followBox-content" @scrolltolower="usdtFollowLower">
							<view class="followBox-list" v-for="(item, index) in usdtDataList" :key="index" @click.stop="$tools.jump('../userInfo/userInfo', item.id)">
								<view class="followBox-plane">
									<view class="followBox-header">
										<view class="followBox-avatar"><image :src="item.userImage" mode="scaleToFill"></image></view>
										<view class="followBox-info">
											<view class="followBox-name">{{ item.userName }}</view>
											<view class="followBox-row">
												<view class="followBox-type">{{ item.bourseName }}{{ item.currencyName }}交易员</view>
											</view>
										</view>
										<view class="followBox-button">
											<view class="followBox-button__btn" @click.stop="$tools.jump('../documentary/documentary_follow', item.id)">
												{{ !item.following ? '跟随' : '取消跟随' }}
											</view>
											<!-- <view class="followBox-button__btn" v-show="item.following" @click.stop="cancelFollow(item.id)">取跟</view> -->
										</view>
									</view>
									<view class="followBox-body">
										<view class="followBox-itemBox">
											<view class="followBox-itemBox__item">
												<view class="followBox-itemBox__item-data followBox-itemBox__item-data--style">{{ item.profitRate }}</view>
												<view class="followBox-itemBox__item-label">收益率</view>
											</view>
											<view class="followBox-itemBox__item">
												<view class="followBox-itemBox__item-data">{{ item.traderProfit | number(2) }}</view>
												<view class="followBox-itemBox__item-label">总收益({{ item.profitCurrency }})</view>
											</view>
											<view class="followBox-itemBox__item">
												<view class="followBox-itemBox__item-data">{{ item.followCount }}</view>
												<view class="followBox-itemBox__item-label">跟随者</view>
											</view>
										</view>
									</view>
								</view>
							</view>
						</scroll-view>
					</view>
					<view class="followBox-item" v-if="headerTabsActive == 0">
						<view class="followBox-title">
							<view class="followBox-title__label">币本位合约交易员</view>
							<view class="followBox-title__more" @click="changeHeaderTabsActive(2)"></view>
						</view>
						<view class="initNoData" v-if="numberDataList.length == 0">暂无数据</view>
						<scroll-view scroll-y="true" class="followBox-content" @scrolltolower="numberFollowLower">
							<view
								class="followBox-list"
								v-for="(item, index) in numberDataList"
								:key="index"
								@click.stop="$tools.jump('../userInfo/userInfo', item.id, item.bourseName, item.currencyName, 2)"
							>
								<view class="followBox-plane">
									<view class="followBox-header">
										<view class="followBox-avatar"><image :src="item.userImage" mode=""></image></view>
										<view class="followBox-info">
											<view class="followBox-name">{{ item.userName }}</view>
											<view class="followBox-row">
												<view class="followBox-type">{{ item.bourseName }}{{ item.currencyName }}交易员</view>
											</view>
										</view>
										<view class="followBox-button">
											<view class="followBox-button__btn" @click.stop="$tools.jump('../documentary/documentary_follow', item.id)">
												{{ !item.following ? '跟随' : '取消跟随' }}
											</view>
										</view>
									</view>
									<view class="followBox-body">
										<view class="followBox-itemBox">
											<view class="followBox-itemBox__item">
												<view class="followBox-itemBox__item-data followBox-itemBox__item-data--style">{{ item.profitRate }}</view>
												<view class="followBox-itemBox__item-label">收益率</view>
											</view>
											<view class="followBox-itemBox__item">
												<view class="followBox-itemBox__item-data">{{ item.traderProfit | number(2) }}</view>
												<view class="followBox-itemBox__item-label">总收益({{ item.profitCurrency }})</view>
											</view>
											<view class="followBox-itemBox__item">
												<view class="followBox-itemBox__item-data">{{ item.followCount }}</view>
												<view class="followBox-itemBox__item-label">跟随者</view>
											</view>
										</view>
									</view>
								</view>
							</view>
						</scroll-view>
					</view>
					<view class="followBox-item" v-if="headerTabsActive == 1">
						<view class="initNoData" v-if="usdtDataList.length == 0">暂无数据</view>
						<scroll-view scroll-y="true" class="followBox-content followBox-content--autoHeight">
							<view
								class="followBox-list"
								v-for="(item, index) in usdtDataList"
								:key="index"
								@click.stop="$tools.jump('../userInfo/userInfo', item.id, item.bourseName, item.currencyName, 1)"
							>
								<view class="followBox-plane">
									<view class="followBox-header">
										<view class="followBox-avatar"><image :src="item.userImage" mode=""></image></view>
										<view class="followBox-info">
											<view class="followBox-name">{{ item.userName }}</view>
											<view class="followBox-row">
												<view class="followBox-type">{{ item.bourseName }}{{ item.currencyName }}交易员</view>
											</view>
										</view>
										<view class="followBox-button">
											<view class="followBox-button__btn" @click.stop="$tools.jump('../documentary/documentary_follow', item.id)">
												{{ !item.following ? '跟随' : '取消跟随' }}
											</view>
										</view>
									</view>
									<view class="followBox-body">
										<view class="followBox-itemBox">
											<view class="followBox-itemBox__item">
												<view class="followBox-itemBox__item-data followBox-itemBox__item-data--style">{{ item.profitRate }}</view>
												<view class="followBox-itemBox__item-label">收益率</view>
											</view>
											<view class="followBox-itemBox__item">
												<view class="followBox-itemBox__item-data">{{ item.traderProfit | number(2) }}</view>
												<view class="followBox-itemBox__item-label">总收益({{ item.profitCurrency }})</view>
											</view>
											<view class="followBox-itemBox__item">
												<view class="followBox-itemBox__item-data">{{ item.followCount }}</view>
												<view class="followBox-itemBox__item-label">跟随者</view>
											</view>
										</view>
									</view>
								</view>
							</view>
						</scroll-view>
					</view>
					<view class="followBox-item" v-if="headerTabsActive == 2">
						<view class="initNoData" v-if="numberDataList.length == 0">暂无数据</view>
						<scroll-view scroll-y="true" class="followBox-content followBox-content--autoHeight">
							<view
								class="followBox-list"
								v-for="(item, index) in numberDataList"
								:key="index"
								@click.stop="$tools.jump('../userInfo/userInfo', item.id, item.bourseName, item.currencyName, 2)"
							>
								<view class="followBox-plane">
									<view class="followBox-header">
										<view class="followBox-avatar"><image :src="item.userImage" mode=""></image></view>
										<view class="followBox-info">
											<view class="followBox-name">{{ item.userName }}</view>
											<view class="followBox-row">
												<view class="followBox-type">{{ item.bourseName }}{{ item.currencyName }}交易员</view>
											</view>
										</view>
										<view class="followBox-button">
											<view class="followBox-button__btn" @click.stop="$tools.jump('../documentary/documentary_follow', item.id)">
												{{ !item.following ? '跟随' : '取消跟随' }}
											</view>
										</view>
									</view>
									<view class="followBox-body">
										<view class="followBox-itemBox">
											<view class="followBox-itemBox__item">
												<view class="followBox-itemBox__item-data followBox-itemBox__item-data--style">{{ item.profitRate }}</view>
												<view class="followBox-itemBox__item-label">收益率</view>
											</view>
											<view class="followBox-itemBox__item">
												<view class="followBox-itemBox__item-data">{{ item.traderProfit | number(2) }}</view>
												<view class="followBox-itemBox__item-label">总收益({{ item.profitCurrency }})</view>
											</view>
											<view class="followBox-itemBox__item">
												<view class="followBox-itemBox__item-data">{{ item.followCount }}</view>
												<view class="followBox-itemBox__item-label">跟随者</view>
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
	</view>
</template>

<script>
export default {
	data() {
		return {
			usdtDataList: [], //USDT
			numberDataList: [], //USDT
			contractType: 2, //数字合约：1，USDT：2
			headerTabsActive: 0,

			// 分页
			pages: 1, //总页数
			pageNum: 1, //当前页数
			pageSize: 20, //请求记录

			usdtPages: 1, //总页数
			usdtPageNum: 1, //当前页数
			usdtPageSize: 20, //请求记录

			numberPages: 1, //总页数
			numberPageNum: 1, //当前页数
			numberPageSize: 20 //请求记录
		};
	},
	onShow() {
		if(uni.getStorageSync('documentaryActive')){
			this.headerTabsActive = uni.getStorageSync('documentaryActive');
		}
		this.init();
	},
	onReachBottom() {
		if (this.headerTabsActive == 1 || this.headerTabsActive == 2) {
			if (this.pageNum >= this.pages) {
				return this.$tools.toast('到底啦');
			} else {
				this.pageNum++;

				if (this.headerTabsActive == 1) {
					this.getUSDTFollowData();
				} else if (this.headerTabsActive == 2) {
					this.getNumberFollowData();
				}
			}
		}
	},
	onHide(){
		uni.removeStorageSync('documentaryActive');
	},
	methods: {
		init() {
			this.usdtDataList = [];
			this.numberDataList = [];
			this.usdtPageNum = 1;
			this.numberPageNum = 1;
			this.pageNum = 1;

			this.getUSDTFollowData();
			this.getNumberFollowData();
		},
		getUSDTFollowData() {
			this.$Ajax(
				'/front/trader/list',
				{
					contractType: 2, //合约类型[1数字合约，2USDT合约]
					pageNum: this.headerTabsActive == 0 ? this.usdtPageNum : this.pageNum,
					pageSize: this.headerTabsActive == 0 ? this.usdtPageSize : this.pageSize
				},
				res => {
					console.log(JSON.stringify(res));
					if (res.code == 0) {
						if (this.headerTabsActive == 0) {
							this.usdtPages = res.obj.pages;
						} else {
							this.pages = res.obj.pages;
						}

						this.usdtDataList = this.usdtDataList.concat(res.obj.list);
					}
				}
			);
		},
		usdtFollowLower(e) {
			if (this.usdtPageNum >= this.usdtPages) {
				return this.$tools.toast('到底了');
			} else {
				this.usdtPageNum++;
				this.getUSDTFollowData();
			}
		},
		getNumberFollowData() {
			this.$Ajax(
				'/front/trader/list',
				{
					contractType: 1, //合约类型[1数字合约，2USDT合约]
					pageNum: this.headerTabsActive == 0 ? this.numberPageNum : this.pageNum,
					pageSize: this.headerTabsActive == 0 ? this.numberPageSize : this.pageSize
				},
				res => {
					console.log(JSON.stringify(res));
					if (res.code == 0) {
						if (this.headerTabsActive == 0) {
							this.numberPages = res.obj.pages;
						} else {
							this.pages = res.obj.pages;
						}

						this.numberDataList = this.numberDataList.concat(res.obj.list);
					}
				}
			);
		},
		numberFollowLower(e) {
			if (this.numberPageNum >= this.numberPages) {
				return this.$tools.toast('到底了');
			} else {
				this.numberPageNum++;
				this.getNumberFollowData();
			}
		},
		changeHeaderTabsActive(index) {
			if (this.headerTabsActive != index) {
				this.headerTabsActive = index;
				this.init();
			}
		}
	}
};
</script>

<style lang="scss" scoped>
@import '/scss/documentary';
</style>
