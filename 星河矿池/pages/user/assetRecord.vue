<template>
	<view class="page">
		<view class="bgBox"></view>
		<view class="header_bar header_fixed">
			<view class="header">
				<view class="header-white" @click="$tools.back(1)"></view>
				<view class="header-title-white">{{currencyName}}记录</view>
			</view> 
		</view> 
		
		<view class="record">
			<view class="recordBox">
				<view class="userAsset-list">
					<view class="userAsset-list-header">
						<view class="userAsset-list-header-title">
							<view class="userAsset-list-header-title-image">
								<image :src="cpic" mode="widthFix"></image>
								<!-- <image src="../../static/public/FIL.png" mode="widthFix" v-if="currencyName == 'FIL'"></image>
								<image src="../../static/public/USDT.png" mode="widthFix" v-if="currencyName == 'USDT'"></image>
								<image src="../../static/public/PHA.png" mode="widthFix" v-if="currencyName == 'PHA'"></image>
								<image src="../../static/public/BZZ.png" mode="widthFix" v-if="currencyName == 'BZZ'"></image>
								<image src="../../static/public/ETH.png" mode="widthFix" v-if="currencyName == 'ETH'"></image> -->
								<!-- <image src="../../static/public/ICP.png" mode="widthFix" v-if="currencyName == 'ICP'"></image> -->
								<!-- <image src="../../static/public/XH.png" mode="widthFix" v-if="currencyName == 'XH'"></image> -->
							</view>
							<view class="userAsset-list-header-name">{{ currencyName }}</view>
						</view>
						<!-- <view class="userAsset-list-header-see">
							{{ using }}
						</view> -->
					</view>
					<view class="userAsset-list-data">
						<view class="userAsset-list-data-item">
							<view class="userAsset-list-data-item-title">可用</view>
							<view class="userAsset-list-data-item-num">{{ using | number(4) }}</view>
						</view>
						<view class="userAsset-list-data-item">
							<view class="userAsset-list-data-item-title">冻结</view>
							<view class="userAsset-list-data-item-num">{{ freeze | number(4) }}</view>
						</view>
						<view class="userAsset-list-data-item">
							<view class="userAsset-list-data-item-title">折合(CNY)</view>
							<view class="userAsset-list-data-item-num_cny" v-if="currencyName == 'LM'">{{ ((using + freeze) / price * usdtPrice) | number(4) }}</view>
							<view class="userAsset-list-data-item-num_cny" v-else>{{ ((using*1 + freeze*1) * price * usdtPrice) | number(4) }}</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		
		<view class="tipsBox">
			<view class="tipsBox-wrapper">
				<view class="tipsBox-title">
					<image src="../../static/user/icon-user-tips.png" mode=""></image>
					<view class="tipsBox-title__label">财务明细</view>
				</view>
			</view>
		</view>
		
		<view class="record">
			<view class="recordBox">
				<view class="initNoData" v-if="recordList.length == 0">暂无数据</view>
				<scroll-view scroll-y="true" class="recordBox-height" @scrolltolower="newsListLower" v-else>
				<view class="recordBox-list" v-for="(item, key) in recordList" :key="key">
					<view class="recordBox-list-header">
						<view class="recordBox-list-header-title-1">{{item.typeStr}}</view>
						<view class="recordBox-list-header-price">{{item.createTime}}</view>
					</view>
					<view class="recordBox-list-box">
						<view class="recordBox-list-item">
							<view class="recordBox-list-item-title">数量</view>
							<view class="recordBox-list-item-status" v-if="currencyName == 'LM' && item.typeStr == '购买产品'">{{ item.money*price | number(4)}}</view>
							<view class="recordBox-list-item-status" v-else>{{ item.money | number(4)}}</view>
						</view>
						<view class="recordBox-list-item">
							<view class="recordBox-list-item-title">折合(CNY)</view>
							<!-- <view class="recordBox-list-item-status-1" v-if="currencyName == 'USDT'">{{ item.money*price }}</view> -->
							<view class="recordBox-list-item-status-1" v-if="currencyName == 'LM' && item.typeStr == '购买产品'">{{ item.money*usdtPrice | number(4) }}</view>
							<view class="recordBox-list-item-status-1" v-else-if="currencyName == 'LM'">{{ item.money/price*usdtPrice | number(4) }}</view>
							<view class="recordBox-list-item-status-1" v-else>{{ item.money*price*usdtPrice | number(4) }}</view>
						</view>
					</view>
				</view>
				</scroll-view>
			</view>
		</view>
		
		<view class="operate">
			<view class="operate-wrapper">
				<view class="operate-box" @click="$tools.jump('../recharge/recharge')">
					<view class="operate-box__image">
						<image src="../../static/user/icon-operate-01.png" mode="widthFix"></image>
					</view>
					<view class="operate-box__title">充币</view>
				</view>
				<view class="operate-box" @click="$tools.jump('../withdraw/withdraw')">
					<view class="operate-box__image">
						<image src="../../static/user/icon-operate-02.png" mode="widthFix"></image>
					</view>
					<view class="operate-box__title">提币</view>
				</view>
				<view class="operate-box" @click="$tools.jump('../exchange/exchange')">
					<view class="operate-box__image">
						<image src="../../static/user/icon-operate-03.png" mode="widthFix"></image>
					</view>
					<view class="operate-box__title">兑换</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				recordList: [
					{currency_id:1,typeStr:'充值',createTime:'2122-2-23 23:23',money:'+0.0000',statusStr:'EDD',cny:'272.56'},
					{currency_id:1,typeStr:'交易',createTime:'2122-2-23 23:23',money:'-0.0000',statusStr:'EDD',cny:'272.56'},
					{currency_id:1,typeStr:'提现',createTime:'2122-2-23 23:23',money:12,statusStr:'EDD',cny:'272.56'},
				],
				selectType: '',
				currencyId: '',
		
				// 页数
				pageSize: 20,
				pageNum: 1,
				pages: 0
			};
		},
		onLoad(option) {
			this.currencyId = option.value1;
			this.currencyName = option.value2;
			this.using = option.value3;
			this.freeze = option.value4;
			this.price = option.value5;
			this.usdtPrice = option.value6;
			this.cpic = option.value7;
		},
		onShow(e) {
			this.init();
		},
		// onReachBottom() {
		// 	if (this.pageNum >= this.pages) {
		// 		return this.$tools.toast('到底了');
		// 	}
		// 	this.pageNum++;
		// 	this.getRecord();
		// },
		methods: {
			init() {
				this.recordList = [];
				this.getRecord();
			},
			getRecord() {
				this.$Ajax(
					'/front/miner/getLog',
					{
						pageSize: this.pageSize,
						pageNum: this.pageNum,
						currencyId: this.currencyId
					},
					res => {
						if (res.code == 0) {
							this.pages = res.obj.pages;
							this.recordList = this.recordList.concat(res.obj.list);
						}
					}
				);
			},
			newsListLower(e) {
				if (this.pageNum >= this.pages) {
					return this.$tools.toast('到底了');
				} else {
					this.pageNum++;
					this.getRecord();
				}
			},
		}
	}
</script>

<style lang="scss" scoped>
	@import '@/common/scss/pages/user/record';
	@import '@/common/scss/pages/recharge/rechargeRecord';
	page{background: #FFFFFF;}
	.record 
	.recordBox{
		&-list{
			border-bottom: 1px solid $globalColor-border;
			border-radius: 0;
			margin: 0 30upx;
			&-box{
				justify-content: space-between;
			}
			&-header{
				padding: 0;
				&-title-1{
					color: $globalColor-fontStyle;
					font-weight: bold;
					font-size: 32upx;
				}
				&-price{
					color: #999999;
					font-weight: 100;
					font-size: 24upx;
				}
			}
			&-item{
				padding: 20upx 0;
				&-status{
					white-space: nowrap;
				}
				&-status-1{
					color: #666666;
					font-size: 14px;
					font-weight: bold;
					word-break: break-all;
					text-align: right;
					white-space: nowrap;
				}
			}
		}
	}
</style>
