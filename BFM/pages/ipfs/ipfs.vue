<template>
	<view class="pages">
		<view class="initHeader initHeader--white">
			<view class="initHeader-wrapper">
				<view class="initHeader-menu" @click="showDrawer('menuDrawer')"></view>
				<view class="initHeader-title">我的资产</view>
			</view>
		</view>
		<view class="bgBox"><image src="../../static/ipfs/img-bg-style-1.png" mode="widthFix"></image></view>
		<view class="main">
			<view class="titleInfoBox">
				<view class="titleInfoBox-wrapper">
					<view class="titleInfoBox-icon"><image src="../../static/ipfs/icon-title-icon.png" mode="widthFix"></image></view>
					<view class="titleInfoBox-content">
						<view class="titleInfoBox-info">
							<view class="titleInfoBox-info__label">总收益</view>
							<view class="titleInfoBox-info__level">{{ totalInfo.directName }}</view>
						</view>
						<view class="titleInfoBox-price">{{ filInfo.using + filInfo.lock | number(4) }}</view>
						<view class="titleInfoBox-listBox">
							<view class="titleInfoBox-listBox__list">
								<view class="titleInfoBox-listBox__list-label">可用资金</view>
								<view class="titleInfoBox-listBox__list-data">{{ filInfo.using | number(4) }}</view>
							</view>
							<view class="titleInfoBox-listBox__list">
								<view class="titleInfoBox-listBox__list-label">冻结资金</view>
								<view class="titleInfoBox-listBox__list-data">{{ filInfo.lock | number(4) }}</view>
							</view>
						</view>
					</view>
				</view>
			</view>

			<view class="itemBox">
				<view class="itemBox-wrapper">
					<view class="itemBox-item" @click="$tools.jump('../assets/assets_topUp', 1)">
						<view class="itemBox-item__icon"><image src="../../static/ipfs/icon-item-01.png" mode="widthFix"></image></view>
						<view class="itemBox-item__label">FIL充币</view>
					</view>
					<view class="itemBox-item" @click="$tools.jump('../assets/assets_takeOut', 1)">
						<view class="itemBox-item__icon"><image src="../../static/ipfs/icon-item-01.png" mode="widthFix"></image></view>
						<view class="itemBox-item__label">FIL提币</view>
					</view>
					<view class="itemBox-item" @click="$tools.jump('../ipfs/ipfs_deposit')">
						<view class="itemBox-item__icon"><image src="../../static/ipfs/icon-item-01.png" mode="widthFix"></image></view>
						<view class="itemBox-item__label">FIL定存</view>
					</view>
				</view>
			</view>

			<view class="subTitleInfoBox">
				<view class="subTitleInfoBox-wrapper">
					<view class="subTitleInfoBox-content">
						<view class="subTitleInfoBox-title"><image src="../../static/ipfs/icon-subTitle-label.png" mode="widthFix"></image></view>
						<view class="subTitleInfoBox-desc">IPES CLOUD COMPUTING POWER PURCHASE</view>
						<view class="subTitleInfoBox-button"><view class="subTitleInfoBox-button__btn" @click="$tools.jump('../ipfs/ipfs_calcPower')">购买</view></view>
					</view>
					<view class="subTitleInfoBox-icon"><image src="../../static/ipfs/icon-subTitle-icon.png" mode="widthFix"></image></view>
				</view>
			</view>

			<view class="assetsBox">
				<view class="assetsBox-wrapper">
					<view class="assetsBox-title">资产</view>
					<view class="assetsBox-content">
						<view class="assetsBox-list" v-for="(item, index) in currencyList" :key="index">
							<view class="assetsBox-list__label">{{ item.currencyName }}</view>
							<view class="assetsBox-list__data">{{ item.using | number(4) }}</view>
						</view>
					</view>
				</view>
			</view>
		</view>

		<!-- 菜单 -->
		<uni-drawer :width="menuDrawerWidth" ref="menuDrawer" @change="drawerChange($event)">
			<view class="menuDrawerBox">
				<view class="menuDrawerBox-wrapper">
					<view class="menuDrawerBox-info">
						<view class="menuDrawerBox-info__avatarBox">
							<view class="menuDrawerBox-info__avatarBox-avatar"><image src="../../static/ipfs/icon-avatar.png" mode="widthFix"></image></view>
							<view class="menuDrawerBox-info__avatarBox-level">{{ levelNameList[levelType] }}</view>
						</view>
						<view class="menuDrawerBox-info__content">
							<view class="menuDrawerBox-info__name">{{ userInfo.name }}</view>
							<view class="menuDrawerBox-info__id">{{ userInfo.address | conceal(8) }}</view>
						</view>
					</view>
					<view class="menuDrawerBox-listBox">
						<!-- <view class="menuDrawerBox-listBox__plane">
							<view class="menuDrawerBox-listBox__list">
								<view class="menuDrawerBox-listBox__list-icon"><image src="../../static/ipfs/icon-menu-list-01.png" mode="widthFix"></image></view>
								<view class="menuDrawerBox-listBox__list-label">充币记录</view>
							</view>
							<view class="menuDrawerBox-listBox__list">
								<view class="menuDrawerBox-listBox__list-icon"><image src="../../static/ipfs/icon-menu-list-02.png" mode="widthFix"></image></view>
								<view class="menuDrawerBox-listBox__list-label">提币记录</view>
							</view>
							<view class="menuDrawerBox-listBox__list">
								<view class="menuDrawerBox-listBox__list-icon"><image src="../../static/ipfs/icon-menu-list-03.png" mode="widthFix"></image></view>
								<view class="menuDrawerBox-listBox__list-label">释放记录</view>
							</view>
						</view> -->
						<view class="menuDrawerBox-listBox__plane">
							<view class="menuDrawerBox-listBox__list" @click="$tools.jump('../ipfs/ipfs_deposit_list')">
								<view class="menuDrawerBox-listBox__list-icon"><image src="../../static/ipfs/icon-menu-list-04.png" mode="widthFix"></image></view>
								<view class="menuDrawerBox-listBox__list-label">定存管理</view>
							</view>
							<view class="menuDrawerBox-listBox__list" @click="$tools.jump('../ipfs/ipfs_calcPower_list')">
								<view class="menuDrawerBox-listBox__list-icon"><image src="../../static/ipfs/icon-menu-list-05.png" mode="widthFix"></image></view>
								<view class="menuDrawerBox-listBox__list-label">算力管理</view>
							</view>
							<view class="menuDrawerBox-listBox__list" @click="$tools.jump('../ipfs/ipfs_rewardList')">
								<view class="menuDrawerBox-listBox__list-icon"><image src="../../static/ipfs/icon-menu-list-06.png" mode="widthFix"></image></view>
								<view class="menuDrawerBox-listBox__list-label">我的收益</view>
							</view>
						<!-- 	<view class="menuDrawerBox-listBox__list">
								<view class="menuDrawerBox-listBox__list-icon"><image src="../../static/ipfs/icon-menu-list-07.png" mode="widthFix"></image></view>
								<view class="menuDrawerBox-listBox__list-label">矿池分红</view>
							</view> -->
						</view>
					</view>
					<view class="menuDrawerBox-endBox" @click="$tools.back(1)">
						<view class="menuDrawerBox-endBox__icon"><image src="../../static/ipfs/icon-end.png" mode="widthFix"></image></view>
						<view class="menuDrawerBox-endBox__label">返回主系统</view>
					</view>
				</view>
			</view>
		</uni-drawer>
	</view>
