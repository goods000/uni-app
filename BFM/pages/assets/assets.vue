<template>
	<view class="pages">
	<!-- 	<view class="initHeader initHeader--absolute initHeader--white">
			<view class="initHeader-wrapper">
				<view class="initHeader-title">资产</view>
			</view>
		</view> -->
		<view class="frameBox">
			<view class="frameBox-wrapper">
				<view class="frameBox-eye" :class="eyeType ? 'frameBox-eye--open' : 'frameBox-eye--close'" @click="toggleAssetsInfo()"></view>
				<view class="frameBox-label">总账户资产折合(USDT)</view>
				<view class="frameBox-price">
					<view class="frameBox-price__highlight">{{ eyeType ? assetsTotalList.totalUsdt : '***' | number(4) }}</view>
					<view>{{ eyeType ? '≈' : '' }}{{ eyeType ? assetsTotalList.totalUsdt * assetsTotalList.usdtPrice : '***' | number(2) }}{{ eyeType ? 'CNY' : '' }}</view>
				</view>
			</view>
			<view class="fancyBox">
				<view class="fancyBox-wrapper">
					<view class="fancyBox-item" @click="$tools.jump('../assets/assets_topUp')"><view class="fancyBox-item__title">充币</view></view>
					<view class="fancyBox-item" @click="$tools.jump('../assets/assets_takeOut')"><view class="fancyBox-item__title">提币</view></view>
					<view class="fancyBox-item" @click="$tools.jump('../assets/assets_exchange')"><view class="fancyBox-item__title">划转</view></view>
					<view class="fancyBox-item" @click="$tools.jump('../assets/assets_transfer')"><view class="fancyBox-item__title">转账</view></view>
				</view>
			</view>
		</view>
		<view class="tabsBox">
			<view class="tabsBox-control">
				<view class="tabsBox-control__item" :class="{ 'tabsBox-control__item--active': tabsActive == 0 }" @click="changeTabsActive(0)">币币账户</view>
				<view class="tabsBox-control__item" :class="{ 'tabsBox-control__item--active': tabsActive == 1 }" @click="changeTabsActive(1)">矿池账户</view>
			</view>
			<view class="tabsBox-wrapper">
				<!-- 币币 -->
				<view class="tabsBox-content">
					<view class="filterBox">
						<view class="filterBox-wrapper">
							<view class="filterBox-label">{{ tabsActive == 0 ? '币币' : '矿池' }}总资产折合(USDT)</view>
							<view class="filterBox-price">
								<text class="filterBox-price__highlight">
									{{ eyeType ? (tabsActive == 0 ? assetsTotalList.totalBbUsdt : assetsTotalList.totalPoolUsdt) : '***' | number(4) }}
								</text>
								<text>
									{{ eyeType ? '≈' : ''
									}}{{ eyeType ? (tabsActive == 0 ? assetsTotalList.totalBbUsdt : assetsTotalList.totalPoolUsdt) * assetsTotalList.usdtPrice : '***' | number(2)
									}}{{ eyeType ? 'CNY' : '' }}
								</text>
							</view>
						</view>
					</view>

					<view class="currencyBox">
						<view class="currencyBox-wrapper">
							<view class="initNoData" v-if="currencyList.length == 0">暂无数据</view>
							<!-- @click="$tools.jump('../assets/assets_info', item.id, 1)" -->
							<view class="currencyBox-list" v-for="(item, index) in currencyList" :key="index" @click="toInfo(item.currencyId)" v-show="tabsActive == 0 || (tabsActive == 1 && item.currencyName == 'BLJ')">
								<view class="currencyBox-list__header">
									<view class="currencyBox-list__header-icon">
										<image :src="item.pic" mode="widthFix"></image>
										<!-- <image src="../../static/assets/icon-currency-demo.png" mode="widthFix"></image> -->
									</view>
									<view class="currencyBox-list__header-title">{{ item.currencyName }}</view>
								</view>
								<view class="currencyBox-list__content">
									<view class="currencyBox-list__item" v-show="tabsActive == 0">
										<view class="currencyBox-list__item-label">可用</view>
										<view class="currencyBox-list__item-data">{{ eyeType ? item.using : '***' | number(4) }}</view>
									</view>
									<view class="currencyBox-list__item" v-show="tabsActive == 0">
										<view class="currencyBox-list__item-label">冻结</view>
										<view class="currencyBox-list__item-data">{{ eyeType ? item.freeze : '***' | number(4) }}</view>
									</view>
									<view class="currencyBox-list__item currencyBox-list__item--alignRight" v-show="tabsActive == 0">
										<view class="currencyBox-list__item-label">折合(CNY)</view>
										<view class="currencyBox-list__item-data">
											{{ eyeType ? (item.using + item.freeze) * item.price * assetsTotalList.usdtPrice : '***' | number(2) }}
										</view>
									</view>

									<view class="currencyBox-list__item" v-show="tabsActive == 1">
										<view class="currencyBox-list__item-label">矿池</view>
										<view class="currencyBox-list__item-data">{{ eyeType ? item.pool : '***' | number(4) }}</view>
									</view>
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>

		<!-- 交易密码验证 -->
		<uni-popup ref="tradePswPopup" type="center" :animation="true" @change="changePopup">
			<view class="centerModal">
				<view class="centerModal-wrapper">
					<view class="centerModal-title">交易密码</view>
					<view class="centerModal-listBox">
						<view class="centerModal-listBox__list">
							<view class="centerModal-listBox__list-input">
								<input type="password" placeholder-class="centerModal-listBox__list-placeholder" placeholder="请输入交易密码" v-model="tradePwd" />
							</view>
						</view>
					</view>
					<view class="centerModal-buttonBox">
						<view class="centerModal-buttonBox__btn centerModal-buttonBox__btn--cancel" @click="hidePopup('tradePswPopup')">取消</view>
						<view class="centerModal-buttonBox__btn centerModal-buttonBox__btn--confirm" @click="confirmAirDrop()">确定</view>
					</view>
				</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
