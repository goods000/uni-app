<template>
	<view class="pages">
		<view class="frameBox">
			<view class="frameBox-wrapper">
				<view class="frameBox-eye" :class="eyeType ? 'frameBox-eye--open' : 'frameBox-eye--close'" @click="toggleAssetsInfo()"></view>
				<view class="frameBox-label">总账户资产折合(BTC)</view>
				<view class="frameBox-price">
					<view class="frameBox-price__highlight">{{ eyeType ? assetsTotalList.btc : '***' | number(4) }}</view>
					<view>{{ eyeType ? '≈' : '' }}{{ eyeType ? assetsTotalList.cny : '***' | number(2) }}{{ eyeType ? '(CNY)' : '' }}</view>
				</view>
			</view>
		</view>
		<view class="fancyBox">
			<view class="fancyBox-wrapper">
				<view class="fancyBox-item" @click="$tools.jump('../assets/assets_topUp')"><view class="fancyBox-item__title">充币</view></view>
				<view class="fancyBox-item" @click="$tools.jump('../assets/assets_takeOut')"><view class="fancyBox-item__title">提币</view></view>
				<view class="fancyBox-item" @click="$tools.jump('../assets/assets_exchange')"><view class="fancyBox-item__title">划转</view></view>
			</view>
		</view>
		<view class="tabsBox">
			<view class="tabsBox-control">
				<view class="tabsBox-control__item" :class="{ 'tabsBox-control__item--active': tabsActive == 0 }" @click="changeTabsActive(0)">币币</view>
				<view class="tabsBox-control__item" :class="{ 'tabsBox-control__item--active': tabsActive == 1 }" @click="changeTabsActive(1)">合约</view>
				<view class="tabsBox-control__item" :class="{ 'tabsBox-control__item--active': tabsActive == 2 }" @click="changeTabsActive(2)">法币</view>
				<!-- <view class="tabsBox-control__item" :class="{ 'tabsBox-control__item--active': tabsActive == 3 }" @click="changeTabsActive(3)">保证金</view> -->
				<!-- <view class="tabsBox-control__item" :class="{ 'tabsBox-control__item--active': tabsActive == 4 }" @click="changeTabsActive(4)">矿池</view> -->
			</view>
			<view class="tabsBox-wrapper">
				<!-- 币币 -->
				<view class="tabsBox-content" v-show="tabsActive == 0">
					<view class="filterBox">
						<view class="filterBox-wrapper">
							<view class="filterBox-label">币币总资产折合(BTC)</view>
							<view class="filterBox-price">
								<text class="filterBox-price__highlight">{{ eyeType ? assetsList.total : '***' | number(4) }}</text>
								<text>{{ eyeType ? '≈' : '' }}{{ eyeType ? assetsList.usdtTotal : '***' | number(2) }}{{ eyeType ? '(CNY)' : '' }}</text>
							</view>
						</view>
					</view>

					<view class="currencyBox">
						<view class="currencyBox-wrapper">
							<view class="currencyBox-list" v-for="(item, index) in currencyList" :key="index" @click="$tools.jump('../assets/assets_info', item.id, 1)">
								<view class="currencyBox-list__label">{{ item.currencyName }}</view>
								<view class="currencyBox-list__content">
									<view class="currencyBox-list__item">
										<view class="currencyBox-list__item-label">可用</view>
										<view class="currencyBox-list__item-data">{{ eyeType ? item.using : '***' | number(4) }}</view>
									</view>
									<view class="currencyBox-list__item">
										<view class="currencyBox-list__item-label">冻结</view>
										<view class="currencyBox-list__item-data">{{ eyeType ? item.freeze : '***' | number(4) }}</view>
									</view>
									<view class="currencyBox-list__item">
										<view class="currencyBox-list__item-label">折合(CNY)</view>
										<view class="currencyBox-list__item-data">{{ eyeType ? item.totalUsdt * item.usdtPrice : '***' | number(2) }}</view>
									</view>
								</view>
							</view>
						</view>
					</view>
				</view>
				
				<!-- 合约 -->
				<view class="tabsBox-content" v-show="tabsActive == 1">
					<view class="filterBox">
						<view class="filterBox-wrapper">
							<view class="filterBox-label">合约总资产折合(BTC)</view>
							<view class="filterBox-price">
								<text class="filterBox-price__highlight">{{ eyeType ? assetsList.total : '***' | number(4) }}</text>
								<text>{{ eyeType ? '≈' : '' }}{{ eyeType ? assetsList.usdtTotal : '***' | number(2) }}{{ eyeType ? '(CNY)' : '' }}</text>
							</view>
						</view>
					</view>

					<view class="currencyBox">
						<view class="currencyBox-wrapper">
							<view class="currencyBox-list" v-for="(item, index) in currencyList" :key="index" @click="$tools.jump('../assets/assets_info', item.id, 2)">
								<view class="currencyBox-list__label">{{ item.currencyName }}</view>
								<view class="currencyBox-list__content">
									<view class="currencyBox-list__item">
										<view class="currencyBox-list__item-label">可用</view>
										<view class="currencyBox-list__item-data">{{ eyeType ? item.using : '***' | number(4) }}</view>
									</view>
									<view class="currencyBox-list__item">
										<view class="currencyBox-list__item-label">冻结</view>
										<view class="currencyBox-list__item-data">{{ eyeType ? item.freeze : '***' | number(4) }}</view>
									</view>
									<view class="currencyBox-list__item">
										<view class="currencyBox-list__item-label">折合(CNY)</view>
										<view class="currencyBox-list__item-data">{{ eyeType ? item.totalUsdt * item.usdtPrice : '***' | number(2) }}</view>
									</view>
								</view>
							</view>
						</view>
					</view>
				</view>
				
				<!-- 法币 -->
				<view class="tabsBox-content" v-show="tabsActive == 2">
					<view class="filterBox">
						<view class="filterBox-wrapper">
							<view class="filterBox-label">法币总资产折合(BTC)</view>
							<view class="filterBox-price">
								<text class="filterBox-price__highlight">{{ eyeType ? otherAssetsList.btc : '***' | number(4) }}</text>
								<text>{{ eyeType ? '≈' : '' }}{{ eyeType ? otherAssetsList.cny : '***' | number(2) }}{{ eyeType ? '(CNY)' : '' }}</text>
							</view>
						</view>
					</view>
				
					<view class="currencyBox">
						<view class="currencyBox-wrapper">
							<view class="currencyBox-list" v-for="(item, index) in currencyList" :key="index" @click="$tools.jump('../assets/assets_info', item.currencyId, 3)">
								<view class="currencyBox-list__label">{{ item.currencyName }}</view>
								<view class="currencyBox-list__content">
									<view class="currencyBox-list__item">
										<view class="currencyBox-list__item-label">可用</view>
										<view class="currencyBox-list__item-data">{{ eyeType ? item.otcUsing : '***' | number(4) }}</view>
									</view>
									<view class="currencyBox-list__item">
										<view class="currencyBox-list__item-label">冻结</view>
										<view class="currencyBox-list__item-data">{{ eyeType ? item.otcFreeze : '***' | number(4) }}</view>
									</view>
									<view class="currencyBox-list__item">
										<view class="currencyBox-list__item-label">折合(CNY)</view>
										<view class="currencyBox-list__item-data">{{ eyeType ? item.cny : '***' | number(2) }}</view>
									</view>
								</view>
							</view>
						</view>
					</view>
				</view>
			
				<!-- 保证金 -->
				<view class="tabsBox-content" v-show="tabsActive == 3">
					<view class="filterBox">
						<view class="filterBox-wrapper">
							<view class="filterBox-label">保证金总资产折合(BTC)</view>
							<view class="filterBox-price">
								<text class="filterBox-price__highlight">{{ eyeType ? otherAssetsList.btc : '***' | number(4) }}</text>
								<text>{{ eyeType ? '≈' : '' }}{{ eyeType ? otherAssetsList.cny : '***' | number(2) }}{{ eyeType ? '(CNY)' : '' }}</text>
							</view>
						</view>
					</view>
				
					<view class="currencyBox">
						<view class="currencyBox-wrapper">
							<view class="currencyBox-list" v-for="(item, index) in currencyList" :key="index" @click="$tools.jump('../assets/assets_info', item.currencyId, 4)">
								<view class="currencyBox-list__label">{{ item.currencyName }}</view>
								<view class="currencyBox-list__content">
									<view class="currencyBox-list__item">
										<view class="currencyBox-list__item-label">可用</view>
										<view class="currencyBox-list__item-data">{{ eyeType ? item.bondUsing : '***' | number(4) }}</view>
									</view>
									<view class="currencyBox-list__item">
										<view class="currencyBox-list__item-label">冻结</view>
										<view class="currencyBox-list__item-data">{{ eyeType ? item.otcFreeze : '***' | number(4) }}</view>
									</view>
									<view class="currencyBox-list__item">
										<view class="currencyBox-list__item-label">折合(CNY)</view>
										<view class="currencyBox-list__item-data">{{ eyeType ? item.cny : '***' | number(2) }}</view>
									</view>
								</view>
							</view>
						</view>
					</view>
				</view>
					
				<!-- 保证金 -->
				<view class="tabsBox-content" v-show="tabsActive == 4">
					<!-- <view class="buttonBox">
						<view class="buttonBox-wrapper">
							<view class="buttonBox-btn" :class="{ 'buttonBox-btn--active': buttonBoxActive == 1 }" @click="changeButtonTabsActive(1)">节点权益</view>
							<view class="buttonBox-btn" :class="{ 'buttonBox-btn--active': buttonBoxActive == 2 }" @click="changeButtonTabsActive(2)">合约返还</view>
						</view>
					</view> -->
				
					<view class="currencyBox">
						<view class="currencyBox-wrapper">
							<view class="currencyBox-list" @click="$tools.jump('../assets/assets_lock', 2)">
								<!-- <view class="currencyBox-list__content" v-if="buttonBoxActive == 1">
									<view class="currencyBox-list__item">
										<view class="currencyBox-list__item-label">币种</view>
										<view class="currencyBox-list__item-data">ICH</view>
									</view>
									<view class="currencyBox-list__item">
										<view class="currencyBox-list__item-label">冻结</view>
										<view class="currencyBox-list__item-data">{{ eyeType ? lockList.freeze : '***' | number(4) }}</view>
									</view>
									<view class="currencyBox-list__item">
										<view class="currencyBox-list__item-label">总量</view>
										<view class="currencyBox-list__item-data">{{ eyeType ? lockList.total : '***' | number(4) }}</view>
									</view>
								</view> -->
								<view class="currencyBox-list__content">
									<view class="currencyBox-list__item">
										<view class="currencyBox-list__item-label">总返还(USDT)</view>
										<view class="currencyBox-list__item-data">{{ eyeType ? lockList.total : '***' | number(4)}}</view>
									</view>
									<view class="currencyBox-list__item">
										<view class="currencyBox-list__item-label">已返还({{ lockList.currencyName }})</view>
										<view class="currencyBox-list__item-data">{{ eyeType ? lockList.release : '***' | number(4) }}</view>
									</view>
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
import webUrl from '../../components/url.js';
export default {
	data() {
		return {
			src: webUrl.webUrl + '/search/currencyByName?name=',

			eyeType: true,

			assetsTotalList: [],
			assetsList: [],
			otherAssetsList: [],
			lockList: [],
			buttonBoxActive: 1,
			
			currencyList: [],

			tabsActive: 0
		};
	},
	onLoad() {
		var eyeType = uni.getStorageSync('eyeType');
		if (eyeType == '' || eyeType == null || eyeType == undefined) {
			uni.setStorageSync('eyeType', true);
		}
	},
	onShow() {
		this.init();
	},
	methods: {
		init() {
			this.getAssetsTotal();
			
			if(this.tabsActive == 0 || this.tabsActive == 1){
				this.getAssets();
			}
		},
		getAssetsTotal() {
			this.$Ajax('/front/financial/assetsTotal', {}, res => {
				if (res.code == 0) {
					this.assetsTotalList = res.obj;
				}
			});
		},
		// 币币/合约接口
		getAssets() {
			// 1币币 2合约
			if(this.tabsActive == 0){
				var assetType = 1;
			}else if(this.tabsActive == 1){
				var assetType = 2;
			}
			
			this.$Ajax(
				'/front/financial/assets',
				{
					assetType: assetType
				},
				res => {
					if (res.code == 0) {
						this.assetsList = res.obj;
						this.currencyList = res.obj.list;
						console.log(JSON.stringify(this.assetsList));
					}
				}
			);
		},
		getOtherAssetsList(type){
			this.$Ajax(
				'/front/financial/other/assets',
				{
					type: type
				},
				res => {
						console.log(JSON.stringify(res));
					if (res.code == 0) {
						this.otherAssetsList = res.obj;
						this.currencyList = res.obj.list;
					}
				}
			);
		},
		getLockList(type){
			console.log(type);
			this.$Ajax(
				'/front/financial/lock',
				{
					type: type
				},
				res => {
						console.log(JSON.stringify(res));
					if (res.code == 0) {
						this.lockList = res.obj;
					}
				}
			);
		},
		toggleAssetsInfo() {
			var eyeType = uni.getStorageSync('eyeType');
			if (eyeType) {
				uni.setStorageSync('eyeType', false);
				this.eyeType = false;
			} else {
				uni.setStorageSync('eyeType', true);
				this.eyeType = true;
			}
		},
		changeTabsActive(index) {
			this.tabsActive = index;
			if (index == 0) {
				this.getAssets();
			} else if (index == 1) {
				this.getAssets();
			} else if (index == 2) {
				this.getOtherAssetsList(1);
			} else if (index == 3) {
				this.getOtherAssetsList(2);
			} else if (index == 4) {
				this.getLockList(2);
			}
		},
		changeButtonTabsActive(index){
			this.buttonBoxActive = index;
			this.getLockList(index);
		}
	}
};
</script>

<style lang="scss" scoped>
@import '@/common/scss/pages/assets';
</style>