</template>

<script>
import uniDrawer from '@/components/uni-drawer/uni-drawer.vue';
import uniTransition from '@/components/uni-transition/uni-transition.vue';
export default {
	components: {
		uniDrawer,
		uniTransition
	},
	data() {
		return {
			userInfo: [],
			totalInfo: [],
			assetsInfo: [],
			filInfo: [],
			currencyList: [],
			levelNameList: ['普通','区代','县代','市代','省代'],
			
			levelType: 0,
			menuDrawerWidth: uni.upx2px(500)
		};
	},
	computed: {
		i18n() {
			return this.$t('message');
		}
	},
	onShow() {
		this.init();
	},
	methods: {
		init() {
			this.currencyList = [];
			this.getCurrencyList();
			this.getUserInfo();
			this.getLevelInfo();
			// this.getCurrencyList();
		},
		getUserInfo(){
			this.$Ajax('/front/user/baseInfo', {}, res => {
				console.log('当前地址信息' + JSON.stringify(res));
				if(res.code == 0){
					this.userInfo = res.obj;
				}
			});
		},
		getLevelInfo(){
			this.$Ajax('/front/user/get/teamRankLevel', {}, res => {
				console.log('等级信息' + JSON.stringify(res));
				if(res.code == 0){
					this.levelType = res.obj.rankSort;
					// this.userInfo = res.obj;
				}
			});
		},
		// getAssets(){
		// 	this.$Ajax(
		// 		'/front/financial/assetsType',
		// 		{
		// 			type: 0 //类型 0 币币, 1 分币抢票
		// 		},
		// 		res => {
		// 			console.log(JSON.stringify(res));
		// 			if (res.code == 0) {
		// 				this.totalInfo = res.obj;
		// 				// this.assetsInfo = res.obj.list[0];
		// 			}
		// 		}
		// 	);
		// },
		getCurrencyList(){
			this.$Ajax('/front/financial/assets/total', {}, res => {
				console.log(JSON.stringify(res));
				if (res.code == 0) {
					this.totalInfo = res.obj;
					res.obj.assetList.forEach((item,index) => {
						if(item.currencyName == 'FIL'){
							this.filInfo = item;
							this.currencyList.push(item);
						}
					})
					
					// this.currencyList = res.obj.currencyList;
				}
			});
		},

		/* 侧滑框公用 */
		showDrawer(e) {
			this.$refs[e].open();
		},
		closeDrawer(e) {
			this.$refs[e].close();
		},
		drawerChange(e, type) {}
	}
};
</script>

<style lang="scss" scoped>
@import '@/common/scss/pages/ipfs/ipfs';
</style>
