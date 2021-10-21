<template>
	<view class="pages bg_header">
		<view class="initHeader initHeader--bgStyle initHeader--white">
			<view class="initHeader-wrapper">
				<view class="initHeader-title">我的资产</view>
			</view>
		</view>

		<view class="main">
			<view class="main-wrapper">
				<swiper class="swiper-box":current="tabIndex" @change="tabChange">
				 <!-- :style="{height:swiperheight+'px'}" > -->
					<swiper-item>
						<view class="assetsBox assetsBox--image1">
							<view class="assetsBox-header">
								<image src="../../static/asset/icon-asset-tips.png" mode="widthFix"></image>
								<text>账户可用</text>
							</view>
							<view class="assetsBox-asset">
								<view class="assetsBox-asset-usdt">{{ (assetsInfo.using + (assetsInfo.usable*TPDPrice)) | number(4) }}<text>USDT</text></view>
								<view class="assetsBox-asset-cny">≈{{ (assetsInfo.using + (assetsInfo.usable*TPDPrice)) * usdtPrice | number(4) }} CNY</view>
							</view>
							<view class="assetsBox-wrapper">
								<view class="assetsBox-wrapper__item" @click="$tools.jump('../withdraw/withdraw')">
									<image src="../../static/asset/icon-asset-01.png" mode="widthFix" class="assetsBox-wrapper__item--image"></image>
									<view class="assetsBox-wrapper__item--info">提现</view>
								</view>
								<view class="assetsBox-wrapper__item" @click="$tools.jump('../recharge/recharge')">
									<image src="../../static/asset/icon-asset-02.png" mode="widthFix" class="assetsBox-wrapper__item--image"></image>
									<view class="assetsBox-wrapper__item--info">充值</view>
								</view>
								<view class="assetsBox-wrapper__item" @click="$tools.jump('./record')">
									<image src="../../static/asset/icon-asset-03.png" mode="widthFix" class="assetsBox-wrapper__item--image"></image>
									<view class="assetsBox-wrapper__item--info">记录</view>
								</view>
							</view>
						</view>
					</swiper-item>
					<swiper-item>
						<view class="assetsBox assetsBox--image2">
							<view class="assetsBox-header">
								<image src="../../static/asset/icon-asset-tips.png" mode="widthFix"></image>
								<text>全球分红总奖池</text>
							</view>
							<view class="assetsBox-asset">
								<view class="assetsBox-asset-usdt">{{ (potData.jackpotOne*1 + potData.jackpotTwo*1 + potData.jackpotThree*1) | number(4) }}<text>USDT</text></view>
								<view class="assetsBox-asset-cny">≈{{ ((potData.jackpotOne*1 + potData.jackpotTwo*1 + potData.jackpotThree*1)) * usdtPrice | number(4) }} CNY</view>
							</view>
							<view class="assetsBox-wrapper">
								<view class="assetsBox-pool">
									<view class="assetsBox-pool__title">银牌奖池</view>
									<view class="assetsBox-pool__usdt">{{ (potData.jackpotOne) | number(0) }}<text>USDT</text></view>
								</view>
								<view class="assetsBox-pool">
									<view class="assetsBox-pool__title">金牌奖池</view>
									<view class="assetsBox-pool__usdt">{{ (potData.jackpotTwo) | number(0) }}<text>USDT</text></view>
								</view>
								<view class="assetsBox-pool">
									<view class="assetsBox-pool__title">钻石奖池</view>
									<view class="assetsBox-pool__usdt">{{ (potData.jackpotThree) | number(0) }}<text>USDT</text></view>
								</view>
							</view>
						</view>
					</swiper-item>
				</swiper>
			</view>
			<view class="tabBar">
				<view class="tabBar-swiper" v-for="(tab,index) in tabBars" :key="tab.id">
					<view class="tabBar-swiper__list" :class="{'active' : tabIndex==index}"></view>
				</view>
			</view>
			<view class="recommendBox">
				<view class="recommendBox-wrapper">
					<view class="recommendBox-wrapper-item">
						<image src="../../static/asset/icon-asset-record.png" mode="widthFix" class="recommendBox-wrapper-item__image"></image>
						<view class="">
							<view class="recommendBox-title">我的账户</view>
							<view class="recommendBox-txt">MY ACCOUNT</view>
						</view>
					</view>
				</view>
			</view>
			
			<view class="transitionBox">
				<view class="transitionBox-wrapper">
					<!-- <view class="initNoData" v-if="recordList.length ==0">暂无交易记录</view>
					<view class="transitionBox-wrapper__item" v-for="(item,index) in recordList" :key="index" v-else
					@click="$tools.jump('./assetRecord')"> -->
					<view class="transitionBox-wrapper__item" @click="$tools.jump('./assetRecord',5,assetsInfo.using,assetsInfo.freeze,(assetsInfo.using * usdtPrice))">
						<view class="transitionBox-wrapper__item--title">USDT</view>
						<view class="transitionBox-wrapper__item--box">
							<view class="transitionBox-content">
								<view class="transitionBox-content-title">可用</view>
								<view class="transitionBox-content-data">{{ assetsInfo.using | number(4) }}</view>
							</view>
							<view class="transitionBox-content">
								<view class="transitionBox-content-title">冻结</view>
								<view class="transitionBox-content-data">{{ assetsInfo.freeze | number(4) }}</view>
							</view>
							<view class="transitionBox-content">
								<view class="transitionBox-content-title">折合(CNY)</view>
								<view class="transitionBox-content-data">{{ (assetsInfo.using * usdtPrice) | number(4) }}</view>
							</view>
						</view>
					</view>
					<view class="transitionBox-wrapper__item" @click="$tools.jump('./assetRecord',2,assetsInfo.usable,assetsInfo.lockup,assetsInfo.consume)">
						<view class="transitionBox-wrapper__item--title">CLQ</view>
						<view class="transitionBox-wrapper__item--box">
							<view class="transitionBox-content">
								<view class="transitionBox-content-title">可用</view>
								<view class="transitionBox-content-data">{{ assetsInfo.usable | number(4) }}</view>
							</view>
							<view class="transitionBox-content">
								<view class="transitionBox-content-title">锁仓</view>
								<view class="transitionBox-content-data">{{ assetsInfo.lockup | number(4) }}</view>
							</view>
							<view class="transitionBox-content">
								<view class="transitionBox-content-title">已释放</view>
								<view class="transitionBox-content-data">{{ (assetsInfo.consume) | number(4) }}</view>
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
			tabIndex:0,
			tabsActive:0,
			selectType: true,
			isFocus: null,
			price:'',
			price:'0.68',
			num:'',
			quota:0,
			charge:0,
			pwd:'',
			recordList:[
				{coin:'TPD',num:'23.30200',charge:'0',time:'653.504'},{coin:'TPD',num:'5.2200',charge:'0.23',time:'21/03/22 12:11'}
			],
			assetsInfo:[],
			usdtPrice:'',
			TPDPrice:'',
			tabBars:[{},{}],
			scrollItemStyle:{
				type:'',
				default:""
			},
			potData:[],
		};
	},
	onShow() {
		this.init();
	},
	methods: {
		init() {
			this.getAssetsInfo();
			this.getUSDTCNY(); 
			this.getTPDPrice(); //获取TPD兑换USDT价格
			this.getjackpotData(); //获取奖池数据
		},
		//滑动切换导航
		tabChange(e){
		   this.tabIndex = e.detail.current;
		},
		// 获取资产
		getAssetsInfo() {
			this.$Ajax('/front/mine/getAssetsInfo', {}, res => {
				// console.log(JSON.stringify(res.obj));
				if (res.code == 0) {
					this.assetsInfo = res.obj;
				}
			});
		},
		// 获取USDT-CNY价格
		getUSDTCNY() {
			this.$Ajax('/front/mine/getUSDTCNY', {}, res => {
				if (res.code == 0) {
					this.usdtPrice = res.obj;
				}
			});
		},
		// 获取TPD兑换USDT价格
		getTPDPrice() {
			this.$Ajax('/front/mine/getTPDPrice', {}, res => {
				// console.log(JSON.stringify(res.obj));
				if (res.code == 0) {
					this.TPDPrice = res.obj;
				}
			});
		},
		// 获取资产
		getjackpotData() {
			this.$Ajax('/front/user/jackpotData', {}, res => {
				// console.log(JSON.stringify(res.obj));
				if (res.code == 0) {
					this.potData = res.obj;
				}
			});
		},
	}
};
</script>	

<style lang="scss" scoped>
@import '@/common/scss/pages/asset/asset';
page,.pages{background: $globalColor-bgStyle;height: 100vh;}
</style>