import uniPopup from '@/components/uni-popup/uni-popup.vue';
import webUrl from '../../components/url.js';
export default {
	components: {
		uniPopup
	},
	data() {
		return {
			src: webUrl.webUrl + '/search/currencyByName?name=',

			eyeType: true,

			assetsTotalList: [],
			currencyList: [],
			
			bbAssetsList: [],
			assetsList: [],
			otherAssetsList: [],
			lockList: [],
			buttonBoxActive: 1,

			usdtPrice: 0, // USDT实时价格

			tabsActive: 0,

			tradePwd: '',
			airDropAmount: null
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
		},
		getAssetsTotal() {
			// 获取总资产
			this.$Ajax('/front/financial/assets/total', {}, res => {
				console.log(JSON.stringify(res));
				if (res.code == 0) {
					this.assetsTotalList = res.obj;
					this.currencyList = res.obj.assetList;
				}
			});
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
			// this.getAssets();
		},
		changeButtonTabsActive(index) {
			this.buttonBoxActive = index;
		},
		checkAirDrop(airDropAmount) {
			console.log(airDropAmount);
			this.airDropAmount = airDropAmount;
			if (!airDropAmount) {
				return;
			} else {
				this.openPopup('tradePswPopup');
			}
		},
		confirmAirDrop() {
			this.$Ajax(
				'/front/address/airdrop/do',
				{
					amount: this.airDropAmount,
					tradePwd: this.tradePwd
				},
				res => {
					console.log(JSON.stringify(res));
					if (res.code == 0) {
						this.hidePopup('tradePswPopup');
						this.tradePwd = '';
						this.$tools.toast('接收成功');
						this.getAssets();
					}
				}
			);
		},
		toInfo(id) {
			let type = 0; //类型【1币币，2=节点，3=矿池，4=收益】

			if (this.tabsActive == 0) {
				type = 0;
			}
			
			if (this.tabsActive == 1) {
				type = 1;
			}
			
			this.$tools.jump('../assets/assets_info', id, type);
		},
		/* 弹出框公用 */
		openPopup(e) {
			uni.hideTabBar();
			this.$refs[e].open();
		},
		hidePopup(e) {
			this.$refs[e].close();
		},
		changePopup(e) {
			console.log('popup ' + e.type + ' 状态', e.show);
			if (!e.show) {
				// uni.showTabBar();
				// this.tradePwd = '';
			}
		}
	}
};
</script>

<style lang="scss" scoped>
@import '@/common/scss/pages/assets';
</style>
