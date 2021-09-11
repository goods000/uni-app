<template>
	<view class="pages">
		<view class="asset-bg">
			<image src="../../static/asset/icon-asset-bg.png" mode="widthFix"></image>
		</view>
		<view class="header_bar">
			<view class="header">
				<view class="header-back--white" @click="$tools.back(1)"></view>
				<view class="header-title-white">我的资产</view>
			</view> 
		</view> 
		
		<view class="asset">
			<view class="asset">
				<view class="asset-wrapper">
					<view class="asset-wrapper__title" @click="openPopup('securityPopup');navigateFlag = true;">
						<text>{{selectType}}</text>持币总量
						<image src="../../static/public/icon-select-grey.png" :class="navigateFlag ? 'asset-wrapper__title--active' : ''" mode=""></image>
					</view>
					<view class="asset-wrapper__sum">{{asset.using*1 + asset.freeze*1 | number(4)}}</view>
					<view class="asset-wrapper__yue">≈ {{ asset.cny | number(2)}} CNY</view>
					<view class="asset-wrapper__item">
						<view class="asset-wrapper__item-box">
							<view class="asset-wrapper__item-box--title">可用数量({{selectType}})</view>
							<view class="asset-wrapper__item-box--num">{{asset.using | number(4)}}</view>
						</view>
						<view class="asset-wrapper__item-box">
							<view class="asset-wrapper__item-box--title">冻结数量({{selectType}})</view>
							<view class="asset-wrapper__item-box--num">{{asset.freeze | number(4)}}</view>
						</view>
					</view>
				</view>
			</view>
			
			<view class="asset-btnBox" v-if="selectType == 'CNDT'">
				<view class="asset-btn" @click="$tools.jump('../recharge/recharge',selectType)">
					<image src="../../static/asset/icon-asset-recharge.png" mode="widthFix"></image>
					<view class="asset-btn__title">充 值</view>
				</view>
			</view>	
			<view class="asset-btnBox" v-if="selectType == 'USDT'">
				<view class="asset-btn" @click="$tools.jump('../recharge/recharge',selectType)">
					<image src="../../static/asset/icon-asset-recharge.png" mode="widthFix"></image>
					<view class="asset-btn__title">充 值</view>
				</view>
				<view class="asset-btnWith" @click="$tools.jump('../withdraw/withdraw')">
					<image src="../../static/asset/icon-asset-recharge.png" mode="widthFix"></image>
					<view class="asset-btnWith__title">提 现</view>
				</view>
			</view>
			
			<view class="initTilte initTilte--mt">
				<view class="initTilte-title">资产财务</view><view class="initTilte-tips">明细</view>
			</view>
			
			<view class="asset-list">
				<view class="asset-list__box">
					<view class="initNoData" v-if="newsList.length == 0"></view>
					<scroll-view scroll-y="true" class="asset-list__height" @scrolltolower="newsListLower">
					<view class="asset-list__box-item" v-for="(item,index) in newsList" :key="index">
						<view class="asset-list__item">
							<view class="asset-list__item--title">{{item.typeStr}}</view>
							<view class="asset-list__item--time">{{item.createTime}}</view>
						</view>
						<view class="asset-list__item">
							<view class="asset-list__item--time">数量</view>
							<view class="asset-list__item--time">折合(CNY)</view>
						</view>
						<view class="asset-list__item">
							<view class="asset-list__item--num">{{item.money | number(4)}}</view>
							<view class="asset-list__item--num" v-if="selectType == 'USDT'">{{item.money * usdt | number(4)}}</view>
							<view class="asset-list__item--num" v-if="selectType == 'CNDT'">{{item.money * usdt * price | number(4)}}</view>
						</view>
					</view>
					</scroll-view>
				</view>
			</view>
		</view>
		<!-- 币种选项 -->
		<uni-popup ref="securityPopup" type="bottom" :animation="true">
			<view class="initPopup">
				<view class="initBox">
					<view class="initBox-form"v-for="(item,index) in curList" :key="index" @click="close(item.id,item.name)">
						<view class="initBox-form__label">{{item.name}}</view>
					</view>
					<view class="initBox-form" @click="hidePopup('securityPopup');navigateFlag = false;">
						<view class="initBox-form__label">取 消</view>
					</view>
				</view>
			</view>
		</uni-popup>
		
	</view>
</template>

<script>
	export default {
			data(){
				return{
					currencyId:'',
					selectType:'',
					// 页数
					pageSize: 20,
					pageNum: 1,
					pages: 0,
					newsList:[],
					navigateFlag: false,
					curList:[],
					asset:{},
					price:'',
					usdt:'',
				}
			},
			onShow() {
				this.navigateFlag = false;
				this.init();
			},
			methods: {
				init(){
					this.newsList = [];
					this.pageNum = 1;
					this.getFinancialCurList(); 	// 理财相关[理财币种列表]
				},
				close(currencyId,currencyName){
					this.navigateFlag = false;
					this.currencyId = currencyId;
					this.selectType = currencyName;
					this.getassetsByCurrency();
					this.newsList = [];
					this.getList();
					this.hidePopup('securityPopup');
				},
				// 理财相关[理财币种列表]
				getFinancialCurList() {
					this.$Ajax('/front/regular/getFinancialCurList', {}, res => {
						if (res.code == 0) {
							this.curList = res.obj;
							if(this.currencyId == ''){
								this.currencyId = this.curList[0].id;
							}
							if(this.selectType == ''){
								this.selectType = this.curList[0].name;
							}
							console.log("this.currencyId",this.currencyId,"this.selectType",this.selectType);
							this.getassetsByCurrency();
							this.getList();
						}
					});
				},
				// 获取指定资产
				getassetsByCurrency() {
					this.$Ajax('/front/financial/assetsByCurrency', {
						assetType:1,
						currencyId: this.currencyId,
					}, res => {
						if (res.code == 0) {
							this.asset = res.obj.wallet;
							this.price = res.obj.price;
							this.usdt = res.obj.usdt;
						}
					});
				},
				// 获取账单
				getList() {
					this.$Ajax('/front/financial/getLog', {
						assetType:1,
						pageSize: this.pageSize,
						pageNum: this.pageNum,
						currencyId: this.currencyId,
					}, res => {
						if (res.code == 0) {
							this.pages = res.obj.pages;
							this.newsList = this.newsList.concat(res.obj.list);
						}
					});
				},
				newsListLower(e) {
					if (this.pageNum >= this.pages) {
						return this.$tools.toast('到底了');
					} else {
						this.pageNum++;
						this.getList();
					}
				},
				/* 弹出框公用 */
				openPopup(e, item) {
					this.popupInfo = item;
					this.$refs[e].open();
				},
				hidePopup(e) {
					this.$refs[e].close();
				},
				changePopup(e) {
					console.log('popup ' + e.type + ' 状态', e.show);
					if (e.show) {
						uni.hideTabBar();
					} else {
						uni.showTabBar();
					}
				}
			},
		}
	</script>

<style lang="scss" scoped>
	@import '/scss/asset';
</style>
